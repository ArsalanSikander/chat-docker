const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments(`--webdriver.chrome.driver=E:/newDownloads/chromedriver-win64/chromedriver-win64/chromedriver.exe`))
    .build();


async function getPage(link) {
    await driver.get(link);
    return true;
}

async function waitForTitle(result) {
    if (result) {
        await driver.wait(until.titleIs("React App"), 10000);
        return true;
    }
}

async function checkTitle(result) {
    if (result) {
        await driver.getTitle().then(title => {

            if (title === 'React App') {
                console.log("Test Passed!")
            } else {
                console.log("Test Failed! Title was <" + title + ">");
            }
        });
        return true;
    }
}

async function example() {
    // Set the path to the ChromeDriver executable


    try {

        const r1 = await getPage('http://localhost:3000/login');
        const r2 = await waitForTitle(r1);
        const r3 = await checkTitle(r2);

    }
    finally {
        await driver.quit();
    }
}

example();