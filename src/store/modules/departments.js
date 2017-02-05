import departments from '../../data/departments';

const state = {
    departments: []
};

const mutations = {
    'SET_DEPT' (state, dept) {
        localStorage.setItem('departments', JSON.stringify(dept));
        state.departments = dept;
    },
    'REMOVE_DEPT' (state, obj) {
        let userCheck = false;

        for(let i = 0; i < obj.allUsers.length; i++) {
            if(obj.allUsers[i].departmentId === obj.id) {
                userCheck = true;
                break;
            }
        }

        if(userCheck) {
            alert('Cannot delete department if any users are currently assigned to this department.  Please assign users to a different department and try again.');
        } else {
            const idx = state.departments.map((o) => o.departmentId).indexOf(obj.id);
            state.departments.splice(idx, 1);
        }
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
    addDept: ({commit}, userData) => {

    },
    removeDept: ({state, commit, rootState}, id) => {
        commit('REMOVE_DEPT', {id: id, allUsers: rootState.users.allUsers});
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