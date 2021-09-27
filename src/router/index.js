import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Dashbord from '../views/Dashbord'
import Products from '../views/products/Index'
import ProductAdd from '../views/products/Add'
import Brands from '../views/brands/Index'
import BrandAdd from '../views/brands/Add'
import Users from '../views/users/Index'
import UserAdd from '../views/users/Add'
import Administors from '../views/Administors/Index'
import AdministorAdd from '../views/Administors/Add'
import Orders from '../views/orders/Index'
import Shops from '../views/system/shops/Index'
import ShopAdd from '../views/system/shops/Add'
import Logs from '../views/system/Logs'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashbord',
                name: 'Dashbord',
                component: Dashbord
            },
            {
                path: '/products',
                name: 'Products',
                component: Products
            },
            {
                path: '/products/add',
                name: 'ProductAdd',
                component: ProductAdd
            },
            {
                path: '/brands',
                name: 'Brands',
                component: Brands
            },
            {
                path: '/brands/add',
                name: 'BrandAdd',
                component: BrandAdd
            },
            {
                path: '/users',
                name: 'Users',
                component: Users
            },
            {
                path: '/brands/add',
                name: 'UserAdd',
                component: UserAdd
            },
            {
                path: '/administors',
                name: 'Administors',
                component: Administors
            },
            {
                path: '/administors/add',
                name: 'AdministorAdd',
                component: AdministorAdd
            },
            {
                path: '/orders',
                name: 'Orders',
                component: Orders
            },
            {
                path: '/system/shops',
                name: 'Shops',
                component: Shops
            },
            {
                path: '/system/shops/add',
                name: 'ShopAdd',
                component: ShopAdd
            },
            {
                path: '/system/logs',
                name: 'Logs',
                component: Logs
            }
        ]
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => { return import(/* webpackChunkName: "about" */ '../views/About.vue') }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
