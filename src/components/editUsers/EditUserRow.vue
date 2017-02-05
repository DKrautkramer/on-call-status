<template>
    <tr>
        <td scope="row">{{ currentUser.firstName + ' ' + currentUser.lastName }}</td>
        <td><input type="radio" :checked="currentUser.primaryActive" @click="updateUser({'id': currentUser.id, 'primaryActive': true, 'secondaryActive': false})"></td>
        <td><input type="radio" :checked="currentUser.secondaryActive" @click="updateUser({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': true})"></td>
        <td><input type="radio" :checked="currentUser.activeStatus == 'n/a'" @click="updateUser({'id': currentUser.id, 'primaryActive': false, 'secondaryActive': false})"></td>
    </tr>
</template>

<script>
    export default {
        props: ['currentUser'],
        methods: {
            updateUser(data) {
                this.$store.dispatch('editUser', data);
            }
        }
    }
</script>