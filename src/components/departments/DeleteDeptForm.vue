<template>
    <div>
        <div v-if="noErrors">
            <span class="overlay_title">Are you sure?</span>

            <br>
            <button class="btn btn-default" @click="cancelDelete()">Cancel</button>
            <button class="btn btn-primary" @click="confirmDelete()">DELETE</button>
        </div>
        <div v-else>
            <span class="error">Cannot delete department if any users are currently assigned to this department.</span>
        </div>
    </div>
</template>

<script>
    export default{
        data() {
            return {
                noErrors: true
            }
        },
        computed: {
            curDeptId() {
                return this.$store.getters.curEditDept;
            }
        },
        methods: {
            confirmDelete() {
                let userCheck = false;
                const allUsers = this.$store.getters.allUsers;

                for(let i = 0; i < allUsers.length; i++) {
                    if(allUsers[i].departmentId === this.curDeptId) {
                        userCheck = true;
                        break;
                    }
                }

                if(userCheck) {
                    this.noErrors = false;
                } else {
                    this.$store.dispatch('removeDept', this.curDeptId);
                    this.$store.dispatch('setShowOverlay', false);
                }
            },
            cancelDelete() {
                this.$store.dispatch('setShowOverlay', false);
            }
        },
        created() {
            this.noErrors = true;
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>