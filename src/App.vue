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
            <div class="edit_user_overlay" v-if="addUserMode" @click="toggleAddUserMode(false)"></div>
        </transition>

        <transition name="slide">
            <div class="inner_overlay" v-if="addUserMode">
                <span class="close_x" @click="toggleAddUserMode(false)">X</span>
                <add-user-form></add-user-form>
            </div>
        </transition>

    </div>
</template>

<script>
    import AddUserForm from './components/editUsers/AddUserForm.vue';

    export default {
        computed: {
            addUserMode() {
                return this.$store.getters.addUserMode;
            }
        },
        methods: {
            toggleAddUserMode(bool) {
                this.$store.dispatch('setAddUserMode', bool);
            }
        },
        created() {
            this.$store.dispatch('initUserData');
            this.$store.dispatch('initDeptData');
        },
        components: {
            addUserForm: AddUserForm
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

