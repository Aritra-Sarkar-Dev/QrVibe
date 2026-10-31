import dotenv from 'dotenv';
dotenv.config({ override: true });

async function testImgBB() {
  const apiKey = 'eed37548227dd2a48c40ce9fdd7381e4';
  console.log('Testing with API Key:', apiKey);

  const tinyPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const params = new URLSearchParams();
  params.append('image', tinyPngBase64);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
    body: params,
  });

  const data = await res.json();
  console.log('ImgBB response status:', res.status);
  console.log('ImgBB response data:', data);
}

testImgBB().catch(console.error);
