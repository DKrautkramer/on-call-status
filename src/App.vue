<template>
    <div class="container">
        <h1>On Call Database</h1>

        <ul class="nav nav-tabs">
            <router-link to="/" activeClass="active" tag="li" exact><a>View Current On Call</a></router-link>
            <router-link to="/users" activeClass="active" tag="li"><a>Users</a></router-link>
            <router-link to="/departments" activeClass="active" tag="li"><a>Departments</a></router-link>
        </ul>

        <router-view></router-view>

    </div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch('initUserData');
            this.$store.dispatch('initDeptData');
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

