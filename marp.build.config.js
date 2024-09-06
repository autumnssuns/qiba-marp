// marp.config.js
const engine = require('./engine');

let localConfig = {
  baseUrl: '/',
};
try {
  localConfig = require('./.local.config.js');
} catch (e) {}

const BASE_URL = process.env.BASE_URL || localConfig.baseUrl;
const markdownItReplaceLink = require('./plugins/markdown-it-replace-link');

function prependLinkWithBaseUrl(link, env, token, htmlToken) {
  console.log(link);
  // If link does not start with a . or /, prepend the base URL
  if (!link.startsWith('.') && !link.startsWith('/')) {
    console.log('prependLinkWithBaseUrl', BASE_URL, link);
    return BASE_URL + link;
  }
  return link;
}

module.exports = {
  allowLocalFiles: true,
  html: true,
  inputDir: 'src',
  output: 'build/slides',
  themeSet: './themes',
  engine: ({ marp }) => {
    marp = marp.use(markdownItReplaceLink, {
      processHTML: true,
      replaceLink: prependLinkWithBaseUrl,
    });
    return engine({ marp });
  },
};
