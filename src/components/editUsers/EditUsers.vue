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
            <span class="warning" v-if="hasNoUsersInDept(department)">No users currently assigned to this department.</span>
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
            },
            hasNoUsersInDept(dept) {
                let hasUsers = false;

                for(let i = 0; i < this.users.length; i++) {
                    if(this.users[i].departmentId === dept.departmentId) {
                        hasUsers = true;
                    }
                }

                return !hasUsers;
            }
        },
        components: {
            editUserRow: EditUserRow
        }
    }
</script>

<style>
    .warning {
        color: red;
    }
</style>