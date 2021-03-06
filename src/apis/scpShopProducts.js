import Base from './base'

class ScpShopProducts extends Base {
    //扩展方法根据店铺id获取品牌数据
    async getProdtctByShopId (params = {}) {
        return this.ajax({
            url: this.makeUrl(params, 'ext/shopProducts'),
            method: 'get',
            headers: {
                ...params.headers
            }
        })
    }

    async isExitProductId (data) {
        return this.ajax({
            url: this.makeUrl(null, 'ext/shopProducts/exit'),
            method: 'post',
            data
        })
    }
}

export default ScpShopProducts
