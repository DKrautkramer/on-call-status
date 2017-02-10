<template>
    <form  @submit.prevent="addNewDept()">
        <span class="overlay_title">Add New Department</span>

        <div class="form-group">
            <label for="deptName">Department Name</label>
            <input type="text" id="deptName" class="form-control" v-model="departmentName" required>
        </div>

        <br>
        <button type="submit" class="btn btn-primary btn-block">Add New Department</button>

    </form>
</template>

<script>
    export default{
        data() {
            return {
                departmentName: ''
            }
        },
        methods: {
            addNewDept() {
                this.$store.dispatch('addDept', this.departmentName);
                this.$store.dispatch('setShowOverlay', false);
            }
        }
    }
</script>
