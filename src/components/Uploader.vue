<template>
    <div style="display: flex;">
        <el-input
            v-model="uri"
            placeholder="上传或输入 url"
            class="uploader-ipt"/>
        <el-upload
            :action="upconf.action"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="onSucceeded"
            :on-error="onFailed"
            :headers="token">
            <el-button
                :loading="uploading"
                class="uploader-btn"
                size="normal"
                type="primary">
                点击上传
            </el-button>
        </el-upload>
    </div>
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
            upconf: {
                accept: 'image/*',
                action: 'http://127.0.0.1:7001/apis/v1/files'
            },
            token: {},
            uri: '',
            uploading: false
        }
    },
    async created () {
        const _token = await this.$apis('files').baseInfo()
        this.token = {
            token: _token
        }
    },
    watch: {
        url () {
            this.uri = this.url
        }
    },
    methods: {
        async beforeUpload () {
            this.uploading = true
        },
        onSucceeded (res) {
            console.log('@sucess', res)
            this.uploading = false
            if (typeof this.succeeded === 'function') {
                this.uri = res.data
                this.succeeded(res.data)
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
