import fs from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
const data=JSON.parse(await fs.readFile(path.join(root,'docs/research/blog/source-catalog.json'),'utf8'));
const manifest=data.map(a=>({slug:a.slug,url:a.cover,path:'/sites/uniride/blog/'+a.slug+'.png'}));
await fs.writeFile(path.join(root,'docs/research/blog/cover-manifest.json'),JSON.stringify(manifest,null,2));
console.log('docs/research/blog/cover-manifest.json: '+manifest.length+' covers');
