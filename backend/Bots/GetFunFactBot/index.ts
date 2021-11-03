import puppeteer from 'puppeteer'

const RunBot = async () => {
    return `She was gifted in languages as a child and by the age of 11 she spoke Italian, French, Greek, Hebrew, Spanish, German and Latin.<span class="text-muted"><small> 
    (Scientists  &gt; Maria Gaetana Agnesi  )</small></span>`
    console.log("bot is alive")
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    page.goto("https://fungenerators.com/random/facts/")
    const dom: any = { element: null }
    const viewport = await page.viewport()

    const saveValue = () => {

    }

    await page.waitForTimeout(4000)
    const document: any =  {}
    const getText = await page.evaluate(() => {
        return new Promise((resolve) => {
            const h2 = document.querySelector("h2").innerHTML
            resolve(h2)
        })        
    })
    console.log(getText)
    // await browser.close()
}


export { RunBot }