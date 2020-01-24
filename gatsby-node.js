/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

let path = require('path');

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  // blog posts
  if (page.path.match(/^\/[a-z]+/)) {
    page.matchPath = `/:title`;
    createPage({
      ...page,
      component: path.resolve('./src/pages/post.js'),
    });
  }
}