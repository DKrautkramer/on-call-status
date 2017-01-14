import departments from '../../data/departments';

const state = {
    departments: []
};

const mutations = {
    'SET_DEPT' (state, dept) {
        state.departments = dept;
    }
};

const actions = {
    initDeptData: ({commit}) => {
        commit('SET_DEPT', departments);
    },
    addDept: ({commit}, userData) => {

    },
    removeDept: ({commit}, id) => {

    }
};

const getters = {
    departments: state => {
        return state.departments;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};