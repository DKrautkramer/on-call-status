<template>
    <div class="container">
        <div v-if="departments.length > 0" v-for="department in departments">
            <h3>{{ department.departmentName }}</h3>

            <table class="table">
                <caption>Edit On Call Assignments</caption>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Primary</th>
                    <th>Secondary</th>
                    <th>Not On Call</th>
                </tr>
                </thead>
                <tbody>
                <edit-user-row v-for="user in users" v-if="users.length > 0 && userBelongsToDepartment(user, department)" :currentUser="user"></edit-user-row>
                </tbody>
            </table>
        </div>
        <div v-else>No department data</div>
    </div>
</template>

<script>
    import EditUserRow from './EditUserRow.vue';

    export default {
        computed: {
            users() {
                return this.$store.getters.allUsers;
            },
            departments() {
                return this.$store.getters.departments;
            }
        },
        methods: {
            userBelongsToDepartment(user, department) {
                return user.department.departmentName.toLowerCase() === department.departmentName.toLowerCase();
            }
        },
        components: {
            editUserRow: EditUserRow
        }
    }
</script>