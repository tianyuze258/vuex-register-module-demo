/**
 * Created by rengar on 2020/7/28.
 */
const store = new Vuex.Store({
    strict: false,
    state: {},
    modules: {},
})
Vue.use(__registerModule, {store})

const ComponentTest = {
    computed: {
        ...Vuex.mapGetters({
            vxgTestGetters: 'testGetters'
        }),
    },
    render(h) {
        return h('div', this.vxgTestGetters)
    },
    created() {
        this.$registerModule('storeModule', __storeModule)
    },
}

const App = {
    render(h) {
        return h(ComponentTest, 123)
    },
}

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')