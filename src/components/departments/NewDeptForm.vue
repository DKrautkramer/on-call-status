<template>
    <form  @submit.prevent="addNewDept()">
        <div v-if="noErrors">
            <span class="overlay_title">Add New Department</span>

            <div class="form-group">
                <label for="deptName">Department Name</label>
                <input type="text" id="deptName" class="form-control" v-model="departmentName" required>
            </div>

            <br>
            <button type="submit" class="btn btn-primary btn-block">Add New Department</button>
        </div>
        <div v-else>
            <span class="error">Could not add department.  A department with this name already exists.</span>
        </div>
    </form>
</template>

<script>
    export default{
        data() {
            return {
                departmentName: '',
                noErrors: true
            }
        },
        methods: {
            addNewDept() {
                let checkExists = false;
                const depts = this.$store.getters.departments;

                for(let i = 0; i < depts.length; i++) {
                    if(depts[i].departmentName.toLowerCase() === this.departmentName.toLowerCase()) {
                        checkExists = true;
                        break;
                    }
                }

                if(checkExists) {
                    this.noErrors = false;
                } else {
                    this.$store.dispatch('addDept', this.departmentName);
                    this.$store.dispatch('setShowOverlay', false);
                }
            }
        },
        created() {
            this.noErrors = true;
        }
    }
</script>
