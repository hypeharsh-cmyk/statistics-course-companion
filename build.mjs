#!/usr/bin/env node
/**
 * Assembles the book from book-src/ into public/index.html (the folder Cloudflare serves).
 *
 * The book is a plain concatenation of its parts, in PARTS order. Nothing is minified,
 * templated or transformed -- what you read in book-src/ is exactly what ships, which is
 * what makes the source files individually editable.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const SRC = join(root, 'book-src');
const MOCK = join(root, 'mock-src');
const OUT = join(root, 'public');
const STATIC = join(root, 'static');

const PARTS = [
  '00-head.html',
  'ch1.html',
  'ch2.html',
  'ch3.html',
  'ch4.html',
  'ch5.html',
  '99-tail.html',
];

// Mock papers are DISCOVERED, not listed: drop a paper4.html / paper9.html into mock-src/ and it
// is picked up automatically, in numeric order. The tab strip and the scoring logic both build
// themselves from whatever papers are present, so adding one takes no code change anywhere.
function mockParts() {
  const papers = readdirSync(MOCK)
    .filter((f) => /^paper\d+\.html$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  if (!papers.length) {
    console.error('build failed: mock-src/ contains no paperN.html files');
    process.exit(1);
  }
  return ['00-head.html', ...papers, '99-tail.html'];
}

function assemble(dir, parts, label) {
  const missing = parts.filter((p) => !existsSync(join(dir, p)));
  if (missing.length) {
    console.error(`build failed: missing ${label} part(s): ${missing.join(', ')}`);
    process.exit(1);
  }
  return parts.map((p) => readFileSync(join(dir, p), 'utf8')).join('');
}

const html = assemble(SRC, PARTS, 'book-src');

mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, 'index.html'), html);

// The mock papers reuse the book's design system rather than carrying a second copy of it:
// the book's one <style> block is lifted out of 00-head.html and dropped in at the token.
// A missing token means the pages have silently drifted apart, so fail loudly instead.
if (existsSync(MOCK)) {
  const styleMatch = readFileSync(join(SRC, '00-head.html'), 'utf8').match(/<style>[\s\S]*?<\/style>/);
  if (!styleMatch) {
    console.error('build failed: no <style> block found in book-src/00-head.html to share');
    process.exit(1);
  }
  const MOCK_PARTS = mockParts();
  let mockHtml = assemble(MOCK, MOCK_PARTS, 'mock-src');
  if (!mockHtml.includes('@@BOOK_STYLE@@')) {
    console.error('build failed: mock-src is missing the @@BOOK_STYLE@@ token');
    process.exit(1);
  }
  mockHtml = mockHtml.replace('@@BOOK_STYLE@@', styleMatch[0]);
  writeFileSync(join(OUT, 'mock-tests.html'), mockHtml);
  const mkb = (Buffer.byteLength(mockHtml, 'utf8') / 1024).toFixed(1);
  console.log(`built public/mock-tests.html  ${mkb} KB  from ${MOCK_PARTS.length} parts`);
}

// Everything in static/ is copied verbatim into the deploy folder: _headers, 404.html,
// robots.txt, favicon.svg. Keeping them out of public/ means public/ is pure build output
// and can be deleted and regenerated at any time.
let copied = 0;
if (existsSync(STATIC)) {
  for (const name of readdirSync(STATIC)) {
    copyFileSync(join(STATIC, name), join(OUT, name));
    copied++;
  }
}

const kb = (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1);
console.log(`built public/index.html  ${kb} KB  from ${PARTS.length} parts`);
console.log(`copied ${copied} static file(s) into public/`);

// Drift check. statistics-book.html is the standalone single-file copy kept at the repo root
// for offline reading and emailing. It is never overwritten by the build -- if it has fallen
// out of step with book-src/, say so rather than silently shipping two different books.
const standalone = join(root, 'statistics-book.html');
if (existsSync(standalone)) {
  if (readFileSync(standalone, 'utf8') !== html) {
    console.warn(
      '\nnote: statistics-book.html differs from this build.\n' +
        '      Run `npm run sync` to refresh it from book-src/, or ignore if you meant it to lag.'
    );
  }
}
