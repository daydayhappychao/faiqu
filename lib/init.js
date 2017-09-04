'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _baseUrl = '';
exports.baseUrl = _baseUrl;
var _preMethod = [];
exports.preMethod = _preMethod;
var _defaultParams = { credentials: 'include' };
exports.defaultParams = _defaultParams;
var _defaultHeader = { 'Content-type': 'application/x-www-form-urlencoded' };
exports.defaultHeader = _defaultHeader;
var _defaultData = {};
exports.defaultData = _defaultData;
var _err_catch = function err_catch(err) {};

exports.err_catch = _err_catch;
var faiquInit = exports.faiquInit = {
    baseUrl: function baseUrl(url) {
        exports.baseUrl = _baseUrl = url;
    },
    preMethod: function preMethod(methods) {
        exports.preMethod = _preMethod = methods;
    },
    defaultParams: function defaultParams(params) {
        exports.defaultParams = _defaultParams = params;
    },
    defaultHeader: function defaultHeader(headers) {
        exports.defaultHeader = _defaultHeader = {};
    },
    defaultData: function defaultData(data) {
        Object.keys(data).map(function (v) {
            if (typeof data[v] !== 'function') throw new Error('defaultData接受参数是string->function');
        });
        exports.defaultData = _defaultData = data;
    },
    err_catch: function err_catch(func) {
        if (typeof func !== 'function') {
            throw new Error('err_catch接受参数是function');
        }
        exports.err_catch = _err_catch = func;
    }
};