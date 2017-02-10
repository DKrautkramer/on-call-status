<template>
    <div>
        <span class="error">{{ errorMsg }}</span>
    </div>
</template>

<script>
    export default{
        computed: {
            errorMsg() {
                return this.$store.getters.errorMsg;
            }
        }
    }
</script>
