/**
 * Builds public/og.png — the image every share of this site renders.
 *
 * Why a script rather than a hand-drawn file: the image is made OUT OF THE BRAND
 * TOKENS. The ground, the mark's indigo and the two text colours are read from
 * src/styles/tokens.css at build time, so an OG card cannot quietly keep a colour
 * the site has moved on from. If a token changes, re-run this and the card
 * follows.
 *
 * The type is IBM Plex, loaded from the same pinned @fontsource package the site
 * itself serves — one source of font truth. Satori converts the glyphs to paths,
 * so the PNG needs no font installed anywhere to render correctly.
 *
 * WHAT MAY APPEAR ON THIS IMAGE. CLAIMS.md governs pictures too: the mark, the
 * wordmark, and the tagline. No feature claims, no counts, no screenshots of a
 * console, no "now with". An image is the one surface where a claim travels
 * without its receipt, so it carries none.
 *
 *   node scripts/build-og.mjs
 *
 * Outputs public/og.svg (the source, readable in a diff) and public/og.png (what
 * the tags point at). Both are committed.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Read a token's value out of the stylesheet's bare :root block. */
function token(name) {
  const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');
  // The header comment mentions @media above the block, so search from :root
  // rather than from the top of the file.
  const start = css.indexOf(':root {');
  const rootBlock = css.slice(start, css.indexOf('@media', start));
  const m = rootBlock.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`token --${name} not found in tokens.css`);
  return m[1].trim();
}

/** The dark theme's ground, read from the explicit-dark block. */
function darkToken(name) {
  const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8');
  const block = css.slice(css.indexOf(':root[data-theme="dark"] {'));
  const m = block.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`dark token --${name} not found in tokens.css`);
  return m[1].trim();
}

const ground = darkToken('ground');      // #12151b — the console's dark base
const ink = darkToken('ink');
const muted = darkToken('muted');
const faintLine = darkToken('faint-line');
const logoGround = token('logo-ground'); // the mark keeps its own indigo in both themes

const mark = readFileSync(join(root, 'public/logo.png'));
const markURI = `data:image/png;base64,${mark.toString('base64')}`;

const font = (pkg, file) =>
  readFileSync(join(root, 'node_modules/@fontsource', pkg, 'files', file));

const svg = await satori(
  {
    type: 'div',
    props: {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: ground,
        // Left padding is 305, not 80, and the number is a CROP CONSTRAINT rather
        // than a taste choice. Some share surfaces crop an OG card toward a
        // centred square, which on a 1200x630 canvas keeps roughly x 285-915. At
        // 80 the mark fell entirely outside that window and the wordmark lost its
        // leading edge — the card survived as a tagline with no brand on it. The
        // group now starts inside the crop window; the right-hand breathing room
        // stays, so the full card still reads left-aligned.
        paddingTop: 80,
        paddingRight: 80,
        paddingBottom: 80,
        paddingLeft: 305,
        fontFamily: 'IBM Plex Sans',
      },
      children: [
        {
          type: 'div',
          props: {
            style: { display: 'flex', alignItems: 'center', gap: 28 },
            children: [
              {
                type: 'img',
                props: {
                  src: markURI,
                  width: 132,
                  height: 132,
                  style: { borderRadius: 30, background: logoGround, objectFit: 'cover' },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 84,
                    fontWeight: 500,
                    letterSpacing: '-0.04em',
                    color: ink,
                  },
                  children: 'mngd',
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column', gap: 26, marginTop: 44 },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', width: 96, height: 2, background: faintLine },
                  children: [],
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    // 47, not 52: at 52 the tagline ran past x 915 and the centred
                    // square crop ate its last letter. A clipped word reads as a
                    // broken image rather than as a deliberate crop.
                    fontSize: 47,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: muted,
                  },
                  children: 'Apple MDM for the DDM era',
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'IBM Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'IBM Plex Sans', data: font('ibm-plex-sans', 'ibm-plex-sans-latin-600-normal.woff'), weight: 600, style: 'normal' },
      { name: 'IBM Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff'), weight: 400, style: 'normal' },
      { name: 'IBM Plex Mono', data: font('ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff'), weight: 500, style: 'normal' },
    ],
  }
);

writeFileSync(join(root, 'public/og.svg'), svg);

const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
writeFileSync(join(root, 'public/og.png'), png);

/**
 * The crop check, kept as an artifact rather than as a memory.
 *
 * docs/og-crop-preview.png is the centred 1:1 crop — what a share surface that
 * squares the card actually shows. It is regenerated with the card so the two
 * cannot drift, and it is the second thing David approves, because both are
 * faces the brand wears.
 *
 * sips is macOS-only and this is a review artifact, not a build output: if it is
 * unavailable the card is still written and only the preview is skipped.
 */
try {
  execFileSync('sips', [
    '-c', '630', '630',
    '--out', join(root, 'docs/og-crop-preview.png'),
    join(root, 'public/og.png'),
  ], { stdio: 'ignore' });
  console.log('docs/og-crop-preview.png written — centred 1:1 crop (x 285-915)');
} catch {
  console.log('crop preview skipped (sips unavailable) — card itself is unaffected');
}

console.log(`og.png written — 1200x630, ground ${ground}, mark ${logoGround}, ${png.length} bytes`);
