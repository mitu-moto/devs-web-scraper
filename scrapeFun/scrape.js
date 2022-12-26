const puppeteer = require('puppeteer');
const fs = require('fs');
const data = {
    list: []
};

async function main(skill) { 
    // launches chromium
    const browser = await puppeteer.launch({headless :false});
    // open new tab
    const page = await browser.newPage();
    // https://in.indeed.com/jobs?q=sde&l=Bengaluru%2C+Karnataka
    // https://in.indeed.com/jobs?q={ skill }&l=Bengaluru%2C+Karnataka
    // await page.goto(`https://in.indeed.com/jobs?q=${skill}&l=Bengaluru%2C+Karnataka`,{ 
    await page.goto(`https://in.indeed.com/m/jobs?q=${skill}&l=`,{ 
    timeout: 0,
    waitUntil: 'networkidle0'
});
    const jobData = await page.evaluate( async (data) =>{
        const items = document.querySelectorAll('td.resultsContent')
        items.forEach((item, index) =>{
            const title = item.querySelector('h2.jobTitle>a')?.innerText;
            const link = item.querySelector('h2.jobTitle>a')?.href;
            let salary = item.querySelector('div.metadata.salary-snippet-container> div')?.innerText;
            const compnyName = item.querySelector('span.companyName')?.innerText;

            if(salary === null){
                salary = 'not defined'
            }

            data.list.push({
                title,
                salary,
                compnyName,
                link,
            })
        })
        return data;
    }, data);

    let response = await jobData;
    let json = JSON.stringify(jobData,null, 2)
    fs.writefile('job.json', json, 'utf8', () =>{
        console.log('writeten in job.json');
    })
    browser.close();
    return response;

};

module.exports = main;
