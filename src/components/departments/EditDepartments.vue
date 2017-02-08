<template>
    <div>
        <h3>Current Departments</h3>

        <div class="add_dept">
            <button class="btn btn-primary" @click="addDept()">Add Department +</button>
        </div>

        <ul class="dept_list">
            <li v-for="dept in departments">
                <span class="dept_name">{{ dept.departmentName }}</span>
                <button class="btn btn-danger btn-sm delete" @click="removeDept(dept.departmentId)">Delete</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showAddDeptForm: false
            }
        },
        computed: {
            departments() {
               return this.$store.getters.departments;
            }
        },
        methods: {
            removeDept(id) {
                let keepGoing = confirm('Are you sure you want to delete this department?');

                if(keepGoing) {
                    this.$store.dispatch('removeDept', id);
                }
            },
            addDept() {
                var newDept = prompt('Enter new department name');

                 if(newDept) {
                    this.$store.dispatch('addDept', newDept);
                 } else {
                    alert('No department added because field was blank.');
                 }
            }
        }
    }
</script>

<style>
    .dept_list {
        list-style: none;
        padding: 0;
    }
    .dept_list li {
        background: #fff;
        box-sizing: border-box;
        padding:5px 10px;
        overflow: hidden;
        font-size: 18px;
    }
    .dept_name {
        vertical-align: text-top;
    }
    .dept_list li:nth-child(odd) {
        background: #F0F0F0;
    }
    .delete {
        float: right;
    }
    .add_dept {
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 0 10px 0;
        text-align: right;
    }
</style>