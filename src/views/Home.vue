<template>
    <el-container>
        <el-header class="top-header">
            <div class="title">
                奢侈品商城平台管理
            </div>
            <div class="guide">
                <i class="iconfont icon-user" style="font-size:33px"/>
                <div class="user-info">
                    <span class="name">用户名</span>
                    <span class="admin">{{ admin }}</span>
                </div>
                <el-button class="link" type="text" @click="loginOut">
                    退出登录
                </el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <left-menu />
            </el-aside>
            <el-container>
                <el-main>
                    <!-- 面包屑导航 -->
                    <crumbs />
                    <transition
                        name="fade"
                        mode="out-in">
                        <router-view />
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import leftMenu from '@/components/LeftMenu'
import cookieHelper from '@/common/cookieHelper'
import crumbs from '@/components/BreadCrumb'

export default {
    components: {
        crumbs,
        leftMenu
    },
    data () {
        return {
            user: this.$store.state.user,
            admin: '',
            title: ''
        }
    },
    mounted () {
        if (!this.user || Object.keys(this.user).length === 0) {
            const info = cookieHelper.getCookie('userInfo')
            const _user = info.split('--')
            this.$store.commit('user', {
                name: _user[1],
                shopId: _user[0]
            })
        }
    },
    watch: {
        user () {
            return this.$store.state.user
        }
    },
    methods: {
        goBack () {
            window.history.go(-1)
        },
        async loginOut () {
            const res = await this.$apis.backUser.loginOut()
            if (res) {
                cookieHelper.delCookie('token')
                this.$router.push({
                    name: 'Login'
                })
            }
        },
        activate () {
            console.log('@user', this.user)
            if (!this.user || Object.keys(this.user).length === 0) {
                this.$router.push({
                    name: 'Login'
                })
            }
            this.admin = this.user.name
        }
    },
    beforeRouteEnter (to, from, next) {
        next((vm) => {
            vm.activate()
        })
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/comm.scss";

.top-header{
  background-color: $Cdefault;
  color: #fff;
  font-size: 20px;
  height: 89px !important;
  line-height: 89px;
  display: flex;
  justify-content: space-between;
}
// .top-header .logo {
//   float: left;
//   width: 220px;
// }
.top-header .guide {
    float: right;
    display: flex;
    line-height: 89px;
}
.top-header .guide .user-info {
    width: 60px;
    margin: 25px 25px 0 12px;
    font-weight: 500;
    line-height: 1;
    color: #00000066;
}
.top-header .guide .user-info .name {
    color: #000;
    display: block;
}
.top-header .guide .user-info .admin {
    color: #fff;
}
.top-header .guide .link {
    cursor: pointer;
    border-left: 1px solid #fff;
    padding: 0 5px 0 25px;
    color: #fff;
    font-size: 18px;
}
</style>
