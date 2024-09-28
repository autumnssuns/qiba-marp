const markdownItBlockquoteContainer = require('./plugins/markdown-it-blockquote-container');

function extractClasses(token) {
  const string = token.info.trim();
  // if string contains `class` attribute, extract it
  if (string.includes('class=')) {
    const classes = string.match(/class="([^"]+)"/)[1];
    return classes;
  }
  // Otherwise, consider the whole string as classes
  return string;
}

const engine = ({ marp }) => {
  return marp
    .use(markdownItBlockquoteContainer)
    .use(require('markdown-it-attrs')) // Enable {#id .class key=value} syntax
    .use(require('markdown-it-mark')) // Enable <mark> tag
    .use(require('markdown-it-container'), 'dynamic', {
      validate: function () {
        return true;
      },
      render: function (tokens, idx) {
        const token = tokens[idx];
        return token.nesting === 1
          ? '<div class="' + extractClasses(token) + '">'
          : '</div>';
      },
    });
};

module.exports = engine;
