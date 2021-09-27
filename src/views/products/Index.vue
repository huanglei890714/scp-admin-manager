<template>
    <data-list :mod="mod" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter" :beforePaginate="beforePaginate" :beforeDel="beforeDel"/>
</template>

<script>
import dataList from '@/components/DataList'

export default {
    components: {
        dataList
    },
    data () {
        return {
            mod: 'scpProducts',
            searchKey: 'name',
            fileds: [
                {
                    name: 'id',
                    title: 'ID',
                    width: 80
                },
                {
                    name: 'name',
                    title: '中文名',
                    width: 120
                },
                {
                    name: 'brand',
                    title: '品牌',
                    width: 120
                },
                {
                    name: 'cate',
                    title: '分类',
                    width: 120
                },
                {
                    name: '_create_date',
                    title: '创建时间',
                    width: 180
                },
                {
                    name: '_update_date',
                    title: '最后更新时间',
                    width: 180
                },
                {
                    name: 'cover',
                    title: '封面',
                    width: 80,
                    customer: true,
                    type: 'img'
                }
            ],
            editRouter: 'ProductAdd',
            beforePaginate: ['extScpProducts', 'getProdtctByShopId']
        }
    },
    methods: {
        async beforeDel (id) { //关联删除
            console.log('关联删除', id)
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
