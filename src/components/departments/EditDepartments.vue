<template>
    <div>
        <h3>Current Departments</h3>

        <div class="add_dept">
            <span class="add_dept" @click="addDept()">Add Department +</span>
        </div>

        <ul class="dept_list">
            <li v-for="dept in departments">
                {{ dept.departmentName }}
                <span class="delete" @click="removeDept(dept.departmentId)">Delete</span>
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
    }
    .dept_list li:nth-child(odd) {
        background: #F0F0F0;
    }
    .delete {
        color: red;
        cursor: pointer;
        float: right;
    }
    .delete:hover {
        text-decoration: underline;
    }
    .add_dept {
        overflow: hidden;
        box-sizing: border-box;
        padding: 0 0 10px 0;
    }
    .add_dept span {
        float: right;
        color: blue;
        cursor: pointer;
        padding: 0;
    }
    .add_dept:hover {
        text-decoration: underline;
    }
    .clear {
        clear: both;
    }
</style>