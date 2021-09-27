<template>
    <data-list :mod="mod" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter"/>
</template>

<script>
import dataList from '@/components/DataList'

export default {
    components: {
        dataList
    },
    data () {
        return {
            mod: 'scpUsers',
            searchKey: 'user_name',
            fileds: [
                { name: 'id', title: 'ID', width: 80 },
                { name: 'user_name', title: '用户名', width: 120 },
                { name: 'nick_name', title: '昵称', width: 120 },
                { name: 'email', title: '邮箱', width: 180 },
                { name: 'mobile', title: '手机', width: 110 },
                { name: 'balance', title: '积分', width: 80 },
                { name: '_create_date', title: '创建时间', width: 180 },
                { name: '_update_date', title: '最后更新时间', width: 180 }
            ],
            editRouter: 'UserAdd'
        }
    },
    methods: {
        activate () {}
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.activate()
        })
    }
}
</script>
