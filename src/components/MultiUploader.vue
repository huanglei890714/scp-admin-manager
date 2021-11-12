<template>
    <div style="display: flex;">
        <el-upload
            ref="upload"
            class="upload-demo"
            :action="upconf.action"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="onSucceeded"
            :file-list="fileList"
            :on-error="onFailed"
            :headers="token"
            :name="fileName"
            multiple
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
export default {
    props: {
        imageList: Array,
        fileName: String,
        clearList: Number,
        imgNumber: Number,
        succeeded: {
            type: Function, // success(fileKey)
            default () {}
        }
    },
    data () {
        return {
            upconf: {
                accept: 'image/*',
                action: 'http://127.0.0.1:8001/apis/v1/files'
            },
            server: '',
            token: {},
            fileList: [],
            uploadList: [],
            uploading: false
        }
    },
    watch: {
        imageList (val) {
            this.fileList = val.map((v) => {
                return {
                    name: v,
                    old: v,
                    url: this.server + v
                }
            })
            this.uploadList = this.fileList
        }
    },
    async created () {
        const res = await this.$apis('files').baseInfo()
        this.token = {
            token: res.token
        }
        this.server = res.server
    },
    methods: {
        async beforeUpload (file) {
            const imageSize = file.size / 1024 / 1024 < 1
            if (!imageSize) {
                this.$message.warning('上传封面大小不能超过 2MB!')
            }
            return imageSize
        },
        onSucceeded (res, file, fileList) {
            setTimeout(() => {
                this.uploadfile = false
                this.icon = {}
                this.fileList = fileList
            }, 100) //解决fileList赋值报错bug

            if (res.data && Object.keys(res.data).length > 0) {
                this.uploadList.push({
                    name: res.data.name,
                    old: res.data.cover,
                    url: this.server + res.data.cover
                })
                if (typeof this.succeeded === 'function') {
                    this.succeeded(this.uploadList)
                }
            }
        },
        handleRemove (file, fileList) {
            const index = this.fileList.findIndex((item) => {
                return file.url === item.url
            })
            const objFiles = this.uploadList.splice(index, 1)
            this.fileList = fileList
            if (objFiles && objFiles.length > 0) {
                const obj = objFiles[0]
                this.$apis('files').delete(obj.old).then(() => {
                    this.$notify.success('删除成功！')
                }).catch((err) => {
                    this.$notify.error(`删除失败 ${ err.message || '' }`)
                })
            }
        },
        onFailed (err) {
            this.$notify.error(`上传失败 ${ err.message || '' }`)
            this.uploading = false
        }
    }
}
</script>

<style scoped>
    .uploader-btn {
        margin-left: 4px;
        padding-right: 10px;
        padding-left: 10px;
    }
</style>
