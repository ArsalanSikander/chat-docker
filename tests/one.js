const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

let chromeDriverLocation = 'E:/newDownloads/chromedriver-win64/chromedriver-win64/chromedriver.exe'

let ubuntuDriverLocation = '/usr/bin/chromedriver-linux64/chromedriver.exe';

const driver = new Builder()
    .forBrowser('chrome')
    // .setChromeOptions(new chrome.Options().addArguments(`--webdriver.chrome.driver=${chromeDriverLocation}`))
    .setChromeOptions(new chrome.Options().addArguments(`--webdriver.chrome.driver=${ubuntuDriverLocation}`).addArguments('--headless'))
    .build();

let waitTime = 1000;
let visTime = 10000;

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

async function checkForm(result) {
    if (result) {
        try {
            let element = await driver.findElement(By.id('loginForm'));
            if (element != null) {
                console.log("Test 2 - Login Form Present: Test Passed!");
            }
            return true;
        }
        catch (error) {
            console.log("Test 2 Failed!");
            return false;
        }
    }
}

async function disappearedToastify() {
    try {
        let elem = await driver.findElement(By.css('.Toastify .Toastify__toast-container'));

        while (elem != null) {
            await driver.manage().setTimeouts({ implicit: 1000 });
            try {
                elem = await driver.findElement(By.css('.Toastify .Toastify__toast-container'));
            }
            catch (err) {
                return true;
            }
        }
        return false;
    }
    catch (err) {
        return false;
    }
}

async function checkInvalidLogin(result) {
    if (result) {
        try {
            // click on the login button with 
            let loginSubmitButton = await driver.findElement(By.css('button[type="submit"]'));
            await driver.wait(until.elementIsVisible(loginSubmitButton), visTime);
            let clickResult = await loginSubmitButton.click();
            await driver.manage().setTimeouts({ implicit: waitTime });
            // check if error box appears 
            let elems = await driver.findElement(By.className('Toastify'));
            let insideElems = await elems.findElement(By.className('Toastify__toast-container'));
            if (insideElems == null) {
                console.log("Test 3 Failed!");
                return false;
            }

            // wait until the toastify container disappears
            let toastDisappear = await disappearedToastify();

            if (toastDisappear) {
                console.log("Test 3 - Invalid Login Check : Test Passed!");
                return true;
            }

        }
        catch (err) {
            console.log("Test 3 Failed! Err: " + err);
            return false;
        }
    }
}

async function checkRegisterPage(result) {
    if (result) {
        try {
            let createAccountBtn = await driver.findElement(By.css('a[href="/register"]'));
            await driver.wait(until.elementIsVisible(createAccountBtn), visTime);
            let clickResult = createAccountBtn.click();
            await driver.manage().setTimeouts({ implicit: waitTime });
            // now look for a username input
            let inputUsername = await driver.findElement(By.css('input[name="username"]'));
            if (inputUsername != null) {
                console.log("Test 4 - Register Page Check : Test Passed!");
                return true;
            }
            return false;
        }
        catch (err) {
            console.log("Test 4 Failed!");
            return false;
        }
    }
}

async function loginPageFromRegister(result) {
    try {
        let loginButton = await driver.findElement(By.css('a[href="/login"]'));
        console.log("Waiting for login to be clickable...");
        await driver.wait(until.elementIsVisible(loginButton), visTime);
        await driver.wait(until.elementIsEnabled(loginButton), 1000)
        console.log("Can click the login link now!");
        let clickResult = await loginButton.click();
        await driver.manage().setTimeouts({ implicit: waitTime });

        let loginSubmitButton = await driver.findElement(By.css('button[type="submit"]'));
        if (loginSubmitButton != null) {
            console.log("Test 5 - Login Page from Register Page : Test Passed!");
            return true;
        }
        console.log("Test 5 Failed!");
        return false;
    }
    catch (err) {
        console.log("Test 5 : Err: " + err);
        return false;
    }
}

async function loginAsTempUser(result) {
    if (result) {
        try {
            let usernameField = await driver.findElement(By.css('input[name="username"]'));
            await usernameField.sendKeys('tempUser');
            let passwordField = await driver.findElement(By.css('input[name="password"]'));
            await passwordField.sendKeys('temp1234');
            let submitButton = await driver.findElement(By.css('button[type="submit"]'));
            await driver.wait(until.elementIsVisible(submitButton), visTime);
            await submitButton.click();
            // check if the chat page has arrived
            await driver.manage().setTimeouts({ implicit: waitTime });
            let h1Element = driver.findElement(By.css('h1'));
            if (h1Element != null) {
                console.log('Test 6 - Login as TempUser : Test Passed!');
                return true;
            }
            console.log("Test 6 Failed!");
            return false;
        }
        catch (err) {
            console.log("Test 6 Failed - Err: " + err);
            return false;
        }
    }
    console.log("Test 6 Failed!");
    return false;
}

