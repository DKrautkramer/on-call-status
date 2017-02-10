<template>
    <tr>
        <td scope="row">
            <span class="user_name">{{ currentUser.firstName + ' ' + currentUser.lastName }}</span> -
            <button class="btn btn-warning btn-xs" @click="editUser(currentUser)">Edit</button>
            <button class="btn btn-danger btn-xs" @click="deleteUser(currentUser.id)">Delete</button>
        </td>
        <td><input type="radio" :checked="currentUser.primaryActive" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': true, 'secondaryActive': false})"></td>
        <td><input type="radio" :checked="currentUser.secondaryActive" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': true})"></td>
        <td><input type="radio" :checked="currentUser.activeStatus == 'n/a'" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': false})"></td>
    </tr>
</template>

<script>
    export default {
        props: ['currentUser'],
        methods: {
            updateUserOnCall(data) {
                this.$store.dispatch('editUser', data);
            },
            deleteUser(id) {
                const check = confirm('Are you sure you want to delete this user?');
                if (check) {
                    this.$store.dispatch('removeUser', id);
                }
            },
            editUser(curUser) {
                this.$store.dispatch('setCurrentEditUser', curUser);
                this.$store.dispatch('setCurrentForm', 'edit-user-form');
                this.$store.dispatch('setShowOverlay', true);
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
</style>