async function verifyRelease(version) {
  const base = `http://192.168.20.232:8123/local/witmind-ui/releases/${version}`;
  const htmlRes = await fetch(`${base}/index.html?t=${Date.now()}`);
  console.log(`index.html status: ${htmlRes.status}`);
  if (htmlRes.status !== 200) throw new Error(`index.html failed: ${htmlRes.status}`);
  const html = await htmlRes.text();
  const scriptMatch = html.match(/src=["']([^"']+)["']/);
  const cssMatch = html.match(/href=["']([^"']+)["']/);
  console.log('Script match:', scriptMatch ? scriptMatch[1] : 'none');
  console.log('CSS match:', cssMatch ? cssMatch[1] : 'none');

  if (scriptMatch) {
    const raw = scriptMatch[1];
    const sUrl = raw.startsWith('./') ? `${base}/${raw.slice(2)}` : (raw.startsWith('/') ? `http://192.168.20.232:8123${raw}` : `${base}/${raw}`);
    const sRes = await fetch(`${sUrl}?t=${Date.now()}`);
    console.log(`Script status (${sUrl}):`, sRes.status);
    if (sRes.status !== 200) throw new Error(`script failed: ${sRes.status}`);
  }
  if (cssMatch) {
    const raw = cssMatch[1];
    const cUrl = raw.startsWith('./') ? `${base}/${raw.slice(2)}` : (raw.startsWith('/') ? `http://192.168.20.232:8123${raw}` : `${base}/${raw}`);
    const cRes = await fetch(`${cUrl}?t=${Date.now()}`);
    console.log(`CSS status (${cUrl}):`, cRes.status);
    if (cRes.status !== 200) throw new Error(`css failed: ${cRes.status}`);
  }
  console.log(`✅ All release ${version} assets verified HTTP 200 OK!`);
}

const version = process.argv[2] || "0.7.3";
verifyRelease(version).catch((err) => {
  console.error(err);
  process.exit(1);
});
