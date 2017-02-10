<template>
    <div class="container">
        <h1>On Call Database</h1>

        <ul class="nav nav-tabs">
            <router-link to="/list" activeClass="active" tag="li" exact><a>View Current On Call</a></router-link>
            <router-link to="/users" activeClass="active" tag="li"><a>Users</a></router-link>
            <router-link to="/departments" activeClass="active" tag="li"><a>Departments</a></router-link>
        </ul>

        <router-view></router-view>

        <transition name="fade">
            <div class="edit_user_overlay" v-if="showOverlay" @click="hideOverlay()"></div>
        </transition>

        <transition name="slide">
            <div class="inner_overlay" v-if="showOverlay">
                <span class="close_x" @click="hideOverlay()">X</span>
                <component :is="currentForm"></component>
            </div>
        </transition>

    </div>
</template>

<script>
    import AddUserForm from './components/editUsers/AddUserForm.vue';
    import EditUserForm from './components/editUsers/EditUserForm.vue';
    import DeleteDeptForm from './components/departments/DeleteDeptForm.vue';
    import NewDeptForm from './components/departments/NewDeptForm.vue';
    import DeleteUserForm from './components/editUsers/DeleteUserForm.vue';

    export default {
        computed: {
            showOverlay() {
                return this.$store.getters.showOverlay;
            },
            currentForm() {
                return this.$store.getters.currentForm;
            }
        },
        methods: {
            hideOverlay() {
                this.$store.dispatch('setShowOverlay', false);
            }
        },
        created() {
            this.$store.dispatch('initUserData');
            this.$store.dispatch('initDeptData');
        },
        components: {
            addUserForm: AddUserForm,
            editUserForm: EditUserForm,
            deleteDeptForm: DeleteDeptForm,
            newDeptForm: NewDeptForm,
            deleteUserForm: DeleteUserForm
        }
    }
</script>

<style>
    h1 {
        margin-bottom: 30px;
    }
    hr {
        border-top: 2px solid #000;
    }
    .overlay_title {
        position: relative;
        font-weight: bold;
        font-size: 24px;
        top:-15px;
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
        font-size: 18px;
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

