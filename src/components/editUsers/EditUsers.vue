<template>
    <div class="container">
        <div class="add_user_wrapper">
            <button class="btn btn-primary" @click="showAddUserOverlay(true)">Add New User +</button>
        </div>

        <div class="dept_list_wrapper" v-if="departments.length > 0" v-for="department in departments">
            <fieldset>
                <legend>{{ department.departmentName }}</legend>
                <!--<h3>{{ department.departmentName }}</h3>-->
                <div class="table-response">
                    <table class="table table-striped">
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

                <span class="warning" v-if="hasNoUsersInDept(department)">No users currently assigned to this department.</span>
            </fieldset>
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
            },
            showAddUserOverlay(bool) {
                this.$store.dispatch('setCurrentForm', 'add-user-form');
                this.$store.dispatch('setShowOverlay', bool);
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
    .dept_list_wrapper {
        margin: 10px 0 40px 0;
    }
    legend {
        width: auto;
        margin: 0;
        border: none;
        padding: 0 5px;
        font-weight: bold;
    }
    fieldset {
        min-width: none;
        padding: 10px;
        margin: 0;
        border: #999 solid 1px;
    }
    .add_user_wrapper {
        box-sizing: border-box;
        padding: 20px 0 0 0;
        text-align: right;
    }
</style>