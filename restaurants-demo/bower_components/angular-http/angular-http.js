!function(t){"use strict";var e=t.module("httpi",[]);e.factory("httpi",["$http","$q","HttpiResource",function r(t,e,n){function a(e){e.url=s(e.url,e.params,e.data,1!=e.keepTrailingSlash);var r=i(e),n=t(e);return n.abort=r,n}function i(t){if(t.timeout)return u;var r=function(){r.deferred.resolve()};return r.deferred=e.defer(),t.timeout=r.deferred.promise,r}function s(t,e,r,n){return e=e||{},r=r||{},t=t.replace(/(\(\s*|\s*\)|\s*\|\s*)/g,""),t=t.replace(/:([a-z]\w*)/gi,function(t,n){return o(r,e,n)||""}),t=t.replace(/(^|[^:])[\/]{2,}/g,"$1/"),n&&(t=t.replace(/\/+$/i,"")),t}function u(){console&&console.warn&&console.warn("This request cannot be aborted because the [timeout] property was already being used.")}function o(t,e,r,n){for(var a=Array.prototype.slice.call(arguments),n=a.pop(),i=null;i=a.shift();)if(i.hasOwnProperty(n))return p(i,n)}function p(t,e){var r=t[e];return delete t[e],r}return a.resource=function(t){return new n(a,t)},a}]),e.factory("HttpiResource",function n(){function t(t,e){return this._http=t,this._url=e,this._keepTrailingSlash=!1,this}return t.prototype={constructor:t,"delete":function(t){return this._makeHttpRequest("delete",t)},get:function(t){return this._makeHttpRequest("get",t)},head:function(t){return this._makeHttpRequest("head",t)},jsonp:function(t){return this._makeHttpRequest("jsonp",t)},post:function(t){return this._makeHttpRequest("post",t)},put:function(t){return this._makeHttpRequest("put",t)},setKeepTrailingSlash:function(t){return this._keepTrailingSlash=t,this},_makeHttpRequest:function(t,e){return e=e||{},e.method=t,e.url=this._url,e.hasOwnProperty("keepTrailingSlash")||(e.keepTrailingSlash=this._keepTrailingSlash),"jsonp"===e.method&&this._paramJsonpCallback(e),this._http(e)},_paramJsonpCallback:function(t){var e="JSON_CALLBACK";if(-1===this._url.indexOf(e)){if(t.params){for(var r in t.params)if(t.params.hasOwnProperty(r)&&t.params[r]===e)return}else t.params={};t.params.callback=e}}},t})}(angular);
;(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else {
    // Browser globals
    root.amdWeb = factory(root.angular);
  }
}(this, function (angular) {
  'use strict';

  var module = angular.module('sa.http', ['httpi']);

  module.provider('$resource', [function() {
    this.apiUrl = '';

    this.$get = ['httpi', '$q', function(httpi, $q) {
      var resource;

      /**
       * Set the resource url
       *
       * @param String url Url to query
       * @param String apiUrl api endpoint
       *
       * @returns HttpiResource
       */
      var url = function(url, apiUrl) {
        apiUrl = apiUrl || this.apiUrl;

        resource = httpi.resource(apiUrl + url);

        return this;
      };

      /**
       * Perform a get request
       *
       * @param object data Data to send to server
       * @param cache enable cahche or not
       *
       * @return object Promise with resolved data
       */
      var get = function(params, cache) {
        if (typeof cache === 'undefined') {
          cache = true;
        }

        return resource.get({ params: params, cache: cache })
          .then(handleSuccess, handleError);
      };

      /**
       * Perform a post request
       *
       * @param object data Data to send to server
       *
       * @return object Promise with resolved data
       */
      var post = function(data) {
        return resource.post({data: data}).then(handleSuccess, handleError);
      };

      var put = function(data) {
        return resource.put({data: data}).then(handleSuccess, handleError);
      };

      var remove = function(data) {
        return resource.delete({data: data}).then(handleSuccess, handleError);
      };

      var head = function(data) {
        return resource.head({data: data}).then(handleSuccess, handleError);
      };

      var jsonp = function(data) {
        return resource.jsonp({data: data}).then(handleSuccess, handleError);
      };

      var setKeepTrailingSlash = function(value) {
        return resource.setKeepTrailingSlash(value);
      };

      /**
       * Handle Http request success
       *
       * @param response
       */
      var handleSuccess = function(response) {
        return response.data;
      };

      /**
       * Handle Http errors
       *
       * @param object response Response from server
       */
      var handleError = function(response) {
        var statusText = response.statusText,
            status = response.status,
            error = {status: status, statusText: statusText};

        if (response && response.error) {
          error.error = response.error;

          return( $q.reject(error) );
        }

        return($q.reject(response));
      };

      return {
        apiUrl: this.apiUrl,
        url: url,
        get: get,
        post: post,
        put: put,
        delete: remove,
        head: head,
        jsonp: jsonp,
        setKeepTrailingSlash: setKeepTrailingSlash
      };
    }];

  }]);

}));


