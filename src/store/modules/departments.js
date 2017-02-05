import departments from '../../data/departments';

const state = {
    departments: []
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

            // update local storage as well
            let curLocalVal = JSON.parse(localStorage.getItem('departments'));
            curLocalVal.push(newDept);
            console.log(curLocalVal);
            localStorage.setItem('departments', JSON.stringify(curLocalVal));
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
    addDept: ({commit}, dept) => {
        commit('ADD_DEPT', dept);
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