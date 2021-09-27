<template>
    <section>
        <data-list :mod="mod" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter" :showAdd="false"/>
    </section>
</template>

<script>
import dataList from '@/components/DataList'

export default {
    components: {
        dataList
    },
    data () {
        return {
            mod: 'scpAdminLogs',
            searchKey: 'actions',
            fileds: [
                { name: 'id', title: 'ID', width: 80 },
                { name: 'event', title: '事件', width: 120 },
                { name: 'actions', title: '行为', width: 120 },
                { name: 'remark', title: '操作', width: 120 },
                { name: '_create_date', title: '进行时间', width: 180 }
            ],
            editRouter: ''
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
