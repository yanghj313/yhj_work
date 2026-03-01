import { v2 as cloudinary } from 'cloudinary';
import { Pool } from 'pg';

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME!;
const CLOUDINARY_KEY = process.env.CLOUDINARY_KEY!;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET!;
const DATABASE_URL = process.env.DATABASE_URL!;

cloudinary.config({
	cloud_name: CLOUDINARY_NAME,
	api_key: CLOUDINARY_KEY,
	api_secret: CLOUDINARY_SECRET,
});

const pool = new Pool({
	connectionString: DATABASE_URL,
	ssl: { rejectUnauthorized: false },
});

function truncate(str: string, len = 255): string {
	if (!str) return str;
	return str.substring(0, len);
}

async function getAllCloudinaryAssets(): Promise<any[]> {
	let assets: any[] = [];
	let nextCursor: string | undefined = undefined;

	do {
		const result: any = await cloudinary.api.resources({
			type: 'upload',
			max_results: 500,
			next_cursor: nextCursor,
		});
		assets = assets.concat(result.resources);
		nextCursor = result.next_cursor;
		console.log(`가져온 이미지: ${assets.length}개`);
	} while (nextCursor);

	return assets;
}

async function syncToStrapi(assets: any[]): Promise<void> {
	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		for (const asset of assets) {
			const ext = asset.format;
			const mime = truncate(`image/${ext === 'jpg' ? 'jpeg' : ext}`);
			const name = asset.public_id.split('/').pop();

			const existing = await client.query('SELECT id FROM files WHERE url = $1', [truncate(asset.secure_url)]);

			if (existing.rows.length > 0) {
				console.log(`이미 존재: ${name}`);
				continue;
			}

			await client.query(
				`INSERT INTO files 
          (name, alternative_text, caption, width, height, formats, hash, ext, mime, size, url, preview_url, provider, provider_metadata, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW(), NOW())`,
				[
					truncate(`${name}.${ext}`),
					null,
					null,
					asset.width,
					asset.height,
					JSON.stringify({}),
					truncate(asset.public_id),
					truncate(`.${ext}`),
					mime,
					Math.round(asset.bytes / 1024),
					truncate(asset.secure_url),
					null,
					'cloudinary',
					JSON.stringify({ public_id: asset.public_id, resource_type: 'image' }),
				]
			);

			console.log(`등록 완료: ${name}`);
		}

		await client.query('COMMIT');
		console.log(`\n✅ 총 ${assets.length}개 동기화 완료!`);
	} catch (err) {
		await client.query('ROLLBACK');
		console.error('에러 발생:', err);
	} finally {
		client.release();
		await pool.end();
	}
}

async function main(): Promise<void> {
	console.log('Cloudinary 이미지 가져오는 중...');
	const assets = await getAllCloudinaryAssets();
	console.log(`\n총 ${assets.length}개 이미지 발견`);
	console.log('Strapi DB에 등록 중...');
	await syncToStrapi(assets);
}

main().catch(console.error);
