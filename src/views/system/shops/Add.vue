<template>
    <div class="main-content">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="店面名">
                <el-input v-model="form.shop_name"></el-input>
            </el-form-item>
            <el-form-item label="登录名">
                <el-input v-model="form.shop_login_name"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input v-model="form.shop_password"></el-input>
            </el-form-item>
            <el-form-item label="设置BANNER">
                <el-button type="primary" @click="setBanner">设置</el-button>
            </el-form-item>
            <el-form-item label="店面LOGO">
                <uploader
                    :succeeded="uploadSucceeded"
                    :url="form.shop_ing"/>
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
import uploader from '@/components/Uploader'

export default {
    components: {
        uploader
    },
    data () {
        return {
            user: this.$store.state.user,
            id: 0,
            btnText: '立即创建',
            form: {
                shop_name: '',
                shop_login_name: '',
                shop_password: '',
                shop_ing: '',
                status: 0
            }
        }
    },
    async mounted () {
        this.id = this.$utils.req('id') || 0
        if (this.id > 0) {
            this.btnText = '保存'
            const res = await this.$apis.scpShops.get(this.id)
            if (res.code === 200) {
                this.form = res.data
            }
        }
    },
    methods: {
        verified () {
            const { form } = this
            let result = true
            if (trim(form.cn_name) === '') {
                this.$message.warning('请填写中文名!')
                result = false
            } else if (trim(form.en_name) === '') {
                this.$message.warning('请填写英文名!')
                result = false
            }
            return result
        },
        uploadSucceeded (cover) {
            this.form.cover = cover
        },
        setBanner () {

        },
        async save () {
            try {
                if (this.verified()) {
                    if (this.id > 0) {
                        console.log('@this.$apis.scpShops.edit', this.$apis.scpShops)
                        const resE = await this.$apis.scpShops.edit(this.form, {
                            id: this.id
                        })
                        if (resE.code === 200) {
                            this.$message.success('更新成功!')
                            this.$router.push({
                                name: 'Brands'
                            })
                        }
                    } else {
                        const resS = await this.$apis.scpShops.create(this.form)
                        if (resS.code === 200) {
                            this.$message.success('创建成功!')
                            this.$router.push({
                                name: 'Brands'
                            })
                        }
                    }
                }
                return
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
