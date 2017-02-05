import ActiveList from './components/activeList/FullList.vue';
import EditUsers from './components/editUsers/EditUsers.vue';
import EditDepartments from './components/departments/EditDepartments.vue';

export const routes = [
    { path: '/', redirect: '/on-call-status/list'},
    { path: '/on-call-status/list', component: ActiveList },
    { path: '/on-call-status/users', component: EditUsers },
    { path: '/on-call-status/departments', component: EditDepartments }
];