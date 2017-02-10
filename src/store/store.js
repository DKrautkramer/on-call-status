import Vue from 'vue';
import Vuex from 'vuex';

import users from './modules/users';
import departments from './modules/departments';

//import * as actions from './actions';

Vue.use(Vuex);

const state = {
    showOverlay: false,
    currentForm: ''
};

const mutations = {
    'SET_SHOW_OVERLAY' (state, bool) {
        state.showOverlay = bool;
    },
    'SET_CURRENT_FORM' (state, str) {
        state.currentForm = str;
    }
};

const actions = {
    setShowOverlay: ({commit}, bool) => {
        commit('SET_SHOW_OVERLAY', bool);
    },
    setCurrentForm: ({commit}, str) => {
        commit('SET_CURRENT_FORM', str);
    }
};

const getters = {
    showOverlay: state => {
        return state.showOverlay;
    },
    currentForm: state => {
        return state.currentForm;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        users,
        departments
    }
});