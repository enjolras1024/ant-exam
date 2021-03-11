(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.axios_retry = factory());
}(this, (function () { 'use strict';

  var SEED = 5381;

  function text2hash(x, h) {
    var i = x.length;

    if (arguments.length === 1) {
        h = SEED;
    }

    while (i) {
      h = (h * 33) ^ x.charCodeAt(--i);
    }

    return h;
  }

  var charsLength = 52;

  function code2char(code) {
    return String.fromCharCode(code + (code > 25 ? 39 : 97));
  }
    
  function hash2sign(code) {
    var name = '';
    var x;
    for (x = Math.abs(code); x > charsLength; x = (x / charsLength) | 0) {
      name = code2char(x % charsLength) + name;
    }
    return (code2char(x % charsLength) + name);
  }

  function text2sign(text) {
    return hash2sign(text2hash(text));
  }

  var cache = {};

  // 处理请求参数中0与'0'等价的情况等
  function str(source) {
    if (source == null ||typeof source !== 'object') {
      return source;
    }
    var target = {};
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source === 'object') {
          target[key] = String(target[key]);
        } else {
          target[key] = target[key];
        }
      }
    }
    return target;
  }

  // 简单处理，暂时只考察以下几项配置，要求可序列化。
  // 序列化结果转成hashcode，再转成52位编码的简短字符串。
  function genKey(config) {
    return text2sign(JSON.stringify({
      url: config.url,
      data: str(config.data),
      method: config.method,
      params: str(config.params),
      headers: str(config.headers)
    }));
  }

  function clearCache(key, maxAge) {
    if (typeof maxAge !== 'number') {
      maxAge = 0;
    }
    if (maxAge === Infinity) {
      return;
    }
    setTimeout(function() {
      delete cache[key];
    }, maxAge);
  }

  function request(obj, retry, config) {
    axios(config)
    .then(function(response) {
      obj.response = response;
      var resolveCallbacks = obj.resolveCallbacks;
      for (var i = 0; i < resolveCallbacks.length; ++i) {
        resolveCallbacks[i](response);
      }
      clearCache(obj.key, retry.maxAge);
    }).catch(function(error) {
      if (obj.count < retry.count) {
        setTimeout(function() {
          console.warn('retry requesting', config);
          request(obj, retry, config);
        }, retry.sleep || 0);
        obj.count++;
      } else {
        obj.error = error;
        var rejectCallbacks = obj.rejectCallbacks;
        for (var i = 0; i < rejectCallbacks.length; ++i) {
          rejectCallbacks[i](error);
        }
        clearCache(obj.key, retry.maxAge);
      }
    });
  }

  /**
   * config同axios，增加了以下几个配置项
   * config.retry: {
  *   count: 0, // 重试次数，默认0
  *   sleep: 0, // 重试前休眠时间(ms)，默认0
  *   maxAge: 0 // 缓存时长(ms)，默认0。连续两次相同请求间隔不超过此值，则读取缓存，否则重新请求。
  * }
   */
  function axios_retry(config) {
    return new Promise(function(resolve, reject) {
      var retry = config.retry;
      if (!retry || typeof retry !== 'object') {
        retry = {
          count: 0,
          sleep: 0
        };
      } else if (typeof retry.count !== 'number') {
        retry.count = 0;
      }

      var key = genKey(config);
      var obj = cache[key];
      if (obj) {
        if (obj.error) {
          reject(obj.error);
        } else if (obj.response) {
          resolve(obj.response);
        } else {
          obj.rejectCallbacks.push(reject);
          obj.resolveCallbacks.push(resolve);
        }
        return;
      }

      obj = cache[key] = {
        key: key,
        count: 0,
        rejectCallbacks: [reject],
        resolveCallbacks: [resolve]
      };
      request(obj, retry, config);
    }); 
  }

  return axios_retry;

})));
