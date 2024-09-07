// .bundle.js should be executed after building the slides. It does the following:
// - Copy necessary folders to the build directory
// - Copy images to the build directory

const fs = require('fs');
const path = require('path');

const buildDir = 'build';
const slidesDir = 'build/slides';
const srcDir = 'src';

const foldersToCopy = ['assets', 'images', 'scripts', 'themes'];

// Copy folders to the build directory

foldersToCopy.forEach((folder) => {
  const src = path.join('.', folder);
  if (!fs.existsSync(src)) return;
  const dest = path.join(buildDir, folder);
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src).forEach((file) => {
    const filePath = path.join(src, file);
    const destPath = path.join(dest, file);
    fs.copyFileSync(filePath, destPath);
  });
});

// Copy all relative assets from src to build/slides, respecting the folder structure

// Get all relative assets from src

const relativeAssets = [];
const slides = [];

/**
 * An asset is a file that is not a markdown or html file.
 * @param {string} file - The file to check.
 */
function isAsset(file) {
  return !/\.(md|html)$/.test(file);
}

function isSlide(file) {
  return /\.md$/.test(file);
}

const getImages = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      return getImages(filePath);
    }
    if (isAsset(file)) {
      relativeAssets.push(filePath);
    }
    if (isSlide(file)) {
      slides.push(filePath);
    }
  });
};

getImages(srcDir);

// Copy images to build/slides

relativeAssets.forEach((asset) => {
  console.log('Copying: ', asset);
  const dest = path.join(slidesDir, path.relative(srcDir, asset));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(asset, dest);
});

function pathArrayToObj(paths) {
  const tree = {};
  paths.forEach((p) => {
    const parts = p.split(path.sep);
    let current = tree;
    parts.forEach((part) => {
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    });
  });
  return tree['src'];
}

class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
    this.parent = null;
  }

  addChild(node) {
    node.parent = this;
    this.children.push(node);
    node.setParent(this);
  }

  setParent(node) {
    this.parent = node;
  }
}

function buildTree(paths) {
  const root = new Node('src');
  const nodes = { src: root };
  paths.forEach((p) => {
    const parts = p.split(path.sep);
    let current = root;
    parts.forEach((part) => {
      if (!nodes[part]) {
        nodes[part] = new Node(part);
        current.addChild(nodes[part]);
      }
      current = nodes[part];
    });
  });
  return root;
}

function treeToHtml(tree, level = 0) {
  // let html = '';
  // Object.keys(tree).forEach((key) => {
  //   html += `<p>`;
  //   if (Object.keys(tree[key]).length > 0) {
  //     html += `<details open><summary>${key}</summary>`;
  //     html += `<div class="px-4">${treeToHtml(tree[key], level + 1)}</div>`;
  //     html += `</details>`;
  //   } else {
  //     html += `<a href="${path.join(
  //       'slides',
  //       ...Array(level).fill('..'),
  //       key
  //     )}">${key}</a>`;
  //   }
  //   html += '</p>';
  // });
  // return html;

  let html = '';
  tree.children.forEach((child) => {
    html += `<p>`;
    if (child.children.length > 0) {
      html += `<details open class="group">
        <summary class="group flex items-center cursor-pointer">
          <span class="group-open:hidden mr-4">
            <i class="bi bi-caret-right"></i>
          </span>
          <span class="hidden group-open:inline mr-4">
            <i class="bi bi-caret-down"></i>
          </span>
          ${child.value}
        </summary>`;
      html += `<div class="pl-8">${treeToHtml(child, level + 1)}</div>`;
      html += `</details>`;
    } else {
      let pathToLeaf = [];
      let current = child;
      while (current) {
        if (current.value === 'src') break;
        if (current.value.endsWith('.md')) {
          current.value = current.value.replace('.md', '');
        }
        pathToLeaf.push(current.value);
        current = current.parent;
      }
      const slideRelativePath =
        path.join('slides', ...pathToLeaf.reverse()) + '.html';
      const uriEncoded = encodeURI(slideRelativePath);
      html += `<div class="flex items-center hover:text-white hover:bg-primary p-2 rounded-md">
        <i class="bi bi-file-earmark-slides mr-2"></i>`;
      html += `<div class='w-full flex justify-between'>`;
      html += `<span
        class="cursor-pointer"
        onclick="togglePreview('${uriEncoded}')" 
      >${child.value}</span>`;
      html += `<a class="text-inherit"
      href="${slideRelativePath}">
      <i class="bi bi-arrow-up-right-square"></i></a>`;
      html += `</div>`;
      html += `</div>`;
    }
    html += '</p>';
  });
  return html;
}

console.log(buildTree(slides));

// Create an index.html file in the build to list all the slides
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slides Index</title>
    <link rel="stylesheet" href="themes/index.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" integrity="sha384-4LISF5TTJX/fLmGSxO53rV4miRxdg84mZsxmO8Rx5jGtp/LbrixFETvWa5a6sESd" crossorigin="anonymous">
    <script>
      function togglePreview(url) {
        const preview = document.getElementById('preview');
        // Decode the URL and set it as the src of the iframe
        const decoded = decodeURI(url);
        console.log(decoded);
        preview.src = decoded;
      }
    </script>
  </head>
  <body class="p-8">
    <h1>Slides Index</h1>
    <div class='flex flex-row gap-20 text-nowrap'>
      <div class='leading-relaxed flex-1'>
        ${treeToHtml(buildTree(slides))}
      </div>
      <div class="w-full">
        <iframe id="preview" src="slides/demo/components.html" class="shadow w-full max-w-lg" style="aspect-ratio: 16/9;">
        </iframe>
      </div>
    </div>
  </body>
</html>`;
fs.writeFileSync(path.join(buildDir, 'index.html'), html);
