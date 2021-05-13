require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');

function filtraVideos(){
  let rawdata = fs.readFileSync('estadao.json');
  let medias = JSON.parse(rawdata).reels_media[0].items;

  let saida = [];
  medias.forEach(item => {
    if(item.video_versions){
      saida.push({
        videoUrl : item.video_versions[0].url,
        storyDuration: item.video_duration,
        mediaType: 0
      })
    }
  });
  return saida
}

function escreveJsonVideos(saida){
  let data = JSON.stringify(saida, null, 2);

  fs.writeFile('videos.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: [ '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36', '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding' ] });
  //const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('https://instagram.com/accounts/login');

  // Aguarda o input de usuário para preencher
  await page.waitForSelector('[name="username"]');
  
  // Digita os dados nos inputs
  await page.type('[name="username"]', process.env.INSTAGRAM_EMAIL);
  await page.type('[name="password"]', process.env.INSTAGRAM_PASSWORD);

  await page.waitForTimeout(1000);

  // Clica no botão submit
  await page.click('[type="submit"]');

  await page.waitForTimeout(1000);

  page.on('response', async response => {
    if(response.url() === 'https://i.instagram.com/api/v1/feed/reels_media/?reel_ids=23456103'){
      await fs.writeFile('estadao.json', JSON.stringify(await response.json(), null, 2), err => {
        if(err) throw new Error(err);


        console.log('JSON file generated successfully!');
      });

      await browser.close();

      let saida  = filtraVideos();
      escreveJsonVideos(saida);
    }
  });

  await page.waitForTimeout(1000);

  await page.goto('https://instagram.com/stories/estadao');
})();
