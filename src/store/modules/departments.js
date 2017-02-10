import departments from '../../data/departments';

const state = {
    departments: [],
    curEditDept: ''
};

const mutations = {
    'SET_DEPT' (state, dept) {
        localStorage.setItem('departments', JSON.stringify(dept));
        state.departments = dept;
    },
    'ADD_DEPT' (state, dept) {
        const newId = state.departments.sort((a,b) => { return b.departmentId - a.departmentId} )[0].departmentId + 1;
        const newDept = {departmentId: newId, departmentName: dept};
        state.departments.push(newDept);

        localStorage.setItem('departments', JSON.stringify(state.departments));
    },
    'REMOVE_DEPT' (state, id) {
        const idx = state.departments.map((o) => o.departmentId).indexOf(id);
        state.departments.splice(idx, 1);

        localStorage.setItem('departments', JSON.stringify(state.departments));
    },
    'SET_CUR_EDIT_DEPT' (state, deptId) {
        state.curEditDept = deptId;
    }
};

const actions = {
    initDeptData: ({commit}) => {
        if(JSON.parse(localStorage.getItem('departments'))) {
            commit('SET_DEPT', JSON.parse(localStorage.getItem('departments')));
        } else {
            commit('SET_DEPT', departments);
        }
    },
    addDept: ({commit}, dept) => {
        commit('ADD_DEPT', dept);
    },
    removeDept: ({commit}, id) => {
        commit('REMOVE_DEPT', id);
    },
    setCurEditDept: ({commit}, deptId) => {
        commit('SET_CUR_EDIT_DEPT', deptId);
    }
};

const getters = {
    departments: state => {
        return state.departments;
    },
    curEditDept: state => {
        return state.curEditDept;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};