/**
 * Created by rengar on 2020/7/28.
 */
void function () {
    function initialState() {
        return {
            test: 'testState',
        }
    }

    window.__storeModule = {
        namespaced: true,
        state: initialState(),
        getters: {
            testGetters(state) {
                return state.test + 'Getters'
            },
        },
    }
}()