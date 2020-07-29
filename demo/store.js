/**
 * Created by rengar on 2020/7/28.
 */

function initialState() {
    return {
        test: 'testState',
    }
}

const __storeModule = {
    namespaced: true,
    state: initialState(),
    getters: {
        testGetters(state) {
            return state.test + 'Getters'
        },
    },
}