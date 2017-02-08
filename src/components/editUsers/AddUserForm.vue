<template>
    <form>

        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" class="form-control" v-model="newUserData.firstName" required>
        </div>

        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" class="form-control" v-model="newUserData.lastName" required>
        </div>

        <div class="form-group">
            <label for="mobilePhone">Mobile Phone Number</label>
            <input type="text" id="mobilePhone" class="form-control" v-model="newUserData.mobilePhone" required>
        </div>

        <div class="form-group">
            <label for="workPhone">Work Phone Number</label>
            <input type="text" id="workPhone" class="form-control" v-model="newUserData.workPhone" required>
        </div>

        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" class="form-control" v-model="newUserData.email" required>
        </div>

        <div class="form-group">
            <label for="department">Department</label>
            <select id="department" class="form-control" v-model="newUserData.department.departmentName" @change="updateUserDeptIds()" required>
                <option v-for="dept in departments" :value="dept.departmentName">{{ dept.departmentName }}</option>
            </select>
        </div>

        <br>
        <button type="submit" class="btn btn-primary btn-block" @click.prevent="addNewUser()">Add New User</button>

    </form>
</template>

<script>
    export default{
        props: ['currentUser', 'updateEditMode'],
        data() {
            return {
                newUserData: {
                    mobilePhone: '',
                    id: '',
                    department: {
                       departmentId: '',
                       departmentName: ''
                    },
                    email: '',
                    firstName: '',
                    departmentId: '',
                    lastName: '',
                    workPhone: '',
                    onCallStart: null,
                    middleName: '',
                    onCallEnd: null,
                    primaryActive: false,
                    secondaryActive: false
                }
            }
        },
        computed: {
            departments() {
               return this.$store.getters.departments;
            }
        },
        methods: {
            updateUserDeptIds() {
                let deptId = this.departments.filter((dept) => { return dept.departmentName === this.newUserData.department.departmentName })[0].departmentId;
                this.newUserData.department.departmentId = deptId;
                this.newUserData.departmentId = deptId;
            },
            addNewUser() {
                this.$store.dispatch('addUser', this.newUserData);
                this.$store.dispatch('setAddUserMode', false);
            }
        }
    }
</script>
