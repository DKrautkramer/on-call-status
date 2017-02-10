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
        let checkExists = false;

        for(let i = 0; i < state.departments.length; i++) {
            if(state.departments[i].departmentName.toLowerCase() === dept.toLowerCase()) {
                checkExists = true;
                break;
            }
        }

        if(checkExists) {
            alert('Could not add department.  A department with this name already exists.');
        } else {
            const newId = state.departments.sort((a,b) => { return b.departmentId - a.departmentId} )[0].departmentId + 1;
            const newDept = {departmentId: newId, departmentName: dept};
            state.departments.push(newDept);

            localStorage.setItem('departments', JSON.stringify(state.departments));
        }
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

            localStorage.setItem('departments', JSON.stringify(state.departments));
        }
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
    removeDept: ({state, commit, rootState}, id) => {
        commit('REMOVE_DEPT', {id: id, allUsers: rootState.users.allUsers});
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