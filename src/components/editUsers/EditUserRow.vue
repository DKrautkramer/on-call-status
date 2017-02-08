<template>
    <tr>
        <td scope="row">
            <span class="user_name">{{ currentUser.firstName + ' ' + currentUser.lastName }}</span> -
            <button class="btn btn-warning btn-xs" @click="editMode = true">Edit</button>
            <button class="btn btn-danger btn-xs" @click="deleteUser(currentUser.id)">Delete</button>
        </td>
        <td><input type="radio" :checked="currentUser.primaryActive" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': true, 'secondaryActive': false})"></td>
        <td><input type="radio" :checked="currentUser.secondaryActive" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': true})"></td>
        <td><input type="radio" :checked="currentUser.activeStatus == 'n/a'" @click="updateUserOnCall({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': false})"></td>

        <transition name="fade">
            <div class="edit_user_overlay" v-if="editMode" @click="editMode = false"></div>
        </transition>

        <transition name="slide">
            <div class="inner_overlay" v-if="editMode">
                <span class="close_x" @click="editMode = false">X</span>
                <edit-user-form :currentUser="currentUser" :updateEditMode="updateEditMode"></edit-user-form>
            </div>
        </transition>
    </tr>
</template>

<script>
    import EditUserForm from './EditUserForm.vue';

    export default {
        props: ['currentUser'],
        data() {
            return {
                editMode: false
            }
        },
        methods: {
            updateUserOnCall(data) {
                this.$store.dispatch('editUser', data);
            },
            deleteUser(id) {
                alert('This does not do anything yet, but soon will delete user with id: ' + id);
            },
            updateEditMode(val) {
                this.editMode = val;
            }
        },
        components: {
            editUserForm: EditUserForm
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

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0;
    }

    .slide-enter-active, .slide-leave-active {
      transition: all .5s ease;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active in <2.1.8 */ {
      transform: translateX(-175px) translateY(-400px);
      opacity: 0;
    }
    @media only screen
        and (min-device-width: 414px)
        and (max-device-width: 736px)
        and (-webkit-min-device-pixel-ratio: 3)
        and (orientation: portrait) {

        .user_name {
            display: block;
        }

    }
</style>