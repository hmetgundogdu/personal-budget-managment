/* eslint-disable no-unreachable */
const state = {
    username: null,
    accessToken: null
}

const getters = {
    name(s) { return s.username; },
    isLogin(s) { return s.accessToken != null; }
}

const mutations = {
    setUsername(s, username) { s.username = username },
    setAccessToken(s, token) { s.accessToken = token; }
}

const actions = {
    login({ state, commit }, loginInformation) {

        return new Promise((resolve, reject) => {

            this._vm.$http("session", { method: "POST", body: loginInformation }).then((data) => {
                const { success, payload, error } = data;

                if (error) {
                    reject(error);
                } else if (success) {
                    commit("setUsername", loginInformation.username);
                    commit("setAccessToken", payload.token);

                    window.localStorage.setItem("session", JSON.stringify(state));
                }

                resolve(success)
            })

        })
    },
    logout({ commit }) {
        commit("setUsername", null);
        commit("setAccessToken", null);
        window.localStorage.removeItem("session");
    },
    initFromLocalStorage({ commit }) {
        return new Promise((resolve) => {
            // read user informations from localstorage
            let session = window.localStorage.getItem("session");
            if (session == null)
                return resolve(false);

            session = JSON.parse(session);

            commit("setUsername", session.username);
            commit("setAccessToken", session.accessToken);
            // check islogin from server

            resolve(true);
        })
        // return promise
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
