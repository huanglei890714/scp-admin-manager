<template>
    <div class="main-content">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="管理员名">
                <el-input v-model="form.user_name" :disabled="id > 0"></el-input>
            </el-form-item>
            <el-form-item label="管理员密码" v-if="id === 0">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" v-if="id === 0">
                <el-input v-model="form.conPass"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="权限">
                <el-select v-model="form.level" placeholder="普通管理员">
                    <el-option label="超级管理员" value="0"></el-option>
                    <el-option label="普通管理员" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save">{{ btnText }}</el-button>
                <el-button @click="back">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import trim from 'lodash/trim'

export default {
    components: {
    },
    data () {
        return {
            user: this.$store.state.user,
            id: 0,
            btnText: '立即创建',
            form: {
                user_name: '',
                password: '',
                conPass: '',
                email: '',
                level: '0'
            }
        }
    },
    async mounted () {
        this.id = this.$utils.req('id') || 0
        if (this.id > 0) {
            this.btnText = '保存'
            const res = await this.$apis.scpAdminUsers.get(this.id)
            if (res.code === 200) {
                this.form = res.data
                this.form.level += ''
            }
        }
    },
    methods: {
        verified () {
            const { form } = this
            let result = true
            if (trim(form.user_name) === '') {
                this.$message.warning('请填管理员名!')
                result = false
            } else if (this.id === 0) {
                if (trim(form.password) === '') {
                    this.$message.warning('请填写密码!')
                    result = false
                } else if (trim(form.password) !== trim(form.conPass)) {
                    this.$message.warning('两次密码输入不一致!')
                    result = false
                }
            }
            return result
        },
        async save () {
            try {
                if (this.verified()) {
                    if (this.id > 0) {
                        delete this.form.password
                        delete this.form.conPass
                        delete this.form.user_name
                        const resE = await this.$apis.scpAdminUsers.edit(this.form, {
                            id: this.id
                        })
                        if (resE.code === 200) {
                            this.$message.success('更新成功!')
                            this.$router.push({
                                name: 'Administors'
                            })
                        }
                    } else {
                        const resS = await this.$apis.scpAdminUsers.create(this.form)
                        if (resS.code === 200) {
                            this.$message.success('创建成功!')
                            this.$router.push({
                                name: 'Administors'
                            })
                        }
                    }
                }
            } catch (err) {
                this.$message.error(err)
            }
        },
        back () {
            window.history.go(-1)
        }
    }
}
</script>
