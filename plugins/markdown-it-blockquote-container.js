const HINT_REGEXP = /^>(?:(?: {0,3})| {0,2}\t {0,1})\[!(.*)\]\s*(.*)$/i;

const openRender = (tokens, index) => {
  const token = tokens[index];
  return `<div class="blockquote-container ${token.markup}">\n`;
};

const closeRender = (tokens, index) => {
  return `</div>\n`;
};

const markdownItBlockquoteContainer = (
  md,
  {
    blockquoteContainerNames = ['card', 'box', 'callout'],
    defaultType = 'box',
    deep = true,
    titleRender,
  } = {}
) => {
  const containerRule = (state, startLine, endLine, silent) => {
    if (
      // if it's indented more than 3 spaces, it should be a code block
      state.sCount[startLine] - state.blkIndent >= 4 ||
      // check whether it's at first level
      (state.level !== 0 && !deep)
    )
      return false;

    const pos = state.bMarks[startLine] + state.tShift[startLine];
    const max = state.eMarks[startLine];

    // check the block quote marker
    if (state.src.charAt(pos) !== '>') return false;

    // check blockquoteContainer markers
    const match = HINT_REGEXP.exec(state.src.slice(pos, max));

    // Commented out because we want to allow any blockquoteContainer
    // if (!match || !blockquoteContainerNames.includes(match[1].toLowerCase()))
    //   return false;

    if (!match) return false;

    // we know that it's going to be a valid blockquoteContainer,
    // so no point trying to find the end of it in silent mode
    if (silent) return true;

    // Clean up the classes, default to the first type found
    let classes = match[1]?.toLowerCase();
    const matchedTypes = blockquoteContainerNames.filter((name) =>
      classes.split(' ').includes(name)
    );
    // If no types are matched, add the default type
    if (matchedTypes.length === 0) {
      classes = `${defaultType} ${classes}`;
    }
    // If there are multiple types, remove all but the first
    if (matchedTypes.length > 1) {
      const [, ...restTypes] = matchedTypes;
      for (const type of restTypes) {
        classes = classes.replace(type, '');
      }
    }

    const oldBMarks = [];
    const oldBSCount = [];
    const oldSCount = [];
    const oldTShift = [];
    const oldLineMax = state.lineMax;
    const oldParentType = state.parentType;
    const terminatorRules = state.md.block.ruler.getRules(
      'blockquote_container'
    );

    state.parentType = 'blockquote_container';

    // Search the end of the block
    //
    // Block ends with either:
    //  1. an empty line outside:
    //     ```
    //     > test
    //
    //     ```
    //  2. an empty line inside:
    //     ```
    //     >
    //     test
    //     ```
    //  3. another tag:
    //     ```
    //     > test
    //      - - -
    //     ```
    let nextLine;

    for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
      let adjustTab = false;
      let lastLineEmpty = false;
      let pos = state.bMarks[nextLine] + state.tShift[nextLine];
      const max = state.eMarks[nextLine];

      // check if it's outdented, i.e. it's inside list item and indented
      // less than said list item:
      //
      // ```
      // 1. anything
      //    > current blockquote
      // 2. checking this line
      // ```
      const isOutdented = state.sCount[nextLine] < state.blkIndent;

      if (pos >= max)
        // Case 1: line is not inside the blockquote, and this line is empty.
        break;

      if (state.src.charAt(pos++) === '>' && !isOutdented) {
        let spaceAfterMarker;
        // This line is inside the blockquote.

        // set offset past spaces and ">"
        let initial = state.sCount[nextLine] + 1;

        // skip one optional space after '>'
        if (state.src.charAt(pos) === ' ') {
          // ' >   test '
          //     ^ -- position start of line here:
          pos++;
          initial++;
          adjustTab = false;
          spaceAfterMarker = true;
        } else if (state.src.charAt(pos) === '\t') {
          spaceAfterMarker = true;

          if ((state.bsCount[nextLine] + initial) % 4 === 3) {
            // '  >\t  test '
            //       ^ -- position start of line here (tab has width===1)
            pos++;
            initial++;
            adjustTab = false;
          } else {
            // ' >\t  test '
            //    ^ -- position start of line here + shift bsCount slightly
            //         to make extra space appear
            adjustTab = true;
          }
        } else {
          spaceAfterMarker = false;
        }

        let offset = initial;

        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;

        while (pos < max) {
          const ch = state.src.charAt(pos);

          if (ch === '\t')
            offset +=
              4 -
              ((offset + state.bsCount[nextLine] + (adjustTab ? 1 : 0)) % 4);
          else if (ch === ' ') offset++;
          else break;

          pos++;
        }

        lastLineEmpty = pos >= max;

        oldBSCount.push(state.bsCount[nextLine]);
        state.bsCount[nextLine] =
          state.sCount[nextLine] + 1 + (spaceAfterMarker ? 1 : 0);

        oldSCount.push(state.sCount[nextLine]);
        state.sCount[nextLine] = offset - initial;

        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }

      // Case 2: line is not inside the blockquote, and the last line was empty.
      if (lastLineEmpty) break;

      // Case 3: another tag found.
      let terminate = false;

      for (const terminatorRule of terminatorRules)
        if (terminatorRule(state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }

      if (terminate) {
        // Quirk to enforce "hard termination mode" for paragraphs;
        // normally if you call `tokenize(state, startLine, nextLine)`,
        // paragraphs will look below nextLine for paragraph continuation,
        // but if blockquote is terminated by another tag, they shouldn't
        state.lineMax = nextLine;

        if (state.blkIndent !== 0) {
          // state.blkIndent was non-zero, we now set it to zero,
          // so we need to re-calculate all offsets to appear as
          // if indent wasn't changed
          oldBMarks.push(state.bMarks[nextLine]);
          oldBSCount.push(state.bsCount[nextLine]);
          oldTShift.push(state.tShift[nextLine]);
          oldSCount.push(state.sCount[nextLine]);
          state.sCount[nextLine] -= state.blkIndent;
        }

        break;
      }

      oldBMarks.push(state.bMarks[nextLine]);
      oldBSCount.push(state.bsCount[nextLine]);
      oldTShift.push(state.tShift[nextLine]);
      oldSCount.push(state.sCount[nextLine]);

      // A negative indentation means that this is a paragraph continuation
      //
      state.sCount[nextLine] = -1;
    }

    const oldIndent = state.blkIndent;

    state.blkIndent = 0;

    const titleLines = [startLine, startLine + 1];
    const contentLines = [startLine + 1, 0];

    const openToken = state.push('blockquote_container_open', 'div', 1);

    openToken.markup = classes;
    openToken.attrJoin('class', `blockquote-container ${classes}`);
    openToken.map = contentLines;

    // Title, if any
    if (match[2]) {
      const titleToken = state.push('blockquote_container_title', '', 0);

      titleToken.attrJoin('class', `blockquote-container-title`);
      titleToken.markup = classes;
      titleToken.content = match[2];
      titleToken.map = titleLines;
    }

    // Block body, if any
    if (nextLine !== startLine + 1) {
      const bodyOpenToken = state.push('blockquote_container_body', 'div', 1);

      state.md.block.tokenize(state, startLine + 1, nextLine);

      bodyOpenToken.attrJoin('class', `blockquote-container-body`);
      bodyOpenToken.markup = classes;
      bodyOpenToken.map = contentLines;

      const bodyCloseToken = state.push(
        'blockquote_container_body_close',
        'div',
        -1
      );
      bodyCloseToken.markup = classes;
    }

    const closeToken = state.push('blockquote_container_close', 'div', -1);

    closeToken.markup = classes;

    state.lineMax = oldLineMax;
    state.parentType = oldParentType;
    contentLines[1] = state.line;

    // Restore original tShift; this might not be necessary since the parser
    // has already been here, but just to make sure we can do that.
    for (let i = 0; i < oldTShift.length; i++) {
      state.bMarks[i + startLine] = oldBMarks[i];
      state.tShift[i + startLine] = oldTShift[i];
      state.sCount[i + startLine] = oldSCount[i];
      state.bsCount[i + startLine] = oldBSCount[i];
    }
    state.blkIndent = oldIndent;

    state.line++;
    return true;
  };

  md.block.ruler.before('blockquote', 'blockquote_container', containerRule, {
    alt: ['paragraph', 'reference', 'blockquote', 'list'],
  });

  if (openRender) md.renderer.rules['blockquote_container_open'] = openRender;
  if (closeRender)
    md.renderer.rules['blockquote_container_close'] = closeRender;

  md.renderer.rules['blockquote_container_title'] =
    titleRender ??
    ((tokens, index) => {
      const renderedContent = md.renderInline(tokens[index].content);
      return `<div class="blockquote-container-title">${renderedContent}</div>\n`;
    });
};

module.exports = markdownItBlockquoteContainer;

// Test the plugin

// const md = require('markdown-it')();
// const input = `> [!CARD WARNING] Card 1, empty body
// `;

// const output = md.use(markdownItBlockquoteContainer).render(input);
// console.log(output);
