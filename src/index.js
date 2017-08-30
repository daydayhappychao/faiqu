import { baseUrl, preMethod, err_catch, defaultParams, defaultHeader, faiquInit, defaultData } from './init'

export default function faiqu(url) {

    if (typeof url !== 'string') throw new Error('faiqu方法的参数为一个字符串')
    if (!(this instanceof faiqu)) return new faiqu(url)


    //*params init
    this.url = baseUrl + url
    this.data = {}
    this.header = new Headers()
    this.method = ''


    //*push defalutHeader to header
    Object.keys(defaultHeader).map(v => this.header.append(v, defaultHeader[v]))

    //*push defaultData to data
    Object.keys(defaultData).map(v => this.data[v] = defaultData[v]())


    //TODO 目前url匹配仅支持一个参数
    let matchUrl = () => {
        let re = `:[a-zA-Z0-9]+`
        let result = this.url.match(re)
        if (result) {
            let _index = result.index
            let _length = result[0].length
            let _result = result[0].substr(1, _length - 1)
            let hasKey = false
            Object.keys(this.data).map(v => {
                if (v == _result) {
                    hasKey = true
                    this.url = this.url.replace(result[0], this.data[v])
                    delete this.data[v]
                }
            })
            if (hasKey === false) throw new Error(`${result[0]}未被匹配`)
        }
    }
    this.json = () => {
        this.header.set('Content-type', 'application/json')
        return this
    }
    this.params = (params) => {
        try {
            if (!params) throw new Error('没参数你调啥params,你说你484撒')
            if (typeof params !== 'object') throw new Error('params 方法只接受object形式的参数')
            Object.keys(params).map(v => this.data[v] = params[v])
            return this
        } catch (err) {
            err_catch(err)
        }
    }

    this.headers = (params) => {
        try {
            if (!params) throw new Error('没参数你调啥headers,你说你484撒')
            if (typeof params !== 'object') throw new Error('headers 方法只接受object形式的参数')
            Object.keys(params).map(v => this.header.append(v, params[v]))
            return this
        } catch (err) {
            err_catch(err)
        }
    }

    this.get = () => {
        this.method = 'get'
        let _params = ''
        matchUrl()
        Object.keys(this.data).map(v => _params += `&${v}=${typeof this.data[v] === 'object' ? JSON.stringify(this.data[v]) : this.data[v]}`)
        _params = '?' + _params.substr(1, _params.length)
        let _fetch = fetch(this.url + _params, Object.assign(defaultParams, { headers: this.header }))
        preMethod.map(v => _fetch = _fetch.then(v))
        _fetch.catch(err_catch)
        return _fetch
    }
    let unGetFetch = (type) => {
        this.method = type
        matchUrl()
        let _params = ''
        if (this.header.get('Content-type') !== 'application/json') {
            Object.keys(this.data).map(v => _params += `&${v}=${typeof this.data[v] === 'object' ? JSON.stringify(this.data[v]) : this.data[v]}`)
            _params = _params.substr(1, _params.length)
        } else _params = JSON.stringify(this.data)
        let _fetch = fetch(this.url, Object.assign(defaultParams, { headers: this.header, body: _params, method: this.method }))
        preMethod.map(v => _fetch = _fetch.then(v))
        _fetch.catch(err_catch)
        return _fetch
    }
    this.put = (id) => {
        if (id && typeof id !== 'string') throw new Error(`put方法只接受string类型参数用于替换:id`)
        if (id)
            this.data['id'] = id
        return unGetFetch('put')
    }
    this.post = () => {
        return unGetFetch('post')
    }
    this.delete = (id) => {
        if (id && typeof id !== 'string') throw new Error(`delete方法只接受string类型参数用于替换:id`)
        if (id)
            this.data['id'] = id
        return unGetFetch('delete')
    }


}

