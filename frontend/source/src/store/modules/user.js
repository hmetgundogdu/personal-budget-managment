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

        return new Promise((resolve) => {

            this._vm.$http("session", { method: "POST", body: loginInformation }).then((response) => {
                if(response.data.success)
                {
                    commit("setUsername", loginInformation.username);
                    commit("setAccessToken", response.success.token);

                    resolve(true)
                }
            })

            // TODO
            window.localStorage.removeItem("session", JSON.stringify(state));

            resolve(true);
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
            commit("setAccessToken", session.token);
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
