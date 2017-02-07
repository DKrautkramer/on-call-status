<template>
    <tr>
        <td scope="row">{{ currentUser.firstName + ' ' + currentUser.lastName }} - [ <span class="edit" @click="editMode = true">Edit</span> | <span class="delete_user">Delete</span> ]</td>
        <td><input type="radio" :checked="currentUser.primaryActive" @click="updateUser({'id': currentUser.id, 'primaryActive': true, 'secondaryActive': false})"></td>
        <td><input type="radio" :checked="currentUser.secondaryActive" @click="updateUser({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': true})"></td>
        <td><input type="radio" :checked="currentUser.activeStatus == 'n/a'" @click="updateUser({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': false})"></td>

        <div class="edit_user_overlay" v-if="editMode" @click="editMode = false"></div>
        <div class="inner_overlay" v-if="editMode">
            <label for="firstName">First Name</label><br>
            <input type="text" id="firstName" v-model="editedUserData.firstName" :value="currentUser.firstName" /><br><br>

            <label for="lastName">Last Name</label><br>
            <input type="text" id="lastName" v-model="editedUserData.lastName" :value="currentUser.lastName" /><br><br>

            <label for="mobilePhone">Mobile Phone Number</label><br>
            <input type="text" id="mobilePhone" v-model="editedUserData.mobilePhone" :value="currentUser.mobilePhone" /><br><br>

            <label for="workPhone">Work Phone Number</label><br>
            <input type="text" id="workPhone" v-model="editedUserData.workPhone" :value="currentUser.workPhone" /><br><br>

            <label for="email">Email Address</label><br>
            <input type="email" id="email" v-model="editedUserData.email" :value="currentUser.email" /><br><br>

            <label for="department">Department</label><br>
            <select id="department" v-model="editedUserData.department.departmentName" @change="updateUserDeptIds()">
                <option v-for="dept in departments" :selected="currentUser.department.departmentName === dept.departmentName" :value="dept.departmentName">{{ dept.departmentName }}</option>
            </select><br><br>

            <input type="submit" value="Update User" />
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
            updateUser(data) {
                this.$store.dispatch('editUser', data);
            },
            updateUserDeptIds() {
                let deptId = this.departments.filter((dept) => { return dept.departmentName === this.editedUserData.department.departmentName })[0].departmentId;
                this.editedUserData.department.departmentId = deptId;
                this.editedUserData.departmentId = deptId;
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
        padding: 25px;
        background: #fff;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 10;
    }
</style>