import users from '../../data/users';

const state = {
    allUsers: [],
    activeUsers: []
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

        state.activeUsers = activeUsers;
        localStorage.setItem('users', JSON.stringify(users));
        state.allUsers = users;

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

    },
    removeUser: ({commit}, id) => {

    },
    editUser: ({commit}, userData) => {
        commit('EDIT_USER', userData);
        commit('SET_USERS', state.allUsers);
    }
};

const getters = {
    allUsers: state => {
        return state.allUsers;
    },
    activeUsers: state => {
        return state.activeUsers;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};