async function showAChat(result) {
    if (result) {
        try {

            let firstChat = await driver.findElement(By.className("contact"));
            await driver.wait(until.elementIsVisible(firstChat), visTime);
            await firstChat.click();
            await driver.manage().setTimeouts({ implicit: waitTime });
            let chatMessagesBox = await driver.findElement(By.className('chat-messages'));
            if (chatMessagesBox != null) {
                console.log("Test 7 - Open a Chat : Test Passed!");
                return true;
            }
            console.log('Test 7 Failed!');
            return false;
        }
        catch (err) {
            console.log('Test 7 Failed! Err: ' + err);
            return false;
        }
    }
    console.log("Test 7 Failed!");
    return false;
}

async function sendMessage(result) {
    if (result) {
        try {
            let messageContent = 'Test Message to the first friend on my list!';
            let messageField = await driver.findElement(By.css('.input-container input'));
            await messageField.sendKeys(messageContent);
            let sendButton = await driver.findElement(By.css('.input-container button'));
            await driver.wait(until.elementIsVisible(sendButton), visTime);
            await sendButton.click();
            await driver.manage().setTimeouts({ implicit: waitTime });
            // confirm if message has been sent
            let sentMessages = await driver.findElements(By.css('.sended .content p'));
            let latestMessage = sentMessages[sentMessages.length - 1];
            if (await latestMessage.getText() === messageContent) {
                console.log("Test 8 - Send a Message : Test Passed!");
                return true;
            }
            console.log("Test 8 Failed!");
            return false;
        }
        catch (err) {
            console.log('Test 8 Failed! Err: ' + err);
            return false;
        }
    }
    console.log('Test 8 Failed!');
    return false;
}

async function switchChat(result) {
    if (result) {
        try {
            let chats = await driver.findElements(By.className('contact'));
            let otherChat = chats[chats.length - 1];
            if (otherChat != null) {
                await driver.wait(until.elementIsVisible(otherChat), visTime);
                await otherChat.click();
                console.log('Test 9 - Switch Chat : Test Passed!');
                return true;
            }
            console.log("Test 9 Failed!");
            return false;

        }
        catch (err) {
            console.log('Test 9 Failed! Err: ' + err);
            return false;
        }
    }
    console.log("Test 9 Failed!");
    return false;
}

async function logout(result) {
    if (result) {
        try {
            let loginButton = await driver.findElement(By.className('sc-eqUAAy'));
            await driver.wait(until.elementIsVisible(loginButton), visTime);
            await loginButton.click();
            await driver.manage().setTimeouts({ implicit: waitTime });
            let loginUsernameInput = await driver.findElement(By.css('input[name="username"]'));
            if (loginUsernameInput != null) {
                console.log("Test 10 - Logout : Test Passed!");
                return true;
            }
            console.log('Test 10 Failed!');
            return false;
        }
        catch (err) {
            console.log('Test 10 Failed! Err: ' + err);
            return false;
        }
    }
    console.log("Test 10 Failed!");
    return false;
}



async function beginTesting() {
    // Set the path to the ChromeDriver executable


    try {

        // calling async functions which are tests sequentially

        // test 1
        const r1 = await getPage('http://localhost:80');
        const r2 = await waitForTitle(r1);
        const r3 = await checkTitle(r2);

        // test 2
        const r4 = await checkForm(r3);

        // test 3
        const r5 = await checkInvalidLogin(r4);

        // test 4
        const r6 = await checkRegisterPage(r5);

        // test 5
        const r7 = await loginPageFromRegister(r6);

        // test 6
        const r8 = await loginAsTempUser(r7);

        // test 7
        const r9 = await showAChat(r8);

        // test 8
        const r10 = await sendMessage(r9);

        // test 9
        const r11 = await switchChat(r10);

        // test 10
        const r12 = await logout(r11);

        // notes, one is the logout function
        // then there is see chat and send message

    }
    finally {
        await driver.quit();
    }
}

beginTesting();
