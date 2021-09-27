<template>
    <data-list :mod="mod" :showAdd="false" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter" :beforePaginate="beforePaginate" :beforeDel="beforeDel"/>
</template>

<script>
import dataList from '@/components/DataList'

export default {
    components: {
        dataList
    },
    data () {
        return {
            mod: 'scpOrders',
            searchKey: 'name',
            fileds: [
                { name: 'id', title: 'ID', width: 80 },
                { name: 'nick_name', title: '用户昵称', width: 120 },
                { name: 'mobile', title: '手机号', width: 120 },
                { name: 'price', title: '总金额(¥)', width: 100 },
                { name: 'status', title: '状态', width: 100 },
                { name: '_create_date', title: '创建时间', width: 180 },
                { name: '_update_date', title: '最后更新时间', width: 180 },
                {
                    name: 'products',
                    title: '购买商品',
                    width: 150,
                    customer: true,
                    type: 'son'
                }
            ],
            editRouter: 'OrderDetail',
            beforePaginate: ['extScpOrders', 'getOrderByShopId']
        }
    },
    methods: {
        beforeDel () {
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
