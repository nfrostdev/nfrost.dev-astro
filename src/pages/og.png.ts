import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Load Onest from node_modules (woff — satori doesn't support woff2)
const fontBoldData  = readFileSync(resolve('node_modules/@fontsource/onest/files/onest-latin-700-normal.woff'));
const fontLightData = readFileSync(resolve('node_modules/@fontsource/onest/files/onest-latin-300-normal.woff'));

// NF monogram polygon points (from logo-white.svg, viewBox 0 0 800 492.3)
const NF_POINTS = '0,400 0,492.3 215.4,492.3 307.7,492.3 307.7,492.3 307.7,184.6 492.3,492.3 584.6,492.3 584.6,292.3 738.5,292.3 738.5,200 584.6,200 584.6,92.3 800,92.3 800,0 584.6,0 492.3,0 492.3,0 492.3,307.7 307.7,0 215.4,0 215.4,200 61.5,200 61.5,292.3 215.4,292.3 215.4,400';

export const GET: APIRoute = async () => {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          background: '#09090b',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'Onest',
        },
        children: [
          // Top: URL
          {
            type: 'div',
            props: {
              style: { display: 'flex', justifyContent: 'flex-end' },
              children: {
                type: 'div',
                props: {
                  style: { fontSize: '18px', fontWeight: 300, color: '#52525b', letterSpacing: '0.05em' },
                  children: 'nfrost.dev',
                },
              },
            },
          },

          // Center content
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '24px' },
              children: [
                // Large NF logo
                {
                  type: 'svg',
                  props: {
                    viewBox: '0 0 800 492.3',
                    width: '140',
                    height: '86',
                    children: {
                      type: 'polygon',
                      props: { fill: '#ffffff', points: NF_POINTS },
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '12px' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '16px',
                            fontWeight: 700,
                            color: '#71717a',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                          },
                          children: 'Nick Frost · Engineering Manager',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '42px',
                            fontWeight: 700,
                            color: '#f4f4f5',
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                            maxWidth: '800px',
                          },
                          children: 'Software should work for people, not vice versa.',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },

          // Bottom spacer
          { type: 'div', props: { style: { height: '1px' }, children: '' } },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Onest', data: fontBoldData,  weight: 700, style: 'normal' },
        { name: 'Onest', data: fontLightData, weight: 300, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
