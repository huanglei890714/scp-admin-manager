<template>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#f6f8f9"
        text-color="#000"
        active-text-color="#409eff"
        router>
        <el-menu-item index="/dashbord">
            <i class="iconfont icon-dashbord"></i>
            <span slot="title">Dashbord</span>
        </el-menu-item>
        <el-submenu index="system">
            <template slot="title">
                <i class="iconfont icon-xitongguanli"></i>
                <span>系统管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/system/shops">店铺管理</el-menu-item>
                <el-menu-item index="/system/logs">系统日志</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="dashbord">
            <template slot="title">
                <i class="iconfont icon-chanpinguanli"></i>
                <span>商品管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/products/add">商品发布</el-menu-item>
                <el-menu-item index="/products">商品管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/orders">
            <i class="iconfont icon-dingdanguanli"></i>
            <span slot="title">订单管理</span>
        </el-menu-item>
        <el-menu-item index="/brands">
            <i class="iconfont icon-pinpaiguanli"></i>
            <span slot="title">品牌管理</span>
        </el-menu-item>
        <el-menu-item index="/users">
            <i class="iconfont icon-yuangong"></i>
            <span slot="title">会员管理</span>
        </el-menu-item>
        <el-menu-item index="/administors">
            <i class="iconfont icon-guanliyuan_guanliyuanliebiao"></i>
            <span slot="title">管理员管理</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    props: {
        url: {
            type: String,
            default: ''
        },
        succeeded: {
            type: Function, // success(fileKey)
            default () {}
        }
    },
    data () {
        return {
            title: 'fff'
        }
    }
}
</script>

<style scoped>
.el-menu-vertical-demo i {
    margin-right: 6px;
    vertical-align: middle;
    font-size: 18px;
}
</style>
