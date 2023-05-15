import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = props => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="137" cy="116" r="115" />
    <rect x="0" y="252" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="294" rx="10" ry="10" width="280" height="85" />
    <rect x="2" y="396" rx="10" ry="10" width="90" height="45" />
    <rect x="126" y="395" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
);

export default MyLoader;
