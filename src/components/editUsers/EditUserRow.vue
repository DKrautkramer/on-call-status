<template>
    <tr>
        <td scope="row">{{ currentUser.firstName + ' ' + currentUser.lastName }} - [ <span class="edit" @click="editMode = true">Edit</span> | <span class="delete_user" @click="deleteUser(currentUser.id)">Delete</span> ]</td>
        <td><input type="radio" :checked="currentUser.primaryActive" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': true, 'secondaryActive': false})"></td>
        <td><input type="radio" :checked="currentUser.secondaryActive" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': true})"></td>
        <td><input type="radio" :checked="currentUser.activeStatus == 'n/a'" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': false})"></td>

        <div class="edit_user_overlay" v-if="editMode" @click="editMode = false"></div>
        <div class="inner_overlay" v-if="editMode">
            <span class="close_x" @click="editMode = false">X</span>

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
        </div>
    </tr>
</template>

<script>
    export default {
        props: ['currentUser'],
        data() {
            return {
                editMode: false,
                editedUserData: {
                    mobilePhone: this.currentUser.mobilePhone,
                    id: this.currentUser.id,
                    department: {
                       departmentId: this.currentUser.department.departmentId,
                       departmentName: this.currentUser.department.departmentName
                    },
                    email: this.currentUser.email,
                    firstName: this.currentUser.firstName,
                    departmentId: this.currentUser.departmentId,
                    lastName: this.currentUser.lastName,
                    workPhone: this.currentUser.workPhone
                }
            }
        },
        computed: {
            departments() {
               return this.$store.getters.departments;
            }
        },
        methods: {
            updateUserOnCall(data) {
                this.$store.dispatch('editUser', data);
            },
            updateUserInfo() {
                this.$store.dispatch('editUser', this.editedUserData);
                this.editMode = false;
            },
            updateUserDeptIds() {
                let deptId = this.departments.filter((dept) => { return dept.departmentName === this.editedUserData.department.departmentName })[0].departmentId;
                this.editedUserData.department.departmentId = deptId;
                this.editedUserData.departmentId = deptId;
            },
            deleteUser(id) {
                alert('This does not do anything yet, but soon will delete user with id: ' + id);
            }
        }
    }
</script>

<style>
    .edit,
    .delete_user {
        cursor: pointer;
        font-size: 12px;
    }
    .edit:hover,
    .delete_user:hover {
        text-decoration: underline;
    }
    .edit {
        color: blue;
    }
    .delete_user {
        color: red;
    }
    .edit_user_overlay {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: #000;
        opacity: 0.7;
        z-index: 5;
    }
    .inner_overlay {
        min-width: 350px;
        padding: 25px;
        background: #fff;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 10;
    }
    .close_x {
        float: right;
        font-weight: bold;
        font-size: 16px;
        cursor: pointer;
        position: relative;
        top: -15px;
        right: -15px;
    }
</style>