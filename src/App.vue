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
            editUserForm: EditUserForm
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
</style>

