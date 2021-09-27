<template>
    <el-row :gutter="12">
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>新增用户</span>
                    <el-button class="btn-view" type="text">查看</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'hsl ' + o }}
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>新增订单</span>
                    <el-button class="btn-view" type="text">查看</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'hsl ' + o }}
                </div>
            </el-card>
        </el-col>
        <el-col :span="8">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>新增商品</span>
                    <el-button class="btn-view" type="text">查看</el-button>
                </div>
                <div v-for="o in 4" :key="o" class="text item">
                    {{'hsl ' + o }}
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data () {
        return {
            users: 0,
            orders: 0,
            products: 0
        }
    }
}
</script>

<style scoped>
.btn-view {
    float: right;
    padding: 3px 0；
}
</style>
