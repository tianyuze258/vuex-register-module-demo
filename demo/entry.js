/**
 * Created by rengar on 2020/7/28.
 */
const store = new Vuex.Store({
    strict: false,
    state: {},
    modules: {},
})
Vue.use(__registerModule, { store })

const ComponentTest = {
    computed: {
        ...Vuex.mapGetters({
            vxgTestGetters: 'storeModule/testGetters',
        }),
    },
    render(h) {
        return h('div', `子模块1: ${this.vxgTestGetters}`)
    },
    created() {
        this.$registerModule('storeModule', __storeModule)
        const hasModule = store.hasModule('storeModule')
        this.$notify({ title: 'hook:created', message: `hasModule判断storeModule是否注册: ${hasModule}` })
    },
    beforeDestroy() {
        this.$notify({ title: 'hook:beforeDestroy', message: '组件、模块注销' })
    },
    destroyed() {
        this.$nextTick(() => {
            const hasModule = store.hasModule('storeModule')
            this.$notify({ title: 'hook:destroyed', message: `hasModule判断storeModule是否注册: ${hasModule}` })
        })
    },
}

const App = {
    data() {
        return {
            isRenderComponent: true,
        }
    },
    methods: {
        handleClick() {
            this.isRenderComponent = !this.isRenderComponent
        },
    },
    render(h) {
        return h(
            'div', {}, [
            h(
                'el-button',
                {
                    on: {
                        click: this.handleClick.bind(this),
                    },
                },
                '点击注销子组件',
            ),
            this.isRenderComponent && h(ComponentTest),
        ],
        )
    },
}

new Vue({
    store,
    render: h => h(App),
}).$mount('#app')