import query from 'qs'
import ajax from './ajax'

const apiurl = '/apis/v1' //后端api地址

export default class Base {
    constructor (name) {
        this.ajax = ajax
        if (name) {
            this.base = `${ apiurl }/${ name }`
        } else {
            this.base = `${ apiurl }`
        }
    }

    makeUrl (params, id) {
        // console.log('@params', params)
        params = params || {}
        let url = this.base

        if (typeof id !== 'undefined' && id !== null) {
            url += `/${ id }`
        }

        if (Object.keys(params).length !== 0) {
            const queryString = query.stringify(params)

            url += `?${ queryString }`
        }
        return url
    }

    /**
     * 根据id获取数据
     * @param {*} id
     * @param {*} params
     */
    get (id, params = {}) {
        return this.ajax({
            url: this.makeUrl(params.query, id),
            method: 'get',
            headers: {
                ...params.headers
            }
        })
    }

    /**
     * 根据条件获取数据
     * @param {*} params
     */
    find (params = {}) {
        return this.ajax({
            url: this.makeUrl(params.query),
            method: 'get',
            headers: {
                ...params.headers
            }
        })
    }

    /**
     * 新增数据
     * @param {*} data
     * @param {*} params
     */
    create (data, params = {}) {
        return this.ajax({
            url: this.makeUrl(params.query),
            data,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                ...params.headers
            }
        })
    }

    /**
     * 根据id和条件删除数据
     * @param {*} id
     * @param {*} params
     */
    delete (id, params = {}) {
        return this.ajax({
            url: this.makeUrl(params.query, id),
            method: 'delete',
            headers: {
                ...params.headers
            }
        })
    }

    edit (data, params = {}) {
        return this.ajax({
            url: this.makeUrl(null, params.query.id),
            data,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                ...params.headers
            }
        })
    }
}
