// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      // 五秒种是否显示
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.hello') // 这个类的元素是否显示
      .assert.containsText('h1', 'Welcome to Your Vue.js App') // h1标签中是否显示这个文本
      .assert.elementCount('img', 1) // 是否有一个标签
      .end()
  }
}
