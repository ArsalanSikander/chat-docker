const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().addArguments(`--webdriver.chrome.driver=/usr/bin/chromedriver-linux64/chromedriver.exe`).addArguments('--headless'))
    .build();


async function getPage(link) {
    await driver.get(link);
    return true;
}

async function waitForTitle(result) {
    if (result) {
        await driver.wait(until.titleIs("React App"), 50000);
        return true;
    }
}

async function checkTitle(result) {
    if (result) {
        await driver.getTitle().then(title => {

            if (title === 'React App') {
                console.log("Test 1 - Page Load: Test Passed!")
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

        const r1 = await getPage('http://localhost:80');
        const r2 = await waitForTitle(r1);
        const r3 = await checkTitle(r2);

    }
    finally {
        await driver.quit();
    }
}

example();
