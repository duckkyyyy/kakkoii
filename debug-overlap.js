const page = document.querySelector('[class*="page"]');
const test = document.querySelector('[class*="test_"]');
const sectionTitles = document.querySelectorAll('[class*="sectionTitle_"]');
const kai = document.querySelector('[class*="kai_"]');

const info = {
  viewport: {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollY: window.scrollY,
  },
  page: page ? {
    top: page.getBoundingClientRect().top + window.scrollY,
    bottom: page.getBoundingClientRect().bottom + window.scrollY,
    height: page.getBoundingClientRect().height,
    gap: window.getComputedStyle(page).gap,
    padding: window.getComputedStyle(page).padding,
  } : 'not found',
  test: test ? {
    top: test.getBoundingClientRect().top + window.scrollY,
    bottom: test.getBoundingClientRect().bottom + window.scrollY,
    height: test.getBoundingClientRect().height,
    margin: window.getComputedStyle(test).margin,
    marginBottom: window.getComputedStyle(test).marginBottom,
  } : 'not found',
  sectionTitle1: sectionTitles[0] ? {
    text: sectionTitles[0].textContent.trim(),
    top: sectionTitles[0].getBoundingClientRect().top + window.scrollY,
    bottom: sectionTitles[0].getBoundingClientRect().bottom + window.scrollY,
    height: sectionTitles[0].getBoundingClientRect().height,
  } : 'not found',
  sectionTitle2: sectionTitles[1] ? {
    text: sectionTitles[1].textContent.trim(),
    top: sectionTitles[1].getBoundingClientRect().top + window.scrollY,
    bottom: sectionTitles[1].getBoundingClientRect().bottom + window.scrollY,
    height: sectionTitles[1].getBoundingClientRect().height,
    margin: window.getComputedStyle(sectionTitles[1]).margin,
    marginTop: window.getComputedStyle(sectionTitles[1]).marginTop,
  } : 'not found',
  kai: kai ? {
    top: kai.getBoundingClientRect().top + window.scrollY,
    bottom: kai.getBoundingClientRect().bottom + window.scrollY,
    height: kai.getBoundingClientRect().height,
    margin: window.getComputedStyle(kai).margin,
    marginTop: window.getComputedStyle(kai).marginTop,
  } : 'not found',
};

const overlap = {
  testAndSectionTitle2: info.test !== 'not found' && info.sectionTitle2 !== 'not found'
    ? info.test.bottom - info.sectionTitle2.top
    : 'N/A',
  sectionTitle2AndKai: info.sectionTitle2 !== 'not found' && info.kai !== 'not found'
    ? info.sectionTitle2.bottom - info.kai.top
    : 'N/A',
};

const expected = {
  sectionTitle2TopExpected: info.test !== 'not found' && info.page !== 'not found'
    ? info.test.bottom + parseInt(info.page.gap)
    : 'N/A',
  sectionTitle2TopActual: info.sectionTitle2 !== 'not found'
    ? info.sectionTitle2.top
    : 'N/A',
  difference: info.test !== 'not found' && info.sectionTitle2 !== 'not found' && info.page !== 'not found'
    ? info.sectionTitle2.top - (info.test.bottom + parseInt(info.page.gap))
    : 'N/A',
};

console.log('=== ДИАГНОСТИКА ПЕРЕКРЫТИЯ ЭЛЕМЕНТОВ ===');
console.log('\n📱 Viewport:', info.viewport);
console.log('\n📄 Page container:', info.page);
console.log('\n📝 Test block:', info.test);
console.log('\n🏷️ Section Title 1 (ИНТЕРЕСНЫЕ СТАТЬИ):', info.sectionTitle1);
console.log('\n🏷️ Section Title 2 (ВЫ ЕГО ВИДЕЛИ?):', info.sectionTitle2);
console.log('\n👤 Kai block:', info.kai);
console.log('\n⚠️ Overlap analysis:', overlap);
console.log('\n📊 Expected vs Actual positions:', expected);

if (test) {
  test.style.outline = '3px solid red';
  test.setAttribute('data-debug', 'TEST BLOCK');
}
if (sectionTitles[1]) {
  sectionTitles[1].style.outline = '3px solid blue';
  sectionTitles[1].setAttribute('data-debug', 'SECTION TITLE 2');
}
if (kai) {
  kai.style.outline = '3px solid green';
  kai.setAttribute('data-debug', 'KAI BLOCK');
}

console.log('\n✅ Элементы подсвечены: Test (красный), SectionTitle2 (синий), Kai (зелёный)');
console.log('\n📋 Полная информация:', JSON.stringify(info, null, 2));

info;
