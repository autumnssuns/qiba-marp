function replaceAttr(token, attrName, replace, env) {
  token.attrs.forEach(function (attr) {
    if (attr[0] === attrName) {
      attr[1] = replace(attr[1], env, token);
    }
  });
}

function replaceNodes(nodes, replace, env, token) {
  if (!nodes) return;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.attribs) {
      if (node.name === 'img' && node.attribs.src) {
        node.attribs.src = replace(node.attribs.src, env, token, node);
      }
      if (node.name === 'a' && node.attribs.href) {
        node.attribs.href = replace(node.attribs.href, env, token, node);
      }
      if (node.name === 'script' && node.attribs.src) {
        node.attribs.src = replace(node.attribs.src, env, token, node);
      }
    }
    replaceNodes(node.children, replace, env, token);
  }
}

function replaceHTML(token, replace, env) {
  const htmlparser = require('htmlparser2');
  const serializer = require('dom-serializer');
  const dom = new htmlparser.parseDocument(token.content, {
    recognizeCDATA: true,
    recognizeSelfClosing: true,
  });
  replaceNodes(dom.children, replace, env, token);

  console.log('before\t', token.content);
  let result = serializer.render(dom);

  // If the original is a closing tag, keep it
  if (token.content.trim().startsWith('</')) {
    result = token.content;
  }
  // If the original does not have a closing tag, remove the closing tag from result
  if (!token.content.trim().includes('</')) {
    result = result.replace(/<\/[a-zA]+>/, '');
  }

  token.content = result;
  console.log('after\t', token.content);
}

const plugin = function (md, opts) {
  md.core.ruler.after('inline', 'replace-link', function (state) {
    let replace;

    if (
      md.options.replaceLink &&
      typeof md.options.replaceLink === 'function'
    ) {
      // Use markdown options (default so far)
      replace = md.options.replaceLink;
    } else if (
      opts &&
      opts.replaceLink &&
      typeof opts.replaceLink === 'function'
    ) {
      // Alternatively use plugin options provided upon .use(..)
      replace = opts.replaceLink;
    } else {
      return false;
    }

    const html = (opts && opts.processHTML) || false;

    if (typeof replace === 'function') {
      state.tokens.forEach(function (blockToken) {
        if (html && blockToken.type === 'html_block') {
          replaceHTML(blockToken, replace, state.env);
        }
        if (blockToken.type === 'inline' && blockToken.children) {
          blockToken.children.forEach(function (token) {
            const type = token.type;
            if (html && type === 'html_inline') {
              replaceHTML(token, replace, state.env);
            }
            if (type === 'link_open') {
              replaceAttr(token, 'href', replace, state.env);
            } else if (type === 'image') {
              replaceAttr(token, 'src', replace, state.env);
            }
          });
        }
      });
    }
    return false;
  });
};

// // Test the plugin
// const markdownIt = require('markdown-it');
// const BASE_URL = '/base/';

// function prependLinkWithBaseUrl(link, env, token, htmlToken) {
//   console.log(link);
//   // If link does not start with a . or /, prepend the base URL
//   if (!link.startsWith('.') && !link.startsWith('/')) {
//     console.log('prependLinkWithBaseUrl', BASE_URL, link);
//     return BASE_URL + link;
//   }
//   return link;
// }

// const md = markdownIt().use(plugin, {
//   processHTML: true,
//   replaceLink: prependLinkWithBaseUrl,
// });

// const input = `
// <div>
// <script src="src.js"></script>
// </div>
// `;

// const result = md.render(input);
// console.log(decodeURI(result));

module.exports = plugin;
