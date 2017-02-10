import users from '../../data/users';

const state = {
    allUsers: [],
    activeUsers: [],
    currentEditUser: {}
};

const mutations = {
    'SET_USERS' (state, users) {
        let activeUsers = [];
        let currentStatus = '';

        for (let i = 0; i < users.length; i++) {
            if (users[i].primaryActive || users[i].secondaryActive) {
                currentStatus = users[i].primaryActive ? 'primary' : 'secondary';

                users[i].activeStatus = currentStatus;
                activeUsers.push(users[i]);
            } else {
                users[i].activeStatus = 'n/a';
            }
        }

        state.allUsers = users;
        state.activeUsers = activeUsers;

        localStorage.setItem('users', JSON.stringify(users));
    },
    'EDIT_USER' (state, userData) {
        for(let i = 0; i < state.allUsers.length; i++) {
            if(state.allUsers[i].id === userData.id) {
                for(let key in userData) {
                    if(state.allUsers[i].hasOwnProperty(key)) {
                        state.allUsers[i][key] = userData[key];
                    }
                }

                break;
            }
        }
    },
    'ADD_USER' (state, userData) {
        userData.id = state.allUsers.sort((a,b) => { return b.id - a.id })[0].id + 1;
        state.allUsers.push(userData);
    },
    'REMOVE_USER' (state, userId) {
        const idx = state.allUsers.map(function(o) { return o.id; }).indexOf(userId);
        state.allUsers.splice(idx, 1);
    },
    'SET_CURRENT_EDIT_USER' (state, curUser) {
        state.currentEditUser = curUser;
    }
};

const actions = {
    initUserData: ({commit}) => {
        if(JSON.parse(localStorage.getItem('users'))) {
            commit('SET_USERS', JSON.parse(localStorage.getItem('users')));
        } else {
            commit('SET_USERS', users);
        }
    },
    addUser: ({commit}, userData) => {
        commit('ADD_USER', userData);
        commit('SET_USERS', state.allUsers);
    },
    removeUser: ({commit}, id) => {
        commit('REMOVE_USER', id);
        commit('SET_USERS', state.allUsers);
    },
    editUser: ({commit}, userData) => {
        commit('EDIT_USER', userData);
        commit('SET_USERS', state.allUsers);
    },
    setCurrentEditUser: ({commit}, curUser) => {
        commit('SET_CURRENT_EDIT_USER', curUser);
    }
};

const getters = {
    allUsers: state => {
        return state.allUsers;
    },
    activeUsers: state => {
        return state.activeUsers;
    },
    currentEditUser: state => {
        return state.currentEditUser;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};