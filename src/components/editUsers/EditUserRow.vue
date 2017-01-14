<template>
    <tr>
        <td scope="row">{{ currentUser.firstName + ' ' + currentUser.lastName }}</td>
        <td><input type="radio" :checked="currentUser.primaryActive" @click="updateUser({userID: currentUser.id, primary: true, secondary: false})"></td>
        <td><input type="radio" :checked="currentUser.secondaryActive" @click="updateUser({userID: currentUser.id, primary: false, secondary: true})"></td>
        <td><input type="radio" :checked="currentUser.activeStatus == 'n/a'" @click="updateUser({userID: currentUser.id, primary: false, secondary: false})"></td>
    </tr>
</template>

<script>
    export default {
        props: ['currentUser'],
        methods: {
            updateUser(data) {
                let dataArray = [
                    {
                        "id": data.userID,
                        "primaryActive": data.primary,
                        "secondaryActive": data.secondary
                    }
                ];

                //eventBus.updateUser(dataArray);
            }
        }
    }
</script>