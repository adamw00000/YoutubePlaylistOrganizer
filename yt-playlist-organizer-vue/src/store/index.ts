import { createStore, Store } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import auth, { AuthState } from './modules/auth';

const store: Store<unknown> = createStore({
    modules: {
        auth
    },
    plugins: [createPersistedState()]
})

export default store;