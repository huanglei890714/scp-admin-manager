import Base from './base'

class ScpShopOrders extends Base {
    //扩展方法根据店铺id获取品牌数据
    async getOrderByShopId (params = {}) {
        return this.ajax({
            url: this.makeUrl(params, 'ext/shopOrders'),
            method: 'get',
            headers: {
                ...params.headers
            }
        })
    }

    async isExitOrderId (data) {
        return this.ajax({
            url: this.makeUrl(null, 'ext/shopOrders/exit'),
            method: 'post',
            data
        })
    }
}

export default ScpShopOrders
