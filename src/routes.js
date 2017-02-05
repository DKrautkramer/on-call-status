import ActiveList from './components/activeList/FullList.vue';
import EditUsers from './components/editUsers/EditUsers.vue';
import EditDepartments from './components/departments/EditDepartments.vue';

export const routes = [
    { path: '/list', component: ActiveList },
    { path: '/users', component: EditUsers },
    { path: '/departments', component: EditDepartments }
];