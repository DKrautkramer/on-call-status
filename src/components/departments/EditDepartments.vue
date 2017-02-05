<template>
    <div>
        <h3>Current Departments</h3>
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
</style>