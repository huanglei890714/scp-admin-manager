<template>
    <data-list :mod="mod" :showAdd="false" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter" :beforeDel="beforeDel"/>
</template>

<script>
import dataList from '@/components/DataList'

export default {
    components: {
        dataList
    },
    data () {
        return {
            mod: 'scpAdminUsers',
            searchKey: 'user_name',
            fileds: [
                { name: 'id', title: 'ID', width: 80 },
                { name: 'user_name', title: '用户名', width: 120 },
                { name: 'email', title: '邮箱', width: 180 },
                { name: 'level', title: '权限', width: 110 },
                { name: '_create_date', title: '创建时间', width: 180 },
                { name: '_update_date', title: '最后更新时间', width: 180 }
            ],
            editRouter: 'AdministorAdd'
        }
    },
    methods: {
        beforeDel (id) {
            if (id === 1) {
                this.$message.warning('超级管理员不能删除!')
                return false
            }
            return true
        },
        activate () {}
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.activate()
        })
    }
}
</script>
