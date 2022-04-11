import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

// 当你需要渲染helloworld.vue这个文件的时候
describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    // 去.hello下的h1标签里面检查它的文字，如果符合要求，那么单元测试就是通过的。
    // 然后它就会输出should render correct contents这个结果
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
})
