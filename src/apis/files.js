
import Base from './base'

const imgServer = 'http://scp100.oss-cn-beijing.aliyuncs.com/'

class File extends Base {
    uptoken ({
        filename = '',
        prefix = '',
        type = ''
    }) {
        return this.ajax({
            url: this.makeUrl(null, 'files'),
            method: 'post',
            data: {
                filename,
                prefix,
                type
            }
        }).then(this.successObject)
    }

    delete (name) {
        return this.ajax({
            url: this.makeUrl(null, `files/${ name }`),
            method: 'delete'
        }).then(this.successObject)
    }

    async baseInfo () {
        return {
            server: imgServer
        }
    }
}

export default File
