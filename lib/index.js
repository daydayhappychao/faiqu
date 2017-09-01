'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.faiquInit = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _init = require('./init');

Object.defineProperty(exports, 'faiquInit', {
    enumerable: true,
    get: function get() {
        return _init.faiquInit;
    }
});
exports.default = faiqu;
function faiqu(url) {
    var _this = this;

    if (typeof url !== 'string') throw new Error('faiqu方法的参数为一个字符串');
    if (!(this instanceof faiqu)) return new faiqu(url);

    //*params init
    this.url = _init.baseUrl + url;
    if (url.substr(0, 6) === 'http://') this.url = url;
    this.data = {};
    this.header = new Headers();
    this.method = '';

    //*push defalutHeader to header
    Object.keys(_init.defaultHeader).map(function (v) {
        return _this.header.append(v, _init.defaultHeader[v]);
    });

    //*push defaultData to data
    Object.keys(_init.defaultData).map(function (v) {
        return _this.data[v] = _init.defaultData[v]();
    });

    //TODO 目前url匹配仅支持一个参数
    var matchUrl = function matchUrl() {
        var re = ':[a-zA-Z0-9]+';
        var result = _this.url.match(re);
        if (result) {
            var _index = result.index;
            var _length = result[0].length;
            var _result = result[0].substr(1, _length - 1);
            var hasKey = false;
            Object.keys(_this.data).map(function (v) {
                if (v == _result) {
                    hasKey = true;
                    _this.url = _this.url.replace(result[0], _this.data[v]);
                    delete _this.data[v];
                }
            });
            if (hasKey === false) throw new Error(result[0] + '\u672A\u88AB\u5339\u914D');
        }
    };
    this.json = function () {
        _this.header.set('Content-type', 'application/json');
        return _this;
    };
    this.params = function (params) {
        try {
            if (!params) throw new Error('没参数你调啥params,你说你484撒');
            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') throw new Error('params 方法只接受object形式的参数');
            Object.keys(params).map(function (v) {
                return _this.data[v] = params[v];
            });
            return _this;
        } catch (err) {
            (0, _init.err_catch)(err);
        }
    };

    this.headers = function (params) {
        try {
            if (!params) throw new Error('没参数你调啥headers,你说你484撒');
            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') throw new Error('headers 方法只接受object形式的参数');
            Object.keys(params).map(function (v) {
                return _this.header.append(v, params[v]);
            });
            return _this;
        } catch (err) {
            (0, _init.err_catch)(err);
        }
    };

    this.get = function () {
        _this.method = 'get';
        var _params = '';
        matchUrl();
        Object.keys(_this.data).map(function (v) {
            return _params += '&' + v + '=' + (_typeof(_this.data[v]) === 'object' ? JSON.stringify(_this.data[v]) : _this.data[v]);
        });
        _params = '?' + _params.substr(1, _params.length);
        var _fetch = fetch(_this.url + _params, Object.assign(_init.defaultParams, { headers: _this.header }));
        _init.preMethod.map(function (v) {
            return _fetch = _fetch.then(v);
        });
        _fetch.catch(_init.err_catch);
        return _fetch;
    };
    var unGetFetch = function unGetFetch(type) {
        _this.method = type;
        matchUrl();
        var _params = '';
        if (_this.header.get('Content-type') !== 'application/json') {
            Object.keys(_this.data).map(function (v) {
                return _params += '&' + v + '=' + (_typeof(_this.data[v]) === 'object' ? JSON.stringify(_this.data[v]) : _this.data[v]);
            });
            _params = _params.substr(1, _params.length);
        } else _params = JSON.stringify(_this.data);
        var _fetch = fetch(_this.url, Object.assign(_init.defaultParams, { headers: _this.header, body: _params, method: _this.method }));
        _init.preMethod.map(function (v) {
            return _fetch = _fetch.then(v);
        });
        _fetch.catch(_init.err_catch);
        return _fetch;
    };
    this.put = function (id) {
        if (id && typeof id !== 'string') throw new Error('put\u65B9\u6CD5\u53EA\u63A5\u53D7string\u7C7B\u578B\u53C2\u6570\u7528\u4E8E\u66FF\u6362:id');
        if (id) _this.data['id'] = id;
        return unGetFetch('put');
    };
    this.post = function () {
        return unGetFetch('post');
    };
    this.delete = function (id) {
        if (id && typeof id !== 'string') throw new Error('delete\u65B9\u6CD5\u53EA\u63A5\u53D7string\u7C7B\u578B\u53C2\u6570\u7528\u4E8E\u66FF\u6362:id');
        if (id) _this.data['id'] = id;
        return unGetFetch('delete');
    };
}