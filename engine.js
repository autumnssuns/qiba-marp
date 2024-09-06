const markdownItBlockquoteContainer = require('./plugins/markdown-it-blockquote-container');

const engine = ({ marp }) => {
  return marp
    .use(markdownItBlockquoteContainer)
    .use(require('markdown-it-attrs')) // Enable {#id .class key=value} syntax
    .use(require('markdown-it-mark')); // Enable <mark> tag
};

module.exports = engine;
