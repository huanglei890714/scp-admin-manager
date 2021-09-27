<template>
    <section>
        <data-list :mod="mod" :searchKey="searchKey" :fileds="fileds" :editRouter="editRouter" :beforePaginate="beforePaginate" :beforeDel="beforeDel"/>
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
            mod: 'scpBrands',
            searchKey: 'cn_name',
            fileds: [
                { name: 'id', title: 'ID', width: 80 },
                { name: 'cn_name', title: '中文名', width: 120 },
                { name: 'en_name', title: '英文名', width: 120 },
                { name: 'pinyin', title: '拼音', width: 120 },
                { name: '_create_date', title: '创建时间', width: 180 },
                { name: '_update_date', title: '最后更新时间', width: 180 }
            ],
            editRouter: 'BrandAdd',
            beforePaginate: ['extScpShopBrands', 'getShopBrandsByShopId']
        }
    },
    methods: {
        async beforeDel (id) { //关联删除
            const res = await this.$apis.extScpShopBrands.isExitBrandId({
                shopId: this.$store.state.user.shopId,
                brandId: id
            })
            if (res.code === 200) {
                if (res.data && res.data.id > 0) {
                    this.$apis.scpShopBrands.delete(res.data.id)
                }
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
