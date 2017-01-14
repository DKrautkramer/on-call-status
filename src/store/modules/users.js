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

        state.allUsers = users;
        state.activeUsers = activeUsers;
    }
};

const actions = {
    initUserData: ({commit}) => {
        commit('SET_USERS', users);
    },
    addUser: ({commit}, userData) => {

    },
    removeUser: ({commit}, id) => {

    },
    editUser: ({commit}, userData) => {

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