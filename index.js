const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/42saopaulo/');
    
    //await page.screenshot({path: '42sp.png'});
   const listImages = await page.evaluate(()=>{
           //toda essa funçao será executada no browser
        const nodeList = document.querySelectorAll('article img')
        const imageArray = [...nodeList]
        const imgList = imageArray.map(img => ({
            src: img.src
        }))
        return imgList

    })

    //escrever os dados recebidos em um arquivo local
    fs.writeFile('instagram42.json', JSON.stringify(listImages, null, 2 ), err => {
        if(err) throw new Error('algo deu errado')
        console.log('Deu certo')
    })
})(); 