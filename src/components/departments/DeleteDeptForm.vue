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
        computed: {
            curDeptId() {
                return this.$store.getters.curEditDept;
            }
        },
        methods: {
            confirmDelete() {
                this.$store.dispatch('removeDept', this.curDeptId);
                this.$store.dispatch('setShowOverlay', false);
            },
            cancelDelete() {
                this.$store.dispatch('setShowOverlay', false);
            }
        }
    }
</script>
