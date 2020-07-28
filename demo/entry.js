/**
 * Created by rengar on 2020/7/28.
 */
const store = new Vuex.Store({
    strict: window.devEnv,
    modules: {},
})

const App = {
    render(h) {
        return h('div', 123)
    },
}

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')