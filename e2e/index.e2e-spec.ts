import { Browser, Page } from 'puppeteer';

const puppeteer = require('puppeteer');
const path = require('path');

describe('File upload test', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false });
        page = await browser.newPage();
        // Load the HTML containing the editor
        await page.goto('file://' + path.join(__dirname, 'src', 'index.html'));
    }, 20000);

    afterAll(async () => {
        await browser.close();
    });

    it('should upload the file and create an img element', async () => {
        // Click the element with class ck-file-dialog-button
        await page.click('.ck-file-dialog-button');

        // Set up an input event listener to intercept the file selection
        await page.evaluate(() => {
            const inputElement = document.querySelector('input[type="file"]');
            inputElement?.addEventListener('input', (event) => {
                // Simulate a change event after setting the file
                const changeEvent = new Event('change');
                inputElement.dispatchEvent(changeEvent);
            });
        });

        // Inject the test.png file and simulate a file selection event
        const inputElement = await page.$('input[type="file"]');
        const testImagePath = path.join(__dirname, 'test.png');
        await inputElement?.uploadFile(testImagePath);

        // Wait for the img element to be created with the expected src attribute
        await page.waitForSelector('img[src="https://example.com/image.png"]', {
            timeout: 5000
        });

        // Check if the img element is present in the page
        const imgElement = await page.$('img[src="https://example.com/image.png"]');
        expect(imgElement).toBeTruthy();
    });
});
