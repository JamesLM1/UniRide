import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const manifest=JSON.parse(await fs.readFile(path.join(root,'docs/research/blog/cover-manifest.json'),'utf8'));
let mapping={};try{mapping=JSON.parse(await fs.readFile(path.join(root,'docs/research/blog/image-map.json'),'utf8'));}catch{}
for(const cover of manifest){try{await fs.access(path.join(root,'public',cover.path));mapping[cover.url]=cover.path;}catch{}}
await fs.writeFile(path.join(root,'docs/research/blog/image-map.json'),JSON.stringify(mapping,null,2));
await import('./sync-blogger-articles.mjs');
