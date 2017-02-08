<template>
    <div>
        <div></div>
        <h2>Active List</h2>

        <div class="form-group form-inline">
            <label for="callListSort">Sort By:</label>
            <select id="callListSort" class="form-control" v-model="listSort">
                <option value="dept">Department</option>
                <option value="type">Type</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
            </select>
        </div>

        <div class="table-responsive">
            <table class="table table-striped">
                <caption></caption>
                <thead>
                <tr>
                    <th>Dept. Name</th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="activeUsers.length > 0" v-for="user in sortedUsers">
                    <td scope="row">{{ user.department.departmentName }}</td>
                    <td>{{ user.activeStatus }}</td>
                    <td>{{ user.firstName + ' ' + user.lastName }}</td>
                    <td>Desk Phone: {{ user.workPhone }} <br> Mobile Phone: {{ user.mobilePhone }}</td>
                    <td>{{ user.email }}</td>
                </tr>
                <span v-else>No user data</span>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                listSort: 'dept'
            }
        },
        computed: {
            activeUsers() {
               return this.$store.getters.activeUsers;
            },
            sortedUsers() {
                let key = '';
                let newList = [];
                if (this.listSort === 'dept') {
                    newList = this.activeUsers.sort(function(a,b) {
                        return (a.department.departmentName > b.department.departmentName) ? 1 : ((b.department.departmentName > a.department.departmentName) ? -1 : 0);
                    });
                } else if (this.listSort === 'type') {
                    newList = this.activeUsers.sort(function(a,b) {
                        return (a.activeStatus > b.activeStatus) ? 1 : ((b.activeStatus > a.activeStatus) ? -1 : 0);
                    });
                } else if (this.listSort === 'firstName') {
                    newList = this.activeUsers.sort(function(a,b) {
                        return (a.firstName > b.firstName) ? 1 : ((b.firstName > a.firstName) ? -1 : 0);
                    });
                } else if (this.listSort === 'lastName') {
                    newList = this.activeUsers.sort(function(a,b) {
                        return (a.lastName > b.lastName) ? 1 : ((b.lastName > a.lastName) ? -1 : 0);
                    });
                } else if (this.listSort === 'email') {
                    newList = this.activeUsers.sort(function(a,b) {
                        return (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0);
                    });
                }

                return newList;
            }
        }
    }
</script>