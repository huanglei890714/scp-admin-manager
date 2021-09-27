<template>
    <div class="main-content">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="期数">
                <el-input v-model="form.period">
                    <div slot="suffix">
                        期
                    </div>
                </el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select v-model="brandId" placeholder="请选择品牌">
                    <el-option
                        v-for="(n, i) in ddlBrands"
                        :key="i"
                        :label="n.label"
                        :value="n.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="分类">
                <el-select
                    style="margin-right:15px;"
                    v-model="cateId"
                    @change="cateChange"
                    placeholder="请选择分类">
                    <el-option
                        v-for="(n, i) in ddlCate"
                        :key="i"
                        :label="n.label"
                        :value="n.value"/>
                </el-select>
                <el-select v-model="cateSonId" placeholder="请选择分类">
                    <el-option
                        v-for="(n, i) in ddlCateSon"
                        :key="i"
                        :label="n.label"
                        :value="n.value"/>
                </el-select>
            </el-form-item>
            <el-form-item label="上线时间">
                <el-input v-model="form.quantity" type="number" style="width:100px;margin-right:15px;">
                    <div slot="suffix">
                        件/个
                    </div>
                </el-input>
            </el-form-item>
            <el-form-item label="价格">
                <span class="label-price">市场价：</span>
                <el-input v-model="form.market_price" type="number" style="width:100px;margin-right:15px;">
                    <div slot="suffix">
                        ¥
                    </div>
                </el-input>
                <span class="label-price">折扣价：</span>
                <el-input v-model="form.price" type="number" style="width:100px;" @input="handleInput">
                    <div slot="suffix">
                        ¥
                    </div>
                </el-input>
            </el-form-item>
            <el-form-item label="上线时间">
                <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="form.post_at"
                    style="width: 100%;" />
            </el-form-item>
            <el-form-item label="图片集">
                <el-radio-group v-model="isVideo">
                    <el-radio label="0">相片</el-radio>
                    <el-radio label="1" disabled>视频</el-radio>
                </el-radio-group>
                <uploader
                    :succeeded="uploadSucceeded" :imageList="uploadList" fileName="product"/>
            </el-form-item>
            <el-form-item label="包邮">
                <el-switch v-model="form.free_post"></el-switch>
            </el-form-item>
            <!-- <el-form-item label="标签">
                <el-checkbox-group v-model="form.tags">
                    <el-checkbox label="全新" name="type"></el-checkbox>
                    <el-checkbox label="不讲价" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item> -->
            <el-form-item label="商品简介">
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
import uploader from '@/components/MultiUploader'
import trim from 'lodash/trim'

export default {
    components: {
        uploader
    },
    data () {
        return {
            id: 0,
            btnText: '立即创建',
            isVideo: '0',
            ddlBrands: [],
            ddlCate: [],
            ddlCateSon: [],
            brandId: '',
            cateId: null,
            cateSonId: null,
            uploadList: [],
            form: {
                shop_id: 0,
                brand_id: 0,
                cate_id: 0,
                name: '',
                period: '',
                cover: '',
                albums: '',
                intro: '',
                price: '',
                market_price: '0',
                dec: '',
                quantity: 1,
                post_at: new Date(),
                free_post: false,
                tags: []
            }
        }
    },
    async created () {
        await this.initDDL()
        await this.initForm()
    },
    methods: {
        getPeriod () {
            const date = new Date()
            const year = date.getFullYear()
            const month = date.getMonth()
            const day = date.getDay()
            return `${ year }${ month.length > 1 ? month : `0${ month }` }${ day.length > 1 ? day : `0${ day }` }`
        },
        handleInput (value) {
            if (value !== '') {
                if (value.indexOf('.') > -1) {
                    this.form.price = value.slice(0, value.indexOf('.') + 3)
                } else {
                    this.form.price = value
                }
            }
        },
        async initForm () {
            this.id = this.$utils.req('id') || 0
            if (this.id > 0) {
                this.btnText = '保存'
                try {
                    const res = await this.$apis.scpProducts.get(this.id)
                    if (res.code === 200) {
                        this.form = res.data
                        this.uploadList = this.form.albums.split(',')
                        this.brandId = this.form.brand_id
                        await this.cateChange(this.form.cate_id)
                    }
                } catch (err) {
                    console.log(err)
                    this.$router.push({
                        name: 'Products'
                    })
                }
                return
            }
            this.form.period = this.getPeriod()
        },
        async initDDL () {
            const resBrand = await this.$apis.extScpShopBrands.getShopBrandsByShopId({
                page: 1,
                pageSize: 20
            })
            if (resBrand.data && resBrand.data.data.length > 0) {
                this.ddlBrands = resBrand.data.data.map((v) => {
                    return {
                        label: v.cn_name,
                        value: v.id
                    }
                })
            }
            const resCateType = await this.$apis.scpCategoryTypes.paginate({
                page: 1,
                pageSize: 20
            })
            if (resCateType.data && resCateType.data.data.length > 0) {
                this.ddlCate = resCateType.data.data.map((v) => {
                    return {
                        label: v.name,
                        value: v.id
                    }
                })
            }
        },
        async cateChange (id) {
            this.ddlCateSon.length = 0
            const resCate = await this.$apis.scpCategories.paginate({
                query: {
                    cate_type_id: id || this.cateId
                },
                page: 1,
                pageSize: 20
            })
            if (resCate.data && resCate.data.data.length > 0) {
                this.ddlCateSon = resCate.data.data.map((v) => {
                    if (v.id === id) {
                        this.cateSonId = v.id
                        this.cateId = v.cate_type_id
                    }
                    return {
                        label: v.cn_name,
                        value: v.id
                    }
                })
            }
        },
        uploadSucceeded (imgList) {
            console.log('@img', imgList)
            if (imgList.length > 0) {
                this.form.cover = imgList[0].old
                this.form.albums = imgList.map((item) => {
                    return item.old
                }).join(',')
            }
        },
        verified () {
            const { form } = this
            let result = true
            if (trim(form.name) === '') {
                this.$message.warning('请填写商品名!')
                result = false
            } else if (this.brandId === '') {
                this.$message.warning('请选择品牌!')
                result = false
            } else if (this.cateId === '') {
                this.$message.warning('请选择分类!')
                result = false
            } else if (this.cateSonId === '') {
                this.$message.warning('请选择子分类!')
                result = false
            } else if (trim(form.price) === '') {
                this.$message.warning('请输入价格!')
                result = false
            } else if (form.albums === '') {
                this.$message.warning('请上传商品图片!')
                result = false
            }
            this.form.shop_id = this.$store.state.user.shopId
            this.form.brand_id = this.brandId
            this.form.cate_id = this.cateSonId
            return result
        },
        async save () {
            try {
                if (this.verified()) {
                    if (this.id > 0) {
                        console.log('@this.$apis.scpProducts.edit', this.$apis.scpProducts)
                        const resE = await this.$apis.scpProducts.edit(this.form, {
                            id: this.id
                        })
                        if (resE.code === 200) {
                            this.$message.success('更新成功!')
                            this.$router.push({
                                name: 'Products'
                            })
                        }
                    } else {
                        const resS = await this.$apis.scpProducts.create(this.form)
                        if (resS.code === 200) {
                            this.$message.success('创建成功!')
                            this.$router.push({
                                name: 'Products'
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

<style scoped>
.label-price{
    color: gray;
    font-size: 12px;
}
.el-input {
    width: 220px;
}
</style>
