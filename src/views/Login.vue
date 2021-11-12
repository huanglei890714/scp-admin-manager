<template>
    <div>
        <img class="bgone" src="@/assets/bg.jpg" />
        <img class="pic" src="@/assets/bg1.png" />

        <div class="table">
            <el-form
                ref="loginForm"
                :model="loginForm"
                :rules="loginFormRule"
                class="form-contaniner">
                <div class="wel">奢侈品商城平台管理</div>
                <div class="wel1">SHE CHI PING SHANG CHENG PING TAI GUAN LI</div>
                <div class="logo">
                    <img src="@/assets/logo.png" width="100">
                </div>
                <div class="user">
                    <el-form-item
                        style="width: 373px;"
                        prop="account">
                        <slot name="label">
                            <label
                                class="el-form-item__label">
                                <i class="el-icon-user" />
                                用户名
                            </label>
                        </slot>
                        <el-input
                            v-model="loginForm.name"
                            type="text"
                            auto-complete="off"
                            @keypress.native.enter="doLogin" />
                    </el-form-item>
                </div>
                <div class="password">
                    <el-form-item
                        style="width: 373px;"
                        prop="checkPass">
                        <slot name="label">
                            <label
                                class="el-form-item__label"
                                style="margin-right:2px;">
                                <i class="el-icon-lock" />
                                密&nbsp;&nbsp;&nbsp;码
                            </label>
                        </slot>
                        <el-input
                            v-model="loginForm.pass"
                            type="password"
                            auto-complete="off"
                            @keypress.native.enter="doLogin" />
                    </el-form-item>
                </div>
                <el-button
                    class="btn"
                    @click.native.prevent="doLogin"
                    @keyup.enter.native="doLogin">
                    登录
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Login',
    components: {},
    data () {
        return {
            logining: false,
            loginForm: {
                name: 'hsl',
                pass: '123456'
            },
            loginFormRule: {
                name: [
                    { required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        async doLogin () {
            this.logining = true
            try {
                // cookieHelper.delCookie('token')
                const { name, pass } = this.loginForm
                if (name !== '' && pass !== '') {
                    const res = await this.$apis.backUser.login({ name, pass })
                    if (res.code === 200) {
                        this.$router.push({
                            name: 'Dashbord'
                        })
                    } else {
                        this.$message.warning('用户名或密码错误!')
                    }
                } else {
                    this.$message.warning('用户名或密码不能为空!')
                }
                this.logining = false
            } catch (err) {
                this.logining = false
                this.$message.error(err)
            }
        }
    }
}
</script>

<style lang="scss">
@import "@/assets/css/comm.scss";

.bgone{
  width: 100%;
  height: 100%;
  position: absolute;
  top:0;right: 0;left: 0;bottom: 0;margin: auto;
}
.pic{
  width: 492px;
  height: auto;
  position: absolute;
  top: 173px;
  right: 453px;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 99999;
}
.table{
  background-color: #FFFFFF;
  width: 960px;
  height: 465px;
  position: absolute;
  top:20%;right: 0;left: 0;bottom: 0;margin: auto;
}
.password{
  position: absolute;
  top: 13.8rem;
  right: 4rem;
  display: flex;
}
.btn{
  position: absolute;
  top: 20.5rem;
  right: 3.9rem;
  border: none;
  color: #fff !important;
  width: 373px;
  text-align: center;
  background-color: $Cdefault;
  text-indent: 0rem;
  border-radius: 10px;
  text-shadow:5px 5px 1px rgba(0, 0, 0, 0.2);
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  font-size:20px !important;
  height: 50px;
}

.wel{
  width: 960px;
  height: 35px;
  color: #fff;
    font-size: 30px;
    position: absolute;
    top: -7rem;
    text-align: center;


}
.wel1{
  width: 960px;
  height: 35px;
  color: #fff;
    font-size: 12.38px;
    position: absolute;
    top: -4rem;
    text-align: center;

}
.user{
  position: absolute;
  top: 8rem;
  right: 4rem;
  display: flex;
}

.logo {
  position: absolute;
  top: 2.5rem;
  right: 4rem;
  width: 373px;
  text-align: center;
}
#yonghu img{
  height: 30px;
  position: absolute;
  left: 10px;
  top: 13px;
}
</style>
