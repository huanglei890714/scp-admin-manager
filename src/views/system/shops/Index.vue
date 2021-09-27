<template>
    <section>
        <data-list :mod="mod" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter"/>
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
            mod: 'scpShops',
            searchKey: 'shop_name',
            fileds: [
                { name: 'id', title: 'ID', width: 80 },
                { name: 'shop_name', title: '用户名', width: 120 },
                { name: 'shop_img', title: 'logo', width: 120 },
                { name: '_create_date', title: '创建时间', width: 180 },
                { name: '_update_date', title: '最后更新时间', width: 180 }
            ],
            editRouter: 'ShopAdd'
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
