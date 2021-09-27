<template>
    <div class="main-content">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="中文品牌名称">
                <el-input v-model="form.cn_name"></el-input>
            </el-form-item>
            <el-form-item label="英文品牌名称">
                <el-input v-model="form.en_name"></el-input>
            </el-form-item>
            <el-form-item label="拼音">
                <el-input v-model="form.pinyin"></el-input>
            </el-form-item>
            <el-form-item label="所属大类">
                <el-select v-model="form.f_id" placeholder="默认父类">
                    <el-option label="父类" value="0"></el-option>
                    <el-option label="区域一" value="1"></el-option>
                    <el-option label="区域二" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="封面">
                <uploader
                    :succeeded="uploadSucceeded"
                    :url="form.cover"/>
            </el-form-item>
            <el-form-item label="品牌简介">
                <el-input type="textarea" v-model="form.intro"></el-input>
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
                cn_name: '',
                en_name: '',
                pinyin: '',
                f_id: 0,
                cover: '',
                intro: '',
                status: 0
            }
        }
    },
    async mounted () {
        this.id = this.$utils.req('id') || 0
        if (this.id > 0) {
            this.btnText = '保存'
            const res = await this.$apis.scpBrands.get(this.id)
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
        async save () {
            try {
                if (this.verified()) {
                    if (this.id > 0) {
                        console.log('@this.$apis.scpBrands.edit', this.$apis.scpBrands)
                        const resE = await this.$apis.scpBrands.edit(this.form, {
                            id: this.id
                        })
                        if (resE.code === 200) {
                            this.$message.success('更新成功!')
                            this.$router.push({
                                name: 'Brands'
                            })
                        }
                    } else {
                        const resS = await this.$apis.scpBrands.create(this.form)
                        if (resS.code === 200) {
                            await this.$apis.scpShopBrands.create({
                                shop_id: this.user.shopId,
                                brand_id: resS.data.id
                            })
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
