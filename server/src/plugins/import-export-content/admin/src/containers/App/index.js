/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "../../components/Layout";
// Utils
import pluginId from "../../pluginId";
// Pages
import ImportPage from "../ImportPage";
import ExportPage from "../ExportPage";

import useContentTypes from "../../hooks/useContentTypes";

import "../../assets/prismjs.css";

const pathTo = (uri = "") => `/plugins/${pluginId}/${uri}`;
const navLinks = [
  {
    name: "Import Data",
    to: pathTo("import"),
  },
  {
    name: "Export Data",
    to: pathTo("export"),
  },
];

function App() {
  const userContentTypes = useContentTypes();

  return (
    <Layout navLinks={navLinks}>
      <Switch>
        {/* 메인 진입점 - 자동 리디렉트 */}
        <Route exact path={`/plugins/${pluginId}`}>
          <Redirect to={pathTo("import")} />
        </Route>

        {/* Import 페이지 */}
        <Route path={pathTo("import")}>
          <ImportPage contentTypes={userContentTypes} />
        </Route>

        {/* Export 페이지 */}
        <Route path={pathTo("export")}>
          <ExportPage contentTypes={userContentTypes} />
        </Route>

        {/* 나머지 경로 예외처리 */}
        <Route>
          <Redirect to={pathTo("import")} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
