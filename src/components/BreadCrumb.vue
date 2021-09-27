<template>
    <div class="crumb-header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
                v-for="(c, i) in crumbs"
                :key="i">
                {{ c.name }}
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: {
        list: Array
    },
    data () {
        return {
            domain: 'http://localhost:8081/',
            crumbs: [],
            routes: [
                {
                    path: '',
                    name: 'Dashbord'
                },
                {
                    path: 'products',
                    name: '商品管理',
                    subs: [
                        {
                            path: 'products/add',
                            name: '商品发布'
                        },
                        {
                            path: 'products',
                            name: '商品管理'
                        }
                    ]
                },
                {
                    path: 'orders',
                    name: '订单管理'
                },
                {
                    path: 'brands',
                    name: '品牌管理',
                    subs: [
                        {
                            path: 'brands',
                            name: '商品管理'
                        },
                        {
                            path: 'brands/add',
                            name: '商品发布'
                        }
                    ]
                },
                {
                    path: 'users',
                    name: '会员管理',
                    subs: [
                        {
                            path: 'users',
                            name: '会员管理'
                        },
                        {
                            path: 'users/add',
                            name: '会员新增'
                        }
                    ]
                },
                {
                    path: 'administors',
                    name: '管理员管理'
                },
                {
                    path: 'system',
                    name: '系统管理',
                    subs: [
                        {
                            path: 'system/shops',
                            name: '店铺管理'
                        },
                        {
                            path: 'system/shops/add',
                            name: '店铺新增'
                        },
                        {
                            path: 'system/logs',
                            name: '日志管理'
                        }
                    ]
                }
            ]
        }
    },
    mounted () {
        this.init()
    },
    watch: {
        $route (to, from) {
            if (to.path !== from.path) {
                this.init()
            }
        }
    },
    methods: {
        init () {
            const { domain, routes, crumbs } = this
            crumbs.length = 0
            const local = window.location.href
            let currtUrl = local.replace(domain, '')
            if (currtUrl !== '') {
                const nodes = currtUrl.split('/')
                const s = currtUrl.indexOf('?')
                if (s > 0) {
                    currtUrl = currtUrl.substring(0, s)
                }
                crumbs.push({
                    path: '/',
                    name: 'Dashbord'
                })
                if (nodes.length === 0) return
                for (const route of routes) {
                    if (nodes.length === 1 && route.path === currtUrl) {
                        crumbs.push({
                            path: route.path,
                            name: route.name
                        })
                    }
                    if (nodes.length > 1 && route.subs) {
                        if (route.subs.length > 0) {
                            for (const child of route.subs) {
                                if (child.path === currtUrl) {
                                    crumbs.push({
                                        path: route.path,
                                        name: route.name
                                    })
                                    crumbs.push({
                                        path: child.path,
                                        name: child.name
                                    })
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
.crumb-header {
    background: #fff;
    margin-top: -10px;
    margin-bottom: 10px;
    padding: 10px 0 0 28px;
    height: 24px;
}
.crumb-header .title {
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    margin-top: 16px;
}
</style>
