/**
 * Created by rengar on 2020/7/28.
 */

void function () {
    const moduleNames = []
    const moduleRegexp = new RegExp(/Module$/)

    window.__registerModule = {
        install(Vue, options) {
            const {store} = options
            // 添加实例上的引用
            Vue.prototype.$registerModule = registerModule

            function registerModule(moduleName, moduleStore, options = {}) {
                if (!(this instanceof Vue)) {
                    throw new Error('请在组件内使用this.$registerModule')
                }
                if (!moduleRegexp.test(moduleName)) {
                    throw new Error(`${moduleName} 模块命名请以Module结尾`)
                }
                // vuex自带支持 hasModule 的API从3.2.0新增
                // https://vuex.vuejs.org/zh/api/#hasmodule
                let hasModule = false
                if (store.hasModule) {
                    hasModule = store.hasModule(moduleName)
                } else {
                    hasModule = moduleNames.includes(moduleName)
                }
                if (hasModule) {
                    console.warn(`模块${moduleName}已经注册`)
                    return
                }
                // 注册模块
                store.registerModule(moduleName, moduleStore)
                // 自动注销模块，如果需要store持久化，传入
                const {autoUnregister = true} = options
                if (autoUnregister) {
                    moduleNames.push(moduleName)
                    this.$on('hook:beforeDestroy', unregisterModule.bind(this, moduleName))
                }
            }

            function unregisterModule(moduleName) {
                store.unregisterModule(moduleName)
                // 清除moduleName
                const idx = moduleNames.indexOf(moduleName)
                moduleNames.splice(idx, 1)
            }
        },
    }
}()