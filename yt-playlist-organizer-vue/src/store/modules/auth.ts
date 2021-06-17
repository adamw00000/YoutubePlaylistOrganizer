export interface AuthState {
    userId: string | null;
    authCode: string | null;
}

export default {
    state() {
        return {
            userId: null,
            authCode: null,
        }
    },
    getters: {
        isAuthenticated: (state: AuthState) => state.authCode != null && state.userId != null,
    },
    actions: {

    },
    mutations: {
        setUserId(state: AuthState, userId: string) {
            state.userId = userId;
        },
        setAuthCode(state: AuthState, authCode: string) {
            state.authCode = authCode;
        },
        logOut(state: AuthState) {
            state.userId = null;
            state.authCode = null;
        },
    }
};