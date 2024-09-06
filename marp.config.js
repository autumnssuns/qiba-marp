// marp.config.js
const engine = require('./engine');
let localConfig = {
  baseUrl: '/',
};
try {
  localConfig = require('./.local.config.js');
} catch (e) {}

module.exports = {
  allowLocalFiles: true,
  html: true,
  preview: true,
  themeSet: './themes',
  baseUrl: localConfig.baseUrl,
  engine: engine,
};
