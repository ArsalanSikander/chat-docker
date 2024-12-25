const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function example() {
    // Set the path to the ChromeDriver executable
    const driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().addArguments(`--webdriver.chrome.driver=E:/newDownloads/chromedriver-win64/chromedriver-win64/chromedriver.exe`).addArguments('--headless'))
        .build();

    try {
        await driver.get('http:/www.pCloudy.com').then(async function () {
            await driver.getTitle().then(title => {

                if (title.localeCompare("Mobile App Testing, Continuous Testing Cloud, Mobile Testing Tools | pCloudy")) {
                    console.log("Test Passed!")
                } else {
                    console.log("Test Failed!")
                }
            })
        });
    } finally {
        await driver.quit();
    }
}

example();

// test cases i can make
// 1. page loads on app launch
// 2. Login occurs on entering correct credentials 
// 3. 