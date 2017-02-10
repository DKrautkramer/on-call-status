<template>
    <form>

        <div class="form-group">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" class="form-control" v-model="editedUserData.firstName" :value="currentUser.firstName" />
        </div>

        <div class="form-group">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" class="form-control" v-model="editedUserData.lastName" :value="currentUser.lastName" />
        </div>

        <div class="form-group">
            <label for="mobilePhone">Mobile Phone Number</label>
            <input type="text" id="mobilePhone" class="form-control" v-model="editedUserData.mobilePhone" :value="currentUser.mobilePhone" />
        </div>

        <div class="form-group">
            <label for="workPhone">Work Phone Number</label>
            <input type="text" id="workPhone" class="form-control" v-model="editedUserData.workPhone" :value="currentUser.workPhone" />
        </div>

        <div class="form-group">
            <label for="email">Email Address</label>
            <input type="email" id="email" class="form-control" v-model="editedUserData.email" :value="currentUser.email" />
        </div>

        <div class="form-group">
            <label for="department">Department</label>
            <select id="department" class="form-control" v-model="editedUserData.department.departmentName" @change="updateUserDeptIds()">
                <option v-for="dept in departments" :selected="currentUser.department.departmentName === dept.departmentName" :value="dept.departmentName">{{ dept.departmentName }}</option>
            </select>
        </div>

        <br>
        <button type="submit" class="btn btn-primary btn-block" @click.prevent="updateUserInfo()">Update User</button>

    </form>
</template>

<script>
    export default{
        data() {
            return {
                editedUserData: {}
            }
        },
        computed: {
            departments() {
                return this.$store.getters.departments;
            },
            currentUser() {
                return this.$store.getters.currentEditUser;
            }
        },
        methods: {
            updateUserDeptIds() {
                let deptId = this.departments.filter((dept) => { return dept.departmentName === this.editedUserData.department.departmentName })[0].departmentId;
                this.editedUserData.department.departmentId = deptId;
                this.editedUserData.departmentId = deptId;
            },
            updateUserInfo() {
                this.$store.dispatch('editUser', this.editedUserData);
                this.$store.dispatch('setShowOverlay', false);
            }
        },
        created() {
            this.editedUserData = {
                    mobilePhone: this.currentUser.mobilePhone,
                    id: this.currentUser.id,
                    department: {
                       departmentId: this.currentUser.department.id,
                       departmentName: this.currentUser.department.departmentName
                    },
                    email: this.currentUser.email,
                    firstName: this.currentUser.firstName,
                    departmentId: this.currentUser.departmentId,
                    lastName: this.currentUser.lastName,
                    workPhone: this.currentUser.workPhone
                }
        }
    }
</script>
