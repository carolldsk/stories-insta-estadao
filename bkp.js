
  /* await page.evaluate(() => new Promise((resolve) => {
    var scrollTop = -1;
    const interval = setInterval(() => {
      window.scrollBy(0, 15000);
      if(document.documentElement.scrollTop !== scrollTop) {
        scrollTop = document.documentElement.scrollTop;
        return;
      }
      clearInterval(interval);
      resolve();
    }, 1000);
  })); */

  

  const imgList = await page.evaluate(() => {
    // Pegar as imagens que estão no perfil
    const nodeList = document.querySelectorAll('article img');

    // Converter a lista para um array
    const imgArray = [...nodeList];

    // Converter os elementos para objetos js
    const imgList = imgArray.map( ({src}) => ({src}));

    return imgList;
  });


const response = await page.waitForResponse(
  (response) =>
    response.url() === 'https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=23456103' && response.status() === 200
);
const response = await page.waitForResponse(async (response) => {
  return (await response.text());
});
return response.ok();
