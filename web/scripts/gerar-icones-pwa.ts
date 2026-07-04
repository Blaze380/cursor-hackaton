import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import sharp from 'sharp';

const root = join(import.meta.dirname, '..');
const svg = readFileSync(join(root, 'public/icons/icon.svg'));

async function main() {
  await sharp(svg).resize(192, 192).png().toFile(join(root, 'public/icons/icon-192.png'));
  await sharp(svg).resize(512, 512).png().toFile(join(root, 'public/icons/icon-512.png'));
  console.log('Ícones PWA gerados em public/icons/');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
