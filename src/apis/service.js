import isPlainObject from 'lodash/isPlainObject'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import Base from './base'

const errInfo = {
    code: 206,
    msg: new Error('参数错误!')
}
let apis

//apis基础服务类
export default class Service {
    constructor (name) {
        this.apis = apis || new Base(name)
    }

    get (id, query = {}) {
        if (!id || !isPlainObject(query)) {
            return Promise.reject(errInfo)
        }
        return this.apis.get(id, {
            query
        })
    }

    find (query = {}) {
        if (!isPlainObject(query)) {
            return Promise.reject(errInfo)
        }
        return this.apis.find({
            query
        })
    }

    /**
     * 新增数据
     * @param {*} data 提交表单
     * @param {*} query 请求参数可为空
     */
    create (data, query) {
        if ((!isPlainObject(data) && !isArray(data)) || isEmpty(data)) {
            return Promise.reject(errInfo)
        }
        return this.apis.create(data, {
            query
        })
    }

    delete (id, params = {}) {
        if (id > 0) {
            return this.apis.delete(id, params)
        }
        return Promise.reject(errInfo)
    }

    /**
     * 编辑数据
     * @param {*} data 提交表单
     * @param {*} query 请求参数可为空
     */
    edit (data, query) {
        if ((!isPlainObject(data) && !isArray(data)) || isEmpty(data)) {
            return Promise.reject(errInfo)
        }
        return this.apis.edit(data, {
            query
        })
    }

    paginate (query = {}) {
        return this.apis.find({
            query
        })
    }
}
