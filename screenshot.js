const puppeteer = require('puppeteer');

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  await page.setViewport({
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  console.log('Page loaded, waiting for content...');
  await wait(2000);

  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Full page height: ${bodyHeight}px`);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: 'screenshot-full.png',
    fullPage: true
  });

  console.log('Full page screenshot saved as screenshot-full.png');

  const testSectionFound = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const testHeading = headings.find(h =>
      h.textContent.toLowerCase().includes('японский') ||
      h.textContent.toLowerCase().includes('тест')
    );

    if (testHeading) {
      testHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    return false;
  });

  if (testSectionFound) {
    console.log('Test section found, scrolling to it...');
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshot-test-section.png',
      fullPage: false
    });

    console.log('Test section screenshot saved as screenshot-test-section.png');
  } else {
    console.log('Test section not found, trying to scroll to bottom half...');

    await page.evaluate((height) => {
      window.scrollTo(0, height / 2);
    }, bodyHeight);

    await page.waitForTimeout(1000);

    await page.screenshot({
      path: 'screenshot-bottom-half.png',
      fullPage: false
    });

    console.log('Bottom half screenshot saved as screenshot-bottom-half.png');
  }

  console.log('Done! Closing browser...');
  await browser.close();
})();
