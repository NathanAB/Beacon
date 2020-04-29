import React from 'react';
import axios from 'axios';

const sitemapXML = ({ neighborhoods, tags }) => {
  const neighborhoodUrls = neighborhoods
    .map(n => {
      const uriNeighborhood = encodeURIComponent(n.name);
      return `
      <url>
        <loc>https://www.beacondates.com/search?filters=neighborhood%253A${uriNeighborhood}</loc>
        <priority>0.80</priority>
      </url>`;
    })
    .join('');

  const tagsUrls = tags
    .map(t => {
      const uriTag = encodeURIComponent(t.name);
      return `
      <url>
        <loc>https://www.beacondates.com/search?filters=tag%253A${uriTag}</loc>
        <priority>0.80</priority>
      </url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.beacondates.com/</loc>
        <priority>1.00</priority>
      </url>
      ${neighborhoodUrls}
      ${tagsUrls}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const neighborhoods = await axios
      .get('https://api.beacondates.com/api/neighborhoods')
      .then(response => response.data);

    const tags = await axios
      .get('https://api.beacondates.com/api/tags')
      .then(response => response.data);

    res.setHeader('Content-Type', 'application/json');
    res.write(sitemapXML({ neighborhoods, tags }));
    res.end();
  }
}

export default Sitemap;
