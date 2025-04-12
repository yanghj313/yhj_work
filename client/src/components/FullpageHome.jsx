import React, { useEffect } from 'react';
import Splitting from 'splitting';
import ScrollOut from 'scroll-out';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import './fullpage-style-full.scss';
import './fullpage.css';

cconst sectionTexts = [
    { id: 'welcome', text: 'Welcome', effect: 'random' },
    { id: 'intro', text: 'Introduction', effect: 'enter' },
    { id: 'interest', text: 'Interest', effect: 'swapsies' },
    { id: 'travel', text: 'Travel', effect: 'flipping' },
  ];
  
  const FullpageHome = () => {
    useEffect(() => {
      Splitting();
      ScrollOut({
        targets: '.word',
        once: false,
        onShown: (el) => el.setAttribute('data-scroll', 'in'),
        onHidden: (el) => el.setAttribute('data-scroll', 'out'),
      });
    }, []);
  
    return (
      <div className="fullpage-wrapper">
        {sectionTexts.map((section, index) => (
          <section
            key={index}
            id={section.id}
            className="page"
            data-scroll-section
          >
            <div
              className={`text text--${section.effect} word`}
              data-splitting="chars"
              data-scroll
            >
              {section.text}
            </div>
          </section>
        ))}
      </div>
    );
  };
  
  export default FullpageHome;