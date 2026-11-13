import fs from 'fs';

const HOST = 'tips.ojapp.app';
const KEY = '10d8857828214422863fa28e790e4ca9';

async function notifyIndexNow() {
  // 1. 生成されたばかりの dist/sitemap.xml を読み込む
  const sitemapPath = './dist/sitemap.xml';
  if (!fs.existsSync(sitemapPath)) {
    console.log('Sitemap not found in dist.');
    return;
  }
  
  const xml = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  
  if (urls.length === 0) return;

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);

  // 2. IndexNow APIへPOST
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  console.log(`IndexNow status: ${res.status}`);
}

notifyIndexNow();