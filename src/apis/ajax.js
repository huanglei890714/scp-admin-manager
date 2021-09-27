import axios from 'axios'
import error from './error'

const loginUrl = 'http://localhost:8081/login'

const successData = function (res) {
    return res.data
}

const successHandle = function (data) {
    if (data.code !== 200) {
        return Promise.reject(data)
    }

    return Promise.resolve(data)
}

const faildHandle = function (err) {
    if (err.code === 'ECONNREFUSED') {
        return Promise.reject(error(105.1))
    }
    if (err.message === 'Network Error') {
        return Promise.reject(error(100))
    }
    if (err.code) {
        return Promise.reject(err)
    }

    try {
        if (err.response && err.response.data && err.response.data.code) {
            err = err.response.data
        }
    } catch (_err) {
        err = _err
    }
    return Promise.reject(err)
}

const needSignin = function (data) {
    if (
        loginUrl
        && data.code === 160
        && window.location.pathname !== loginUrl
    ) {
        window.location.href = loginUrl
        return Promise.reject(error(160))
    }
    if (data.code === 101) {
        return Promise.reject(error(101))
    }
    return data
}

export default function (options) {
    if (!options.params) {
        options.params = {
            __nocache: +new Date()
        }
    } else {
        options.params.__nocache = +new Date()
    }
    return axios(options)
        .then(successData)
        .then(needSignin)
        .then(successHandle)
        .catch(faildHandle)
}
