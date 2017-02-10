<template>
    <div>
        <span class="overlay_title">Are you sure?</span>

        <br>
        <button class="btn btn-default" @click="cancelDelete()">Cancel</button>
        <button class="btn btn-primary" @click="confirmDelete()">DELETE</button>

    </div>
</template>

<script>
    export default{
        methods: {
            confirmDelete() {
                this.$store.dispatch('removeUser', this.$store.getters.currentEditUser.id);
                this.$store.dispatch('setShowOverlay', false);
            },
            cancelDelete() {
                this.$store.dispatch('setShowOverlay', false);
            }
        }
    }
</script>