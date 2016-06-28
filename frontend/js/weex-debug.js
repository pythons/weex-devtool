(this.nativeLog || function(s) {console.log(s)})('START ALI WEEX-HTML5: 0.2.24 BUILD 20160615');
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(152);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;var require;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */
	
	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }
	
	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }
	
	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }
	
	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }
	
	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;
	
	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }
	
	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }
	
	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }
	
	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
	
	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';
	
	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }
	
	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });
	
	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }
	
	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }
	
	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }
	
	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];
	
	        callback(arg);
	
	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }
	
	      lib$es6$promise$asap$$len = 0;
	    }
	
	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(6);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }
	
	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;
	
	      var child = new this.constructor(lib$es6$promise$$internal$$noop);
	
	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }
	
	      var state = parent._state;
	
	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }
	
	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }
	
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);
	
	    function lib$es6$promise$$internal$$noop() {}
	
	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;
	
	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }
	
	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }
	
	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;
	
	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }
	
	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }
	
	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }
	
	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }
	
	      lib$es6$promise$$internal$$publish(promise);
	    }
	
	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	
	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;
	
	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }
	
	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;
	
	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }
	
	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;
	
	      parent._onerror = null;
	
	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;
	
	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }
	
	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;
	
	      if (subscribers.length === 0) { return; }
	
	      var child, callback, detail = promise._result;
	
	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];
	
	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }
	
	      promise._subscribers.length = 0;
	    }
	
	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }
	
	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();
	
	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }
	
	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;
	
	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);
	
	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }
	
	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }
	
	      } else {
	        value = detail;
	        succeeded = true;
	      }
	
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }
	
	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }
	
	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }
	
	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }
	
	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;
	
	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;
	
	
	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }
	
	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }
	
	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.
	
	      Terminology
	      -----------
	
	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.
	
	      A promise can be in one of three states: pending, fulfilled, or rejected.
	
	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.
	
	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.
	
	
	      Basic Usage:
	      ------------
	
	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);
	
	        // on failure
	        reject(reason);
	      });
	
	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Advanced Usage:
	      ---------------
	
	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.
	
	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();
	
	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();
	
	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }
	
	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```
	
	      Unlike callbacks, promises are great composable primitives.
	
	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON
	
	        return values;
	      });
	      ```
	
	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];
	
	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }
	
	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;
	
	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,
	
	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.
	
	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```
	
	      Chaining
	      --------
	
	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.
	
	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });
	
	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	
	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```
	
	      Assimilation
	      ------------
	
	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```
	
	      If the assimliated promise rejects, then the downstream promise will also reject.
	
	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```
	
	      Simple Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var result;
	
	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```
	
	      Advanced Example
	      --------------
	
	      Synchronous Example
	
	      ```javascript
	      var author, books;
	
	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```
	
	      Errback Example
	
	      ```js
	
	      function foundBooks(books) {
	
	      }
	
	      function failure(reason) {
	
	      }
	
	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```
	
	      Promise Example;
	
	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,
	
	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.
	
	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }
	
	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }
	
	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```
	
	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);
	
	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }
	
	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;
	
	        this._result = new Array(this.length);
	
	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }
	
	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;
	
	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;
	
	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);
	
	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;
	
	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;
	
	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }
	
	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };
	
	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;
	
	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;
	
	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }
	
	      var P = local.Promise;
	
	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }
	
	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;
	
	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };
	
	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(7)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }
	
	    lib$es6$promise$polyfill$$default();
	}).call(this);
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }()), __webpack_require__(5)(module)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	
	// import open source version of weex-html5
	// var weex = require('weex-html5')
	var weex = __webpack_require__(9)
	
	// extend loader
	var loadByMtop = __webpack_require__(127).loadByMtop
	
	var apis = __webpack_require__(128)
	weex.install(apis)
	
	var components = __webpack_require__(141)
	weex.install(components)
	
	// register loaders
	weex.registerLoader('loadByMtop', loadByMtop)
	
	global.weex = weex
	module.exports = weex
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	
	__webpack_require__(10)
	
	__webpack_require__(14)
	var config = __webpack_require__(16)
	var Loader = __webpack_require__(18)
	var utils = __webpack_require__(17)
	var protocol = __webpack_require__(19)
	var ComponentManager = __webpack_require__(20)
	var Component = __webpack_require__(27)
	var Sender = __webpack_require__(31)
	var receiver = __webpack_require__(32)
	
	// Components and apis.
	var components = __webpack_require__(33)
	var api = __webpack_require__(92)
	__webpack_require__(126)
	__webpack_require__(104)
	
	var WEAPP_STYLE_ID = 'weapp-style'
	
	var DEFAULT_DESIGN_WIDTH = 750
	var DEFAULT_SCALE = window.innerWidth / DEFAULT_DESIGN_WIDTH
	var DEFAULT_ROOT_ID = 'weex'
	var DEFAULT_JSONP_CALLBACK_NAME = 'weexJsonpCallback'
	
	window.WXEnvironment = {
	  weexVersion: config.weexVersion,
	  appName: lib.env.aliapp ? lib.env.aliapp.appname : null,
	  appVersion: lib.env.aliapp ? lib.env.aliapp.version.val : null,
	  platform: 'Web',
	  osName: lib.env.browser ? lib.env.browser.name : null,
	  osVersion: lib.env.browser ? lib.env.browser.version.val : null,
	  deviceWidth: DEFAULT_DESIGN_WIDTH,
	  deviceHeight: window.innerHeight / DEFAULT_SCALE
	}
	
	var _instanceMap = {}
	var _downgrades = {}
	
	var downgradable = ['list', 'scroller']
	
	; (function initializeWithUrlParams() {
	
	  var params = lib.httpurl(location.href).params
	  for (var k in params) {
	    // Get global _downgrades from url's params.
	    var match = k.match(/downgrade_(\w+)/)
	    if (!match || !match[1]) {
	      continue
	    }
	    if (params[k] !== true && params[k] !== 'true') {
	      continue
	    }
	    var downk = match[1]
	    if (downk && (downgradable.indexOf(downk) !== -1)) {
	      _downgrades[downk] = true
	    }
	  }
	
	  // set global 'debug' config to true if there's a debug flag in current url.
	  var debug = params['debug']
	  if (debug === true || debug === 'true') {
	    config.debug = true
	  }
	
	})()
	
	__webpack_require__(15).init()
	
	function Weex(options) {
	
	  if (!(this instanceof Weex)) {
	    return new Weex(options)
	  }
	
	  // Width of the root container. Default is window.innerWidth.
	  this.width = options.width || window.innerWidth
	  this.bundleUrl = options.bundleUrl || location.href
	  this.instanceId = options.appId
	  this.rootId = options.rootId || (DEFAULT_ROOT_ID + utils.getRandom(10))
	  this.designWidth = options.designWidth || DEFAULT_DESIGN_WIDTH
	  this.jsonpCallback = options.jsonpCallback || DEFAULT_JSONP_CALLBACK_NAME
	  this.source = options.source
	  this.loader = options.loader
	  this.embed = options.embed ? true : false
	
	  this.data = options.data
	
	  this.initDowngrades(options.downgrade)
	  this.initScale()
	  this.initComponentManager()
	  this.initBridge()
	  Weex.addInstance(this)
	
	  protocol.injectWeexInstance(this)
	
	  this.loadBundle(function (err, appCode) {
	    if (!err) {
	      this.createApp(config, appCode)
	    } else {
	      console.error('load bundle err:', err)
	    }
	  }.bind(this))
	
	}
	
	Weex.init = function (options) {
	  if (utils.isArray(options)) {
	    options.forEach(function (config) {
	      new Weex(config)
	    })
	  } else if (
	      Object.prototype.toString.call(options).slice(8, -1) === 'Object'
	    ) {
	    new Weex(options)
	  }
	}
	
	Weex.addInstance = function (instance) {
	  _instanceMap[instance.instanceId] = instance
	}
	
	Weex.getInstance = function (instanceId) {
	  return _instanceMap[instanceId]
	}
	
	Weex.prototype = {
	
	  initDowngrades: function (dg) {
	    this.downgrades = utils.extend({}, _downgrades)
	    // Get downgrade component type from user's specification
	    // in weex's init options.
	    if (!utils.isArray(dg)) {
	      return
	    }
	    for (var i = 0, l = dg.length; i < l; i++) {
	      var downk = dg[i]
	      if (downgradable.indexOf(downk) !== -1) {
	        this.downgrades[downk] = true
	      }
	    }
	  },
	
	  initBridge: function () {
	    receiver.init(this)
	    this.sender = new Sender(this)
	  },
	
	  loadBundle: function (cb) {
	    Loader.load({
	      jsonpCallback: this.jsonpCallback,
	      source: this.source,
	      loader: this.loader
	    }, cb)
	  },
	
	  createApp: function (config, appCode) {
	    var root = document.querySelector('#' + this.rootId)
	    if (!root) {
	      root = document.createElement('div')
	      root.id = this.rootId
	      document.body.appendChild(root)
	    }
	
	    var promise = window.createInstance(
	      this.instanceId
	      , appCode
	      , {
	        bundleUrl: this.bundleUrl,
	        debug: config.debug
	      }
	      , this.data
	    )
	
	    if (Promise && promise instanceof Promise) {
	      promise.then(function () {
	        // Weex._instances[this.instanceId] = this.root
	      }.bind(this)).catch(function (err) {
	        if (err && config.debug) {
	          console.error(err)
	        }
	      })
	    }
	
	    // Do not destroy instance here, because in most browser
	    // press back button to back to this page will not refresh
	    // the window and the instance will not be recreated then.
	    // window.addEventListener('beforeunload', function (e) {
	    // })
	
	  },
	
	  initScale: function () {
	    this.scale = this.width / this.designWidth
	  },
	
	  initComponentManager: function () {
	    this._componentManager = new ComponentManager(this)
	  },
	
	  getComponentManager: function () {
	    return this._componentManager
	  },
	
	  getRoot: function () {
	    return document.querySelector('#' + this.rootId)
	  }
	}
	
	Weex.appendStyle = function (css) {
	  utils.appendStyle(css, WEAPP_STYLE_ID)
	},
	
	// Register a new component with the specified name.
	Weex.registerComponent = function (name, comp) {
	  ComponentManager.registerComponent(name, comp)
	},
	
	// Register a new api module.
	// If the module already exists, just add methods from the
	// new module to the old one.
	Weex.registerApiModule = function (name, module, meta) {
	  if (!protocol.apiModule[name]) {
	    protocol.apiModule[name] = module
	  } else {
	    for (var key in module) {
	      if (module.hasOwnProperty(key)) {
	        protocol.apiModule[name][key] = module[key]
	      }
	    }
	  }
	  // register API module's meta info to jsframework
	  if (meta) {
	    protocol.setApiModuleMeta(meta)
	    window.registerModules(protocol.getApiModuleMeta(name), true)
	  }
	},
	
	// Register a new api method for the specified module.
	// opts:
	//  - args: type of arguments the API method takes such
	//    as ['string', 'function']
	Weex.registerApi = function (moduleName, name, method, args) {
	  if (typeof method !== 'function') {
	    return
	  }
	  if (!protocol.apiModule[moduleName]) {
	    protocol.apiModule[moduleName] = {}
	    protocol._meta[moduleName] = []
	  }
	  protocol.apiModule[moduleName][name] = method
	  if (!args) {
	    return
	  }
	  // register API meta info to jsframework
	  protocol.setApiMeta(moduleName, {
	    name: name,
	    args: args
	  })
	  window.registerModules(protocol.getApiModuleMeta(moduleName, meta), true)
	},
	
	// Register a new weex-bundle-loader.
	Weex.registerLoader = function (name, loaderFunc) {
	  Loader.registerLoader(name, loaderFunc)
	}
	
	// To install components and plugins.
	Weex.install = function (mod) {
	  mod.init(Weex)
	}
	
	Weex.stopTheWorld = function () {
	  for (var instanceId in _instanceMap) {
	    if (_instanceMap.hasOwnProperty(instanceId)) {
	      window.destroyInstance(instanceId)
	    }
	  }
	}
	
	(function startRefreshController() {
	  if (location.search.indexOf('hot-reload_controller') === -1)  {
	    return
	  }
	  if (!window.WebSocket) {
	    console.info('auto refresh need WebSocket support')
	    return
	  }
	  var host = location.hostname
	  var port = 8082
	  var client = new WebSocket('ws://' + host + ':' + port + '/',
	    'echo-protocol'
	  )
	  client.onerror = function () {
	    console.log('refresh controller websocket connection error')
	  }
	  client.onmessage = function (e) {
	    console.log('Received: \'' + e.data + '\'')
	    if (e.data  === 'refresh') {
	      location.reload()
	    }
	  }
	}())
	
	// Weex.install(require('weex-components'))
	Weex.install(components)
	Weex.install(api)
	
	Weex.Component = Component
	Weex.ComponentManager = ComponentManager
	Weex.utils = utils
	Weex.config = config
	
	global.weex = Weex
	module.exports = Weex
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./base.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./base.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "* {\n  margin: 0;\n  padding: 0;\n  text-size-adjust: none;\n}\n\nul, ol {\n  list-style: none;\n}\n", ""]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var logger = __webpack_require__(15)
	
	if (!window.Promise) {
	  logger.warn('native Promise is missing, using polyfill instead.')
	  __webpack_require__(3)
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var config = __webpack_require__(16)
	var utils = __webpack_require__(17)
	
	var _initialized = false
	
	var logger = {
	  log: function () {},
	  warn: function () {},
	  error: function () {}
	}
	
	function hijack(k) {
	  if (utils.isArray(k)) {
	    k.forEach(function (key) {
	      hijack(key)
	    })
	  } else {
	    if (console[k]) {
	      logger[k] = function () {
	        console[k].apply(
	          console,
	          ['[h5-render]'].concat(Array.prototype.slice.call(arguments, 0))
	        )
	      }
	    }
	  }
	}
	
	logger.init = function () {
	  if (_initialized) {
	    return
	  }
	  _initialized = true
	  if (config.debug && console) {
	    hijack(['log', 'warn', 'error'])
	  }
	}
	
	module.exports = logger

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict'
	
	var config = {
	
	  weexVersion: '0.5.0',
	
	  debug: false
	
	}
	
	module.exports = config

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict'
	
	var WEAPP_STYLE_ID = 'weapp-style'
	
	var _isWebpSupported = false
	
	; (function isSupportWebp() {
	  try {
	    var webP = new Image()
	    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdA'
	              + 'SoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	    webP.onload = function () {
	      if (webP.height === 2) {
	        _isWebpSupported = true
	      }
	    }
	  } catch (e) {
	    // do nothing.
	  }
	})()
	
	function extend(to, from) {
	  for (var key in from) {
	    to[key] = from[key]
	  }
	  return to
	}
	
	function isArray(arr) {
	  return Array.isArray
	    ? Array.isArray(arr)
	    : (Object.prototype.toString.call(arr) === '[object Array]')
	}
	
	function appendStyle(css, styleId, replace) {
	  var style = document.getElementById(styleId)
	  if (style && replace) {
	    style.parentNode.removeChild(style)
	    style = null
	  }
	  if (!style) {
	    style = document.createElement('style')
	    style.type = 'text/css'
	    styleId && (style.id = styleId)
	    document.getElementsByTagName('head')[0].appendChild(style)
	  }
	  style.appendChild(document.createTextNode(css))
	}
	
	function getUniqueFromArray(arr) {
	  if (!isArray(arr)) {
	    return []
	  }
	  var res = []
	  var unique = {}
	  var val
	  for (var i = 0, l = arr.length; i < l; i++) {
	    val = arr[i]
	    if (unique[val]) {
	      continue
	    }
	    unique[val] = true
	    res.push(val)
	  }
	  return res
	}
	
	function transitionize(element, props) {
	  var transitions = []
	  for (var key in props) {
	    transitions.push(key + ' ' + props[key])
	  }
	  element.style.transition = transitions.join(', ')
	  element.style.webkitTransition = transitions.join(', ')
	}
	
	function detectWebp() {
	  return _isWebpSupported
	}
	
	function getRandom(num) {
	  var _defaultNum = 10
	  if (typeof num !== 'number' || num <= 0) {
	    num = _defaultNum
	  }
	  var _max = Math.pow(10, num)
	  return Math.floor(Date.now() + Math.random() * _max) % _max
	}
	
	function getRgb(color) {
	  var match
	  color = color + ''
	  if (match = color.match(/#(\d{2})(\d{2})(\d{2})/)) {
	    return {
	      r: parseInt(match[1], 16),
	      g: parseInt(match[2], 16),
	      b: parseInt(match[3], 16)
	    }
	  }
	  if (match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)) {
	    return {
	      r: parseInt(match[1]),
	      g: parseInt(match[2]),
	      b: parseInt(match[3])
	    }
	  }
	}
	
	// direction: 'l' | 'r', default is 'r'
	// num: how many times to loop, should be a positive integer
	function loopArray(arr, num, direction) {
	  if (!isArray(arr)) {
	    return
	  }
	  var isLeft = (direction + '').toLowerCase() === 'l'
	  var len = arr.length
	  num = num % len
	  if (num < 0) {
	    num = -num
	    isLeft = !isLeft
	  }
	  if (num === 0) {
	    return arr
	  }
	  var res, lp, rp
	  if (isLeft) {
	    lp = arr.slice(0, num)
	    rp = arr.slice(num)
	  } else {
	    lp = arr.slice(0, len - num)
	    rp = arr.slice(len - num)
	  }
	  return rp.concat(lp)
	}
	
	// pad a integer number with zeros on the left.
	// example: fillInt(12, 3) -> '012'
	// - num: the number to pad
	// - len: the specified length
	function leftPad(num, len) {
	  if (len <= 0) {
	    return num
	  }
	  var numLen = (num + '').length
	  if (numLen >= len) {
	    return num
	  }
	  return new Array(len - numLen + 1).join('0') + num
	}
	
	// get DateStr with specified separator like '2016-06-03'
	function getDateStr(separator) {
	  var dt = new Date()
	  var y = dt.getFullYear()
	  var m = leftPad(dt.getMonth() + 1, 2)
	  var d = leftPad(dt.getDate(), 2)
	  return [y, m, d].join(separator || '')
	}
	
	module.exports = {
	  extend: extend,
	  isArray: isArray,
	  appendStyle: appendStyle,
	  getUniqueFromArray: getUniqueFromArray,
	  transitionize: transitionize,
	  detectWebp: detectWebp,
	  getRandom: getRandom,
	  getRgb: getRgb,
	  loopArray: loopArray,
	  leftPad: leftPad,
	  getDateStr: getDateStr
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict'
	
	function loadByXHR(config, callback) {
	  if (!config.source) {
	    callback(new Error('xhr loader: missing config.source.'))
	  }
	  var xhr = new XMLHttpRequest()
	  xhr.open('GET', config.source)
	  xhr.onload = function () {
	    callback(null, this.responseText)
	  }
	  xhr.onerror = function (error) {
	    callback(error)
	  }
	  xhr.send()
	}
	
	function loadByJsonp(config, callback) {
	  if (!config.source) {
	    callback(new Error('jsonp loader: missing config.source.'))
	  }
	  var callbackName = config.jsonpCallback || 'weexJsonpCallback'
	  window[callbackName] = function (code) {
	    if (code) {
	      callback(null, code)
	    } else {
	      callback(new Error('load by jsonp error'))
	    }
	  }
	  var script = document.createElement('script')
	  script.src = decodeURIComponent(config.source)
	  script.type = 'text/javascript'
	  document.body.appendChild(script)
	}
	
	function loadBySourceCode(config, callback) {
	  // src is the jsbundle.
	  // no need to fetch from anywhere.
	  if (config.source) {
	    callback(null, config.source)
	  } else {
	    callback(new Error('source code laoder: missing config.source.'))
	  }
	}
	
	var callbackMap = {
	  xhr: loadByXHR,
	  jsonp: loadByJsonp,
	  source: loadBySourceCode
	}
	
	function load(options, callback) {
	  var loadFn = callbackMap[options.loader]
	  loadFn(options, callback)
	}
	
	function registerLoader(name, loaderFunc) {
	  if (typeof loaderFunc === 'function') {
	    callbackMap[name] = loaderFunc
	  }
	}
	
	module.exports = {
	  load: load,
	  registerLoader: registerLoader
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var extend = __webpack_require__(17).extend
	var isArray = __webpack_require__(17).isArray
	var ComponentManager = __webpack_require__(20)
	
	// for jsframework to register modules.
	var _registerModules = function (config) {
	  if (isArray(config)) {
	    for (var i = 0, l = config.length; i < l; i++) {
	      window.registerModules(config[i])
	    }
	  } else {
	    window.registerModules(config)
	  }
	}
	
	var protocol = {
	
	  // weex instances
	  _instances: {},
	
	  // api meta info
	  _meta: {},
	
	  // Weex.registerApiModule used this to register and access apiModules.
	  apiModule: {},
	
	  injectWeexInstance: function (instance) {
	    this._instances[instance.instanceId] = instance
	  },
	
	  getWeexInstance: function (instanceId) {
	    return this._instances[instanceId]
	  },
	
	  // get the api method meta info array for the module.
	  getApiModuleMeta: function (moduleName) {
	    var metaObj = {}
	    metaObj[moduleName] = this._meta[moduleName]
	    return metaObj
	  },
	
	  // Set meta info for a api module.
	  // If there is a same named api, just replace it.
	  // opts:
	  // - metaObj: meta object like
	  // {
	  //    dom: [{
	  //      name: 'addElement',
	  //      args: ['string', 'object']
	  //    }]
	  // }
	  setApiModuleMeta: function (metaObj) {
	    var moduleName
	    for (var k in metaObj) {
	      if (metaObj.hasOwnProperty(k)) {
	        moduleName = k
	      }
	    }
	    var metaArray = this._meta[moduleName]
	    if (!metaArray) {
	      this._meta[moduleName] = metaObj[moduleName]
	    } else {
	      var nameObj = {}
	      metaObj[moduleName].forEach(function (api) {
	        nameObj[api.name] = api
	      })
	      metaArray.forEach(function (api, i) {
	        if (nameObj[api.name]) {
	          metaArray[i] = nameObj[api.name]
	          delete nameObj[api.name]
	        }
	      })
	      for (var k in metaObj) {
	        if (metaObj.hasOwnProperty(k)) {
	          metaArray.push(metaObj[k])
	        }
	      }
	    }
	    this._meta[moduleName] = metaObj[moduleName]
	  },
	
	  // Set meta info for a single api.
	  // opts:
	  //  - moduleName: api module name.
	  //  - meta: a meta object like:
	  //  {
	  //    name: 'addElement',
	  //    args: ['string', 'object']
	  //  }
	  setApiMeta: function (moduleName, meta) {
	    var metaArray = this._meta[moduleName]
	    if (!metaArray) {
	      this._meta[moduleName] = [meta]
	    } else {
	      var metaIdx = -1
	      metaArray.forEach(function (api, i) {
	        if (meta.name === name) {
	          metaIdx = i
	        }
	      })
	      if (metaIdx !== -1) {
	        metaArray[metaIdx] = meta
	      } else {
	        metaArray.push(meta)
	      }
	    }
	  }
	}
	
	_registerModules([{
	  modal: [{
	    name: 'toast',
	    args: ['object', 'function']
	  }, {
	    name: 'alert',
	    args: ['object', 'function']
	  }, {
	    name: 'confirm',
	    args: ['object', 'function']
	  }, {
	    name: 'prompt',
	    args: ['object', 'function']
	  }]
	}, {
	  animation: [{
	    name: 'transition',
	    args: ['string', 'object', 'function']
	  }]
	}])
	
	module.exports = protocol


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var config = __webpack_require__(16)
	var FrameUpdater = __webpack_require__(21)
	var AppearWatcher = __webpack_require__(22)
	var utils = __webpack_require__(17)
	var LazyLoad = __webpack_require__(23)
	var animation = __webpack_require__(26)
	
	var RENDERING_INDENT = 800
	
	var _instanceMap = {}
	var typeMap = {}
	var scrollableTypes = [
	  'scroller',
	  'hscroller',
	  'vscroller',
	  'list',
	  'hlist',
	  'vlist'
	]
	
	function ComponentManager(instance) {
	  this.instanceId = instance.instanceId
	  this.weexInstance = instance
	  this.componentMap = {}
	  _instanceMap[this.instanceId] = this
	}
	
	ComponentManager.getInstance = function (instanceId) {
	  return _instanceMap[instanceId]
	}
	
	ComponentManager.getWeexInstance = function (instanceId) {
	  return _instanceMap[instanceId].weexInstance
	}
	
	ComponentManager.registerComponent = function (type, definition) {
	  typeMap[type] = definition
	}
	
	ComponentManager.getScrollableTypes = function () {
	  return scrollableTypes
	}
	
	ComponentManager.prototype = {
	
	  // Fire a event 'renderbegin'/'renderend' on body element.
	  rendering: function () {
	    function _renderingEnd() {
	      // get weex instance root
	      window.dispatchEvent(new Event('renderend'))
	      this._renderingTimer = null
	    }
	    if (this._renderingTimer) {
	      clearTimeout(this._renderingTimer)
	      this._renderingTimer = setTimeout(
	        _renderingEnd.bind(this),
	        RENDERING_INDENT
	      )
	    } else {
	      window.dispatchEvent(new Event('renderbegin'))
	      this._renderingTimer = setTimeout(
	        _renderingEnd.bind(this),
	        RENDERING_INDENT
	      )
	    }
	  },
	
	  getElementByRef: function (ref) {
	    return this.componentMap[ref]
	  },
	
	  removeElementByRef: function (ref) {
	    var cmp
	    var self = this
	    if (!ref || !(cmp = this.componentMap[ref])) {
	      return
	    }
	    // remove from this.componentMap cursively
	    (function _removeCursively(_ref) {
	      var child = self.componentMap[_ref]
	      var listeners = child._listeners
	      var children = child.data.children
	      if (children && children.length) {
	        for (var i = 0, l = children.length; i < l; i++) {
	          _removeCursively(children[i].ref)
	        }
	      }
	      // remove events from _ref component
	      if (listeners) {
	        for (var type in listeners) {
	          child.node.removeEventListener(type, listeners[type])
	        }
	      }
	      delete child._listeners
	      delete child.node._listeners
	      // remove _ref component
	      delete self.componentMap[_ref]
	    })(ref)
	
	  },
	
	  createElement: function (data, nodeType) {
	    var ComponentType = typeMap[data.type]
	    if (!ComponentType) {
	      ComponentType = typeMap['container']
	    }
	
	    var ref = data.ref
	    var component = new ComponentType(data, nodeType)
	
	    this.componentMap[ref] = component
	    component.node.setAttribute('data-ref', ref)
	
	    return component
	  },
	
	  /**
	   * createBody: generate root component
	   * @param  {object} element
	   */
	  createBody: function (element) {
	
	    // TODO: creatbody on document.body
	    // no need to create a extra div
	    var root, body, nodeType
	    if (this.componentMap['_root']) {
	      return
	    }
	
	    nodeType = element.type
	    element.type = 'root'
	    element.rootId = this.weexInstance.rootId
	    element.ref = '_root'
	
	    var root = this.createElement(element, nodeType)
	    body = document.querySelector('#' + this.weexInstance.rootId)
	          || document.body
	    body.appendChild(root.node)
	    root._appended = true
	  },
	
	  appendChild: function (parentRef, data) {
	    var parent = this.componentMap[parentRef]
	
	    if (this.componentMap[data.ref] || !parent) {
	      return
	    }
	
	    if (parentRef === '_root' && !parent) {
	      parent = this.createElement({
	        type: 'root',
	        rootId: this.weexInstance.rootId,
	        ref: '_root'
	      })
	      parent._appended = true
	    }
	
	    var child = parent.appendChild(data)
	
	    // In some parent component the implementation of method
	    // appendChild didn't return the component at all, therefor
	    // child maybe a undefined object.
	    if (child) {
	      child.parentRef = parentRef
	    }
	
	    if (child && parent._appended) {
	      this.handleAppend(child)
	    }
	  },
	
	  appendChildren: function (ref, elements) {
	    for (var i = 0; i < elements.length; i++) {
	      this.appendChild(ref, elements[i])
	    }
	  },
	
	  removeElement: function (ref) {
	    var component = this.componentMap[ref]
	
	    // fire event for rendering dom on body elment.
	    this.rendering()
	
	    if (component && component.parentRef) {
	      var parent = this.componentMap[component.parentRef]
	      component.onRemove && component.onRemove()
	      parent.removeChild(component)
	    } else {
	      console.warn('ref: ', ref)
	    }
	  },
	
	  moveElement: function (ref, parentRef, index) {
	    var component = this.componentMap[ref]
	    var newParent = this.componentMap[parentRef]
	    var oldParentRef = component.parentRef
	    var children, before, i, l
	    if (!component || !newParent) {
	      console.warn('ref: ', ref)
	      return
	    }
	
	    // fire event for rendering.
	    this.rendering()
	
	    if (index < -1) {
	      index = -1
	      console.warn('index cannot be less than -1.')
	    }
	
	    children = newParent.data.children
	    if (children
	        && children.length
	        && index !== -1
	        && index < children.length) {
	      before = this.componentMap[newParent.data.children[index].ref]
	    }
	
	    // remove from oldParent.data.children
	    if (oldParentRef && this.componentMap[oldParentRef]) {
	      children = this.componentMap[oldParentRef].data.children
	      if (children && children.length) {
	        for (i = 0, l = children.length; i < l; i++) {
	          if (children[i].ref === ref) {
	            break
	          }
	        }
	        if (l > i) {
	          children.splice(i, 1)
	        }
	      }
	    }
	
	    newParent.insertBefore(component, before)
	
	    component.onMove && component.onMove(parentRef, index)
	
	  },
	
	  insertBefore: function (ref, data) {
	    var child, before, parent
	    before = this.componentMap[ref]
	    child = this.componentMap[data.ref]
	    before && (parent = this.componentMap[before.parentRef])
	    if (child || !parent || !before) {
	      return
	    }
	
	    child = this.createElement(data)
	    if (child) {
	      child.parentRef = before.parentRef
	      parent.insertBefore(child, before)
	    } else {
	      return
	    }
	
	    if (this.componentMap[before.parentRef]._appended) {
	      this.handleAppend(child)
	    }
	  },
	
	  /**
	   * addElement
	   * If index is larget than any child's index, the
	   * element will be appended behind.
	   * @param {string} parentRef
	   * @param {obj} element (data of the component)
	   * @param {number} index
	   */
	  addElement: function (parentRef, element, index) {
	    var parent, children, before
	
	    // fire event for rendering dom on body elment.
	    this.rendering()
	
	    parent = this.componentMap[parentRef]
	    if (!parent) {
	      return
	    }
	    children = parent.data.children
	    // -1 means append as the last.
	    if (index < -1) {
	      index = -1
	      console.warn('index cannot be less than -1.')
	    }
	    if (children && children.length
	        && children.length > index
	        && index !== -1) {
	      this.insertBefore(children[index].ref, element)
	    } else {
	      this.appendChild(parentRef, element)
	    }
	  },
	
	  clearChildren: function (ref) {
	    var component = this.componentMap[ref]
	    if (component) {
	      component.node.innerHTML = ''
	      if (component.data) {
	        component.data.children = null
	      }
	    }
	  },
	
	  addEvent: function (ref, type) {
	    var component
	    if (typeof ref === 'string' || typeof ref === 'number') {
	      component = this.componentMap[ref]
	    } else if (Object.prototype.toString.call(ref).slice(8, -1) === 'Object') {
	      component = ref
	      ref = component.data.ref
	    }
	    if (component && component.node) {
	      var sender = this.weexInstance.sender
	      var listener = sender.fireEvent.bind(sender, ref, type)
	      var listeners = component._listeners
	      component.node.addEventListener(type, listener, false, false)
	      if (!listeners) {
	        listeners = component._listeners = {}
	        component.node._listeners = {}
	      }
	      listeners[type] = listener
	      component.node._listeners[type] = listener
	    }
	  },
	
	  removeEvent: function (ref, type) {
	    var component = this.componentMap[ref]
	    var listener = component._listeners[type]
	    if (component && listener) {
	      component.node.removeEventListener(type, listener)
	      component._listeners[type] = null
	      component.node._listeners[type] = null
	    }
	  },
	
	  updateAttrs: function (ref, attr) {
	    var component = this.componentMap[ref]
	    if (component) {
	      component.updateAttrs(attr)
	      if (component.data.type === 'image' && attr.src) {
	        LazyLoad.startIfNeeded(component)
	      }
	    }
	  },
	
	  updateStyle: function (ref, style) {
	    var component = this.componentMap[ref]
	    if (component) {
	      component.updateStyle(style)
	    }
	  },
	
	  updateFullAttrs: function (ref, attr) {
	    var component = this.componentMap[ref]
	    if (component) {
	      component.clearAttr()
	      component.updateAttrs(attr)
	      if (component.data.type === 'image' && attr.src) {
	        LazyLoad.startIfNeeded(component)
	      }
	    }
	  },
	
	  updateFullStyle: function (ref, style) {
	    var component = this.componentMap[ref]
	    if (component) {
	      component.clearStyle()
	      component.updateStyle(style)
	    }
	  },
	
	  handleAppend: function (component) {
	    component._appended = true
	    component.onAppend && component.onAppend()
	
	    // invoke onAppend on children recursively
	    var children = component.data.children
	    if (children) {
	      for (var i = 0; i < children.length; i++) {
	        var child = this.componentMap[children[i].ref]
	        if (child) {
	          this.handleAppend(child)
	        }
	      }
	    }
	
	    // watch appear/disappear of the component if needed
	    AppearWatcher.watchIfNeeded(component)
	
	    // do lazyload if needed
	    LazyLoad.startIfNeeded(component)
	  },
	
	  transition: function (ref, config, callback) {
	    var component = this.componentMap[ref]
	    animation.transitionOnce(component, config, callback)
	  },
	
	  renderFinish: function () {
	    FrameUpdater.pause()
	  }
	}
	
	module.exports = ComponentManager


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict'
	
	var raf = window.requestAnimationFrame ||
	          window.webkitRequestAnimationFrame ||
	          function (calllback) {
	            setTimeout(calllback, 16)
	          }
	
	var rafId
	var observers = []
	var paused = false
	
	var FrameUpdater = {
	  start: function () {
	    if (rafId) {
	      return
	    }
	
	    rafId = raf(function runLoop() {
	      if (!paused) {
	        for (var i = 0; i < observers.length; i++) {
	          observers[i]()
	        }
	        raf(runLoop)
	      }
	    })
	  },
	
	  isActive: function () {
	    return !paused
	  },
	
	  pause: function () {
	    paused = true
	    rafId = undefined
	  },
	
	  resume: function () {
	    paused = false
	    this.start()
	  },
	
	  addUpdateObserver: function (observeMethod) {
	    observers.push(observeMethod)
	  }
	}
	
	module.exports = FrameUpdater


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(17)
	
	var componentsInScroller = []
	var componentsOutOfScroller = []
	var listened = false
	var direction = 'up'
	var scrollY = 0
	
	var AppearWatcher = {
	  watchIfNeeded: function (component) {
	    if (needWatch(component)) {
	      if (component.isInScrollable()) {
	        componentsInScroller.push(component)
	      } else {
	        componentsOutOfScroller.push(component)
	      }
	      if (!listened) {
	        listened = true
	        // var handler = throttle(onScroll, 25)
	        var handler = throttle(onScroll, 100)
	        window.addEventListener('scroll', handler, false)
	      }
	    }
	  }
	}
	
	function needWatch(component) {
	  var events = component.data.event
	  if (events
	      && (events.indexOf('appear') != -1
	        || events.indexOf('disappear') != -1)) {
	    return true
	  }
	  return false
	}
	
	function onScroll(e) {
	  // If the scroll event is dispatched from a scrollable component
	  // implemented through scrollerjs, then the appear/disappear events
	  // should be treated specially by handleScrollerScroll.
	  if (e.originalType === 'scrolling') {
	    handleScrollerScroll(e)
	  } else {
	    handleWindowScroll()
	  }
	}
	
	function handleScrollerScroll(e) {
	  var cmps = componentsInScroller
	  var len = cmps.length
	  direction = e.direction
	  for (var i = 0; i < len; i++) {
	    var component = cmps[i]
	    var appear = isComponentInScrollerAppear(component)
	    if (appear && !component._appear) {
	      component._appear = true
	      fireEvent(component, 'appear')
	    } else if (!appear && component._appear) {
	      component._appear = false
	      fireEvent(component, 'disappear')
	    }
	  }
	}
	
	function handleWindowScroll() {
	  var y = window.scrollY
	  direction = y >= scrollY ? 'up' : 'down'
	  scrollY = y
	
	  var len = componentsOutOfScroller.length
	  if (len === 0) {
	    return
	  }
	  for (var i = 0; i < len; i++) {
	    var component = componentsOutOfScroller[i]
	    var appear = isComponentInWindow(component)
	    if (appear && !component._appear) {
	      component._appear = true
	      fireEvent(component, 'appear')
	    } else if (!appear && component._appear) {
	      component._appear = false
	      fireEvent(component, 'disappear')
	    }
	  }
	}
	
	function isComponentInScrollerAppear(component) {
	  var parentScroller = component._parentScroller
	  var cmpRect = component.node.getBoundingClientRect()
	  if (!isComponentInWindow(component)) {
	    return false
	  }
	  while (parentScroller) {
	    var parentRect = parentScroller.node.getBoundingClientRect()
	    if (!(cmpRect.right > parentRect.left
	        && cmpRect.left < parentRect.right
	        && cmpRect.bottom > parentRect.top
	        && cmpRect.top < parentRect.bottom)) {
	      return false
	    }
	    parentScroller = parentScroller._parentScroller
	  }
	  return true
	}
	
	function isComponentInWindow(component) {
	  var rect = component.node.getBoundingClientRect()
	  return rect.right > 0 && rect.left < window.innerWidth &&
	         rect.bottom > 0 && rect.top < window.innerHeight
	}
	
	function fireEvent(component, type) {
	  var evt = document.createEvent('HTMLEvents')
	  var data = { direction: direction }
	  evt.initEvent(type, false, false)
	  evt.data = data
	  utils.extend(evt, data)
	  component.node.dispatchEvent(evt)
	}
	
	function throttle(func, wait) {
	  var context, args, result
	  var timeout = null
	  var previous = 0
	  var later = function () {
	    previous = Date.now()
	    timeout = null
	    result = func.apply(context, args)
	  }
	  return function () {
	    var now = Date.now()
	    var remaining = wait - (now - previous)
	    context = this
	    args = arguments
	    if (remaining <= 0) {
	      clearTimeout(timeout)
	      timeout = null
	      previous = now
	      result = func.apply(context, args)
	    } else if (!timeout) {
	      timeout = setTimeout(later, remaining)
	    }
	    return result
	  }
	}
	
	module.exports = AppearWatcher

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(24)
	
	var lazyloadTimer
	
	var LazyLoad = {
	  makeImageLazy: function (image, src) {
	    image.removeAttribute('img-src')
	    image.removeAttribute('i-lazy-src')
	    image.removeAttribute('src')
	    image.setAttribute('img-src', src)
	    // should replace 'src' with 'img-src'. but for now lib.img.fire is
	    // not working for the situation that the appear event has been
	    // already triggered.
	    // image.setAttribute('src', src)
	    // image.setAttribute('img-src', src)
	    this.fire()
	  },
	
	  // we don't know when all image are appended
	  // just use setTimeout to do delay lazyload
	  //
	  // -- actually everytime we add a element or update styles,
	  // the component manager will call startIfNeed to fire
	  // lazyload once again in the handleAppend function. so there
	  // is no way that any image element can miss it. See source
	  // code in componentMangager.js.
	  startIfNeeded: function (component) {
	    var that = this
	    if (component.data.type === 'image') {
	      if (!lazyloadTimer) {
	        lazyloadTimer = setTimeout(function () {
	          that.fire()
	          clearTimeout(lazyloadTimer)
	          lazyloadTimer = null
	        }, 16)
	      }
	    }
	  },
	
	  loadIfNeeded: function (elementScope) {
	    var notPreProcessed = elementScope.querySelectorAll('[img-src]')
	    var that = this
	    // image elements which have attribute 'i-lazy-src' were elements
	    // that had been preprocessed by lib-img-core, but not loaded yet, and
	    // must be loaded when 'appear' events were fired. It turns out the
	    // 'appear' event was not fired correctly in the css-translate-transition
	    // situation, so 'i-lazy-src' must be checked and lazyload must be
	    // fired manually.
	    var preProcessed = elementScope.querySelectorAll('[i-lazy-src]')
	    if (notPreProcessed.length > 0 || preProcessed.length > 0) {
	      that.fire()
	    }
	  },
	
	  // fire lazyload.
	  fire: function () {
	    lib.img.fire()
	  }
	
	}
	
	module.exports = LazyLoad


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"undefined"==typeof window&&(window={ctrl:{},lib:{}}),!window.ctrl&&(window.ctrl={}),!window.lib&&(window.lib={}),function(t,i){function e(t,i){i&&("IMG"==t.nodeName.toUpperCase()?t.setAttribute("src",i):t.style.backgroundImage='url("'+i+'")')}function a(){r=i.appear.init({cls:"imgtmp",once:!0,x:o.lazyWidth,y:o.lazyHeight,onAppear:function(t){var i=this;e(i,i.getAttribute("i-lazy-src")),i.removeAttribute("i-lazy-src")}})}__webpack_require__(25);var r,A={},o={dataSrc:"img-src",lazyHeight:0,lazyWidth:0};A.logConfig=function(){console.log("lib-img Config\n",o)},A.fire=function(){r||a();var t="i_"+Date.now()%1e5,i=document.querySelectorAll("["+o.dataSrc+"]");[].forEach.call(i,function(i){"false"==i.dataset.lazy&&"true"!=i.dataset.lazy?e(i,processSrc(i,i.getAttribute(o.dataSrc))):(i.classList.add(t),i.setAttribute("i-lazy-src",i.getAttribute(o.dataSrc))),i.removeAttribute(o.dataSrc)}),r.bind("."+t),r.fire()},A.defaultSrc="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",i.img=A,module.exports=A}(window,window.lib||(window.lib={}));

/***/ },
/* 25 */
/***/ function(module, exports) {

	"undefined"==typeof window&&(window={ctrl:{},lib:{}}),!window.ctrl&&(window.ctrl={}),!window.lib&&(window.lib={}),function(n,e){function i(){d=w.createEvent("HTMLEvents"),v=w.createEvent("HTMLEvents"),d.initEvent("_appear",!1,!0),v.initEvent("_disappear",!1,!0)}function a(t,n){var e,i,a,s=(Date.now(),0),o=null,r=function(){s=Date.now(),o=null,t.apply(e,i)};return function(){var l=Date.now();e=this,i=arguments;var c=n-(l-s);return 0>=c||c>=n?(clearTimeout(o),o=null,a=t.apply(e,i)):null==o&&(o=setTimeout(r,c)),a}}function s(n,e){var n,i,a,s;if(n)return e||(e={x:0,y:0}),n!=window?(n=n.getBoundingClientRect(),i=n.left,t=n.top,a=n.right,s=n.bottom):(i=0,t=0,a=i+n.innerWidth,s=t+n.innerHeight),{left:i,top:t,right:a+e.x,bottom:s+e.y}}function o(t,n){var e=n.right>t.left&&n.left<t.right,i=n.bottom>t.top&&n.top<t.bottom;return e&&i}function r(t,n){var e="none",i=t.left-n.left,a=t.top-n.top;return 0==a&&(e=0!=i?i>0?"left":"right":"none"),0==i&&(e=0!=a?a>0?"up":"down":"none"),e}function l(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e]);return t}function c(){var t=this,n=a(function(){f.apply(t,arguments)},this.options.wait);this.__handle&&(this.container.removeEventListener("scroll",this.__handle),this.__handle=null),this.__handle=n,this.container.addEventListener("scroll",n,!1),this.container.addEventListener("resize",function(n){f.apply(t,arguments)},!1),this.container.addEventListener("animationEnd",function(){f.apply(t,arguments)},!1),this.container.addEventListener("webkitAnimationEnd",function(){f.apply(t,arguments)},!1),this.container.addEventListener("transitionend",function(){f.apply(t,arguments)},!1)}function p(t){var n=this,e=this.options.container;if("string"==typeof e?this.container=w.querySelector(e):this.container=e,this.container==window)var i=w.querySelectorAll(t);else var i=this.container.querySelectorAll(t);var i=[].slice.call(i,null);return i=i.filter(function(t){return"1"==t.dataset.bind?(delete t._hasAppear,delete t._hasDisAppear,delete t._appear,t.classList.remove(n.options.cls),!1):!0})}function h(t){var n=this;t&&t.length>0&&[].forEach.call(t,function(t){t._eleOffset=s(t),t.classList.remove(n.options.cls),t.dataset.bind=1})}function f(){var t=this.container,n=this.appearWatchElements,e=this.options.onAppear,i=this.options.onDisappear,a=s(t,{x:this.options.x,y:this.options.y}),l=this.options.once,c=arguments[0]||{};n&&n.length>0&&[].forEach.call(n,function(t,n){var p=s(t),h=r(t._eleOffset,p);t._eleOffset=p;var f=o(a,p),u=t._appear,w=t._hasAppear,E=t._hasDisAppear;d.data={direction:h},v.data={direction:h},f&&!u?(l&&!w||!l)&&(e&&e.call(t,c),t.dispatchEvent(d),t._hasAppear=!0,t._appear=!0):!f&&u&&(l&&!E||!l)&&(i&&i.call(t,c),t.dispatchEvent(v),t._hasDisAppear=!0,t._appear=!1)})}function u(t){l(this.options,t||(t={})),this.appearWatchElements=this.appearWatchElements||p.call(this,"."+this.options.cls),h.call(this,this.appearWatchElements),c.call(this)}var d,v,w=document,E=function(){u.apply(this,arguments)},_={instances:[],init:function(t){var n={options:{container:window,wait:100,x:0,y:0,cls:"lib-appear",once:!1,onReset:function(){},onAppear:function(){},onDisappear:function(){}},container:null,appearWatchElements:null,bind:function(t){var n=this.options.cls;if("string"==typeof t){var e=p.call(this,t);[].forEach.call(e,function(t,e){t.classList.contains(n)||t.classList.add(n)})}else{if(1!=t.nodeType||!this.container.contains(t))return this;t.classList.contains(n)||t.classList.add(n)}var i=p.call(this,"."+this.options.cls);return this.appearWatchElements=this.appearWatchElements.concat(i),h.call(this,i),this},reset:function(t){return u.call(this,t),this.appearWatchElements.forEach(function(t){delete t._hasAppear,delete t._hasDisAppear,delete t._appear}),this},fire:function(){this.appearWatchElements||(this.appearWatchElements=[]);var t=p.call(this,"."+this.options.cls);return this.appearWatchElements=this.appearWatchElements.concat(t),h.call(this,t),f.call(this),this}};E.prototype=n;var e=new E(t);return this.instances.push(e),e},fireAll:function(){var t=this.instances;t.forEach(function(t){t.fire()})}};i(),e.appear=_}(window,window.lib||(window.lib={}));

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict'
	
	module.exports = {
	
	  /**
	   * config:
	   *   - styles
	   *   - duration [Number] milliseconds(ms)
	   *   - timingFunction [string]
	   *   - dealy [Number] milliseconds(ms)
	   */
	  transitionOnce: function (comp, config, callback) {
	    var styles = config.styles || {}
	    var duration = config.duration || 1000 // ms
	    var timingFunction = config.timingFunction || 'ease'
	    var delay = config.delay || 0  // ms
	    var transitionValue = 'all ' + duration + 'ms '
	        + timingFunction + ' ' + delay + 'ms'
	    var dom = comp.node
	    var transitionEndHandler = function (e) {
	      e.stopPropagation()
	      dom.removeEventListener('webkitTransitionEnd', transitionEndHandler)
	      dom.removeEventListener('transitionend', transitionEndHandler)
	      dom.style.transition = ''
	      dom.style.webkitTransition = ''
	      callback()
	    }
	    dom.style.transition = transitionValue
	    dom.style.webkitTransition = transitionValue
	    dom.addEventListener('webkitTransitionEnd', transitionEndHandler)
	    dom.addEventListener('transitionend', transitionEndHandler)
	    comp.updateStyle(styles)
	  }
	
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var config = __webpack_require__(16)
	var utils = __webpack_require__(17)
	var ComponentManager = __webpack_require__(20)
	var flexbox = __webpack_require__(28)
	var valueFilter = __webpack_require__(29)
	__webpack_require__(30)
	
	function Component(data, nodeType) {
	  this.data = data
	  this.node = this.create(nodeType)
	
	  this.createChildren()
	  this.updateAttrs(this.data.attr)
	  // issue: when add element to a list in lifetime hook 'ready', the
	  // styles is set to the classStyle, not style. This is a issue
	  // that jsframework should do something about.
	  var classStyle = this.data.classStyle
	  classStyle && this.updateStyle(this.data.classStyle)
	  this.updateStyle(this.data.style)
	  this.bindEvents(this.data.event)
	}
	
	Component.prototype = {
	
	  create: function (nodeType) {
	    var node = document.createElement(nodeType || 'div')
	    return node
	  },
	
	  getComponentManager: function () {
	    return ComponentManager.getInstance(this.data.instanceId)
	  },
	
	  getParent: function () {
	    return this.getComponentManager().componentMap[this.parentRef]
	  },
	
	  getParentScroller: function () {
	    if (this.isInScrollable()) {
	      return this._parentScroller
	    }
	    return null
	  },
	
	  getRootScroller: function () {
	    if (this.isInScrollable()) {
	      var scroller = this._parentScroller
	      var parent = scroller._parentScroller
	      while (parent) {
	        scroller = parent
	        parent = scroller._parentScroller
	      }
	      return scroller
	    }
	    return null
	  },
	
	  getRootContainer: function () {
	    var root = this.getComponentManager().weexInstance.getRoot()
	      || document.body
	    return root
	  },
	
	  isScrollable: function () {
	    var t = this.data.type
	    return ComponentManager.getScrollableTypes().indexOf(t) !== -1
	  },
	
	  isInScrollable: function () {
	    if (typeof this._isInScrollable === 'boolean') {
	      return this._isInScrollable
	    }
	    var parent = this.getParent()
	    if (parent
	        && (typeof parent._isInScrollable !== 'boolean')
	        && !parent.isScrollable()) {
	      if (parent.data.ref === '_root') {
	        this._isInScrollable = false
	        return false
	      }
	      this._isInScrollable = parent.isInScrollable()
	      this._parentScroller = parent._parentScroller
	      return this._isInScrollable
	    }
	    if (parent && typeof parent._isInScrollable === 'boolean') {
	      this._isInScrollable = parent._isInScrollable
	      this._parentScroller = parent._parentScroller
	      return this._isInScrollable
	    }
	    if (parent && parent.isScrollable()) {
	      this._isInScrollable = true
	      this._parentScroller = parent
	      return true
	    }
	    if (!parent) {
	      console && console.error('isInScrollable - parent not exist.')
	      return
	    }
	  },
	
	  createChildren: function () {
	    var children = this.data.children
	    var parentRef = this.data.ref
	    var componentManager = this.getComponentManager()
	    if (children && children.length) {
	      var fragment = document.createDocumentFragment()
	      var isFlex = false
	      for (var i = 0; i < children.length; i++) {
	        children[i].instanceId = this.data.instanceId
	        children[i].scale = this.data.scale
	        var child = componentManager.createElement(children[i])
	        fragment.appendChild(child.node)
	        child.parentRef = parentRef
	        if (!isFlex
	            && child.data.style
	            && child.data.style.hasOwnProperty('flex')
	          ) {
	          isFlex = true
	        }
	      }
	      this.node.appendChild(fragment)
	    }
	  },
	
	  // @todo: changed param data to child
	  appendChild: function (data) {
	    var children = this.data.children
	    var componentManager = this.getComponentManager()
	    var child = componentManager.createElement(data)
	    this.node.appendChild(child.node)
	    // update this.data.children
	    if (!children || !children.length) {
	      this.data.children = [data]
	    } else {
	      children.push(data)
	    }
	
	    return child
	  },
	
	  insertBefore: function (child, before) {
	    var children = this.data.children
	    var i = 0
	    var l
	    var isAppend = false
	
	    // update this.data.children
	    if (!children || !children.length || !before) {
	      isAppend = true
	    } else {
	      for (l = children.length; i < l; i++) {
	        if (children[i].ref === before.data.ref) {
	          break
	        }
	      }
	      if (i === l) {
	        isAppend = true
	      }
	    }
	
	    if (isAppend) {
	      this.node.appendChild(child.node)
	      children.push(child.data)
	    } else {
	      if (before.fixedPlaceholder) {
	        this.node.insertBefore(child.node, before.fixedPlaceholder)
	      } else {
	        this.node.insertBefore(child.node, before.node)
	      }
	      children.splice(i, 0, child.data)
	    }
	
	  },
	
	  removeChild: function (child) {
	    var children = this.data.children
	    // remove from this.data.children
	    var i = 0
	    var componentManager = this.getComponentManager()
	    if (children && children.length) {
	      for (var l = children.length; i < l; i++) {
	        if (children[i].ref === child.data.ref) {
	          break
	        }
	      }
	      if (i < l) {
	        children.splice(i, 1)
	      }
	    }
	    // remove from componentMap recursively
	    componentManager.removeElementByRef(child.data.ref)
	    if (child.fixedPlaceholder) {
	      this.node.removeChild(child.fixedPlaceholder)
	    }
	    child.node.parentNode.removeChild(child.node)
	  },
	
	  updateAttrs: function (attrs) {
	    // Note：attr must be injected into the dom element because
	    // it will be accessed from the outside developer by event.target.attr.
	    if (!this.node.attr) {
	      this.node.attr = {}
	    }
	    for (var key in attrs) {
	      var value = attrs[key]
	      var attrSetter = this.attr[key]
	      if (typeof attrSetter === 'function') {
	        attrSetter.call(this, value)
	      } else {
	        if (typeof value === 'boolean') {
	          this.node[key] = value
	        } else {
	          this.node.setAttribute(key, value)
	        }
	        this.node.attr[key] = value
	      }
	    }
	  },
	
	  updateStyle: function (style) {
	
	    for (var key in style) {
	      var value = style[key]
	      var styleSetter = this.style[key]
	      if (typeof styleSetter === 'function') {
	        styleSetter.call(this, value)
	        continue
	      }
	      var parser = valueFilter.getFilters(key,
	          { scale: this.data.scale })[typeof value]
	      if (typeof parser === 'function') {
	        value = parser(value)
	      }
	      this.node.style[key] = value
	    }
	  },
	
	  bindEvents: function (evts) {
	    var componentManager = this.getComponentManager()
	    if (evts
	        && Object.prototype.toString.call(evts).slice(8, -1) === 'Array'
	      ) {
	      for (var i = 0, l = evts.length; i < l; i++) {
	        componentManager.addEvent(this, evts[i])
	      }
	    }
	  },
	
	  // dispatch a specified event on this.node
	  //  - type: event type
	  //  - data: event data
	  //  - config: event config object
	  //     - bubbles
	  //     - cancelable
	  dispatchEvent: function (type, data, config) {
	    var event = document.createEvent('HTMLEvents')
	    config = config || {}
	    event.initEvent(type, config.bubbles || false, config.cancelable || false)
	    !data && (data = {})
	    event.data = utils.extend({}, data)
	    utils.extend(event, data)
	    this.node.dispatchEvent(event)
	  },
	
	  updateRecursiveAttr: function (data) {
	    this.updateAttrs(data.attr)
	    var componentManager = this.getComponentManager()
	    var children = this.data.children
	    if (children) {
	      for (var i = 0; i < children.length; i++) {
	        var child = componentManager.getElementByRef(children[i].ref)
	        if (child) {
	          child.updateRecursiveAttr(data.children[i])
	        }
	      }
	    }
	  },
	
	  updateRecursiveStyle: function (data) {
	    this.updateStyle(data.style)
	    var componentManager = this.getComponentManager()
	    var children = this.data.children
	    if (children) {
	      for (var i = 0; i < children.length; i++) {
	        var child = componentManager.getElementByRef(children[i].ref)
	        if (child) {
	          child.updateRecursiveStyle(data.children[i])
	        }
	      }
	    }
	  },
	
	  updateRecursiveAll: function (data) {
	    this.updateAttrs(data.attr)
	    this.updateStyle(data.style)
	    var componentManager = this.getComponentManager()
	
	    // var oldRef = this.data.ref
	    // if (componentMap[oldRef]) {
	    //   delete componentMap[oldRef]
	    // }
	    // this.data.ref = data.ref
	    // componentMap[data.ref] = this
	
	    var children = this.data.children
	    if (children) {
	      for (var i = 0; i < children.length; i++) {
	        var child = componentManager.getElementByRef(children[i].ref)
	        if (child) {
	          child.updateRecursiveAll(data.children[i])
	        }
	      }
	    }
	  },
	
	  attr: {}, // attr setters
	
	  style: Object.create(flexbox), // style setters
	
	  clearAttr: function () {
	  },
	
	  clearStyle: function () {
	    this.node.cssText = ''
	  }
	}
	
	Component.prototype.style.position = function (value) {
	
	  // For the elements who are fixed elements before, now
	  // are not fixed: the fixedPlaceholder has to be replaced
	  // by this element.
	  // This is a peace of hacking to fix the problem about
	  // mixing fixed and transform. See 'http://stackoverflo
	  // w.com/questions/15194313/webkit-css-transform3d-posi
	  // tion-fixed-issue' for more info.
	  if (value !== 'fixed') {
	    if (this.fixedPlaceholder) {
	      var parent = this.fixedPlaceholder.parentNode
	      parent.insertBefore(this.node, this.fixedPlaceholder)
	      parent.removeChild(this.fixedPlaceholder)
	      this.fixedPlaceholder = null
	    }
	  } else { // value === 'fixed'
	    // For the elements who are fixed: this fixedPlaceholder
	    // shoud be inserted, and the fixed element itself should
	    // be placed out in root container.
	    this.node.style.position = 'fixed'
	    var parent = this.node.parentNode
	    var replaceWithFixedPlaceholder = function () {
	      this.fixedPlaceholder = document.createElement('div')
	      this.fixedPlaceholder.classList.add('weex-fixed-placeholder')
	      this.fixedPlaceholder.style.display = 'none'
	      this.fixedPlaceholder.style.width = '0px'
	      this.fixedPlaceholder.style.height = '0px'
	      parent.insertBefore(this.fixedPlaceholder, this.node)
	      this.getRootContainer().appendChild(this.node)
	    }.bind(this)
	    if (!parent) {
	      if (this.onAppend) {
	        var pre = this.onAppend.bind(this)
	      }
	      this.onAppend = function () {
	        parent = this.node.parentNode
	        replaceWithFixedPlaceholder()
	        pre && pre()
	      }.bind(this)
	    } else {
	      replaceWithFixedPlaceholder()
	    }
	    return
	  }
	
	  if (value === 'sticky') {
	    this.node.style.zIndex = 100
	    setTimeout(function () {
	      this.sticky = new lib.sticky(this.node, {
	        top: 0
	      })
	    }.bind(this), 0)
	  } else {
	    this.node.style.position = value
	  }
	}
	
	module.exports = Component
	
	
	


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict'
	
	// Flexbox polyfill
	var flexboxSetters = (function () {
	  var BOX_ALIGN = {
	    stretch: 'stretch',
	    'flex-start': 'start',
	    'flex-end': 'end',
	    center: 'center'
	  }
	  var BOX_ORIENT = {
	    row: 'horizontal',
	    column: 'vertical'
	  }
	  var BOX_PACK = {
	    'flex-start': 'start',
	    'flex-end': 'end',
	    center: 'center',
	    'space-between': 'justify',
	    'space-around': 'justify' // Just same as `space-between`
	  }
	  return {
	    flex: function (value) {
	      this.node.style.webkitBoxFlex = value
	      this.node.style.webkitFlex = value
	      this.node.style.flex = value
	    },
	    alignItems: function (value) {
	      this.node.style.webkitBoxAlign = BOX_ALIGN[value]
	      this.node.style.webkitAlignItems = value
	      this.node.style.alignItems = value
	    },
	    alignSelf: function (value) {
	      this.node.style.webkitAlignSelf = value
	      this.node.style.alignSelf = value
	    },
	    flexDirection: function (value) {
	      this.node.style.webkitBoxOrient = BOX_ORIENT[value]
	      this.node.style.webkitFlexDirection = value
	      this.node.style.flexDirection = value
	    },
	    justifyContent: function (value) {
	      this.node.style.webkitBoxPack = BOX_PACK[value]
	      this.node.style.webkitJustifyContent = value
	      this.node.style.justifyContent = value
	    }
	  }
	})()
	
	module.exports = flexboxSetters


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict'
	
	var NOT_PX_NUMBER_PROPERTIES = ['flex', 'opacity', 'zIndex', 'fontWeight']
	
	var valueFilter = {
	
	  filterStyles: function (styles, config) {
	    for (var key in styles) {
	      var value = styles[key]
	      var parser = this.getFilters(key, config)[typeof value]
	      if (typeof parser === 'function') {
	        styles[key] = parser(value)
	      }
	    }
	  },
	
	  getFilters: function (key, config) {
	
	    if (NOT_PX_NUMBER_PROPERTIES.indexOf(key) !== -1) {
	      return {}
	    }
	    return {
	      number: function (val) {
	        return val * config.scale + 'px'
	      },
	      string: function (val) {
	        // string of a pure number or a number suffixed with a 'px' unit
	        if (val.match(/^\-?\d*\.?\d+(?:px)?$/)) {
	          return parseFloat(val) * config.scale + 'px'
	        }
	        if (key.match(/transform/) && val.match(/translate/)) {
	          return val.replace(/\d*\.?\d+px/g, function (match) {
	            return parseInt(parseFloat(match) * config.scale) + 'px'
	          })
	        }
	        return val
	      }
	    }
	  }
	}
	
	module.exports = valueFilter


/***/ },
/* 30 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b,c){function d(a){return null!=a&&"object"==typeof a&&Object.getPrototypeOf(a)==Object.prototype}function e(a,b){var c,d,e,f=null,g=0,h=function(){g=Date.now(),f=null,e=a.apply(c,d)};return function(){var i=Date.now(),j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(f),f=null,g=i,e=a.apply(c,d)):f||(f=setTimeout(h,j)),e}}function f(a){var b="";return Object.keys(a).forEach(function(c){b+=c+":"+a[c]+";"}),b}function g(a,c){!c&&d(a)&&(c=a,a=c.element),c=c||{},a.nodeType!=b.ELEMENT_NODE&&"string"==typeof a&&(a=b.querySelector(a));var e=this;e.element=a,e.top=c.top||0,e.withinParent=void 0==c.withinParent?!1:c.withinParent,e.init()}var h=a.parseInt,i=navigator.userAgent,j=!!i.match(/Firefox/i),k=!!i.match(/IEMobile/i),l=j?"-moz-":k?"-ms-":"-webkit-",m=j?"Moz":k?"ms":"webkit",n=function(){var a=b.createElement("div"),c=a.style;return c.cssText="position:"+l+"sticky;position:sticky;",-1!=c.position.indexOf("sticky")}();g.prototype={constructor:g,init:function(){var a=this,b=a.element,c=b.style;c[m+"Transform"]="translateZ(0)",c.transform="translateZ(0)",a._originCssText=c.cssText,n?(c.position=l+"sticky",c.position="sticky",c.top=a.top+"px"):(a._simulateSticky(),a._bindResize())},_bindResize:function(){var b=this,c=/android/gi.test(navigator.appVersion),d=b._resizeEvent="onorientationchange"in a?"orientationchange":"resize",e=b._resizeHandler=function(){setTimeout(function(){b.refresh()},c?200:0)};a.addEventListener(d,e,!1)},refresh:function(){var a=this;n||(a._detach(),a._simulateSticky())},_addPlaceholder:function(a){var c,d=this,e=d.element,g=a.position;if(-1!=["static","relative"].indexOf(g)){c=d._placeholderElement=b.createElement("div");var i=h(a.width)+h(a.marginLeft)+h(a.marginRight),j=h(a.height);"border-box"!=a.boxSizing&&(i+=h(a.borderLeftWidth)+h(a.borderRightWidth)+h(a.paddingLeft)+h(a.paddingRight),j+=h(a.borderTopWidth)+h(a.borderBottomWidth)+h(a.paddingTop)+h(a.paddingBottom)),c.style.cssText=f({display:"none",visibility:"hidden",width:i+"px",height:j+"px",margin:0,"margin-top":a.marginTop,"margin-bottom":a.marginBottom,border:0,padding:0,"float":a["float"]||a.cssFloat}),e.parentNode.insertBefore(c,e)}return c},_simulateSticky:function(){var c=this,d=c.element,g=c.top,i=d.style,j=d.getBoundingClientRect(),k=getComputedStyle(d,""),l=d.parentNode,m=getComputedStyle(l,""),n=c._addPlaceholder(k),o=c.withinParent,p=c._originCssText,q=j.top-g+a.pageYOffset,r=l.getBoundingClientRect().bottom-h(m.paddingBottom)-h(m.borderBottomWidth)-h(k.marginBottom)-j.height-g+a.pageYOffset,s=p+f({position:"fixed",top:g+"px",width:k.width,"margin-top":0}),t=p+f({position:"absolute",top:r+"px",width:k.width}),u=1,v=c._scrollHandler=e(function(){var b=a.pageYOffset;q>b?1!=u&&(i.cssText=p,n&&(n.style.display="none"),u=1):!o&&b>=q||o&&b>=q&&r>b?2!=u&&(i.cssText=s,n&&3!=u&&(n.style.display="block"),u=2):o&&3!=u&&(i.cssText=t,n&&2!=u&&(n.style.display="block"),u=3)},100);if(a.addEventListener("scroll",v,!1),a.pageYOffset>=q){var w=b.createEvent("HTMLEvents");w.initEvent("scroll",!0,!0),a.dispatchEvent(w)}},_detach:function(){var b=this,c=b.element;if(c.style.cssText=b._originCssText,!n){var d=b._placeholderElement;d&&c.parentNode.removeChild(d),a.removeEventListener("scroll",b._scrollHandler,!1)}},destroy:function(){var b=this;b._detach();var c=b.element.style;c.removeProperty(l+"transform"),c.removeProperty("transform"),n||a.removeEventListener(b._resizeEvent,b._resizeHandler,!1)}},c.sticky=g}(window,document,window.lib||(window.lib={}));;module.exports = window.lib['sticky'];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var utils = __webpack_require__(17)
	
	var _senderMap = {}
	
	function Sender(instance) {
	  if (!(this instanceof Sender)) {
	    return new Sender(instance)
	  }
	  this.instanceId = instance.instanceId
	  this.weexInstance = instance
	  _senderMap[this.instanceId] = this
	}
	
	function _send(instanceId, msg) {
	  callJS(instanceId, [msg])
	}
	
	Sender.getSender = function (instanceId) {
	  return _senderMap[instanceId]
	}
	
	Sender.prototype = {
	
	  // perform a callback to jsframework.
	  performCallback: function (callbackId, data, keepAlive) {
	    var args = [callbackId]
	    data && args.push(data)
	    keepAlive && args.push(keepAlive)
	    _send(this.instanceId, {
	      method: 'callback',
	      args: args
	    })
	  },
	
	  fireEvent: function (ref, type, event) {
	    if (event._alreadyFired) {
	      // stop bubbling up in virtual dom tree.
	      return
	    }
	    // do not prevent default, otherwise the touchstart
	    // event will no longer trigger a click event
	    event._alreadyFired = true
	    var evt = utils.extend({}, event)
	    // The event.target must be the standard event's currentTarget.
	    evt.target = evt.currentTarget
	    evt.value = event.target.value
	    evt.timestamp = Date.now()
	    _send(this.instanceId, {
	      method: 'fireEvent',
	      args: [ref, type, evt]
	    })
	  }
	
	}
	
	module.exports = Sender

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	
	var config = __webpack_require__(16)
	var protocol = __webpack_require__(19)
	var utils = __webpack_require__(17)
	var FrameUpdater = __webpack_require__(21)
	var Sender = __webpack_require__(31)
	
	var callQueue = []
	// Need a task counter?
	// When FrameUpdater is not activated, tasks will not be push
	// into callQueue and there will be no trace for situation of
	// execution of tasks.
	
	// give 10ms for call handling, and rest 6ms for others
	var MAX_TIME_FOR_EACH_FRAME = 10
	
	// callNative: jsFramework will call this method to talk to
	// this renderer.
	// params:
	//  - instanceId: string.
	//  - tasks: array of object.
	//  - callbackId: number.
	function callNative(instanceId, tasks, callbackId) {
	  var calls = []
	  if (typeof tasks === 'string') {
	    try {
	      calls = JSON.parse(tasks)
	    } catch (e) {
	      console.error('invalid tasks:', tasks)
	    }
	  } else if (Object.prototype.toString.call(tasks).slice(8, -1) === 'Array') {
	    calls = tasks
	  }
	  var len = calls.length
	  calls[len - 1].callbackId = (!callbackId && callbackId !== 0)
	                              ? -1
	                              : callbackId
	  // To solve the problem of callapp, the two-way time loop rule must
	  // be replaced by calling directly except the situation of page loading.
	  // 2015-11-03
	  for (var i = 0; i < len; i++) {
	    if (FrameUpdater.isActive()) {
	      callQueue.push({
	        instanceId: instanceId,
	        call: calls[i]
	      })
	    }
	    else {
	      processCall(instanceId, calls[i])
	    }
	  }
	
	}
	
	function processCallQueue() {
	  var len = callQueue.length
	  if (len === 0) {
	    return
	  }
	  var start = Date.now()
	  var elapsed = 0
	
	  while (--len >= 0 && elapsed < MAX_TIME_FOR_EACH_FRAME) {
	    var callObj = callQueue.shift()
	    processCall(callObj.instanceId, callObj.call)
	    elapsed = Date.now() - start
	  }
	}
	
	function processCall(instanceId, call) {
	  var moduleName = call.module
	  var methodName = call.method
	  var module, method
	  var args = call.args || call.arguments || []
	
	  if (!(module = protocol.apiModule[moduleName])) {
	    return
	  }
	  if (!(method = module[methodName])) {
	    return
	  }
	
	  method.apply(protocol.getWeexInstance(instanceId), args)
	
	  var callbackId = call.callbackId
	  if ((callbackId
	    || callbackId === 0
	    || callbackId === '0')
	    && callbackId !== '-1'
	    && callbackId !== -1) {
	    performNextTick(instanceId, callbackId)
	  }
	}
	
	function performNextTick(instanceId, callbackId) {
	  Sender.getSender(instanceId).performCallback(callbackId)
	}
	
	function nativeLog() {
	  if (config.debug) {
	    if (arguments[0].match(/^perf/)) {
	      console.info.apply(console, arguments)
	      return
	    }
	    console.debug.apply(console, arguments)
	  }
	}
	
	function exportsBridgeMethodsToGlobal() {
	  global.callNative = callNative
	  global.nativeLog = nativeLog
	}
	
	module.exports = {
	
	  init: function () {
	
	    // process callQueue every 16 milliseconds.
	    FrameUpdater.addUpdateObserver(processCallQueue)
	    FrameUpdater.start()
	
	    // exports methods to global(window).
	    exportsBridgeMethodsToGlobal()
	  }
	
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var RootComponent = __webpack_require__(34)
	var Container = __webpack_require__(35)
	var Image = __webpack_require__(38)
	var Text = __webpack_require__(42)
	var Vlist = __webpack_require__(43)
	var Hlist = __webpack_require__(49)
	var Countdown = __webpack_require__(50)
	var Marquee = __webpack_require__(52)
	var Slider = __webpack_require__(53)
	var Indicator = __webpack_require__(60)
	var Tabheader = __webpack_require__(63)
	var Scroller = __webpack_require__(67)
	var Input = __webpack_require__(70)
	var Select = __webpack_require__(71)
	var Datepicker = __webpack_require__(72)
	var Timepicker = __webpack_require__(73)
	var Video = __webpack_require__(74)
	var Switch = __webpack_require__(77)
	var A = __webpack_require__(80)
	var Embed = __webpack_require__(81)
	var Refresh = __webpack_require__(82)
	var Loading = __webpack_require__(85)
	var Spinner = __webpack_require__(88)
	var Web = __webpack_require__(91)
	
	var components = {
	  init: function (Weex) {
	    Weex.registerComponent('root', RootComponent)
	    Weex.registerComponent('container', Container)
	    Weex.registerComponent('div', Container)
	    Weex.registerComponent('image', Image)
	    Weex.registerComponent('text', Text)
	    Weex.registerComponent('list', Vlist)
	    Weex.registerComponent('vlist', Vlist)
	    Weex.registerComponent('hlist', Hlist)
	    Weex.registerComponent('countdown', Countdown)
	    Weex.registerComponent('marquee', Marquee)
	    Weex.registerComponent('slider', Slider)
	    Weex.registerComponent('indicator', Indicator)
	    Weex.registerComponent('tabheader', Tabheader)
	    Weex.registerComponent('scroller', Scroller)
	    Weex.registerComponent('input', Input)
	    Weex.registerComponent('select', Select)
	    Weex.registerComponent('datepicker', Datepicker)
	    Weex.registerComponent('timepicker', Timepicker)
	    Weex.registerComponent('video', Video)
	    Weex.registerComponent('switch', Switch)
	    Weex.registerComponent('a', A)
	    Weex.registerComponent('embed', Embed)
	    Weex.registerComponent('refresh', Refresh)
	    Weex.registerComponent('loading', Loading)
	    Weex.registerComponent('spinner', Spinner)
	    Weex.registerComponent('loading-indicator', Spinner)
	    Weex.registerComponent('web', Web)
	  }
	}
	
	module.exports = components


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var ComponentManager = __webpack_require__(20)
	var Component = __webpack_require__(27)
	var utils = __webpack_require__(17)
	var logger = __webpack_require__(15)
	
	var rootCandidates = ['div', 'list', 'vlist', 'scroller']
	
	function RootComponent(data, nodeType) {
	  var id = data.rootId + '-root'
	  var componentManager = ComponentManager.getInstance(data.instanceId)
	
	  // If nodeType is in the downgrades map, just ignore it and
	  // replace it with a div component.
	  var downgrades = componentManager.weexInstance.downgrades
	  this.data = data
	
	  // In some situation the root component should be implemented as
	  // its own type, otherwise it has to be a div component as a root.
	  if (!nodeType) {
	    nodeType = 'div'
	  } else if (rootCandidates.indexOf(nodeType) === -1) {
	    logger.warn('the root component type \'' + nodeType + '\' is not one of '
	      + 'the types in [' + rootCandidates + '] list. It is auto downgraded '
	      + 'to \'div\'.')
	    nodeType = 'div'
	  } else if (downgrades[nodeType]) {
	    logger.warn('Thanks to the downgrade flags for ['
	      + Object.keys(downgrades)
	      + '], the root component type \'' + nodeType
	      + '\' is auto downgraded to \'div\'.')
	    nodeType = 'div'
	  } else {
	    // If the root component is not a embed element in a webpage, then
	    // the html and body height should be fixed to the max height
	    // of viewport.
	    if (!componentManager.weexInstance.embed) {
	      window.addEventListener('renderend', function () {
	        this.detectRootHeight()
	      }.bind(this))
	    }
	    if (nodeType !== 'div') {
	      logger.warn('the root component type \'' + nodeType + '\' may have '
	        + 'some performance issue on some of the android devices when there '
	        + 'is a huge amount of dom elements. Try to add downgrade '
	        + 'flags by adding param \'downgrade_' + nodeType + '=true\' in the '
	        + 'url or setting downgrade config to a array contains \'' + nodeType
	        + '\' in the \'weex.init\' function. This will downgrade the root \''
	        + nodeType + '\' to a \'div\', and may elevate the level of '
	        + 'performance, although it has some other issues.')
	    }
	    !this.data.style.height && (this.data.style.height = '100%')
	  }
	
	  data.type = nodeType
	  var cmp = componentManager.createElement(data)
	  cmp.node.id = id
	  return cmp
	}
	
	RootComponent.prototype = Object.create(Component.prototype)
	
	RootComponent.prototype.detectRootHeight = function () {
	  var rootQuery = '#' + this.getComponentManager().weexInstance.rootId
	  var rootContainer = document.querySelector(rootQuery) || document.body
	  var height = rootContainer.getBoundingClientRect().height
	  if (height > window.innerHeight) {
	    logger.warn([
	      'for scrollable root like \'list\' and \'scroller\', the height of ',
	      'the root container must be a user-specified value. Otherwise ',
	      'the scrollable element may not be able to work correctly. ',
	      'Current height of the root element \'' + rootQuery + '\' is ',
	      height + 'px, and mostly its height should be less than the ',
	      'viewport\'s height ' + window.innerHeight + 'px. Please ',
	      'make sure the height is correct.'
	      ].join(''))
	  }
	}
	
	module.exports = RootComponent


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(36)
	
	var Component = __webpack_require__(27)
	
	function Container (data, nodeType) {
	  Component.call(this, data, nodeType)
	  this.node.classList.add('weex-container')
	}
	
	Container.prototype = Object.create(Component.prototype)
	
	module.exports = Container


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(37);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./container.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./container.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-container {\n  box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n  position: relative;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n}\n\n.weex-element {\n  box-sizing: border-box;\n  position: relative;\n}\n", ""]);
	
	// exports


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var LazyLoad = __webpack_require__(23)
	var config = __webpack_require__(16)
	var utils = __webpack_require__(17)
	
	__webpack_require__(40)
	
	var DEFAULT_SIZE = 200
	var RESIZE_MODES = ['stretch', 'cover', 'contain']
	var DEFAULT_RESIZE_MODE = 'stretch'
	
	/**
	 * resize: 'cover' | 'contain' | 'stretch', default is 'stretch'
	 * src: url
	 */
	
	function Image (data) {
	  this.resize = DEFAULT_RESIZE_MODE
	  Atomic.call(this, data)
	}
	
	Image.prototype = Object.create(Atomic.prototype)
	
	Image.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-img')
	  return node
	}
	
	Image.prototype.attr = {
	  src: function (val) {
	    if (!this.src) {
	      this.src = lib.img.defaultSrc
	      this.node.style.backgroundImage = 'url(' + this.src + ')'
	    }
	    LazyLoad.makeImageLazy(this.node, val)
	  },
	
	  resize: function (val) {
	    if (RESIZE_MODES.indexOf(val) === -1) {
	      val = 'stretch'
	    }
	    this.node.style.backgroundSize = val === 'stretch'
	                                    ? '100% 100%'
	                                    : val
	  }
	}
	
	Image.prototype.style = utils.extend(Object.create(Atomic.prototype.style), {
	  width: function (val) {
	    val = parseFloat(val) * this.data.scale
	    if (val < 0 || val !== val) {
	      val = DEFAULT_SIZE
	    }
	    this.node.style.width = val + 'px'
	  },
	
	  height: function (val) {
	    val = parseFloat(val) * this.data.scale
	    if (val < 0 || val !== val) {
	      val = DEFAULT_SIZE
	    }
	    this.node.style.height = val + 'px'
	  }
	})
	
	Image.prototype.clearAttr = function () {
	  this.src = ''
	  this.node.style.backgroundImage = ''
	}
	
	module.exports = Image


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Component = __webpack_require__(27)
	
	// Component which can have no subcomponents.
	// This component should not be instantiated directly, since
	// it is designed to be used as a base class to extend from.
	function Atomic (data) {
	  Component.call(this, data)
	}
	
	Atomic.prototype = Object.create(Component.prototype)
	
	Atomic.prototype.appendChild = function (data) {
	  // do nothing
	  return
	}
	
	Atomic.prototype.insertBefore = function (child, before) {
	  // do nothing
	  return
	}
	
	Atomic.prototype.removeChild = function (child) {
	  // do nothing
	  return
	}
	
	module.exports = Atomic


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(41);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./image.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./image.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-img {\n\tbox-sizing: border-box;\n  position: relative;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  background-position: 50%;\n  border: 0 solid black;\n}", ""]);
	
	// exports


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(27)
	var utils = __webpack_require__(17)
	
	var DEFAULT_FONT_SIZE = 32
	var DEFAULT_TEXT_OVERFLOW = 'ellipsis'
	
	// attr
	//  - value: text content.
	//  - lines: maximum lines of the text.
	function Text (data) {
	  Atomic.call(this, data)
	}
	
	Text.prototype = Object.create(Atomic.prototype)
	
	Text.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-container')
	  node.style.fontSize = DEFAULT_FONT_SIZE * this.data.scale + 'px'
	  this.textNode = document.createElement('span')
	  // Give the developers the ability to control space
	  // and line-breakers.
	  this.textNode.style.whiteSpace = 'pre-wrap'
	  this.textNode.style.display = '-webkit-box'
	  this.textNode.style.webkitBoxOrient = 'vertical'
	  this.style.lines.call(this, this.data.style.lines)
	  node.appendChild(this.textNode)
	  return node
	}
	
	Text.prototype.attr = {
	  value: function (value) {
	    var span = this.node.firstChild
	    span.innerHTML = ''
	    if (value == null || value === '') {
	      return
	    }
	    span.textContent = value
	    /**
	     * Developers are supposed to have the ability to break text
	     * lines manually. Using ``&nbsp;`` to replace text space is
	     * not compatible with the ``-webkit-line-clamp``. Therefor
	     * we use ``white-space: no-wrap`` instead (instead of the
	     * code bellow).
	
	      var frag = document.createDocumentFragment()
	        text.split(' ').forEach(function(str) {
	          var textNode = document.createTextNode(str)
	          var space = document.createElement('i')
	          space.innerHTML = '&nbsp;'
	          frag.appendChild(space)
	          frag.appendChild(textNode)
	        })
	        frag.removeChild(frag.firstChild)
	        span.appendChild(document.createElement('br'))
	        span.appendChild(frag)
	      })
	      span.removeChild(span.firstChild)
	     */
	  }
	}
	
	Text.prototype.clearAttr = function () {
	  this.node.firstChild.textContent = ''
	}
	
	Text.prototype.style = utils.extend(Object.create(Atomic.prototype.style), {
	
	  lines: function (val) {
	    val = parseInt(val)
	    if (val !== val) { // NaN
	      return
	    }
	    if (val <= 0) {
	      this.textNode.style.textOverflow = ''
	      this.textNode.style.overflow = 'visible'
	      this.textNode.style.webkitLineClamp = ''
	    } else {
	      var style = this.data ? this.data.style : null
	      this.textNode.style.overflow = 'hidden'
	      this.textNode.style.textOverflow = style
	        ? style.textOverflow
	        : DEFAULT_TEXT_OVERFLOW
	      this.textNode.style.webkitLineClamp = val
	    }
	  },
	
	  textOverflow: function (val) {
	    this.textNode.style.textOverflow = val
	  }
	
	})
	
	module.exports = Text


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var List = __webpack_require__(44)
	
	function Vlist(data, nodeType) {
	  data.attr.direction = 'v'
	  List.call(this, data, nodeType)
	}
	
	Vlist.prototype = Object.create(List.prototype)
	
	module.exports = Vlist

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(45)
	__webpack_require__(47)
	
	var Component = __webpack_require__(27)
	var LazyLoad = __webpack_require__(23)
	
	var DEFAULT_LOAD_MORE_OFFSET = 500
	
	var directionMap = {
	  h: ['row', 'horizontal', 'h', 'x'],
	  v: ['column', 'vertical', 'v', 'y']
	}
	
	// direction: 'v' or 'h', default is 'v'
	function List(data, nodeType) {
	  // this.loadmoreOffset = Number(data.attr.loadmoreoffset)
	  // this.isAvailableToFireloadmore = true
	  this.direction = directionMap.h.indexOf(data.attr.direction) === -1
	    ? 'v'
	    : 'h'
	  Component.call(this, data, nodeType)
	}
	
	List.prototype = Object.create(Component.prototype)
	
	List.prototype.create = function (nodeType) {
	  var Scroll = lib.scroll
	  var node = Component.prototype.create.call(this, nodeType)
	  node.classList.add('weex-container', 'list-wrap')
	  this.listElement = document.createElement('div')
	  this.listElement.classList.add(
	    'weex-container'
	    , 'list-element'
	    , this.direction + '-list'
	  )
	
	  // Flex will cause a bug to rescale children's size if their total
	  // size exceed the limit of their parent. So to use box instead.
	  this.listElement.style.display = '-webkit-box'
	  this.listElement.style.display = 'box'
	  this.listElement.style.webkitBoxOrient = this.direction === 'h'
	    ? 'horizontal'
	    : 'vertical'
	  this.listElement.style.boxOrient = this.listElement.style.webkitBoxOrient
	
	  node.appendChild(this.listElement)
	  this.scroller = new Scroll({
	    scrollElement: this.listElement
	    , direction: this.direction === 'h' ? 'x' : 'y'
	  })
	  this.scroller.init()
	  this.offset = 0
	  return node
	}
	
	List.prototype.bindEvents = function (evts) {
	  Component.prototype.bindEvents.call(this, evts)
	  // to enable lazyload for Images.
	  this.scroller.addEventListener('scrolling', function (e) {
	    var so = e.scrollObj
	    var scrollTop = so.getScrollTop()
	    var scrollLeft = so.getScrollLeft()
	    var offset = this.direction === 'v' ? scrollTop : scrollLeft
	    var diff = offset - this.offset
	    var dir
	    if (diff >= 0) {
	      dir = this.direction === 'v' ? 'up' : 'left'
	    } else {
	      dir = this.direction === 'v' ? 'down' : 'right'
	    }
	    this.dispatchEvent('scroll', {
	      originalType: 'scrolling',
	      scrollTop: so.getScrollTop(),
	      scrollLeft: so.getScrollLeft(),
	      offset: offset,
	      direction: dir
	    }, {
	      bubbles: true
	    })
	    this.offset = offset
	  }.bind(this))
	
	  var pullendEvent = 'pull' + ({ v: 'up', h: 'left' })[this.direction] + 'end'
	  this.scroller.addEventListener(pullendEvent, function (e) {
	    this.dispatchEvent('loadmore')
	  }.bind(this))
	}
	
	List.prototype.createChildren = function () {
	  var children = this.data.children
	  var parentRef = this.data.ref
	  var componentManager = this.getComponentManager()
	  if (children && children.length) {
	    var fragment = document.createDocumentFragment()
	    var isFlex = false
	    for (var i = 0; i < children.length; i++) {
	      children[i].instanceId = this.data.instanceId
	      children[i].scale = this.data.scale
	      var child = componentManager.createElement(children[i])
	      fragment.appendChild(child.node)
	      child.parentRef = parentRef
	      if (!isFlex
	          && child.data.style
	          && child.data.style.hasOwnProperty('flex')
	        ) {
	        isFlex = true
	      }
	    }
	    this.listElement.appendChild(fragment)
	  }
	  // wait for fragment to appended on listElement on UI thread.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	}
	
	List.prototype.appendChild = function (data) {
	  var children = this.data.children
	  var componentManager = this.getComponentManager()
	  var child = componentManager.createElement(data)
	  this.listElement.appendChild(child.node)
	
	  // wait for UI thread to update.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	
	  // update this.data.children
	  if (!children || !children.length) {
	    this.data.children = [data]
	  } else {
	    children.push(data)
	  }
	
	  return child
	}
	
	List.prototype.insertBefore = function (child, before) {
	  var children = this.data.children
	  var i = 0
	  var isAppend = false
	
	  // update this.data.children
	  if (!children || !children.length || !before) {
	    isAppend = true
	  } else {
	    for (var l = children.length; i < l; i++) {
	      if (children[i].ref === before.data.ref) {
	        break
	      }
	    }
	    if (i === l) {
	      isAppend = true
	    }
	  }
	
	  if (isAppend) {
	    this.listElement.appendChild(child.node)
	    children.push(child.data)
	  } else {
	    if (before.fixedPlaceholder) {
	      this.listElement.insertBefore(child.node, before.fixedPlaceholder)
	    } else {
	      this.listElement.insertBefore(child.node, before.node)
	    }
	    children.splice(i, 0, child.data)
	  }
	
	  // wait for UI thread to update.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	}
	
	List.prototype.removeChild = function (child) {
	  var children = this.data.children
	  // remove from this.data.children
	  var i = 0
	  var componentManager = this.getComponentManager()
	  if (children && children.length) {
	    for (var l = children.length; i < l; i++) {
	      if (children[i].ref === child.data.ref) {
	        break
	      }
	    }
	    if (i < l) {
	      children.splice(i, 1)
	    }
	  }
	  // remove from componentMap recursively
	  componentManager.removeElementByRef(child.data.ref)
	  if (child.fixedPlaceholder) {
	    this.listElement.removeChild(child.fixedPlaceholder)
	  }
	  child.node.parentNode.removeChild(child.node)
	
	  // wait for UI thread to update.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	}
	
	module.exports = List


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(46);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./list.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./list.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".list-wrap {\n  display: block;\n  overflow: hidden;\n}\n\n.list-element {\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n", ""]);
	
	// exports


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48)
	
	var logger = __webpack_require__(15)
	
	var doc = window.document
	var ua = window.navigator.userAgent
	var scrollObjs = {}
	var plugins = {}
	var dpr = window.dpr
	  || (!!window.navigator.userAgent.match(/iPhone|iPad|iPod/)
	    ? document.documentElement.clientWidth / window.screen.availWidth
	    : 1)
	var inertiaCoefficient = {
	  normal: [2 * dpr, 0.0015 * dpr],
	  slow: [1.5 * dpr, 0.003 * dpr],
	  veryslow: [1.5 * dpr, 0.005 * dpr]
	}
	var timeFunction = {
	  ease: [.25,.1,.25,1],
	  liner: [0,0,1,1],
	  'ease-in': [.42,0,1,1],
	  'ease-out': [0,0,.58,1],
	  'ease-in-out': [.42,0,.58,1]
	}
	var Firefox = !!ua.match(/Firefox/i)
	var IEMobile = !!ua.match(/IEMobile/i)
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'
	var stylePrefix = Firefox ? 'Moz' : IEMobile ? 'ms' : 'webkit'
	
	function debugLog() {
	  if (lib.scroll.outputDebugLog) {
	    logger.log.apply(logger, arguments)
	  }
	}
	
	function getBoundingClientRect(el) {
	  var rect = el.getBoundingClientRect()
	  if (!rect) {
	    rect = {}
	    rect.width = el.offsetWidth
	    rect.height = el.offsetHeight
	
	    rect.left = el.offsetLeft
	    rect.top = el.offsetTop
	    var parent = el.offsetParent
	    while (parent) {
	      rect.left += parent.offsetLeft
	      rect.top += parent.offsetTop
	      parent = parent.offsetParent
	    }
	
	    rect.right = rect.left + rect.width
	    rect.bottom = rect.top + rect.height
	  }
	  return rect
	}
	
	function getMinScrollOffset(scrollObj) {
	  return 0 - scrollObj.options[scrollObj.axis + 'PaddingTop']
	}
	
	function getMaxScrollOffset(scrollObj) {
	  var rect = getBoundingClientRect(scrollObj.element)
	  var pRect = getBoundingClientRect(scrollObj.viewport)
	  var min = getMinScrollOffset(scrollObj)
	  if (scrollObj.axis === 'y') {
	    var max = 0 - rect.height + pRect.height
	  } else {
	    var max = 0 - rect.width + pRect.width
	  }
	  return Math.min(
	    max + scrollObj.options[scrollObj.axis + 'PaddingBottom'],
	    min
	  )
	}
	
	function getBoundaryOffset(scrollObj, offset) {
	  if (offset > scrollObj.minScrollOffset) {
	    return offset - scrollObj.minScrollOffset
	  }
	  if (offset < scrollObj.maxScrollOffset) {
	    return offset - scrollObj.maxScrollOffset
	  }
	}
	
	function touchBoundary(scrollObj, offset) {
	  if (offset > scrollObj.minScrollOffset) {
	    offset = scrollObj.minScrollOffset
	  } else if (offset < scrollObj.maxScrollOffset) {
	    offset = scrollObj.maxScrollOffset
	  }
	  return offset
	}
	
	function fireEvent(scrollObj, eventName, extra) {
	  debugLog(scrollObj.element.scrollId, eventName, extra)
	  var event = doc.createEvent('HTMLEvents')
	  event.initEvent(eventName, false, true)
	  event.scrollObj = scrollObj
	  if (extra) {
	    for (var key in extra) {
	      event[key] = extra[key]
	    }
	  }
	  scrollObj.element.dispatchEvent(event)
	  scrollObj.viewport.dispatchEvent(event)
	}
	
	function getTransformOffset(scrollObj) {
	  var offset = {x: 0, y: 0}
	  var transform = getComputedStyle(scrollObj.element)
	    [stylePrefix + 'Transform']
	  var matched
	  var reg1 = new RegExp('^matrix3d'
	    + '\\((?:[-\\d.]+,\\s*){12}([-\\d.]+),'
	    + '\\s*([-\\d.]+)(?:,\\s*[-\\d.]+){2}\\)')
	  var reg2 = new RegExp('^matrix'
	    + '\\((?:[-\\d.]+,\\s*){4}([-\\d.]+),\\s*([-\\d.]+)\\)$')
	  if (transform !== 'none') {
	    if ((matched = transform.match(reg1) ||
	        transform.match(reg2))) {
	      offset.x = parseFloat(matched[1]) || 0
	      offset.y = parseFloat(matched[2]) || 0
	    }
	  }
	
	  return offset
	}
	
	var CSSMatrix = IEMobile ? 'MSCSSMatrix' : 'WebKitCSSMatrix'
	var has3d = !!Firefox
	  || CSSMatrix in window
	  && 'm11' in new window[CSSMatrix]()
	function getTranslate(x, y) {
	  x = parseFloat(x)
	  y = parseFloat(y)
	
	  if (x != 0) {
	    x += 'px'
	  }
	
	  if (y != 0) {
	    y += 'px'
	  }
	
	  if (has3d) {
	    return 'translate3d(' + x + ', ' + y + ', 0)'
	  }
	  return 'translate(' + x + ', ' + y + ')'
	}
	
	function setTransitionStyle(scrollObj, duration, timingFunction) {
	  if (duration === '' && timingFunction === '') {
	    scrollObj.element.style[stylePrefix + 'Transition'] = ''
	  } else {
	    scrollObj.element.style[stylePrefix + 'Transition']
	      = cssPrefix + 'transform ' + duration + ' ' + timingFunction + ' 0s'
	  }
	}
	
	function setTransformStyle(scrollObj, offset) {
	  var x = 0
	  var y = 0
	  if (typeof offset === 'object') {
	    x = offset.x
	    y = offset.y
	  } else {
	    if (scrollObj.axis === 'y') {
	      y = offset
	    } else {
	      x = offset
	    }
	  }
	  scrollObj.element.style[stylePrefix + 'Transform'] = getTranslate(x, y)
	}
	
	var panning = false
	doc.addEventListener('touchmove', function (e) {
	  if (panning) {
	    e.preventDefault()
	    return false
	  }
	  return true
	}, false)
	
	function Scroll(element, options) {
	  var that = this
	
	  options = options || {}
	  options.noBounce = !!options.noBounce
	  options.padding = options.padding || {}
	
	  if (options.isPrevent == null) {
	    options.isPrevent = true
	  } else {
	    options.isPrevent = !!options.isPrevent
	  }
	
	  if (options.isFixScrollendClick == null) {
	    options.isFixScrollendClick = true
	  } else {
	    options.isFixScrollendClick = !!options.isFixScrollendClick
	  }
	
	  if (options.padding) {
	    options.yPaddingTop = -options.padding.top || 0
	    options.yPaddingBottom = -options.padding.bottom || 0
	    options.xPaddingTop = -options.padding.left || 0
	    options.xPaddingBottom = -options.padding.right || 0
	  } else {
	    options.yPaddingTop = 0
	    options.yPaddingBottom = 0
	    options.xPaddingTop = 0
	    options.xPaddingBottom = 0
	  }
	
	  options.direction = options.direction || 'y'
	  options.inertia = options.inertia || 'normal'
	
	  this.options = options
	  that.axis = options.direction
	  this.element = element
	  this.viewport = element.parentNode
	  this.plugins = {}
	
	  this.element.scrollId = setTimeout(function () {
	    scrollObjs[that.element.scrollId + ''] = that
	  }, 1)
	
	  this.viewport.addEventListener('touchstart', touchstartHandler, false)
	  this.viewport.addEventListener('touchend', touchendHandler, false)
	  this.viewport.addEventListener('touchcancel', touchendHandler, false)
	  this.viewport.addEventListener('panstart', panstartHandler, false)
	  this.viewport.addEventListener('panmove', panHandler, false)
	  this.viewport.addEventListener('panend', panendHandler, false)
	
	  if (options.isPrevent) {
	    this.viewport.addEventListener('touchstart', function (e) {
	      panning = true
	    }, false)
	    that.viewport.addEventListener('touchend', function (e) {
	      panning = false
	    }, false)
	  }
	
	  // if (options.isPrevent) {
	  //   var d = this.axis === 'y'?'vertical':'horizontal'
	  //   this.viewport.addEventListener(d + 'panstart', function (e) {
	  //     panning = true
	  //   }, false)
	  //   that.viewport.addEventListener('panend', function (e) {
	  //     panning = false
	  //   }, false)
	  // }
	
	  if (options.isFixScrollendClick) {
	    var preventScrollendClick
	    var fixScrollendClickTimeoutId
	
	    this.viewport.addEventListener('scrolling', function () {
	      preventScrollendClick = true
	      fixScrollendClickTimeoutId && clearTimeout(fixScrollendClickTimeoutId)
	      fixScrollendClickTimeoutId = setTimeout(function (e) {
	        preventScrollendClick = false
	      }, 400)
	    }, false)
	
	    function preventScrollendClickHandler(e) {
	      if (preventScrollendClick || isScrolling) {
	        e.preventDefault()
	        e.stopPropagation()
	        return false
	      }
	      return true
	    }
	
	    function fireNiceTapEventHandler(e) {
	      if (!preventScrollendClick && !isScrolling) {
	        setTimeout(function () {
	          var niceTapEvent = document.createEvent('HTMLEvents')
	          niceTapEvent.initEvent('niceclick', true, true)
	          e.target.dispatchEvent(niceTapEvent)
	        }, 300)
	      }
	    }
	
	    this.viewport.addEventListener('click', preventScrollendClickHandler)
	    this.viewport.addEventListener('tap', fireNiceTapEventHandler)
	  }
	
	  if (options.useFrameAnimation) {
	    var scrollAnimation
	
	    Object.defineProperty(this, 'animation', {
	      get: function () {
	        return scrollAnimation
	      }
	    })
	  } else {
	    var transitionEndHandler
	    var transitionEndTimeoutId = 0
	
	    function setTransitionEndHandler(h, t) {
	      transitionEndHandler = null
	      clearTimeout(transitionEndTimeoutId)
	
	      transitionEndTimeoutId = setTimeout(function () {
	        if (transitionEndHandler) {
	          transitionEndHandler = null
	          lib.animation.requestFrame(h)
	        }
	      }, (t || 400))
	
	      transitionEndHandler = h
	    }
	
	    element.addEventListener(
	        Firefox
	          ? 'transitionend'
	          : (stylePrefix + 'TransitionEnd'), function (e) {
	      if (transitionEndHandler) {
	        var handler = transitionEndHandler
	
	        transitionEndHandler = null
	        clearTimeout(transitionEndTimeoutId)
	
	        lib.animation.requestFrame(function () {
	          handler(e)
	        })
	      }
	    }, false)
	  }
	
	  var panFixRatio
	  var isScrolling
	  var isFlickScrolling
	  var cancelScrollEnd
	
	  Object.defineProperty(this, 'isScrolling', {
	    get: function () {
	      return !!isScrolling
	    }
	  })
	
	  function isEnabled(e) {
	    if (!that.enabled) {
	      return false
	    }
	
	    if (typeof e.isVertical != 'undefined') {
	      if (that.axis === 'y' && e.isVertical
	          || that.axis === 'x' && !e.isVertical) {
	        // gesture in same direction, stop bubbling up
	        e.stopPropagation()
	      } else {
	        // gesture in different direction, bubbling up
	        // to the top, without any other process
	        return false
	      }
	    }
	
	    return true
	  }
	
	  function touchstartHandler(e) {
	    if (!isEnabled(e)) {
	      return
	    }
	
	    if (isScrolling) {
	      scrollEnd()
	    }
	
	    if (options.useFrameAnimation) {
	      scrollAnimation && scrollAnimation.stop()
	      scrollAnimation = null
	    } else {
	      var transform = getTransformOffset(that)
	      setTransformStyle(that, transform)
	      setTransitionStyle(that, '', '')
	      transitionEndHandler = null
	      clearTimeout(transitionEndTimeoutId)
	    }
	  }
	
	  function touchendHandler(e) {
	    if (!isEnabled(e)) {
	      return
	    }
	
	    var s0 = getTransformOffset(that)[that.axis]
	    var boundaryOffset = getBoundaryOffset(that, s0)
	
	    if (boundaryOffset) {
	      // dragging out of boundray, bounce is needed
	      var s1 = touchBoundary(that, s0)
	
	      if (options.useFrameAnimation) {
	        // frame
	        var _s = s1 - s0
	        scrollAnimation = new lib.animation(
	            400,
	            lib.cubicbezier.ease,
	            0,
	            function (i1, i2) {
	          var offset = (s0 + _s * i2).toFixed(2)
	          setTransformStyle(that, offset)
	          fireEvent(that, 'scrolling')
	        })
	        scrollAnimation.onend(scrollEnd)
	        scrollAnimation.play()
	      } else {
	        // css
	        var offset =  s1.toFixed(0)
	        setTransitionStyle(that, '0.4s', 'ease')
	        setTransformStyle(that, offset)
	        setTransitionEndHandler(scrollEnd, 400)
	
	        lib.animation.requestFrame(function () {
	          if (isScrolling && that.enabled) {
	            fireEvent(that, 'scrolling')
	            lib.animation.requestFrame(arguments.callee)
	          }
	        })
	      }
	
	      if (boundaryOffset > 0) {
	        fireEvent(that, that.axis === 'y' ? 'pulldownend' : 'pullrightend')
	      } else if (boundaryOffset < 0) {
	        fireEvent(that, that.axis === 'y' ? 'pullupend' : 'pullleftend')
	      }
	    } else if (isScrolling) {
	      // without exceeding the boundary, just end it
	      scrollEnd()
	    }
	  }
	
	  var lastDisplacement
	  function panstartHandler(e) {
	    if (!isEnabled(e)) {
	      return
	    }
	
	    that.transformOffset = getTransformOffset(that)
	    that.minScrollOffset = getMinScrollOffset(that)
	    that.maxScrollOffset = getMaxScrollOffset(that)
	    panFixRatio = 2.5
	    cancelScrollEnd = true
	    isScrolling = true
	    isFlickScrolling = false
	    fireEvent(that, 'scrollstart')
	
	    lastDisplacement = e['displacement' + that.axis.toUpperCase()]
	  }
	
	
	  function panHandler(e) {
	    if (!isEnabled(e)) {
	      return
	    }
	
	    // finger move less than 5 px. just ignore that.
	    var displacement = e['displacement' + that.axis.toUpperCase()]
	    if (Math.abs(displacement - lastDisplacement) < 5) {
	      e.stopPropagation()
	      return
	    }
	    lastDisplacement = displacement
	
	    var offset = that.transformOffset[that.axis] + displacement
	    if (offset > that.minScrollOffset) {
	      offset = that.minScrollOffset
	        + (offset - that.minScrollOffset) / panFixRatio
	      panFixRatio *= 1.003
	    } else if (offset < that.maxScrollOffset) {
	      offset = that.maxScrollOffset
	        - (that.maxScrollOffset - offset) / panFixRatio
	      panFixRatio *= 1.003
	    }
	    if (panFixRatio > 4) {
	      panFixRatio = 4
	    }
	
	    // tell whether or not reach the fringe
	    var boundaryOffset = getBoundaryOffset(that, offset)
	    if (boundaryOffset) {
	      fireEvent(
	          that,
	          boundaryOffset > 0
	          ? (that.axis === 'y' ? 'pulldown' : 'pullright')
	          : (that.axis === 'y' ? 'pullup' : 'pullleft'), {
	        boundaryOffset: Math.abs(boundaryOffset)
	      })
	      if (that.options.noBounce) {
	        offset = touchBoundary(that, offset)
	      }
	    }
	
	    setTransformStyle(that, offset.toFixed(2))
	    fireEvent(that, 'scrolling')
	  }
	
	  function panendHandler(e) {
	    if (!isEnabled(e)) {
	      return
	    }
	
	    if (e.isflick) {
	      flickHandler(e)
	    }
	  }
	
	  function flickHandler(e) {
	    cancelScrollEnd = true
	
	    var v0, a0, t0, s0, s, motion0
	    var v1, a1, t1, s1, motion1,sign
	    var v2, a2, t2, s2, motion2, ft
	
	    s0 = getTransformOffset(that)[that.axis]
	    var boundaryOffset0 = getBoundaryOffset(that, s0)
	    if (!boundaryOffset0) {
	      // when fingers left the range of screen, let touch end handler
	      // to deal with it.
	      // when fingers left the screen, but still in the range of
	      // screen, calculate the intertia.
	      v0 = e['velocity' + that.axis.toUpperCase()]
	
	      var maxV = 2
	      var friction = 0.0015
	      if (options.inertia && inertiaCoefficient[options.inertia]) {
	        maxV = inertiaCoefficient[options.inertia][0]
	        friction = inertiaCoefficient[options.inertia][1]
	      }
	
	      if (v0 > maxV) {
	        v0 = maxV
	      }
	      if (v0 < -maxV) {
	        v0 = -maxV
	      }
	      a0 = friction * (v0 / Math.abs(v0))
	      motion0 = new lib.motion({
	        v: v0,
	        a: -a0
	      })
	      t0 = motion0.t
	      s = s0 + motion0.s
	
	      var boundaryOffset1 = getBoundaryOffset(that, s)
	      if (boundaryOffset1) {
	        debugLog('inertial calculation has exceeded the boundary',
	          boundaryOffset1)
	
	        v1 = v0
	        a1 = a0
	        if (boundaryOffset1 > 0) {
	          s1 = that.minScrollOffset
	          sign = 1
	        } else {
	          s1 = that.maxScrollOffset
	          sign = -1
	        }
	        motion1 = new lib.motion({
	          v: sign * v1,
	          a: -sign * a1,
	          s: Math.abs(s1 - s0)
	        })
	        t1 = motion1.t
	        var timeFunction1 = motion1.generateCubicBezier()
	
	        v2 = v1 - a1 * t1
	        a2 = 0.03 * (v2 / Math.abs(v2))
	        motion2 = new lib.motion({
	          v: v2,
	          a: -a2
	        })
	        t2 = motion2.t
	        s2 = s1 + motion2.s
	        var timeFunction2 = motion2.generateCubicBezier()
	
	        if (options.noBounce) {
	          debugLog('no bounce effect')
	
	          if (s0 !== s1) {
	            if (options.useFrameAnimation) {
	              // frame
	              var _s = s1 - s0
	              var bezier = lib.cubicbezier(
	                timeFunction1[0][0],
	                timeFunction1[0][1],
	                timeFunction1[1][0],
	                timeFunction1[1][1]
	              )
	              scrollAnimation = new lib.animation(
	                  t1.toFixed(0),
	                  bezier,
	                  0,
	                  function (i1, i2) {
	                var offset = (s0 + _s * i2)
	                getTransformOffset(that, offset.toFixed(2))
	                fireEvent(that, 'scrolling', {
	                  afterFlick: true
	                })
	              })
	
	              scrollAnimation.onend(scrollEnd)
	
	              scrollAnimation.play()
	            } else {
	              // css
	              var offset = s1.toFixed(0)
	              setTransitionStyle(
	                that,
	                (t1 / 1000).toFixed(2) + 's',
	                'cubic-bezier(' + timeFunction1 + ')'
	              )
	              setTransformStyle(that, offset)
	              setTransitionEndHandler(
	                scrollEnd,
	                (t1 / 1000).toFixed(2) * 1000
	              )
	            }
	          } else {
	            scrollEnd()
	          }
	        } else if (s0 !== s2) {
	          debugLog(
	            'scroll for inertia',
	            's=' + s2.toFixed(0),
	            't=' + ((t1 + t2) / 1000).toFixed(2)
	          )
	
	          if (options.useFrameAnimation) {
	            var _s = s2 - s0
	            var bezier = lib.cubicbezier.easeOut
	            scrollAnimation = new lib.animation(
	                (t1 + t2).toFixed(0),
	                bezier,
	                0,
	                function (i1, i2) {
	              var offset = s0 + _s * i2
	              setTransformStyle(that, offset.toFixed(2))
	              fireEvent(that, 'scrolling',{
	                afterFlick: true
	              })
	            })
	
	            scrollAnimation.onend(function () {
	              if (!that.enabled) {
	                return
	              }
	
	              var _s = s1 - s2
	              var bezier = lib.cubicbezier.ease
	              scrollAnimation = new lib.animation(
	                  400,
	                  bezier,
	                  0,
	                  function (i1, i2) {
	                var offset = s2 + _s * i2
	                setTransformStyle(that, offset.toFixed(2))
	                fireEvent(that, 'scrolling',{
	                  afterFlick: true
	                })
	              })
	
	              scrollAnimation.onend(scrollEnd)
	
	              scrollAnimation.play()
	            })
	
	            scrollAnimation.play()
	          } else {
	            var offset = s2.toFixed(0)
	            setTransitionStyle(
	              that,
	              ((t1 + t2) / 1000).toFixed(2) + 's',
	              'ease-out'
	            )
	            setTransformStyle(that, offset)
	
	            setTransitionEndHandler(function (e) {
	              if (!that.enabled) {
	                return
	              }
	
	              debugLog('inertial bounce',
	                's=' + s1.toFixed(0),
	                't=400'
	              )
	
	              if (s2 !== s1) {
	                var offset = s1.toFixed(0)
	                setTransitionStyle(that, '0.4s', 'ease')
	                setTransformStyle(that, offset)
	                setTransitionEndHandler(scrollEnd, 400)
	              } else {
	                scrollEnd()
	              }
	            }, ((t1 + t2) / 1000).toFixed(2) * 1000)
	          }
	        } else {
	          scrollEnd()
	        }
	      } else {
	        debugLog('inertial calculation hasn\'t exceeded the boundary')
	        var timeFunction = motion0.generateCubicBezier()
	
	        if (options.useFrameAnimation) {
	          // frame
	          var _s = s - s0
	          var bezier = lib.cubicbezier(
	            timeFunction[0][0],
	            timeFunction[0][1],
	            timeFunction[1][0],
	            timeFunction[1][1]
	          )
	          scrollAnimation = new lib.animation(
	              t0.toFixed(0),
	              bezier,
	              0,
	              function (i1, i2) {
	            var offset = (s0 + _s * i2).toFixed(2)
	            setTransformStyle(that, offset)
	            fireEvent(that, 'scrolling',{
	              afterFlick: true
	            })
	          })
	
	          scrollAnimation.onend(scrollEnd)
	
	          scrollAnimation.play()
	        } else {
	          // css
	          var offset = s.toFixed(0)
	          setTransitionStyle(
	            that,
	            (t0 / 1000).toFixed(2) + 's',
	            'cubic-bezier(' + timeFunction + ')'
	          )
	          setTransformStyle(that, offset)
	          setTransitionEndHandler(scrollEnd, (t0 / 1000).toFixed(2) * 1000)
	        }
	      }
	
	
	      isFlickScrolling = true
	      if (!options.useFrameAnimation) {
	        lib.animation.requestFrame(function () {
	          if (isScrolling && isFlickScrolling && that.enabled) {
	            fireEvent(that, 'scrolling', {
	              afterFlick: true
	            })
	            lib.animation.requestFrame(arguments.callee)
	          }
	        })
	      }
	    }
	  }
	
	  function scrollEnd() {
	    if (!that.enabled) {
	      return
	    }
	
	    cancelScrollEnd = false
	
	    setTimeout(function () {
	      if (!cancelScrollEnd && isScrolling) {
	        isScrolling = false
	        isFlickScrolling = false
	
	        if (options.useFrameAnimation) {
	          scrollAnimation && scrollAnimation.stop()
	          scrollAnimation = null
	        } else {
	          setTransitionStyle(that, '', '')
	        }
	        fireEvent(that, 'scrollend')
	      }
	    }, 50)
	  }
	
	  var proto = {
	    init: function () {
	      this.enable()
	      this.refresh()
	      this.scrollTo(0)
	      return this
	    },
	
	    enable: function () {
	      this.enabled = true
	      return this
	    },
	
	    disable: function () {
	      var el = this.element
	      this.enabled = false
	
	      if (this.options.useFrameAnimation) {
	        scrollAnimation && scrollAnimation.stop()
	      } else {
	        lib.animation.requestFrame(function () {
	          el.style[stylePrefix + 'Transform']
	            = getComputedStyle(el)[stylePrefix + 'Transform']
	        })
	      }
	
	      return this
	    },
	
	    getScrollWidth: function () {
	      return getBoundingClientRect(this.element).width
	    },
	
	    getScrollHeight: function () {
	      return getBoundingClientRect(this.element).height
	    },
	
	    getScrollLeft: function () {
	      return -getTransformOffset(this).x - this.options.xPaddingTop
	    },
	
	    getScrollTop: function () {
	      return -getTransformOffset(this).y - this.options.yPaddingTop
	    },
	
	    getMaxScrollLeft: function () {
	      return -that.maxScrollOffset - this.options.xPaddingTop
	    },
	
	    getMaxScrollTop: function () {
	      return -that.maxScrollOffset - this.options.yPaddingTop
	    },
	
	    getBoundaryOffset: function () {
	      return Math.abs(
	        getBoundaryOffset(this, getTransformOffset(this)[this.axis]) || 0
	      )
	    },
	
	    refresh: function () {
	      var el = this.element
	      var isVertical = (this.axis === 'y')
	      var type = isVertical?'height':'width'
	
	      if (this.options[type] != null) {
	        // use options
	        el.style[type] = this.options[type] + 'px'
	      } else if (!!this.options.useElementRect) {
	        el.style[type] = 'auto'
	        el.style[type] = getBoundingClientRect(el)[type] + 'px'
	      } else if (el.childElementCount > 0) {
	        var range
	        var rect
	        var firstEl = el.firstElementChild
	        var lastEl = el.lastElementChild
	
	        if (document.createRange && !this.options.ignoreOverflow) {
	          // use range
	          range = document.createRange()
	          range.selectNodeContents(el)
	          rect = getBoundingClientRect(range)
	        }
	
	        if (rect) {
	          el.style[type] = rect[type] + 'px'
	        } else {
	          // use child offsets
	          while (firstEl) {
	            if (getBoundingClientRect(firstEl)[type] === 0
	                && firstEl.nextElementSibling) {
	              firstEl = firstEl.nextElementSibling
	            } else {
	              break
	            }
	          }
	
	          while (lastEl && lastEl !== firstEl) {
	            if (getBoundingClientRect(lastEl)[type] === 0
	                && lastEl.previousElementSibling) {
	              lastEl = lastEl.previousElementSibling
	            } else {
	              break
	            }
	          }
	
	          el.style[type] = (getBoundingClientRect(lastEl)[
	              isVertical ? 'bottom' : 'right']
	            - getBoundingClientRect(firstEl)[
	              isVertical ? 'top' : 'left'])
	            + 'px'
	        }
	      }
	
	      this.transformOffset = getTransformOffset(this)
	      this.minScrollOffset = getMinScrollOffset(this)
	      this.maxScrollOffset = getMaxScrollOffset(this)
	      this.scrollTo(
	        -this.transformOffset[this.axis]
	        - this.options[this.axis + 'PaddingTop']
	      )
	      fireEvent(this, 'contentrefresh')
	
	      return this
	    },
	
	    offset: function (childEl) {
	      var elRect = getBoundingClientRect(this.element)
	      var childRect = getBoundingClientRect(childEl)
	      if (this.axis === 'y') {
	        var offsetRect = {
	          top: childRect.top - elRect.top - this.options.yPaddingTop,
	          left: childRect.left - elRect.left,
	          right: elRect.right - childRect.right,
	          width: childRect.width,
	          height: childRect.height
	        }
	
	        offsetRect.bottom = offsetRect.top + offsetRect.height
	      } else {
	        var offsetRect = {
	          top: childRect.top - elRect.top,
	          bottom: elRect.bottom - childRect.bottom,
	          left: childRect.left - elRect.left - this.options.xPaddingTop,
	          width: childRect.width,
	          height: childRect.height
	        }
	
	        offsetRect.right = offsetRect.left + offsetRect.width
	      }
	      return offsetRect
	    },
	
	    getRect: function (childEl) {
	      var viewRect = getBoundingClientRect(this.viewport)
	      var childRect = getBoundingClientRect(childEl)
	      if (this.axis === 'y') {
	        var offsetRect = {
	          top: childRect.top - viewRect.top,
	          left: childRect.left - viewRect.left,
	          right: viewRect.right - childRect.right,
	          width: childRect.width,
	          height: childRect.height
	        }
	
	        offsetRect.bottom = offsetRect.top + offsetRect.height
	      } else {
	        var offsetRect = {
	          top: childRect.top - viewRect.top,
	          bottom: viewRect.bottom - childRect.bottom,
	          left: childRect.left - viewRect.left,
	          width: childRect.width,
	          height: childRect.height
	        }
	
	        offsetRect.right = offsetRect.left + offsetRect.width
	      }
	      return offsetRect
	    },
	
	    isInView: function (childEl) {
	      var viewRect = this.getRect(this.viewport)
	      var childRect = this.getRect(childEl)
	      if (this.axis === 'y') {
	        return viewRect.top < childRect.bottom
	          && viewRect.bottom > childRect.top
	      }
	      return viewRect.left < childRect.right
	        && viewRect.right > childRect.left
	    },
	
	    scrollTo: function (offset, isSmooth) {
	      var that = this
	      var element = this.element
	
	      offset = -offset - this.options[this.axis + 'PaddingTop']
	      offset = touchBoundary(this, offset)
	
	      isScrolling = true
	      if (isSmooth === true) {
	        if (this.options.useFrameAnimation) {
	          var s0 = getTransformOffset(that)[this.axis]
	          var _s = offset - s0
	          scrollAnimation = new lib.animation(
	              400,
	              lib.cubicbezier.easeInOut,
	              0,
	              function (i1, i2) {
	            var offset = (s0 + _s * i2).toFixed(2)
	            setTransformStyle(that, offset)
	            fireEvent(that, 'scrolling')
	          })
	
	          scrollAnimation.onend(scrollEnd)
	
	          scrollAnimation.play()
	        } else {
	          setTransitionStyle(that, '0.4s', 'ease-in-out')
	          setTransformStyle(that, offset)
	          setTransitionEndHandler(scrollEnd, 400)
	
	          lib.animation.requestFrame(function () {
	            if (isScrolling && that.enabled) {
	              fireEvent(that, 'scrolling')
	              lib.animation.requestFrame(arguments.callee)
	            }
	          })
	        }
	      } else {
	        if (!this.options.useFrameAnimation) {
	          setTransitionStyle(that, '', '')
	        }
	        setTransformStyle(that, offset)
	        scrollEnd()
	      }
	
	      return this
	    },
	
	    scrollToElement: function (childEl, isSmooth) {
	      var offset = this.offset(childEl)
	      offset = offset[this.axis === 'y'?'top':'left']
	      return this.scrollTo(offset, isSmooth)
	    },
	
	    getViewWidth: function () {
	      return getBoundingClientRect(this.viewport).width
	    },
	
	    getViewHeight: function () {
	      return getBoundingClientRect(this.viewport).height
	    },
	
	    addPulldownHandler: function (handler) {
	      var that = this
	      this.element.addEventListener('pulldownend', function (e) {
	        that.disable()
	        handler.call(that, e, function () {
	          that.scrollTo(0, true)
	          that.refresh()
	          that.enable()
	        })
	      }, false)
	
	      return this
	    },
	
	    addPullupHandler: function (handler) {
	      var that = this
	
	      this.element.addEventListener('pullupend', function (e) {
	        that.disable()
	        handler.call(that, e, function () {
	          that.scrollTo(that.getScrollHeight(), true)
	          that.refresh()
	          that.enable()
	        })
	      }, false)
	
	      return this
	    },
	
	    addScrollstartHandler: function (handler) {
	      var that = this
	      this.element.addEventListener('scrollstart', function (e) {
	        handler.call(that, e)
	      }, false)
	
	      return this
	    },
	
	    addScrollingHandler: function (handler) {
	      var that = this
	      this.element.addEventListener('scrolling', function (e) {
	        handler.call(that, e)
	      }, false)
	
	      return this
	    },
	
	    addScrollendHandler: function (handler) {
	      var that = this
	      this.element.addEventListener('scrollend', function (e) {
	        handler.call(that, e)
	      }, false)
	
	      return this
	    },
	
	    addContentrenfreshHandler: function (handler) {
	      var that = this
	      this.element.addEventListener('contentrefresh', function (e) {
	        handler.call(that, e)
	      }, false)
	    },
	
	    addEventListener: function (name, handler, useCapture) {
	      var that = this
	      this.element.addEventListener(name, function (e) {
	        handler.call(that, e)
	      }, !!useCapture)
	    },
	
	    removeEventListener: function (name, handler) {
	      var that = this
	      this.element.removeEventListener(name, function (e) {
	        handler.call(that, e)
	      })
	    },
	
	    enablePlugin: function (name, options) {
	      var plugin = plugins[name]
	      if (plugin && !this.plugins[name]) {
	        this.plugins[name] = true
	        options = options || {}
	        plugin.call(this, name, options)
	      }
	      return this
	    }
	  }
	
	  for (var k in proto) {
	    this[k] = proto[k]
	  }
	  delete proto
	}
	
	lib.scroll = function (el, options) {
	  if (arguments.length === 1 && !(arguments[0] instanceof HTMLElement)) {
	    options = arguments[0]
	    if (options.scrollElement) {
	      el = options.scrollElement
	    } else if (options.scrollWrap) {
	      el = options.scrollWrap.firstElementChild
	    } else {
	      throw new Error('no scroll element')
	    }
	  }
	
	  if (!el.parentNode) {
	    throw new Error('wrong dom tree')
	  }
	  if (options
	      && options.direction
	      && ['x', 'y'].indexOf(options.direction) < 0) {
	    throw new Error('wrong direction')
	  }
	
	  var scroll
	  if (options.downgrade === true
	      && lib.scroll.downgrade) {
	    scroll = lib.scroll.downgrade(el, options)
	  } else {
	    if (el.scrollId) {
	      scroll = scrollObjs[el.scrollId]
	    } else {
	      scroll = new Scroll(el, options)
	    }
	  }
	  return scroll
	}
	
	lib.scroll.plugin = function (name, constructor) {
	  if (constructor) {
	    name = name.split(',')
	    name.forEach(function (n) {
	      plugins[n] = constructor
	    })
	  } else {
	    return plugins[name]
	  }
	}
	


/***/ },
/* 48 */
/***/ function(module, exports) {

	'use strict'
	
	/**
	 * transfer Quadratic Bezier Curve to Cubic Bezier Curve
	 *
	 * @param  {number} a abscissa of p1
	 * @param  {number} b ordinate of p1
	 * @return {Array} parameter matrix for cubic bezier curve
	 *   like [[p1x, p1y], [p2x, p2y]]
	 */
	function quadratic2cubicBezier(a, b) {
	  return [
	    [
	      (a / 3 + (a + b) / 3 - a) / (b - a),
	      (a * a / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)
	    ], [
	      (b / 3 + (a + b) / 3 - a) / (b - a),
	      (b * b / 3 + a * b * 2 / 3 - a * a) / (b * b - a * a)
	    ]
	  ]
	}
	
	/**
	 * derive position data from knowing motion parameters
	 * base on Newton's second law: s = vt + at^2/2
	 *
	 * @param {object} config object of { v, a, s, t }
	 *   - v: initial velocity
	 *   - a: accelerate speed
	 *   - t: time
	 *   - s: shifting
	 */
	function Motion(config) {
	
	  this.v = config.v || 0
	  this.a = config.a || 0
	
	  if (typeof config.t !== 'undefined') {
	    this.t = config.t
	  }
	
	  if (typeof config.s !== 'undefined') {
	    this.s = config.s
	  }
	
	  // derive time from shifting
	  if (typeof this.t === 'undefined') {
	    if (typeof this.s === 'undefined') {
	      this.t = -this.v / this.a
	    } else {
	      var t1 = (Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v)
	        / this.a
	      var t2 = (-Math.sqrt(this.v * this.v + 2 * this.a * this.s) - this.v)
	        / this.a
	      this.t = Math.min(t1, t2)
	    }
	  }
	
	  // derive shifting from time
	  if (typeof this.s === 'undefined') {
	    this.s = this.a * this.t * this.t / 2 + this.v * this.t
	  }
	}
	
	/**
	 * derive cubic bezier parameters from motion parameters
	 * @return {Array} parameter matrix for cubic bezier curve
	 *   like [[p1x, p1y], [p2x, p2y]]
	 */
	Motion.prototype.generateCubicBezier = function () {
	  return quadratic2cubicBezier(
	    this.v / this.a, this.t + this.v / this.a
	  )
	}
	
	!lib && (lib = {})
	lib.motion = Motion
	
	module.exports = Motion

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var List = __webpack_require__(44)
	
	function Hlist(data, nodeType) {
	  data.attr.direction = 'h'
	  List.call(this, data, nodeType)
	}
	
	Hlist.prototype = Object.create(List.prototype)
	
	module.exports = Hlist

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	__webpack_require__(51)
	
	var FORMATTER_REGEXP = /(\\)?(dd*|hh?|mm?|ss?)/gi
	
	function formatDateTime(data, formatter, timeColor) {
	  return formatter.replace(FORMATTER_REGEXP, function (m) {
	    var len = m.length
	    var firstChar = m.charAt(0)
	    // escape character
	    if (firstChar === '\\') {
	      return m.replace('\\', '')
	    }
	    var value = (firstChar === 'd' ? data.days :
	                firstChar === 'h' ? data.hours :
	                firstChar === 'm' ? data.minutes :
	                firstChar === 's' ? data.seconds : 0) + ''
	
	    // 5 zero should be enough
	    return '<span style="margin:4px;color:'
	      + timeColor + '" >'
	      + ('00000' + value).substr(-Math.max(value.length, len))
	      + '</span>'
	  })
	}
	
	function Countdown (data) {
	  Atomic.call(this, data)
	}
	
	Countdown.prototype = Object.create(Atomic.prototype)
	
	Countdown.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-element')
	  var data = this.data
	  var time = Number(data.attr.countdownTime) || 0
	  var endTime = Date.now() / 1000 + time
	  var cd = lib.countdown({
	    endDate: endTime,
	    onUpdate: function (time) {
	      var timeColor = data.style.timeColor || '#000'
	      var result = formatDateTime(time, data.attr.formatterValue, timeColor)
	      node.innerHTML = result
	    },
	    onEnd: function () {
	    }
	  }).start()
	
	  return node
	}
	
	Countdown.prototype.style = {
	  textColor: function (value) {
	    this.node.style.color = value
	  }
	}
	
	module.exports = Countdown


/***/ },
/* 51 */
/***/ function(module, exports) {

	!function(a,b){function c(a){var b;if("number"==typeof a)b=new Date(1e3*a);else if("string"==typeof a){var c=a.charAt(0),d="+"===c,h="-"===c;if(d||h){for(var i,j=a.substr(1),k=j.split(":"),l=[0,0,0,0],m=4;k.length&&--m>=0;)l[m]=parseInt(k.pop())||0;i=e*l[0]+f*l[1]+g*l[2]+l[3],b=new Date,b.setSeconds(b.getSeconds()+i*(h?-1:1)),b.setMilliseconds(0)}}return b||(b=new Date(a)),b}function d(a,b){return b.replace(FORMATTER_REGEXP,function(b){var c=b.length,d=b.charAt(0);if("\\"===d)return b.replace("\\","");var e=("d"===d?a.days:"h"===d?a.hours:"m"===d?a.minutes:"s"===d?a.seconds:0)+"";return("00000"+e).substr(-Math.max(e.length,c))})}var e=86400,f=3600,g=60,h="d天hh时mm分ss秒";FORMATTER_REGEXP=/(\\)?(dd*|hh?|mm?|ss?)/gi;var i=function(a){a=a||{};var b=this,d=c(a.endDate);if(!d||!d.getTime())throw new Error("Invalid endDate");b.endDate=d,b.onUpdate=a.onUpdate,b.onEnd=a.onEnd,b.interval=a.interval||1e3,b.stringFormatter=a.stringFormatter||h,b.correctDateOffset=a.correctDateOffset||0,b.updateElement=a.updateElement,b._data={days:0,hours:0,minutes:0,seconds:0}};i.prototype={start:function(){var a=this;return a.stop(),a._update()&&(a._intervalId=setInterval(function(){a._update()},a.interval)),a},_update:function(){var a,b=this,c=b._data,h=b.updateElement,i=+new Date+1e3*b.correctDateOffset,j=Math.max(0,Math.round((b.endDate.getTime()-i)/1e3)),k=0>=j;return c.totalSeconds=j,j-=(c.days=Math.floor(j/e))*e,j-=(c.hours=Math.floor(j/f))*f,j-=(c.minutes=Math.floor(j/g))*g,c.seconds=j,c.stringValue=d(c,b.stringFormatter),h&&(h.innerHTML=c.stringValue),(a=b.onUpdate)&&a.call(b,c),k?(b.stop(),(a=b.onEnd)&&a.call(b),!1):!0},stop:function(){var a=this;return a._intervalId&&(clearInterval(a._intervalId),a._intervalId=null),a},setEndDate:function(a){var b=this;return b.endDate=c(a),b}},b.countdown=function(a){return new i(a)}}(window,window.lib||(window.lib={}));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var config = __webpack_require__(16)
	var Component = __webpack_require__(27)
	var ComponentManager = __webpack_require__(20)
	var LazyLoad = __webpack_require__(23)
	
	function Marquee (data) {
	  this.interval = Number(data.attr.interval) || 5 * 1000
	  this.transitionDuration = Number(data.attr.transitionDuration) || 500
	  this.delay = Number(data.attr.delay) || 0
	  Component.call(this, data)
	}
	
	Marquee.prototype = Object.create(Component.prototype)
	
	Marquee.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-container')
	  node.style.overflow = 'hidden'
	  // fix page shaking during slider's playing
	  node.style.webkitTransform = 'translate3D(0,0,0)'
	  node.addEventListener('webkitTransitionEnd', this.end.bind(this), false)
	  return node
	}
	
	Marquee.prototype.createChildren = function () {
	  // first run:
	  // - create each child
	  // - append to parentNode
	  // - find current and next
	  // - set current and next shown and others hidden
	  var children = this.data.children
	  var parentRef = this.data.ref
	  var instanceId = this.data.instanceId
	  var items = []
	  var componentManager = this.getComponentManager()
	
	  var fragment, isFlex, child, node, i
	
	  if (children && children.length) {
	    fragment = document.createDocumentFragment()
	    isFlex = false
	    for (i = 0; i < children.length; i++) {
	      children[i].scale = this.data.scale
	      children[i].instanceId = instanceId
	      child = componentManager.createElement(children[i])
	      child.parentRef = parentRef
	      this.initChild(child)
	      // append and push
	      items.push(child)
	      fragment.appendChild(child.node)
	      if (!isFlex && child.data.style.hasOwnProperty('flex')) {
	        isFlex = true
	      }
	    }
	    this.node.appendChild(fragment)
	  }
	
	  // set items
	  this.items = items
	
	  // reset the clock for first transition
	  this.reset()
	}
	
	Marquee.prototype.initChild = function (child) {
	  var node = child.node
	  node.style.position = 'absolute'
	  node.style.top = '0'
	  node.style.left = '0'
	}
	
	Marquee.prototype.appendChild = function (data) {
	  // dom + items
	  var componentManager = ComponentManager.getInstance(this.data.instanceId)
	  var child = componentManager.createElement(data)
	  this.initChild(child)
	  this.node.appendChild(child.node)
	  this.items.push(child)
	  this.reset()
	  return child // @todo redesign Component#appendChild(component)
	}
	
	Marquee.prototype.insertBefore = function (child, before) {
	  // dom + items
	  var index = this.items.indexOf(before)
	  this.items.splice(index, 0, child)
	  this.initChild(child)
	  this.node.insertBefore(child.node, before.node)
	  this.reset()
	}
	
	Marquee.prototype.removeChild = function (child) {
	  // dom + items
	  var index = this.items.indexOf(child)
	  this.items.splice(index, 1)
	  this.node.removeChild(child.node)
	  this.reset()
	}
	
	/**
	 * status: {
	 *   current: {translateY: 0, shown: true},
	 *   next: {translateY: height, shown: true},
	 *   others[]: {shown: false}
	 *   index: index
	 * }
	 */
	Marquee.prototype.reset = function () {
	  var interval = this.interval - 0
	  var delay = this.delay - 0
	  var items = this.items
	  var self = this
	
	  var loop = function () {
	    self.next()
	    self.timerId = setTimeout(loop, self.interval)
	  }
	
	  // reset display and transform
	  items.forEach(function (item, index) {
	    var node = item.node
	    // set non-current(0)|next(1) item hidden
	    node.style.display = index > 1 ? 'none' : ''
	    // set next(1) item translateY
	    // TODO: it supposed to use item.data.style
	    // but somehow the style object is empty.
	    // This problem relies on jsframework's bugfix.
	
	    // node.style.transform = index === 1
	    //     ? 'translate3D(0,' + config.scale * item.data.style.height + 'px,0)'
	    //     : ''
	    // node.style.webkitTransform = index === 1
	    //     ? 'translate3D(0,' + config.scale * item.data.style.height + 'px,0)'
	    //     : ''
	    node.style.transform = index === 1
	        ? 'translate3D(0,' + self.data.scale * self.data.style.height + 'px,0)'
	        : ''
	    node.style.webkitTransform = index === 1
	        ? 'translate3D(0,' + self.data.scale * self.data.style.height + 'px,0)'
	        : ''
	  })
	
	  setTimeout(function () {
	    // reset current, next, index
	    self.currentItem = items[0]
	    self.nextItem = items[1]
	    self.currentIndex = 0
	
	    items.forEach(function (item, index) {
	      var node = item.node
	      // set transition
	      node.style.transition = 'transform '
	          + self.transitionDuration
	          + 'ms ease'
	      node.style.webkitTransition = '-webkit-transform '
	          + self.transitionDuration
	          + 'ms ease'
	    })
	
	    clearTimeout(self.timerId)
	
	    if (items.length > 1) {
	      self.timerId = setTimeout(loop, delay + interval)
	    }
	  }, 13)
	
	}
	
	/**
	 * next:
	 * - current: {translateY: -height}
	 * - next: {translateY: 0}
	 */
	Marquee.prototype.next = function () {
	  // - update state
	  //   - set current and next transition
	  //   - hide current when transition end
	  //   - set next to current
	  //   - find new next
	  var next = this.nextItem.node
	  var current = this.currentItem.node
	  this.transitionIndex = this.currentIndex
	
	  // Use setTimeout to fix the problem that when the
	  // page recover from backstage, the slider will
	  // not work any longer.
	  setTimeout(function () {
	    next.style.transform = 'translate3D(0,0,0)'
	    next.style.webkitTransform = 'translate3D(0,0,0)'
	    current.style.transform = 'translate3D(0,-'
	        + this.data.scale * this.data.style.height
	        + 'px,0)'
	    current.style.webkitTransform = 'translate3D(0,-'
	        + this.data.scale * this.data.style.height
	        + 'px,0)'
	    this.fireEvent('change')
	  }.bind(this), 300)
	}
	
	Marquee.prototype.fireEvent = function (type) {
	  var length = this.items.length
	  var nextIndex = (this.currentIndex + 1) % length
	  var evt = document.createEvent('HTMLEvents')
	  evt.initEvent(type, false, false)
	  evt.data = {
	    prevIndex: this.currentIndex,
	    index: nextIndex
	  }
	  this.node.dispatchEvent(evt)
	}
	
	/**
	 * end:
	 * - old current: {shown: false}
	 * - old current: {translateY: 0}
	 * - index++ % length
	 * - new current = old next
	 * - new next = items[index+1 % length]
	 * - new next: {translateY: height}
	 * - new next: {shown: true}
	 */
	Marquee.prototype.end = function (e) {
	  var target = e.target
	  var items = this.items
	  var length = items.length
	  var current, next
	  var currentIndex, nextIndex
	
	  currentIndex = this.transitionIndex
	
	  if (isNaN(currentIndex)) {
	    return
	  }
	  delete this.transitionIndex
	
	  current = this.currentItem.node
	  current.style.display = 'none'
	  current.style.webkitTransform = ''
	
	  currentIndex = (currentIndex + 1) % length
	  nextIndex = (currentIndex + 1) % length
	
	  this.currentIndex = currentIndex
	  this.currentItem = this.nextItem
	  this.nextItem = items[nextIndex]
	
	  setTimeout(function () {
	    next = this.nextItem.node
	    // TODO: it supposed to use this.nextItem.data.style
	    // but somehow the style object is empty.
	    // This problem relies on jsframework's bugfix.
	
	    next.style.webkitTransform = 'translate3D(0,'
	        + this.data.scale * this.data.style.height
	        + 'px,0)'
	    next.style.display = ''
	    LazyLoad.loadIfNeeded(next)
	  }.bind(this))
	}
	
	Marquee.prototype.attr = {
	  interval: function (value) {
	    this.interval = value
	  },
	  transitionDuration: function (value) {
	    this.transitionDuration = value
	  },
	  delay: function (value) {
	    this.delay = value
	  }
	}
	
	Marquee.prototype.clearAttr = function () {
	  this.interval = 5 * 1000
	  this.transitionDuration = 500
	  this.delay = 0
	}
	
	module.exports = Marquee


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var extend = __webpack_require__(17).extend
	var config = __webpack_require__(16)
	var Component = __webpack_require__(27)
	var ComponentManager = __webpack_require__(20)
	var LazyLoad = __webpack_require__(23)
	__webpack_require__(54)
	__webpack_require__(58)
	
	var DEFAULT_INTERVAL = 3000
	
	function Slider (data) {
	  this.autoPlay = false  // default value is false.
	  this.interval = DEFAULT_INTERVAL
	  this.direction = 'row' // 'column' is not temporarily supported.
	  this.children = []
	  this.isPageShow = true
	  this.isDomRendering = true
	
	  // bind event 'pageshow' and 'pagehide' on window.
	  this._idleWhenPageDisappear()
	  // bind event 'renderBegin' and 'renderEnd' on window.
	  this._idleWhenDomRendering()
	
	  Component.call(this, data)
	}
	
	Slider.prototype = Object.create(Component.prototype)
	
	Slider.prototype._idleWhenPageDisappear = function () {
	  var _this = this
	  window.addEventListener('pageshow', function () {
	    _this.isPageShow = true
	    _this.autoPlay && !_this.isDomRendering && _this.play()
	  })
	  window.addEventListener('pagehide', function () {
	    _this.isPageShow = false
	    _this.stop()
	  })
	}
	
	Slider.prototype._idleWhenDomRendering = function () {
	  var _this = this
	  window.addEventListener('renderend', function () {
	    _this.isDomRendering = false
	    _this.autoPlay && _this.isPageShow && _this.play()
	  })
	  window.addEventListener('renderbegin', function () {
	    _this.isDomRendering = true
	    _this.stop()
	  })
	}
	
	Slider.prototype.attr = {
	  interval: function (val) {
	    this.interval = parseInt(val) || DEFAULT_INTERVAL
	    if (this.carrousel) {
	      this.carrousel.playInterval = this.interval
	    }
	  },
	
	  playstatus: function (val) {
	    this.playstatus = val && val !== 'false' ? true : false
	    this.autoPlay = this.playstatus
	    if (this.carrousel) {
	      if (this.playstatus) {
	        this.play()
	      } else {
	        this.stop()
	      }
	    }
	  },
	
	  // support playstatus' alias auto-play for compatibility
	  autoPlay: function (val) {
	    this.attr.playstatus.call(this, val)
	  }
	}
	
	Slider.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('slider')
	  node.style.position = 'relative'
	  node.style.overflow = 'hidden'
	  return node
	}
	
	Slider.prototype._doRender = function () {
	  var _this = this
	  _this.createChildren()
	  _this.onAppend()
	}
	
	Slider.prototype.removeChild = function (child) {
	  var children = this.data.children
	  if (children) {
	    for (var i = 0; i < children.length; i++) {
	      if (child.data.ref === children[i].ref) {
	        children.splice(i, 1)
	        break
	      }
	    }
	  }
	
	  this._doRender()
	}
	
	Slider.prototype.insertBefore = function (child, before) {
	  var children = this.data.children
	  // var childIndex = this.children.indexOf(before.data)
	  var childIndex = -1
	  for (var i = 0, l = children.length; i < l; i++) {
	    if (children[i].ref === before.data.ref) {
	      childIndex = i
	      break
	    }
	  }
	  children.splice(childIndex, 0, child.data)
	
	  this._doRender()
	  if (this.children.length > 0) {
	    return this.children[this.children.length - 1]
	  }
	}
	
	Slider.prototype.appendChild = function (data) {
	  var children = this.data.children || (this.data.children = [])
	  children.push(data)
	  this._doRender()
	  if (this.children.length > 0) {
	    return this.children[this.children.length - 1]
	  }
	}
	
	Slider.prototype.createChildren = function () {
	
	  var componentManager = this.getComponentManager()
	
	  // recreate slider container.
	  if (this.sliderContainer) {
	    this.node.removeChild(this.sliderContainer)
	  }
	  if (this.indicator) {
	    this.indicator.node.parentNode.removeChild(this.indicator.node)
	  }
	  this.children = []
	
	  var sliderContainer = document.createElement('ul')
	  sliderContainer.style.listStyle = 'none'
	  this.node.appendChild(sliderContainer)
	  this.sliderContainer = sliderContainer
	
	  var children = this.data.children
	  var scale = this.data.scale
	  var fragment = document.createDocumentFragment()
	  var indicatorData, width, height
	  var childWidth = 0
	  var childHeight = 0
	
	  if (children && children.length) {
	    for (var i = 0; i < children.length; i++) {
	      var child
	      children[i].scale = this.data.scale
	      children[i].instanceId = this.data.instanceId
	      if (children[i].type === 'indicator') {
	        indicatorData = extend(children[i], {
	          extra: {
	            amount: children.length - 1,
	            index: 0
	          }
	        })
	      } else {
	        child = componentManager.createElement(children[i], 'li')
	        this.children.push(child)
	        fragment.appendChild(child.node)
	        width = child.data.style.width || 0
	        height = child.data.style.height || 0
	        width > childWidth && (childWidth = width)
	        height > childHeight && (childHeight = height)
	        child.parentRef = this.data.ref
	      }
	    }
	    // append indicator
	    if (indicatorData) {
	      indicatorData.extra.width = this.data.style.width || childWidth
	      indicatorData.extra.height = this.data.style.height || childHeight
	      this.indicator = componentManager.createElement(indicatorData)
	      this.indicator.parentRef = this.data.ref
	      this.indicator.slider = this
	      this.node.appendChild(this.indicator.node)
	    }
	
	    sliderContainer.style.height = scale * this.data.style.height + 'px'
	    sliderContainer.appendChild(fragment)
	  }
	}
	
	Slider.prototype.onAppend = function () {
	  if (this.carrousel) {
	    this.carrousel.removeEventListener('change', this._getSliderChangeHandler())
	    this.carrousel.stop()
	    this.carrousel = null
	  }
	  this.carrousel = new lib.carrousel(this.sliderContainer, {
	    autoplay: this.autoPlay,
	    useGesture: true
	  })
	
	  this.carrousel.playInterval = this.interval
	  this.carrousel.addEventListener('change', this._getSliderChangeHandler())
	  this.currentIndex = 0
	
	  // preload all images for slider
	  // because:
	  // 1. lib-img doesn't listen to event transitionend
	  // 2. even if we fire lazy load in slider's change event handler,
	  //    the next image still won't be preloaded utill the moment it
	  //    slides into the view, which is too late.
	  if (this.preloadImgsTimer) {
	    clearTimeout(this.preloadImgsTimer)
	  }
	  // The time just before the second slide appear and enough
	  // for all child elements to append is ok.
	  var preloadTime = 0.8
	  this.preloadImgsTimer = setTimeout(function () {
	    var imgs = this.carrousel.element.querySelectorAll('.weex-img')
	    for (var i = 0, l = imgs.length; i < l; i++) {
	      var img = imgs[i]
	      var iLazySrc = img.getAttribute('i-lazy-src')
	      var imgSrc = img.getAttribute('img-src')
	      if (iLazySrc) {
	        img.style.backgroundImage = 'url(' + iLazySrc + ')'
	      } else if (imgSrc) {
	        img.style.backgroundImage = 'url(' + imgSrc + ')'
	      }
	      img.removeAttribute('i-lazy-src')
	      img.removeAttribute('img-src')
	    }
	  }.bind(this), preloadTime * 1000)
	
	  // avoid page scroll when panning
	  var panning = false
	  this.carrousel.element.addEventListener('panstart', function (e) {
	    if (!e.isVertical) {
	      panning = true
	    }
	  })
	  this.carrousel.element.addEventListener('panend', function (e) {
	    if (!e.isVertical) {
	      panning = false
	    }
	  })
	
	  document.addEventListener('touchmove', function (e) {
	    if (panning) {
	      e.preventDefault()
	      return false
	    }
	    return true
	  }.bind(this))
	
	}
	
	Slider.prototype._updateIndicators = function () {
	  this.indicator && this.indicator.setIndex(this.currentIndex)
	}
	
	Slider.prototype._getSliderChangeHandler = function (e) {
	  if (!this.sliderChangeHandler) {
	    this.sliderChangeHandler = (function (e) {
	      var index = this.carrousel.items.index
	      this.currentIndex = index
	
	      // updateIndicators
	      this._updateIndicators()
	
	      this.dispatchEvent('change', { index: index })
	    }).bind(this)
	  }
	  return this.sliderChangeHandler
	}
	
	Slider.prototype.play = function () {
	  this.carrousel.play()
	}
	
	Slider.prototype.stop = function () {
	  this.carrousel.stop()
	}
	
	Slider.prototype.slideTo = function (index) {
	  var offset = index - this.currentIndex
	  this.carrousel.items.slide(offset)
	}
	
	module.exports = Slider


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});__webpack_require__(55);__webpack_require__(56);__webpack_require__(57);!function(){var a="[data-ctrl-name=carrousel]{position:relative;-webkit-transform:translateZ(1px);-ms-transform:translateZ(1px);transform:translateZ(1px)}",b=document.createElement("style");if(document.getElementsByTagName("head")[0].appendChild(b),b.styleSheet)b.styleSheet.disabled||(b.styleSheet.cssText=a);else try{b.innerHTML=a}catch(c){b.innerText=a}}();!function(a,b,c){function d(a){var b,c={x:0,y:0},d=getComputedStyle(a)[l+"Transform"];return"none"!==d&&(b=d.match(/^matrix3d\((?:[-\d.]+,\s*){12}([-\d.]+),\s*([-\d.]+)(?:,\s*[-\d.]+){2}\)/)||d.match(/^matrix\((?:[-\d.]+,\s*){4}([-\d.]+),\s*([-\d.]+)\)$/))&&(c.x=parseFloat(b[1])||0,c.y=parseFloat(b[2])||0),c}function e(a,b){return a=parseFloat(a),b=parseFloat(b),0!=a&&(a+="px"),0!=b&&(b+="px"),n?"translate3d("+a+", "+b+", 0)":"translate("+a+", "+b+")"}function f(a){return o.call(a)}function g(a,c){function g(a,b){var c=h.createEvent("HTMLEvents");if(c.initEvent(a,!1,!1),b)for(var d in b)c[d]=b[d];n.dispatchEvent(c)}function i(a){for(;0>a;)a+=r;for(;a>=r;)a-=r;return a}function j(a){if(0!==r){var b,c,d=q.get(a);r>1&&(b=q.get(a-1),c=2===r?q.getCloned(a+1):q.get(a+1),d.style.left=-o+"px",b.style.left=-o-s+"px",c.style.left=-o+s+"px"),t=d.index,g("change",{prevItem:b,curItem:d,nextItem:c})}}var k=this,m=Date.now()+"-"+ ++p,n=document.createDocumentFragment();1!==arguments.length||arguments[0]instanceof HTMLElement||(c=arguments[0],a=null),a||(a=document.createElement("ul"),n.appendChild(a)),c=c||{},a.setAttribute("data-ctrl-name","carrousel"),a.setAttribute("data-ctrl-id",m),a.style.position="relative",a.style[l+"Transform"]=e(0,0);var o=0,q={},r=0,s=c.step||a.getBoundingClientRect().width,t=0;q.add=function(b){var c=document.createElement("li");return c.style.display="none",c.style["float"]="left",c.index=r,"string"==typeof b?c.innerHTML=b:b instanceof HTMLElement&&c.appendChild(b),a.appendChild(c),Object.defineProperty(q,r+"",{get:function(){return c}}),r++,c},q.get=function(a){return q[i(a)]},q.getCloned=function(b){function c(a,b,d){var e=a._listeners;if(e){b._listeners=e;for(var f in e)b.addEventListener(f,e[f])}if(d&&a.children&&a.children.length)for(var g=0,h=a.children.length;h>g;g++)c(a.children[g],b.children[g],d)}var b=i(b),d=a.querySelector('[cloned="cloned-'+b+'"]'),e=q[b];return d||(d=e.cloneNode(!0),c(e,d,!0),a.appendChild(d),d.setAttribute("cloned","cloned-"+b),d.index=b),d},q.slide=function(c){if(0!==r){1===r&&(c=0);var f=d(a).x,g=o+s*-c,h=g-f;if(0!==h){new b.animation(400,b.cubicbezier.ease,function(b,c){a.style[l+"Transform"]=e(f+h*c,0)}).play().then(function(){o=g,a.style[l+"Transform"]=e(g,0),c&&j(t+c)})}}},q.next=function(){q.slide(1)},q.prev=function(){q.slide(-1)},f(a.querySelectorAll("li")).forEach(function(a){a.style.position="absolute",a.style.top="0",a.style.left=r*s+"px",a.style["float"]="left",a.index=r,Object.defineProperty(q,r+"",{get:function(){return a}}),r++}),Object.defineProperty(this,"items",{get:function(){return q}}),Object.defineProperty(q,"length",{get:function(){return r}}),Object.defineProperty(q,"index",{get:function(){return t}}),Object.defineProperty(q,"step",{get:function(){return s},set:function(a){s=a}});var u=!1,v=!1,w=!1;this.play=function(){return u?void(v||(v=setTimeout(function(){w=!0,q.next(),setTimeout(function(){w=!1},500),v=setTimeout(arguments.callee,400+z)},400+z))):(u=!0,j(0))},this.stop=function(){v&&(clearTimeout(v),setTimeout(function(){v=!1},500))};var x=!1,y=!1;Object.defineProperty(this,"autoplay",{get:function(){return x},set:function(a){x=!!a,y&&(clearTimeout(y),y=!1),x?y=setTimeout(function(){k.play()},2e3):k.stop()}}),this.autoplay=!!c.autoplay;var z=1500;if(Object.defineProperty(this,"playInterval",{get:function(){return z},set:function(a){z=a}}),this.playInterval=!!c.playInterval||1500,c.useGesture){var A,B=!1;a.addEventListener("panstart",function(a){a.isVertical||B&&w||(a.preventDefault(),a.stopPropagation(),x&&k.stop(),A=0,B=!0)}),a.addEventListener("panmove",function(b){!b.isVertical&&B&&(b.preventDefault(),b.stopPropagation(),A=b.displacementX,a.style[l+"Transform"]=e(o+A,0))}),a.addEventListener("panend",function(a){!a.isVertical&&B&&(a.preventDefault(),a.stopPropagation(),B=!1,a.isflick?0>A?q.next():q.prev():Math.abs(A)<s/2?q.slide(0):q.slide(0>A?1:-1),x&&setTimeout(function(){k.play()},2e3))},!1),a.addEventListener("swipe",function(a){a.isVertical||(a.preventDefault(),a.stopPropagation())})}this.addEventListener=function(a,b){this.root.addEventListener(a,b,!1)},this.removeEventListener=function(a,b){this.root.removeEventListener(a,b,!1)},this.root=n,this.element=a}var h=a.document,i=a.navigator.userAgent,j=!!i.match(/Firefox/i),k=!!i.match(/IEMobile/i),l=j?"Moz":k?"ms":"webkit",m=k?"MSCSSMatrix":"WebKitCSSMatrix",n=!!j||m in a&&"m11"in new a[m],o=Array.prototype.slice,p=0;b.carrousel=g}(window,window.lib,window.ctrl||(window.ctrl={}));;module.exports = window.lib['carrousel'];

/***/ },
/* 55 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){return setTimeout(a,l)}function d(a){clearTimeout(a)}function e(){var a={},b=new m(function(b,c){a.resolve=b,a.reject=c});return a.promise=b,a}function f(a,b){return["then","catch"].forEach(function(c){b[c]=function(){return a[c].apply(a,arguments)}}),b}function g(b){var c,d,h=!1;this.request=function(){h=!1;var g=arguments;return c=e(),f(c.promise,this),d=n(function(){h||c&&c.resolve(b.apply(a,g))}),this},this.cancel=function(){return d&&(h=!0,o(d),c&&c.reject("CANCEL")),this},this.clone=function(){return new g(b)}}function h(a,b){"function"==typeof b&&(b={0:b});for(var c=a/l,d=1/c,e=[],f=Object.keys(b).map(function(a){return parseInt(a)}),h=0;c>h;h++){var i=f[0],j=d*h;if(null!=i&&100*j>=i){var k=b[""+i];k instanceof g||(k=new g(k)),e.push(k),f.shift()}else e.length&&e.push(e[e.length-1].clone())}return e}function i(a){var c;return"string"==typeof a||a instanceof Array?b.cubicbezier?"string"==typeof a?b.cubicbezier[a]&&(c=b.cubicbezier[a]):a instanceof Array&&4===a.length&&(c=b.cubicbezier.apply(b.cubicbezier,a)):console.error("require lib.cubicbezier"):"function"==typeof a&&(c=a),c}function j(a,b,c){var d,g=h(a,c),j=1/(a/l),k=0,m=i(b);if(!m)throw new Error("unexcept timing function");var n=!1;this.play=function(){function a(){var c=j*(k+1).toFixed(10),e=g[k];e.request(c.toFixed(10),b(c).toFixed(10)).then(function(){n&&(k===g.length-1?(n=!1,d&&d.resolve("FINISH"),d=null):(k++,a()))},function(){})}if(!n)return n=!0,d||(d=e(),f(d.promise,this)),a(),this},this.stop=function(){return n?(n=!1,g[k]&&g[k].cancel(),this):void 0}}var k=60,l=1e3/k,m=a.Promise||b.promise&&b.promise.ES6Promise,n=window.requestAnimationFrame||window.msRequestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||c,o=window.cancelAnimationFrame||window.msCancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||d;(n===c||o===d)&&(n=c,o=d),b.animation=function(a,b,c){return new j(a,b,c)},b.animation.frame=function(a){return new g(a)},b.animation.requestFrame=function(a){var b=new g(a);return b.request()}}(window,window.lib||(window.lib={}));;module.exports = window.lib['animation'];

/***/ },
/* 56 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a,b,c,d){function e(a){return(3*k*a+2*l)*a+m}function f(a){return((k*a+l)*a+m)*a}function g(a){return((n*a+o)*a+p)*a}function h(a){for(var b,c,d=a,g=0;8>g;g++){if(c=f(d)-a,Math.abs(c)<j)return d;if(b=e(d),Math.abs(b)<j)break;d-=c/b}var h=1,i=0;for(d=a;h>i;){if(c=f(d)-a,Math.abs(c)<j)return d;c>0?h=d:i=d,d=(h+i)/2}return d}function i(a){return g(h(a))}var j=1e-6,k=3*a-3*c+1,l=3*c-6*a,m=3*a,n=3*b-3*d+1,o=3*d-6*b,p=3*b;return i}b.cubicbezier=c,b.cubicbezier.linear=c(0,0,1,1),b.cubicbezier.ease=c(.25,.1,.25,1),b.cubicbezier.easeIn=c(.42,0,1,1),b.cubicbezier.easeOut=c(0,0,.58,1),b.cubicbezier.easeInOut=c(.42,0,.58,1)}(window,window.lib||(window.lib={}));;module.exports = window.lib['cubicbezier'];

/***/ },
/* 57 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a){"use strict";function b(a,b){for(var c=a;c;){if(c.contains(b)||c==b)return c;c=c.parentNode}return null}function c(a,b,c){var d=i.createEvent("HTMLEvents");if(d.initEvent(b,!0,!0),"object"==typeof c)for(var e in c)d[e]=c[e];a.dispatchEvent(d)}function d(a,b,c,d,e,f,g,h){var i=Math.atan2(h-f,g-e)-Math.atan2(d-b,c-a),j=Math.sqrt((Math.pow(h-f,2)+Math.pow(g-e,2))/(Math.pow(d-b,2)+Math.pow(c-a,2))),k=[e-j*a*Math.cos(i)+j*b*Math.sin(i),f-j*b*Math.cos(i)-j*a*Math.sin(i)];return{rotate:i,scale:j,translate:k,matrix:[[j*Math.cos(i),-j*Math.sin(i),k[0]],[j*Math.sin(i),j*Math.cos(i),k[1]],[0,0,1]]}}function e(a){0===Object.keys(l).length&&(j.addEventListener("touchmove",f,!1),j.addEventListener("touchend",g,!1),j.addEventListener("touchcancel",h,!1));for(var d=0;d<a.changedTouches.length;d++){var e=a.changedTouches[d],i={};for(var m in e)i[m]=e[m];var n={startTouch:i,startTime:Date.now(),status:"tapping",element:a.srcElement||a.target,pressingHandler:setTimeout(function(b,d){return function(){"tapping"===n.status&&(n.status="pressing",c(b,"longpress",{touch:d,touches:a.touches,changedTouches:a.changedTouches,touchEvent:a})),clearTimeout(n.pressingHandler),n.pressingHandler=null}}(a.srcElement||a.target,a.changedTouches[d]),500)};l[e.identifier]=n}if(2==Object.keys(l).length){var o=[];for(var m in l)o.push(l[m].element);c(b(o[0],o[1]),"dualtouchstart",{touches:k.call(a.touches),touchEvent:a})}}function f(a){for(var e=0;e<a.changedTouches.length;e++){var f=a.changedTouches[e],g=l[f.identifier];if(!g)return;g.lastTouch||(g.lastTouch=g.startTouch),g.lastTime||(g.lastTime=g.startTime),g.velocityX||(g.velocityX=0),g.velocityY||(g.velocityY=0),g.duration||(g.duration=0);var h=Date.now()-g.lastTime,i=(f.clientX-g.lastTouch.clientX)/h,j=(f.clientY-g.lastTouch.clientY)/h,k=70;h>k&&(h=k),g.duration+h>k&&(g.duration=k-h),g.velocityX=(g.velocityX*g.duration+i*h)/(g.duration+h),g.velocityY=(g.velocityY*g.duration+j*h)/(g.duration+h),g.duration+=h,g.lastTouch={};for(var m in f)g.lastTouch[m]=f[m];g.lastTime=Date.now();var n=f.clientX-g.startTouch.clientX,o=f.clientY-g.startTouch.clientY,p=Math.sqrt(Math.pow(n,2)+Math.pow(o,2));("tapping"===g.status||"pressing"===g.status)&&p>10&&(g.status="panning",g.isVertical=!(Math.abs(n)>Math.abs(o)),c(g.element,"panstart",{touch:f,touches:a.touches,changedTouches:a.changedTouches,touchEvent:a,isVertical:g.isVertical}),c(g.element,(g.isVertical?"vertical":"horizontal")+"panstart",{touch:f,touchEvent:a})),"panning"===g.status&&(g.panTime=Date.now(),c(g.element,"panmove",{displacementX:n,displacementY:o,touch:f,touches:a.touches,changedTouches:a.changedTouches,touchEvent:a,isVertical:g.isVertical}),g.isVertical?c(g.element,"verticalpanmove",{displacementY:o,touch:f,touchEvent:a}):c(g.element,"horizontalpanmove",{displacementX:n,touch:f,touchEvent:a}))}if(2==Object.keys(l).length){for(var q,r=[],s=[],t=[],e=0;e<a.touches.length;e++){var f=a.touches[e],g=l[f.identifier];r.push([g.startTouch.clientX,g.startTouch.clientY]),s.push([f.clientX,f.clientY])}for(var m in l)t.push(l[m].element);q=d(r[0][0],r[0][1],r[1][0],r[1][1],s[0][0],s[0][1],s[1][0],s[1][1]),c(b(t[0],t[1]),"dualtouch",{transform:q,touches:a.touches,touchEvent:a})}}function g(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var n=a.changedTouches[i],o=n.identifier,p=l[o];if(p){if(p.pressingHandler&&(clearTimeout(p.pressingHandler),p.pressingHandler=null),"tapping"===p.status&&(p.timestamp=Date.now(),c(p.element,"tap",{touch:n,touchEvent:a}),m&&p.timestamp-m.timestamp<300&&c(p.element,"doubletap",{touch:n,touchEvent:a}),m=p),"panning"===p.status){var q=Date.now(),r=q-p.startTime,s=((n.clientX-p.startTouch.clientX)/r,(n.clientY-p.startTouch.clientY)/r,n.clientX-p.startTouch.clientX),t=n.clientY-p.startTouch.clientY,u=Math.sqrt(p.velocityY*p.velocityY+p.velocityX*p.velocityX),v=u>.5&&q-p.lastTime<100,w={duration:r,isflick:v,velocityX:p.velocityX,velocityY:p.velocityY,displacementX:s,displacementY:t,touch:n,touches:a.touches,changedTouches:a.changedTouches,touchEvent:a,isVertical:p.isVertical};c(p.element,"panend",w),v&&(c(p.element,"swipe",w),p.isVertical?c(p.element,"verticalswipe",w):c(p.element,"horizontalswipe",w))}"pressing"===p.status&&c(p.element,"pressend",{touch:n,touchEvent:a}),delete l[o]}}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}function h(a){if(2==Object.keys(l).length){var d=[];for(var e in l)d.push(l[e].element);c(b(d[0],d[1]),"dualtouchend",{touches:k.call(a.touches),touchEvent:a})}for(var i=0;i<a.changedTouches.length;i++){var m=a.changedTouches[i],n=m.identifier,o=l[n];o&&(o.pressingHandler&&(clearTimeout(o.pressingHandler),o.pressingHandler=null),"panning"===o.status&&c(o.element,"panend",{touch:m,touches:a.touches,changedTouches:a.changedTouches,touchEvent:a}),"pressing"===o.status&&c(o.element,"pressend",{touch:m,touchEvent:a}),delete l[n])}0===Object.keys(l).length&&(j.removeEventListener("touchmove",f,!1),j.removeEventListener("touchend",g,!1),j.removeEventListener("touchcancel",h,!1))}var i=a.document,j=i.documentElement,k=Array.prototype.slice,l={},m=null;j.addEventListener("touchstart",e,!1)}(window);;module.exports = window.lib['gesturejs'];

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(59);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./slider.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./slider.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".slider {\n  position: relative;\n}\n\n.slider .indicator-container {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  font-size: 0;\n}\n.slider .indicator-container .indicator {\n  border-radius: 50%;\n}\n.slider .indicator-container.row {\n  -webkit-box-orient: horizontal;\n  box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.slider .indicator-container.column {\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n", ""]);
	
	// exports


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var extend = __webpack_require__(17).extend
	var config = __webpack_require__(16)
	var Atomic = __webpack_require__(39)
	var Component = __webpack_require__(27)
	
	__webpack_require__(61)
	
	var DEFAULT_ITEM_COLOR = '#999'
	var DEFAULT_ITEM_SELECTED_COLOR = '#0000ff'
	var DEFAULT_ITEM_SIZE = 20
	var DEFAULT_MARGIN_SIZE = 10
	
	// Style supported:
	//   position: (default - absolute)
	//   itemColor: color of indicator dots
	//   itemSelectedColor: color of the selected indicator dot
	//   itemSize: size of indicators
	//   other layout styles
	function Indicator (data) {
	  this.direction = 'row' // 'column' is not temporarily supported.
	  this.amount = data.extra.amount
	  this.index = data.extra.index
	  this.sliderWidth = data.extra.width
	  this.sliderHeight = data.extra.height
	  var styles = data.style || {}
	  this.data = data
	  this.style.width.call(this, styles.width)
	  this.style.height.call(this, styles.height)
	  this.items = []
	  Atomic.call(this, data)
	}
	
	Indicator.prototype = Object.create(Atomic.prototype)
	
	Indicator.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-indicators')
	  node.classList.add('weex-element')
	  node.style.position = 'absolute'
	  this.node = node
	  this.style.itemSize.call(this, 0)
	  this.itemColor = DEFAULT_ITEM_COLOR
	  this.itemSelectedColor = DEFAULT_ITEM_SELECTED_COLOR
	  this.updateStyle({
	    left: 0,
	    top: 0,
	    itemSize: 0
	  })
	  return node
	}
	
	Indicator.prototype.createChildren = function () {
	  var root = document.createDocumentFragment()
	  for (var i = 0; i < this.amount; i++) {
	    var indicator = document.createElement('div')
	    indicator.classList.add('weex-indicator')
	    indicator.style.boxSizing = 'border-box'
	    indicator.style.margin = '0 '
	                            + (DEFAULT_MARGIN_SIZE * this.data.scale)
	                            + 'px'
	    indicator.style.width = this.itemSize + 'px'
	    indicator.style.height = this.itemSize + 'px'
	    indicator.setAttribute('index', i)
	    if (this.index === i) {
	      indicator.style.backgroundColor = this.itemSelectedColor
	    } else {
	      indicator.style.backgroundColor = this.itemColor
	    }
	    indicator.addEventListener('click', this._clickHandler.bind(this, i))
	    this.items[i] = indicator
	    root.appendChild(indicator)
	  }
	  this.node.appendChild(root)
	}
	
	Indicator.prototype.style
	    = extend(Object.create(Atomic.prototype.style), {
	  itemColor: function (val) {
	    this.itemColor = val || DEFAULT_ITEM_COLOR
	    for (var i = 0, l = this.items.length; i < l; i++) {
	      this.items[i].style.backgroundColor = this.itemColor
	    }
	  },
	
	  itemSelectedColor: function (val) {
	    this.itemSelectedColor = val || DEFAULT_ITEM_SELECTED_COLOR
	    if (typeof this.index !== 'undefined'
	        && this.items.length > this.index) {
	      this.items[this.index].style.backgroundColor
	          = this.itemSelectedColor
	    }
	  },
	
	  itemSize: function (val) {
	    val = parseInt(val) * this.data.scale
	          || DEFAULT_ITEM_SIZE * this.data.scale
	    this.itemSize = val
	    this.node.style.height = val + 'px'
	    for (var i = 0, l = this.items.length; i < l; i++) {
	      this.items[i].style.width = val + 'px'
	      this.items[i].style.height = val + 'px'
	    }
	  },
	
	  width: function (val) {
	    val = parseInt(val) * this.data.scale || parseInt(this.sliderWidth)
	    this.virtualWrapperWidth = val
	  },
	
	  height: function (val) {
	    val = parseInt(val) * this.data.scale || parseInt(this.sliderHeight)
	    this.virtualWrapperHeight = val
	  },
	
	  top: function (val) {
	    val = this.virtualWrapperHeight / 2 - this.itemSize / 2
	        + val * this.data.scale
	    this.node.style.bottom = ''
	    this.node.style.top = val + 'px'
	  },
	
	  bottom: function (val) {
	    val = this.virtualWrapperHeight / 2 - this.itemSize / 2
	        + val * this.data.scale
	    this.node.style.top = ''
	    this.node.style.bottom = val + 'px'
	  },
	
	  left: function (val) {
	    val = this.virtualWrapperWidth / 2
	          - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE * this.data.scale)
	              * this.amount / 2
	          + val * this.data.scale
	    this.node.style.right = ''
	    this.node.style.left = val + 'px'
	  },
	
	  right: function (val) {
	    val = this.virtualWrapperWidth / 2
	          - (this.itemSize + 2 * DEFAULT_MARGIN_SIZE * this.data.scale)
	              * this.amount / 2
	          + val * this.data.scale
	    this.node.style.left = ''
	    this.node.style.right = val + 'px'
	  }
	})
	
	Indicator.prototype.setIndex = function (idx) {
	  if (idx >= this.amount) {
	    return
	  }
	  var prev = this.items[this.index]
	  var cur = this.items[idx]
	  prev.classList.remove('active')
	  prev.style.backgroundColor = this.itemColor
	  cur.classList.add('active')
	  cur.style.backgroundColor = this.itemSelectedColor
	  this.index = idx
	}
	
	Indicator.prototype._clickHandler = function (idx) {
	  this.slider.slideTo(idx)
	}
	
	module.exports = Indicator


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(62);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./indicator.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./indicator.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-indicators {\n  position: absolute;\n  white-space: nowrap;\n}\n.weex-indicators .weex-indicator {\n  float: left;\n  border-radius: 50%;\n}\n", ""]);
	
	// exports


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var msgQueue = __webpack_require__(64)
	var config = __webpack_require__(16)
	var utils = __webpack_require__(17)
	
	// TODO: refactor this scss code since this is strongly
	// dependent on lib.flexible other than the value of
	// scale.
	__webpack_require__(65)
	
	function TabHeader(data) {
	  Atomic.call(this, data)
	}
	
	var proto = TabHeader.prototype = Object.create(Atomic.prototype)
	
	proto.create = function () {
	  // outside container.
	  var node = document.createElement('div')
	  node.className = 'tab-header'
	  // tip on the top.
	  var bar = document.createElement('div')
	  bar.className = 'header-bar'
	  bar.textContent = 'CHANGE FLOOR'
	  // middle layer.
	  var body = document.createElement('div')
	  body.className = 'header-body'
	  var box = document.createElement('ul')
	  box.className = 'tabheader'
	
	  body.appendChild(box)
	  node.appendChild(bar)
	  node.appendChild(body)
	  this._bar = bar
	  this._body = body
	  this.box = box
	  this.node = node
	  // init events.
	  this._initFoldBtn()
	  this._initEvent()
	  return node
	}
	
	proto._initFoldBtn = function () {
	  var _this = this
	  var node = this.node
	  var btn = document.createElement('span')
	  btn.className = 'fold-toggle iconfont'
	  btn.innerHTML = '&#xe661;'
	  node.appendChild(btn)
	
	  btn.addEventListener('click', function () {
	    if (_this.unfolding) {
	      _this._folding()
	    } else {
	      _this._unfolding()
	    }
	  })
	}
	
	proto._initMask = function () {
	  var mask = document.createElement('div')
	  mask.className = 'tabheader-mask'
	  this.mask = mask
	  // stop default behavior: page moving.
	  mask.addEventListener('touchmove', function (evt) {
	    evt.preventDefault()
	  })
	  // click to unfold.
	  var _this = this
	  mask.addEventListener('click', function () {
	    _this._folding()
	  })
	
	  document.body.appendChild(mask)
	}
	
	proto._unfolding = function () {
	  // mark the initial posiiton of tabheader
	  if (!this.flag) {
	    var flag = document.createComment('tabheader')
	    this.flag = flag
	    this.node.parentNode.insertBefore(flag, this.node)
	  }
	  if (!this.mask) {
	    this._initMask()
	  }
	
	  // record the scroll position.
	  this._scrollVal = this._body.scrollLeft
	  // record the position in document.
	  this._topVal = this.node.getBoundingClientRect().top
	  this._styleTop = this.node.style.top
	
	  document.body.appendChild(this.node)
	  this.node.classList.add('unfold-header')
	  this.node.style.height = 'auto'
	  // recalc the position when it is unfolded.
	  var thHeight = this.node.getBoundingClientRect().height
	  if (thHeight + this._topVal > window.innerHeight) {
	    this._topVal = this._topVal
	        + (window.innerHeight - thHeight - this._topVal)
	  }
	
	  this.node.style.top = this._topVal + 'px'
	  // process mask style
	  this.mask.classList.add('unfold-header')
	  this.mask.style.height = window.innerHeight + 'px'
	  this.unfolding = true
	}
	
	proto._folding = function () {
	  if (this.unfolding !== true) {
	    return
	  }
	
	  this.mask.classList.remove('unfold-header')
	  this.node.classList.remove('unfold-header')
	
	  this.node.style.height = ''
	  this.node.style.top = this._styleTop
	
	  // recover the position of tabheader.
	  this.flag.parentNode.insertBefore(this.node, this.flag)
	  // recover the position of scoller.
	  this._body.scrollLeft = this._scrollVal
	
	  this._scrollToView()
	  this.unfolding = false
	}
	
	proto._initEvent = function () {
	  this._initClickEvent()
	  this._initSelectEvent()
	}
	
	// init events.
	proto._initClickEvent = function () {
	  var box = this.box
	  var _this = this
	
	  box.addEventListener('click', function (evt) {
	    var target = evt.target
	    if (target.nodeName === 'UL') {
	      return
	    }
	
	    if (target.parentNode.nodeName === 'LI') {
	      target = target.parentNode
	    }
	
	    var floor = target.getAttribute('data-floor')
	
	    if (_this.data.attr.selectedIndex == floor) {
	      // Duplicated clicking, not to trigger select event.
	      return
	    }
	
	    fireEvent(target, 'select', {index:  floor})
	  })
	}
	
	proto._initSelectEvent = function () {
	  var node = this.node
	  var _this = this
	  node.addEventListener('select', function (evt) {
	    var index
	    if (evt.index !== undefined) {
	      index = evt.index
	    } else if (evt.data && evt.data.index !== undefined) {
	      index = evt.data.index
	    }
	
	    if (index === undefined) {
	      return
	    }
	
	    _this.attr.selectedIndex.call(_this, index)
	  })
	}
	
	proto.attr = {
	  highlightIcon: function () {
	    return createHighlightIcon()
	  },
	  data: function () {
	    var attr = this.data.attr
	    // Ensure there is a default selected value.
	    if (attr.selectedIndex === undefined) {
	      attr.selectedIndex = 0
	    }
	
	    var list = attr.data || []
	    var curItem = attr.selectedIndex
	
	    var ret = []
	    var itemTmpl = '<li class="th-item" data-floor="{{floor}}">'
	        + '{{hlIcon}}{{floorName}}</li>'
	
	    list.forEach(function (item, idx) {
	      var html = itemTmpl.replace('{{floor}}', idx)
	      if (curItem == idx) {
	        html = html.replace('{{hlIcon}}', createHighlightIcon())
	      } else {
	        html = html.replace('{{hlIcon}}', '')
	      }
	
	      html = html.replace('{{floorName}}', item)
	
	      ret.push(html)
	    }, this)
	
	    this.box.innerHTML = ret.join('')
	  },
	  selectedIndex: function (val) {
	    var attr = this.data.attr
	
	    if (val === undefined) {
	      val = 0
	    }
	
	    // if (val == attr.selectedIndex) {
	    //   return
	    // }
	
	    attr.selectedIndex = val
	
	    this.attr.data.call(this)
	
	    this._folding()
	    this.style.textHighlightColor.call(this, this.textHighlightColor)
	  }
	}
	
	proto.style = Object.create(Atomic.prototype.style)
	
	proto.style.opacity = function (val) {
	  if (val === undefined || val < 0 || val > 1) {
	    val = 1
	  }
	
	  this.node.style.opacity = val
	}
	
	proto.style.textColor = function (val) {
	  if (!isValidColor(val)) {
	    return
	  }
	
	  this.node.style.color = val
	}
	
	proto.style.textHighlightColor = function (val) {
	  if (!isValidColor(val)) {
	    return
	  }
	  this.textHighlightColor = val
	  var attr = this.data.attr
	
	  var node = this.node.querySelector('[data-floor="'
	      + attr.selectedIndex + '"]')
	  if (node) {
	    node.style.color = val
	    this._scrollToView(node)
	  }
	}
	
	proto._scrollToView = function (node) {
	  if (!node) {
	    var attr = this.data.attr
	    node = this.node.querySelector('[data-floor="' + attr.selectedIndex + '"]')
	  }
	  if (!node) {
	    return
	  }
	
	  var defaultVal = this._body.scrollLeft
	  var leftVal = defaultVal  - node.offsetLeft + 300
	
	  var scrollVal = getScrollVal(this._body.getBoundingClientRect(), node)
	  doScroll(this._body, scrollVal)
	}
	
	// scroll the tabheader.
	// positive val means to scroll right.
	// negative val means to scroll left.
	function doScroll(node, val, finish) {
	  if (!val) {
	    return
	  }
	  if (finish === undefined) {
	    finish = Math.abs(val)
	  }
	
	  if (finish <= 0) {
	    return
	  }
	
	  setTimeout(function () {
	    if (val > 0) {
	      node.scrollLeft += 2
	    } else {
	      node.scrollLeft -= 2
	    }
	    finish -= 2
	
	    doScroll(node, val, finish)
	  })
	}
	
	// get scroll distance.
	function getScrollVal(rect, node) {
	  var left = node.previousSibling
	  var right = node.nextSibling
	  var scrollVal
	
	  // process left-side element first.
	  if (left) {
	    var leftRect = left.getBoundingClientRect()
	    // only need to compare the value of left.
	    if (leftRect.left < rect.left) {
	      scrollVal = leftRect.left
	      return scrollVal
	    }
	  }
	
	  if (right) {
	    var rightRect = right.getBoundingClientRect()
	    // compare the value of right.
	    if (rightRect.right > rect.right) {
	      scrollVal = rightRect.right - rect.right
	      return scrollVal
	    }
	  }
	
	  // process current node, from left to right.
	  var nodeRect = node.getBoundingClientRect()
	  if (nodeRect.left < rect.left) {
	    scrollVal = nodeRect.left
	  } else if (nodeRect.right > rect.right) {
	    scrollVal = nodeRect.right - rect.right
	  }
	
	  return scrollVal
	}
	
	// trigger and broadcast events.
	function fireEvent(element, type, data) {
	  var evt = document.createEvent('Event')
	  evt.data = data
	  utils.extend(evt, data)
	  // need bubble.
	  evt.initEvent(type, true, true)
	
	  element.dispatchEvent(evt)
	}
	
	function createHighlightIcon(code) {
	  var html = '<i class="hl-icon iconfont">' + '&#xe650' + '</i>'
	  return html
	}
	
	function isValidColor(color) {
	  if (!color) {
	    return false
	  }
	
	  if (color.charAt(0) !== '#') {
	    return false
	  }
	
	  if (color.length !== 7) {
	    return false
	  }
	
	  return true
	}
	
	module.exports = TabHeader


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var config = __webpack_require__(16)
	var messageQueue = []
	
	function flushMessage() {
	  if (typeof callJS === 'function' && messageQueue.length > 0) {
	    callJS(config.instanceId, JSON.stringify(messageQueue))
	    messageQueue.length = 0
	  }
	}
	
	function push(msg) {
	  messageQueue.push(msg)
	}
	
	/**
	 * To fix the problem of callapp, the two-way time loop mechanism must
	 * be replaced by directly procedure call except the situation of
	 * page loading.
	 * 2015-11-03
	 */
	function pushDirectly(msg) {
	  callJS(config.instanceId, [msg])
	}
	
	module.exports = {
	  push: pushDirectly
	}


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(66);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./tabheader.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./tabheader.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".tab-header {\n  position: relative;\n  width: 10rem;\n  font-size: 14px;\n  color: #333;\n}\n.tab-header .header-bar {\n  height: 1.17rem;\n  line-height: 1.17rem;\n  display: none;\n  color: #999;\n  padding-left: 0.4rem;\n}\n.tab-header .header-body {\n  margin-right: 1.07rem;\n  overflow-x: auto;\n  overflow-y: hidden;\n}\n.tab-header .header-body::-webkit-scrollbar {\n  width: 0;\n  height: 0;\n  overflow: hidden;\n}\n.tab-header .fold-toggle {\n  position: absolute;\n  top: 0.59rem;\n  -webkit-transform: translateY(-50%);\n  right: 0.29rem;\n  width: 0.48rem;\n  height: 0.48rem;\n  line-height: 0.48rem;\n  text-align: center;\n  z-index: 99;\n  font-size: 14px;\n}\n.tab-header.unfold-header {\n  position: fixed !important;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n}\n\n.tabheader {\n  list-style: none;\n  white-space: nowrap;\n  height: 1.17rem;\n  line-height: 1.17rem;\n}\n.tabheader .th-item {\n  padding-left: 0.72rem;\n  position: relative;\n  display: inline-block;\n}\n.tabheader .hl-icon {\n  width: 0.4rem;\n  height: 0.4rem;\n  line-height: 0.4rem;\n  text-align: center;\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  left: 0.24rem;\n  font-size: 14px;\n}\n\n.unfold-header .header-bar {\n  display: block;\n}\n.unfold-header .fold-toggle {\n  -webkit-transform: translateY(-50%) rotate(180deg);\n}\n.unfold-header .header-body {\n  margin-right: 0;\n  padding: 0.24rem;\n}\n.unfold-header .tabheader {\n  display: block;\n  height: auto;\n}\n.unfold-header .th-item {\n  box-sizing: border-box;\n  float: left;\n  width: 33.3333%;\n  height: 1.01rem;\n  line-height: 1.01rem;\n}\n.unfold-header .hl-icon {\n  margin-right: 0;\n  position: absolute;\n}\n.unfold-header.tabheader-mask {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background-color: rgba(0, 0, 0, 0.6);\n}\n\n.tabheader-mask {\n  display: none;\n  position: fixed;\n  left: 0;\n  top: 0;\n}\n\n@font-face {\n  font-family: \"iconfont\";\n  src: url(\"data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAPAIAAAwBwRkZUTXBD98UAAAD8AAAAHE9TLzJXL1zIAAABGAAAAGBjbWFws6IHbgAAAXgAAAFaY3Z0IAyV/swAAApQAAAAJGZwZ20w956VAAAKdAAACZZnYXNwAAAAEAAACkgAAAAIZ2x5ZuxoPFIAAALUAAAEWGhlYWQHA5h3AAAHLAAAADZoaGVhBzIDcgAAB2QAAAAkaG10eAs2AW0AAAeIAAAAGGxvY2EDcAQeAAAHoAAAABBtYXhwASkKKwAAB7AAAAAgbmFtZQl/3hgAAAfQAAACLnBvc3Tm7f0bAAAKAAAAAEhwcmVwpbm+ZgAAFAwAAACVAAAAAQAAAADMPaLPAAAAANIDKnoAAAAA0gMqewAEA/oB9AAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAgAGAwAAAAAAAAAAAAEQAAAAAAAAAAAAAABQZkVkAMAAeObeAyz/LABcAxgAlAAAAAEAAAAAAxgAAAAAACAAAQAAAAMAAAADAAAAHAABAAAAAABUAAMAAQAAABwABAA4AAAACgAIAAIAAgB45lDmYebe//8AAAB45lDmYebe////ixm0GaQZKAABAAAAAAAAAAAAAAAAAQYAAAEAAAAAAAAAAQIAAAACAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACACIAAAEyAqoAAwAHAClAJgAAAAMCAANXAAIBAQJLAAICAU8EAQECAUMAAAcGBQQAAwADEQUPKzMRIREnMxEjIgEQ7szMAqr9ViICZgAAAAUALP/hA7wDGAAWADAAOgBSAF4Bd0uwE1BYQEoCAQANDg0ADmYAAw4BDgNeAAEICAFcEAEJCAoGCV4RAQwGBAYMXgALBAtpDwEIAAYMCAZYAAoHBQIECwoEWRIBDg4NUQANDQoOQhtLsBdQWEBLAgEADQ4NAA5mAAMOAQ4DXgABCAgBXBABCQgKCAkKZhEBDAYEBgxeAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CG0uwGFBYQEwCAQANDg0ADmYAAw4BDgNeAAEICAFcEAEJCAoICQpmEQEMBgQGDARmAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CG0BOAgEADQ4NAA5mAAMOAQ4DAWYAAQgOAQhkEAEJCAoICQpmEQEMBgQGDARmAAsEC2kPAQgABgwIBlgACgcFAgQLCgRZEgEODg1RAA0NCg5CWVlZQChTUzs7MjEXF1NeU15bWDtSO1JLQzc1MToyOhcwFzBRETEYESgVQBMWKwEGKwEiDgIdASE1NCY1NC4CKwEVIQUVFBYUDgIjBiYrASchBysBIiciLgI9ARciBhQWMzI2NCYXBgcOAx4BOwYyNicuAScmJwE1ND4COwEyFh0BARkbGlMSJRwSA5ABChgnHoX+SgKiARUfIw4OHw4gLf5JLB0iFBkZIBMIdwwSEgwNEhKMCAYFCwQCBA8OJUNRUEAkFxYJBQkFBQb+pAUPGhW8HykCHwEMGScaTCkQHAQNIBsSYYg0Fzo6JRcJAQGAgAETGyAOpz8RGhERGhF8GhYTJA4QDQgYGg0jERMUAXfkCxgTDB0m4wAAAgCg/2wDYALsABIAGgAhQB4AAAADAgADWQACAQECTQACAgFRAAECAUUTFjkQBBIrACAGFRQeAxcWOwEyPwESNTQAIiY0NjIWFAKS/tzORFVvMRAJDgEOCW3b/uKEXl6EXgLszpI1lXyJNhEKC30BDIyS/s5ehF5ehAAAAAEAggBJA4QB6AAdABtAGBIRAgEAAUAFAQA+AAABAGgAAQFfEx8CECsBJgcGBwkBLgEGBwYUFwEwMxcVFjI3AT4DLgIDehEWAwP+uP60BhEQBgoKAWEBAQoaCQFeAwQCAQECBAHhEg0DAv61AUkHBAUGCRsJ/qIBAQkJAWICBwYHCAYGAAEAfwCLA4ECJwAhAB1AGhYPAgEAAUAFAQA+AAABAGgCAQEBXyQuEwMRKyUBMCcjNSYHBgcBDgEUFhceAjMyNwkBFjMyNjc+Ai4BA3f+nwEBEhUEAv6iBQUFBQMHCAQOCQFIAUwKDQYMBQMFAQEFwwFeAQERDQID/p8FDAwMBAMEAgkBS/62CQUFAwoJCgkAAAEAAAABAAALIynoXw889QALBAAAAAAA0gMqewAAAADSAyp7ACL/bAO8AxgAAAAIAAIAAAAAAAAAAQAAAxj/bABcBAAAAAAAA7wAAQAAAAAAAAAAAAAAAAAAAAUBdgAiAAAAAAFVAAAD6QAsBAAAoACCAH8AAAAoACgAKAFkAaIB5AIsAAEAAAAHAF8ABQAAAAAAAgAmADQAbAAAAIoJlgAAAAAAAAAMAJYAAQAAAAAAAQAIAAAAAQAAAAAAAgAGAAgAAQAAAAAAAwAkAA4AAQAAAAAABAAIADIAAQAAAAAABQBGADoAAQAAAAAABgAIAIAAAwABBAkAAQAQAIgAAwABBAkAAgAMAJgAAwABBAkAAwBIAKQAAwABBAkABAAQAOwAAwABBAkABQCMAPwAAwABBAkABgAQAYhpY29uZm9udE1lZGl1bUZvbnRGb3JnZSAyLjAgOiBpY29uZm9udCA6IDI2LTgtMjAxNWljb25mb250VmVyc2lvbiAxLjAgOyB0dGZhdXRvaGludCAodjAuOTQpIC1sIDggLXIgNTAgLUcgMjAwIC14IDE0IC13ICJHIiAtZiAtc2ljb25mb250AGkAYwBvAG4AZgBvAG4AdABNAGUAZABpAHUAbQBGAG8AbgB0AEYAbwByAGcAZQAgADIALgAwACAAOgAgAGkAYwBvAG4AZgBvAG4AdAAgADoAIAAyADYALQA4AC0AMgAwADEANQBpAGMAbwBuAGYAbwBuAHQAVgBlAHIAcwBpAG8AbgAgADEALgAwACAAOwAgAHQAdABmAGEAdQB0AG8AaABpAG4AdAAgACgAdgAwAC4AOQA0ACkAIAAtAGwAIAA4ACAALQByACAANQAwACAALQBHACAAMgAwADAAIAAtAHgAIAAxADQAIAAtAHcAIAAiAEcAIgAgAC0AZgAgAC0AcwBpAGMAbwBuAGYAbwBuAHQAAAACAAAAAAAA/4MAMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAABAAIAWwECAQMBBAd1bmlFNjUwB3VuaUU2NjEHdW5pRTZERQABAAH//wAPAAAAAAAAAAAAAAAAAAAAAAAyADIDGP/hAxj/bAMY/+EDGP9ssAAssCBgZi2wASwgZCCwwFCwBCZasARFW1ghIyEbilggsFBQWCGwQFkbILA4UFghsDhZWSCwCkVhZLAoUFghsApFILAwUFghsDBZGyCwwFBYIGYgiophILAKUFhgGyCwIFBYIbAKYBsgsDZQWCGwNmAbYFlZWRuwACtZWSOwAFBYZVlZLbACLCBFILAEJWFkILAFQ1BYsAUjQrAGI0IbISFZsAFgLbADLCMhIyEgZLEFYkIgsAYjQrIKAAIqISCwBkMgiiCKsAArsTAFJYpRWGBQG2FSWVgjWSEgsEBTWLAAKxshsEBZI7AAUFhlWS2wBCywCCNCsAcjQrAAI0KwAEOwB0NRWLAIQyuyAAEAQ2BCsBZlHFktsAUssABDIEUgsAJFY7ABRWJgRC2wBiywAEMgRSCwACsjsQQEJWAgRYojYSBkILAgUFghsAAbsDBQWLAgG7BAWVkjsABQWGVZsAMlI2FERC2wByyxBQVFsAFhRC2wCCywAWAgILAKQ0qwAFBYILAKI0JZsAtDSrAAUlggsAsjQlktsAksILgEAGIguAQAY4ojYbAMQ2AgimAgsAwjQiMtsAosS1RYsQcBRFkksA1lI3gtsAssS1FYS1NYsQcBRFkbIVkksBNlI3gtsAwssQANQ1VYsQ0NQ7ABYUKwCStZsABDsAIlQrIAAQBDYEKxCgIlQrELAiVCsAEWIyCwAyVQWLAAQ7AEJUKKiiCKI2GwCCohI7ABYSCKI2GwCCohG7AAQ7ACJUKwAiVhsAgqIVmwCkNHsAtDR2CwgGIgsAJFY7ABRWJgsQAAEyNEsAFDsAA+sgEBAUNgQi2wDSyxAAVFVFgAsA0jQiBgsAFhtQ4OAQAMAEJCimCxDAQrsGsrGyJZLbAOLLEADSstsA8ssQENKy2wECyxAg0rLbARLLEDDSstsBIssQQNKy2wEyyxBQ0rLbAULLEGDSstsBUssQcNKy2wFiyxCA0rLbAXLLEJDSstsBgssAcrsQAFRVRYALANI0IgYLABYbUODgEADABCQopgsQwEK7BrKxsiWS2wGSyxABgrLbAaLLEBGCstsBsssQIYKy2wHCyxAxgrLbAdLLEEGCstsB4ssQUYKy2wHyyxBhgrLbAgLLEHGCstsCEssQgYKy2wIiyxCRgrLbAjLCBgsA5gIEMjsAFgQ7ACJbACJVFYIyA8sAFgI7ASZRwbISFZLbAkLLAjK7AjKi2wJSwgIEcgILACRWOwAUViYCNhOCMgilVYIEcgILACRWOwAUViYCNhOBshWS2wJiyxAAVFVFgAsAEWsCUqsAEVMBsiWS2wJyywByuxAAVFVFgAsAEWsCUqsAEVMBsiWS2wKCwgNbABYC2wKSwAsANFY7ABRWKwACuwAkVjsAFFYrAAK7AAFrQAAAAAAEQ+IzixKAEVKi2wKiwgPCBHILACRWOwAUViYLAAQ2E4LbArLC4XPC2wLCwgPCBHILACRWOwAUViYLAAQ2GwAUNjOC2wLSyxAgAWJSAuIEewACNCsAIlSYqKRyNHI2EgWGIbIVmwASNCsiwBARUUKi2wLiywABawBCWwBCVHI0cjYbAGRStlii4jICA8ijgtsC8ssAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgsAlDIIojRyNHI2EjRmCwBEOwgGJgILAAKyCKimEgsAJDYGQjsANDYWRQWLACQ2EbsANDYFmwAyWwgGJhIyAgsAQmI0ZhOBsjsAlDRrACJbAJQ0cjRyNhYCCwBEOwgGJgIyCwACsjsARDYLAAK7AFJWGwBSWwgGKwBCZhILAEJWBkI7ADJWBkUFghGyMhWSMgILAEJiNGYThZLbAwLLAAFiAgILAFJiAuRyNHI2EjPDgtsDEssAAWILAJI0IgICBGI0ewACsjYTgtsDIssAAWsAMlsAIlRyNHI2GwAFRYLiA8IyEbsAIlsAIlRyNHI2EgsAUlsAQlRyNHI2GwBiWwBSVJsAIlYbABRWMjIFhiGyFZY7ABRWJgIy4jICA8ijgjIVktsDMssAAWILAJQyAuRyNHI2EgYLAgYGawgGIjICA8ijgtsDQsIyAuRrACJUZSWCA8WS6xJAEUKy2wNSwjIC5GsAIlRlBYIDxZLrEkARQrLbA2LCMgLkawAiVGUlggPFkjIC5GsAIlRlBYIDxZLrEkARQrLbA3LLAuKyMgLkawAiVGUlggPFkusSQBFCstsDgssC8riiAgPLAEI0KKOCMgLkawAiVGUlggPFkusSQBFCuwBEMusCQrLbA5LLAAFrAEJbAEJiAuRyNHI2GwBkUrIyA8IC4jOLEkARQrLbA6LLEJBCVCsAAWsAQlsAQlIC5HI0cjYSCwBCNCsAZFKyCwYFBYILBAUVizAiADIBuzAiYDGllCQiMgR7AEQ7CAYmAgsAArIIqKYSCwAkNgZCOwA0NhZFBYsAJDYRuwA0NgWbADJbCAYmGwAiVGYTgjIDwjOBshICBGI0ewACsjYTghWbEkARQrLbA7LLAuKy6xJAEUKy2wPCywLyshIyAgPLAEI0IjOLEkARQrsARDLrAkKy2wPSywABUgR7AAI0KyAAEBFRQTLrAqKi2wPiywABUgR7AAI0KyAAEBFRQTLrAqKi2wPyyxAAEUE7ArKi2wQCywLSotsEEssAAWRSMgLiBGiiNhOLEkARQrLbBCLLAJI0KwQSstsEMssgAAOistsEQssgABOistsEUssgEAOistsEYssgEBOistsEcssgAAOystsEgssgABOystsEkssgEAOystsEossgEBOystsEsssgAANystsEwssgABNystsE0ssgEANystsE4ssgEBNystsE8ssgAAOSstsFAssgABOSstsFEssgEAOSstsFIssgEBOSstsFMssgAAPCstsFQssgABPCstsFUssgEAPCstsFYssgEBPCstsFcssgAAOCstsFgssgABOCstsFkssgEAOCstsFossgEBOCstsFsssDArLrEkARQrLbBcLLAwK7A0Ky2wXSywMCuwNSstsF4ssAAWsDArsDYrLbBfLLAxKy6xJAEUKy2wYCywMSuwNCstsGEssDErsDUrLbBiLLAxK7A2Ky2wYyywMisusSQBFCstsGQssDIrsDQrLbBlLLAyK7A1Ky2wZiywMiuwNistsGcssDMrLrEkARQrLbBoLLAzK7A0Ky2waSywMyuwNSstsGossDMrsDYrLbBrLCuwCGWwAyRQeLABFTAtAABLuADIUlixAQGOWbkIAAgAYyCwASNEILADI3CwDkUgIEu4AA5RS7AGU1pYsDQbsChZYGYgilVYsAIlYbABRWMjYrACI0SzCgkFBCuzCgsFBCuzDg8FBCtZsgQoCUVSRLMKDQYEK7EGAUSxJAGIUViwQIhYsQYDRLEmAYhRWLgEAIhYsQYBRFlZWVm4Af+FsASNsQUARAAAAA==\") format(\"truetype\");\n}\n.iconfont {\n  font-family: iconfont !important;\n  font-size: 16px;\n  font-style: normal;\n  -webkit-font-smoothing: antialiased;\n  -webkit-text-stroke-width: 0.2px;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n[data-dpr=\"2\"] .tab-header {\n  font-size: 28px;\n}\n\n[data-dpr=\"3\"] .tab-header {\n  font-size: 42px;\n}\n\n[data-dpr=\"2\"] .tabheader .hl-icon {\n  font-size: 28px;\n}\n\n[data-dpr=\"3\"] .tabheader .hl-icon {\n  font-size: 42px;\n}\n\n[data-dpr=\"2\"] .tab-header .fold-toggle {\n  font-size: 28px;\n}\n\n[data-dpr=\"3\"] .tab-header .fold-toggle {\n  font-size: 42px;\n}\n", ""]);
	
	// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(68)
	__webpack_require__(47)
	
	// lib.scroll events:
	//  - scrollstart
	//  - scrolling
	//  - pulldownend
	//  - pullupend
	//  - pullleftend
	//  - pullrightend
	//  - pulldown
	//  - pullup
	//  - pullleft
	//  - pullright
	//  - contentrefresh
	
	var Component = __webpack_require__(27)
	var utils = __webpack_require__(17)
	
	var directionMap = {
	  h: ['row', 'horizontal', 'h', 'x'],
	  v: ['column', 'vertical', 'v', 'y']
	}
	
	var DEFAULT_DIRECTION = 'column'
	
	// attrs:
	//  - scroll-direciton: none|vertical|horizontal (default is vertical)
	//  - show-scrollbar: true|false (default is true)
	function Scroller (data, nodeType) {
	  var attrs = data.attr || {}
	  var direction = attrs.scrollDirection
	    || attrs.direction
	    || DEFAULT_DIRECTION
	  this.direction = directionMap.h.indexOf(direction) === -1
	    ? 'v'
	    : 'h'
	  this.showScrollbar = attrs.showScrollbar || true
	  Component.call(this, data, nodeType)
	}
	
	Scroller.prototype = Object.create(Component.prototype)
	
	Scroller.prototype.create = function (nodeType) {
	  var Scroll = lib.scroll
	  var node = Component.prototype.create.call(this, nodeType)
	  node.classList.add('weex-container', 'scroll-wrap')
	  this.scrollElement = document.createElement('div')
	  this.scrollElement.classList.add(
	    'weex-container',
	    'scroll-element',
	    this.direction + '-scroller'
	  )
	
	  // Flex will cause a bug to rescale children's size if their total
	  // size exceed the limit of their parent. So to use box instead.
	  this.scrollElement.style.display = '-webkit-box'
	  this.scrollElement.style.display = 'box'
	  this.scrollElement.style.webkitBoxOrient = this.direction === 'h'
	    ? 'horizontal'
	    : 'vertical'
	  this.scrollElement.style.boxOrient = this.scrollElement.style.webkitBoxOrient
	
	  node.appendChild(this.scrollElement)
	  this.scroller = new Scroll({
	    // if the direction is x, then the bounding rect of the scroll element
	    // should be got by the 'Range' API other than the 'getBoundingClientRect'
	    // API, because the width outside the viewport won't be count in by
	    // 'getBoundingClientRect'.
	    // Otherwise should use the element rect in case there is a child scroller
	    // or list in this scroller. If using 'Range', the whole scroll element
	    // including the hiding part will be count in the rect.
	    useElementRect: this.direction === 'v',
	    scrollElement: this.scrollElement,
	    direction: this.direction === 'h' ? 'x' : 'y'
	  })
	  this.scroller.init()
	  this.offset = 0
	  return node
	}
	
	Scroller.prototype.bindEvents = function (evts) {
	  Component.prototype.bindEvents.call(this, evts)
	  // to enable lazyload for Images
	  this.scroller.addEventListener('scrolling', function (e) {
	    var so = e.scrollObj
	    var scrollTop = so.getScrollTop()
	    var scrollLeft = so.getScrollLeft()
	    var offset = this.direction === 'v' ? scrollTop : scrollLeft
	    var diff = offset - this.offset
	    var dir
	    if (diff >= 0) {
	      dir = this.direction === 'v' ? 'up' : 'left'
	    } else {
	      dir = this.direction === 'v' ? 'down' : 'right'
	    }
	    this.dispatchEvent('scroll', {
	      originalType: 'scrolling',
	      scrollTop: so.getScrollTop(),
	      scrollLeft: so.getScrollLeft(),
	      offset: offset,
	      direction: dir
	    }, {
	      bubbles: true
	    })
	    this.offset = offset
	  }.bind(this))
	
	  var pullendEvent = 'pull'
	    + ({ v: 'up', h: 'left' })[this.direction]
	    + 'end'
	  this.scroller.addEventListener(pullendEvent, function (e) {
	    this.dispatchEvent('loadmore')
	  }.bind(this))
	}
	
	Scroller.prototype.createChildren = function () {
	  var children = this.data.children
	  var parentRef = this.data.ref
	  var componentManager = this.getComponentManager()
	  if (children && children.length) {
	    var fragment = document.createDocumentFragment()
	    var isFlex = false
	    for (var i = 0; i < children.length; i++) {
	      children[i].instanceId = this.data.instanceId
	      children[i].scale = this.data.scale
	      var child = componentManager.createElement(children[i])
	      fragment.appendChild(child.node)
	      child.parentRef = parentRef
	      if (!isFlex
	          && child.data.style
	          && child.data.style.hasOwnProperty('flex')
	        ) {
	        isFlex = true
	      }
	    }
	    this.scrollElement.appendChild(fragment)
	  }
	  // wait for fragment to appended on scrollElement on UI thread.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	}
	
	Scroller.prototype.appendChild = function (data) {
	  var children = this.data.children
	  var componentManager = this.getComponentManager()
	  var child = componentManager.createElement(data)
	  this.scrollElement.appendChild(child.node)
	
	  // wait for UI thread to update.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	
	  // update this.data.children
	  if (!children || !children.length) {
	    this.data.children = [data]
	  } else {
	    children.push(data)
	  }
	
	  return child
	}
	
	Scroller.prototype.insertBefore = function (child, before) {
	  var children = this.data.children
	  var i = 0
	  var isAppend = false
	
	  // update this.data.children
	  if (!children || !children.length || !before) {
	    isAppend = true
	  } else {
	    for (var l = children.length; i < l; i++) {
	      if (children[i].ref === before.data.ref) {
	        break
	      }
	    }
	    if (i === l) {
	      isAppend = true
	    }
	  }
	
	  if (isAppend) {
	    this.scrollElement.appendChild(child.node)
	    children.push(child.data)
	  } else {
	    if (before.fixedPlaceholder) {
	      this.scrollElement.insertBefore(child.node, before.fixedPlaceholder)
	    } else {
	      this.scrollElement.insertBefore(child.node, before.node)
	    }
	    children.splice(i, 0, child.data)
	  }
	
	  // wait for UI thread to update.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	}
	
	Scroller.prototype.removeChild = function (child) {
	  var children = this.data.children
	  // remove from this.data.children
	  var i = 0
	  var componentManager = this.getComponentManager()
	  if (children && children.length) {
	    for (var l = children.length; i < l; i++) {
	      if (children[i].ref === child.data.ref) {
	        break
	      }
	    }
	    if (i < l) {
	      children.splice(i, 1)
	    }
	  }
	  // remove from componentMap recursively
	  componentManager.removeElementByRef(child.data.ref)
	  if (child.fixedPlaceholder) {
	    this.scrollElement.removeChild(child.fixedPlaceholder)
	  }
	  child.node.parentNode.removeChild(child.node)
	
	  // wait for UI thread to update.
	  setTimeout(function () {
	    this.scroller.refresh()
	  }.bind(this), 0)
	}
	
	module.exports = Scroller


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(69);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./scroller.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./scroller.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".scroll-wrap {\n  display: block;\n  overflow: hidden;\n}\n\n.scroll-element.horizontal {\n  -webkit-box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.scroll-element.vertical {\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n", ""]);
	
	// exports


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var utils = __webpack_require__(17)
	
	// attrs:
	//   - type: text|password|tel|email|url
	//   - value
	//   - placeholder
	//   - disabled
	//   - autofocus
	function Input (data) {
	  var attrs = data.attr || {}
	  this.type = attrs.type || 'text'
	  this.value = attrs.value
	  this.placeholder = attrs.placeholder
	  this.autofocus = attrs.autofocus && (attrs.autofocus !== 'false')
	                    ? true
	                    : false
	  Atomic.call(this, data)
	}
	
	Input.prototype = Object.create(Atomic.prototype)
	
	Input.prototype.create = function () {
	  var node = document.createElement('input')
	  var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
	  this.className = 'weex-ipt-' + uuid
	  this.styleId = 'weex-style-' + uuid
	  node.classList.add(this.className)
	  node.setAttribute('type', this.type)
	  node.type = this.type
	  // For the consistency of input component's width.
	  // The date and time type of input will have a bigger width
	  // when the 'box-sizing' is not set to 'border-box'
	  node.classList.add('weex-element')
	  this.value && (node.value = this.value)
	  this.placeholder && (node.placeholder = this.placeholder)
	  return node
	}
	
	Input.prototype.updateStyle = function (style) {
	  Atomic.prototype.updateStyle.call(this, style)
	  if (style && style.placeholderColor) {
	    this.placeholderColor = style.placeholderColor
	    this.setPlaceholderColor()
	  }
	}
	
	Input.prototype.attr = {
	  disabled: function (val) {
	    this.node.disabled = val && val !== 'false'
	                    ? true
	                    : false
	  }
	}
	
	Input.prototype.setPlaceholderColor = function () {
	  if (!this.placeholderColor) {
	    return
	  }
	  var vendors = [
	    '::-webkit-input-placeholder',
	    ':-moz-placeholder',
	    '::-moz-placeholder',
	    ':-ms-input-placeholder',
	    ':placeholder-shown'
	  ]
	  var css = ''
	  var cssRule = 'color: ' + this.placeholderColor + ';'
	  for (var i = 0, l = vendors.length; i < l; i++) {
	    css += '.' + this.className + vendors[i] + '{'
	           + cssRule + '}'
	  }
	  utils.appendStyle(css, this.styleId, true)
	}
	
	module.exports = Input


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(27)
	var sender = __webpack_require__(31)
	
	// attrs:
	//   - options: the options to be listed, as a array of strings.
	//   - selectedIndex: the selected options' index number.
	//   - disabled
	function Select (data) {
	  var attrs = data.attr || {}
	  this.options = []
	  this.selectedIndex = 0
	  Atomic.call(this, data)
	}
	
	Select.prototype = Object.create(Atomic.prototype)
	
	Select.prototype.create = function () {
	  var node = document.createElement('select')
	  var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
	  this.className = 'weex-slct-' + uuid
	  this.styleId = 'weex-style-' + uuid
	  node.classList.add(this.className)
	  // For the consistency of input component's width.
	  // The date and time type of input will have a bigger width
	  // when the 'box-sizing' is not set to 'border-box'
	  node.style['box-sizing'] = 'border-box'
	  return node
	}
	
	Select.prototype.attr = {
	  disabled: function (val) {
	    this.node.disabled = val && val !== 'false'
	                    ? true
	                    : false
	  },
	  options: function (val) {
	    if (Object.prototype.toString.call(val) !== '[object Array]') {
	      return
	    }
	    this.options = val
	    this.node.innerHTML = ''
	    this.createOptions(val)
	  },
	  selectedIndex: function (val) {
	    val = parseInt(val)
	    if (typeof val !== 'number' || val !== val || val >= this.options.length) {
	      return
	    }
	    this.node.value = this.options[val]
	  }
	}
	
	Select.prototype.bindEvents = function (evts) {
	  var isListenToChange = false
	  Atomic.prototype.bindEvents.call(
	      this,
	      evts.filter(function (val) {
	        var pass = val !== 'change'
	        !pass && (isListenToChange = true)
	        return pass
	      }))
	  if (isListenToChange) {
	    this.node.addEventListener('change', function (e) {
	      e.index = this.options.indexOf(this.node.value)
	      sender.fireEvent(this.data.ref, 'change', e)
	    }.bind(this))
	  }
	}
	
	Select.prototype.createOptions = function (opts) {
	  var optDoc = document.createDocumentFragment()
	  var opt
	  for (var i = 0, l = opts.length; i < l; i++) {
	    opt = document.createElement('option')
	    opt.appendChild(document.createTextNode(opts[i]))
	    optDoc.appendChild(opt)
	  }
	  this.node.appendChild(optDoc)
	}
	
	module.exports = Select


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	
	// attrs:
	//   - value
	//   - disabled
	function Datepicker (data) {
	  Atomic.call(this, data)
	}
	
	Datepicker.prototype = Object.create(Atomic.prototype)
	
	Datepicker.prototype.create = function () {
	  var node = document.createElement('input')
	  var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
	  this.className = 'weex-ipt-' + uuid
	  this.styleId = 'weex-style-' + uuid
	  node.classList.add(this.className)
	  node.setAttribute('type', 'date')
	  node.type = 'date'
	  // For the consistency of input component's width.
	  // The date and time type of input will have a bigger width
	  // when the 'box-sizing' is not set to 'border-box'
	  node.classList.add('weex-element')
	  return node
	}
	
	Datepicker.prototype.attr = {
	  disabled: function (val) {
	    this.node.disabled = val && val !== 'false'
	                    ? true
	                    : false
	  }
	}
	
	module.exports = Datepicker


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	
	// attrs:
	//   - value
	//   - disabled
	function Timepicker (data) {
	  Atomic.call(this, data)
	}
	
	Timepicker.prototype = Object.create(Atomic.prototype)
	
	Timepicker.prototype.create = function () {
	  var node = document.createElement('input')
	  var uuid = Math.floor(10000000000000 * Math.random()) + Date.now()
	  this.className = 'weex-ipt-' + uuid
	  this.styleId = 'weex-style-' + uuid
	  node.classList.add(this.className)
	  node.setAttribute('type', 'time')
	  node.type = 'time'
	  // For the consistency of input component's width.
	  // The date and time type of input will have a bigger width
	  // when the 'box-sizing' is not set to 'border-box'
	  node.classList.add('weex-element')
	  return node
	}
	
	Timepicker.prototype.attr = {
	  disabled: function (val) {
	    this.node.disabled = val && val !== 'false'
	                    ? true
	                    : false
	  }
	}
	
	module.exports = Timepicker


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var utils = __webpack_require__(17)
	__webpack_require__(75)
	
	// attrs:
	//   - autoPlay: true | false (default: false)
	//   - playStatus: play | pause | stop
	//   - src: {string}
	//   - poster: {string}
	//   - loop: true | false (default: false)
	//   - muted: true | false (default: false)
	// events:
	//   - start
	//   - pause
	//   - finish
	//   - fail
	function Video (data) {
	  var autoPlay = data.attr.autoPlay
	  var playStatus = data.attr.playStatus
	  this.autoPlay = autoPlay === true || autoPlay === 'true'
	  if (playStatus !== 'play'
	      && playStatus !== 'stop'
	      && playStatus !== 'pause') {
	    this.playStatus = 'pause'
	  } else {
	    this.playStatus = playStatus
	  }
	  Atomic.call(this, data)
	}
	
	Video.prototype = Object.create(Atomic.prototype)
	
	Video.prototype.attr = {
	  playStatus: function (val) {
	    if (val !== 'play' && val !== 'stop' && val !== 'pause') {
	      val = 'pause'
	    }
	    if (this.playStatus === val) {
	      return
	    }
	    this.playStatus = val
	    this.node.setAttribute('play-status', val)
	    this[this.playStatus]()
	  },
	  autoPlay: function (val) {
	    // DO NOTHING
	  }
	}
	
	Video.prototype.create = function () {
	  var node = document.createElement('video')
	  node.classList.add('weex-video', 'weex-element')
	  node.controls = true
	  node.autoplay = this.autoPlay
	  node.setAttribute('play-status', this.playStatus)
	  this.node = node
	  if (this.autoPlay && this.playStatus === 'play') {
	    this.play()
	  }
	  return node
	}
	
	Video.prototype.bindEvents = function (evts) {
	  Atomic.prototype.bindEvents.call(this, evts)
	
	  // convert w3c-video events to weex-video events.
	  var evtsMap = {
	    start: 'play',
	    finish: 'ended',
	    fail: 'error'
	  }
	  for (var evtName in evtsMap) {
	    this.node.addEventListener(evtsMap[evtName], function (type, e) {
	      this.dispatchEvent(type, e.data)
	    }.bind(this, evtName))
	  }
	}
	
	Video.prototype.play = function () {
	  var src = this.node.getAttribute('src')
	  if (!src) {
	    src = this.node.getAttribute('data-src')
	    src && this.node.setAttribute('src', src)
	  }
	  this.node.play()
	}
	
	Video.prototype.pause = function () {
	  this.node.pause()
	}
	
	Video.prototype.stop = function () {
	  this.node.pause()
	  this.node.autoplay = false
	  this.node.setAttribute('data-src', this.node.src)
	  this.node.src = ''
	}
	
	module.exports = Video


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(76);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./video.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./video.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-video {\n\tbackground-color: #000;\n}", ""]);
	
	// exports


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var utils = __webpack_require__(17)
	__webpack_require__(78)
	
	var defaults = {
	  color: '#64bd63'
	  , secondaryColor: '#dfdfdf'
	  , jackColor: '#fff'
	  , jackSecondaryColor: null
	  , className: 'weex-switch'
	  , disabledOpacity: 0.5
	  , speed: '0.4s'
	  , width: 100
	  , height: 60
	  // is width and height scalable ?
	  , scalable: false
	}
	
	// attrs:
	//   - checked: if is checked.
	//   - disabled: if true, this component is not available for interaction.
	function Switch (data) {
	  this.options = utils.extend({}, defaults)
	  this.checked = data.attr.checked
	      && data.attr.checked !== 'false' ? true : false
	  this.data = data
	  this.width = this.options.width * data.scale
	  this.height = this.options.height * data.scale
	  Atomic.call(this, data)
	}
	
	Switch.prototype = Object.create(Atomic.prototype)
	
	Switch.prototype.create = function () {
	  var node = document.createElement('span')
	  this.jack = document.createElement('small')
	  node.appendChild(this.jack)
	  node.className = this.options.className
	  this.node = node
	  this.attr.disabled.call(this, this.data.attr.disabled)
	  return node
	}
	
	Switch.prototype.onAppend = function () {
	  this.setSize()
	  this.setPosition()
	}
	
	Switch.prototype.attr = {
	  disabled: function (val) {
	    this.disabled = val && val !== 'false'
	                    ? true
	                    : false
	    this.disabled ? this.disable() : this.enable()
	  }
	}
	
	Switch.prototype.setSize = function () {
	  var min = Math.min(this.width, this.height)
	  var max = Math.max(this.width, this.height)
	  this.node.style.width = max + 'px'
	  this.node.style.height = min + 'px'
	  this.node.style.borderRadius = min / 2 + 'px'
	  this.jack.style.width
	      = this.jack.style.height
	      = min + 'px'
	}
	
	Switch.prototype.setPosition = function (clicked) {
	  var checked = this.checked
	  var node = this.node
	  var jack = this.jack
	
	  if (clicked && checked) {
	    checked = false
	  } else if (clicked && !checked) {
	    checked = true
	  }
	
	  if (checked === true) {
	    this.checked = true
	
	    if (window.getComputedStyle) {
	      jack.style.left = parseInt(window.getComputedStyle(node).width)
	                        - parseInt(window.getComputedStyle(jack).width) + 'px'
	    } else {
	      jack.style.left = parseInt(node.currentStyle['width'])
	                        - parseInt(jack.currentStyle['width']) + 'px'
	    }
	
	    this.options.color && this.colorize()
	    this.setSpeed()
	  } else {
	    this.checked = false
	    jack.style.left = 0
	    node.style.boxShadow = 'inset 0 0 0 0 ' + this.options.secondaryColor
	    node.style.borderColor = this.options.secondaryColor
	    node.style.backgroundColor
	        = (this.options.secondaryColor !== defaults.secondaryColor)
	          ? this.options.secondaryColor
	          : '#fff'
	    jack.style.backgroundColor
	        = (this.options.jackSecondaryColor !== this.options.jackColor)
	          ? this.options.jackSecondaryColor
	          : this.options.jackColor
	    this.setSpeed()
	  }
	}
	
	Switch.prototype.colorize = function () {
	  var nodeHeight = this.node.offsetHeight / 2
	
	  this.node.style.backgroundColor = this.options.color
	  this.node.style.borderColor = this.options.color
	  this.node.style.boxShadow = 'inset 0 0 0 '
	                              + nodeHeight
	                              + 'px '
	                              + this.options.color
	  this.jack.style.backgroundColor = this.options.jackColor
	}
	
	Switch.prototype.setSpeed = function () {
	  var switcherProp = {}
	  var jackProp = {
	      'background-color': this.options.speed
	      , left: this.options.speed.replace(/[a-z]/, '') / 2 + 's'
	    }
	
	  if (this.checked) {
	    switcherProp = {
	      border: this.options.speed
	      , 'box-shadow': this.options.speed
	      , 'background-color': this.options.speed.replace(/[a-z]/, '') * 3 + 's'
	    }
	  } else {
	    switcherProp = {
	      border: this.options.speed
	      , 'box-shadow': this.options.speed
	    }
	  }
	
	  utils.transitionize(this.node, switcherProp)
	  utils.transitionize(this.jack, jackProp)
	}
	
	Switch.prototype.disable = function () {
	  !this.disabled && (this.disabled = true)
	  this.node.style.opacity = defaults.disabledOpacity
	  this.node.removeEventListener('click', this.getClickHandler())
	}
	
	Switch.prototype.enable = function () {
	  this.disabled && (this.disabled = false)
	  this.node.style.opacity = 1
	  this.node.addEventListener('click', this.getClickHandler())
	}
	
	Switch.prototype.getClickHandler = function () {
	  if (!this._clickHandler) {
	    this._clickHandler = function () {
	      // var parent = this.node.parentNode.tagName.toLowerCase()
	      // var labelParent = (parent === 'label') ? false : true
	      this.setPosition(true)
	      this.dispatchEvent('change', {
	        checked: this.checked
	      })
	    }.bind(this)
	  }
	  return this._clickHandler
	}
	
	Switch.prototype.style
	    = utils.extend(Object.create(Atomic.prototype.style), {
	
	      width: function (val) {
	        if (!this.options.scalable) {
	          return
	        }
	        val = parseFloat(val)
	        if (val !== val || val < 0) { // NaN
	          val = this.options.width
	        }
	        this.width = val * this.data.scale
	        this.setSize()
	      },
	
	      height: function (val) {
	        if (!this.options.scalable) {
	          return
	        }
	        val = parseFloat(val)
	        if (val !== val || val < 0) { // NaN
	          val = this.options.height
	        }
	        this.height = val * this.data.scale
	        this.setSize()
	      }
	
	    })
	
	module.exports = Switch


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(79);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./switch.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./switch.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "/* switch defaults. */\n.weex-switch {\n  background-color: #fff;\n  border: 1px solid #dfdfdf;\n  cursor: pointer;\n  display: inline-block;\n  position: relative;\n  vertical-align: middle;\n  -moz-user-select: none;\n  -khtml-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  box-sizing: content-box;\n  background-clip: content-box;\n}\n\n.weex-switch > small {\n  background: #fff;\n  border-radius: 100%;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var logger = __webpack_require__(15)
	var Component = __webpack_require__(27)
	
	// attrs:
	//   - href
	function A (data) {
	  Component.call(this, data)
	}
	
	A.prototype = Object.create(Component.prototype)
	
	A.prototype.create = function () {
	  var node = document.createElement('a')
	  node.classList.add('weex-container')
	  node.style.textDecoration = 'none'
	  return node
	}
	
	A.prototype.attr = {
	  href: function (val) {
	    if (!val) {
	      return logger.warn('href of <a> should not be a null value.')
	    }
	    this.href = val
	    this.node.setAttribute('data-href', val)
	  }
	}
	
	A.prototype.bindEvents = function (evts) {
	  // event handler for click event will be processed
	  // before the url redirection.
	  Component.prototype.bindEvents.call(this, evts)
	  this.node.addEventListener('click', function (evt) {
	    if (evt._alreadyFired && evt.target !== this.node) {
	      // if the event target is this.node, then this is
	      // just another click event handler for the same
	      // target, not a handler for a bubbling up event,
	      // otherwise it is a bubbling up event, and it
	      // should be disregarded.
	      return
	    }
	    evt._alreadyFired = true
	    location.href = this.href
	  }.bind(this))
	}
	
	module.exports = A


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Component = __webpack_require__(27)
	var utils = __webpack_require__(17)
	
	var ID_PREFIX = 'weex_embed_'
	
	function _generateId() {
	  return ID_PREFIX + utils.getRandom(10)
	}
	
	function Embed (data, nodeType) {
	  var attr = data.attr
	  if (attr) {
	    this.source = attr.src
	    this.loader = attr.loader || 'xhr'
	    this.jsonpCallback = attr.jsonpCallback
	  }
	  Component.call(this, data, nodeType)
	}
	
	Embed.prototype = Object.create(Component.prototype)
	
	Embed.prototype.create = function () {
	  var node = document.createElement('div')
	  node.id = this.id
	  node.style.overflow = 'scroll'
	  return node
	}
	
	Embed.prototype.initWeex = function () {
	  this.id = _generateId()
	  this.node.id = this.id
	  var config = {
	    appId: this.id,
	    source: this.source,
	    bundleUrl: this.source,
	    loader: this.loader,
	    jsonpCallback: this.jsonpCallback,
	    width: this.node.getBoundingClientRect().width,
	    rootId: this.id,
	    embed: true
	  }
	  window.weex.init(config)
	}
	
	Embed.prototype.destroyWeex = function () {
	  this.id && window.destroyInstance(this.id)
	  // TODO: unbind events and clear doms.
	  this.node.innerHTML = ''
	}
	
	Embed.prototype.reloadWeex = function () {
	  if (this.id) {
	    this.destroyWeex()
	    this.id = null
	    this.node.id = null
	    this.node.innerHTML = ''
	  }
	  this.initWeex()
	}
	
	// not recommended, because of the leak of memory.
	Embed.prototype.attr = {
	  src: function (value) {
	    this.source = value
	    this.reloadWeex()
	  }
	}
	
	module.exports = Embed


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Component = __webpack_require__(27)
	
	__webpack_require__(83)
	
	var parents = ['scroller', 'list']
	
	// Only if pulldown offset is larger than this value can this
	// component trigger the 'refresh' event, otherwise just recover
	// to the start point.
	var CLAMP = 130
	
	var ua = window.navigator.userAgent
	var Firefox = !!ua.match(/Firefox/i)
	var IEMobile = !!ua.match(/IEMobile/i)
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'
	
	function Refresh (data) {
	  Component.call(this, data)
	}
	
	Refresh.prototype = Object.create(Component.prototype)
	
	Refresh.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-container', 'weex-refresh')
	  return node
	}
	
	Refresh.prototype.onAppend = function () {
	  var parent = this.getParent()
	  var self = this
	  if (parents.indexOf(parent.data.type) === -1) {
	    return
	  }
	  parent.scroller.addEventListener('pulldown', function (e) {
	    self.adjustHeight(Math.abs(e.scrollObj.getScrollTop()))
	    if (!this.display) {
	      self.show()
	    }
	  })
	  parent.scroller.addEventListener('pulldownend', function (e) {
	    var top = Math.abs(e.scrollObj.getScrollTop())
	    if (top > CLAMP) {
	      self.handleRefresh(e)
	    }
	  })
	}
	
	Refresh.prototype.adjustHeight = function (val) {
	  this.node.style.height = val + 'px'
	  this.node.style.top = -val + 'px'
	}
	
	Refresh.prototype.handleRefresh = function (e) {
	  var scrollObj = e.scrollObj
	  var parent = this.getParent()
	  var scrollElement = parent.scrollElement || parent.listElement
	  this.node.style.height = CLAMP + 'px'
	  this.node.style.top = -CLAMP + 'px'
	  var translateStr = 'translate3d(0px,' + CLAMP + 'px,0px)'
	  scrollElement.style[cssPrefix + 'transform']
	    = cssPrefix + translateStr
	  scrollElement.style.transform = translateStr
	  this.dispatchEvent('refresh')
	}
	
	Refresh.prototype.show = function () {
	  this.display = true
	  this.node.style.display = '-webkit-box'
	  this.node.style.display = '-webkit-flex'
	  this.node.style.display = 'flex'
	}
	
	Refresh.prototype.hide = function () {
	  this.display = false
	  var parent = this.getParent()
	  if (parent) {
	    var scrollElement = parent.scrollElement || parent.listElement
	    var translateStr = 'translate3d(0px,0px,0px)'
	    scrollElement.style[cssPrefix + 'transform']
	      = cssPrefix + translateStr
	    scrollElement.style.transform = translateStr
	  }
	  this.node.style.display = 'none'
	}
	
	Refresh.prototype.attr = {
	  display: function (val) {
	    if (val === 'show') {
	      setTimeout(function () {
	        this.show()
	      }.bind(this), 0)
	    } else if (val === 'hide') {
	      setTimeout(function () {
	        this.hide()
	      }.bind(this), 0)
	    } else {
	      // TODO
	      console.error('h5render:attribute value of refresh \'display\' '
	          + val
	          + ' is invalid. Should be \'show\' or \'hide\'')
	    }
	  }
	}
	
	module.exports = Refresh


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./refresh.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./refresh.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-refresh {\n  // -webkit-box-align: center;\n  // -webkit-align-items: center;\n  // align-items: center;\n  // -webkit-box-pack: center;\n  // -webkit-justify-content: center;\n  // justify-content: center;\n  overflow: hidden;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n}", ""]);
	
	// exports


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Component = __webpack_require__(27)
	
	__webpack_require__(86)
	
	var parents = ['scroller', 'list']
	
	var DEFAULT_HEIGHT = 130
	
	var ua = window.navigator.userAgent
	var Firefox = !!ua.match(/Firefox/i)
	var IEMobile = !!ua.match(/IEMobile/i)
	var cssPrefix = Firefox ? '-moz-' : IEMobile ? '-ms-' : '-webkit-'
	
	function Loading (data) {
	  Component.call(this, data)
	}
	
	Loading.prototype = Object.create(Component.prototype)
	
	Loading.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-container', 'weex-loading')
	  return node
	}
	
	Loading.prototype.onAppend = function () {
	  var parent = this.getParent()
	  var self = this
	  var scrollWrapHeight = parent.node.getBoundingClientRect().height
	  if (parents.indexOf(parent.data.type) === -1) {
	    return
	  }
	  parent.scroller.addEventListener('pullup', function (e) {
	    var obj = e.scrollObj
	    self.adjustHeight(Math.abs(
	      obj.getScrollHeight() - obj.getScrollTop() - scrollWrapHeight))
	    if (!self.display) {
	      self.show()
	    }
	  })
	  parent.scroller.addEventListener('pullupend', function (e) {
	    self.handleLoading(e)
	  })
	}
	
	Loading.prototype.adjustHeight = function (val) {
	  this.node.style.height = val + 'px'
	  this.node.style.bottom = -val + 'px'
	}
	
	Loading.prototype.handleLoading = function (e) {
	  var parent = this.getParent()
	  var scrollElement = parent.scrollElement || parent.listElement
	  var offset = scrollElement.getBoundingClientRect().height
	            - parent.node.getBoundingClientRect().height
	            + DEFAULT_HEIGHT
	  this.node.style.height = DEFAULT_HEIGHT + 'px'
	  this.node.style.bottom = -DEFAULT_HEIGHT + 'px'
	  var translateStr = 'translate3d(0px,-' + offset + 'px,0px)'
	  scrollElement.style[cssPrefix + 'transform']
	    = cssPrefix + translateStr
	  scrollElement.style.transform = translateStr
	  this.dispatchEvent('loading')
	}
	
	Loading.prototype.show = function () {
	  this.display = true
	  this.node.style.display = '-webkit-box'
	  this.node.style.display = '-webkit-flex'
	  this.node.style.display = 'flex'
	}
	
	Loading.prototype.hide = function () {
	  this.display = false
	  var parent = this.getParent()
	  if (parent) {
	    var scrollElement = parent.scrollElement || parent.listElement
	    var scrollElementHeight = scrollElement.getBoundingClientRect().height
	    var scrollWrapHeight = parent.node.getBoundingClientRect().height
	    var left = scrollElementHeight
	      - parent.scroller.getScrollTop()
	      - scrollWrapHeight
	    if (left < 0) {
	      var offset = scrollElementHeight
	              - parent.node.getBoundingClientRect().height
	      var translateStr = 'translate3d(0px,-' + offset + 'px,0px)'
	      scrollElement.style[cssPrefix + 'transform']
	        = cssPrefix + translateStr
	      scrollElement.style.transform = translateStr
	    }
	  }
	  this.node.style.display = 'none'
	}
	
	Loading.prototype.attr = {
	  display: function (val) {
	    if (val === 'show') {
	      setTimeout(function () {
	        this.show()
	      }.bind(this), 0)
	    } else if (val === 'hide') {
	      setTimeout(function () {
	        this.hide()
	      }.bind(this), 0)
	    } else {
	      // TODO
	      console.error('h5render:attribute value of refresh \'display\' '
	          + val
	          + ' is invalid. Should be \'show\' or \'hide\'')
	    }
	  }
	}
	
	module.exports = Loading


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(87);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./loading.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./loading.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-loading {\n  // -webkit-box-align: center;\n  // -webkit-align-items: center;\n  // align-items: center;\n  // -webkit-box-pack: center;\n  // -webkit-justify-content: center;\n  // justify-content: center;\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 0;\n}", ""]);
	
	// exports


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var utils = __webpack_require__(17)
	
	__webpack_require__(89)
	
	function Spinner (data) {
	  Atomic.call(this, data)
	}
	
	Spinner.prototype = Object.create(Atomic.prototype)
	
	Spinner.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-container', 'weex-spinner-wrap')
	  this.spinner = document.createElement('div')
	  this.spinner.classList.add('weex-element', 'weex-spinner')
	  node.appendChild(this.spinner)
	  return node
	}
	
	Spinner.prototype.updateStyle = function (style) {
	  Atomic.prototype.updateStyle.call(this, style)
	  if (style && style.color) {
	    this.setKeyframeColor(utils.getRgb(this.node.style.color))
	  }
	}
	
	Spinner.prototype.getStyleSheet = function () {
	  if (this.styleSheet) {
	    return
	  }
	  var styles = document.styleSheets
	  outer: for (var i = 0, l = styles.length; i < l; i++) {
	    var rules = styles[i].rules
	    for (var j = 0, m = rules.length; j < m; j++) {
	      var item = rules.item(j)
	      if (
	        (item.type === CSSRule.KEYFRAMES_RULE
	          || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
	        && item.name === 'spinner') {
	        break outer
	      }
	    }
	  }
	  this.styleSheet = styles[i]
	}
	
	Spinner.prototype.setKeyframeColor = function (val) {
	  this.getStyleSheet()
	  var keyframeRules = this.computeKeyFrameRules(val)
	  var rules, item, cssRules, keyframe
	  rules = this.styleSheet.rules
	  for (var i = 0, l = rules.length; i < l; i++) {
	    item = rules.item(i)
	    if ((item.type === CSSRule.KEYFRAMES_RULE
	          || item.type === CSSRule.WEBKIT_KEYFRAMES_RULE)
	        && item.name === 'spinner') {
	      cssRules = item.cssRules
	      for (var j = 0, m = cssRules.length; j < m; j++) {
	        keyframe = cssRules[j]
	        if (keyframe.type === CSSRule.KEYFRAME_RULE
	          || keyframe.type === CSSRule.WEBKIT_KEYFRAME_RULE) {
	          keyframe.style.boxShadow = keyframeRules[j]
	        }
	      }
	    }
	  }
	}
	
	Spinner.prototype.computeKeyFrameRules = function (rgb) {
	  if (!rgb) {
	    return
	  }
	  var scaleArr = [
	    '0em -2.6em 0em 0em',
	    '1.8em -1.8em 0 0em',
	    '2.5em 0em 0 0em',
	    '1.75em 1.75em 0 0em',
	    '0em 2.5em 0 0em',
	    '-1.8em 1.8em 0 0em',
	    '-2.6em 0em 0 0em',
	    '-1.8em -1.8em 0 0em']
	  var colorArr = [
	    '1',
	    '0.2',
	    '0.2',
	    '0.2',
	    '0.2',
	    '0.2',
	    '0.5',
	    '0.7'].map(function (e) {
	      return 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + e + ')'
	    })
	  var rules = []
	  for (var i = 0; i < scaleArr.length; i++) {
	    var tmpColorArr = utils.loopArray(colorArr, i, 'r')
	    rules.push(scaleArr.map(function (scaleStr, i) {
	      return scaleStr + ' ' + tmpColorArr[i]
	    }).join(', '))
	  }
	  return rules
	}
	
	module.exports = Spinner


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(90);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./spinner.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./spinner.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-spinner-wrap {\n  width: 1.013333rem; /* 76px */\n  height: 1.013333rem;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  overflow: visible;\n}\n\n.weex-spinner {\n  font-size: 0.16rem; /* 12px */\n  width: 1em;\n  height: 1em;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: spinner 1.1s infinite ease;\n  animation: spinner 1.1s infinite ease;\n  -webkit-transform: translateZ(0);\n  -ms-transform: translateZ(0);\n  transform: translateZ(0);\n}\n@-webkit-keyframes spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n@keyframes spinner {\n  0%,\n  100% {\n    box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.5), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  12.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.7), 1.8em -1.8em 0 0em #ffffff, 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.5), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.5), 2.5em 0em 0 0em rgba(255, 255, 255, 0.7), 1.75em 1.75em 0 0em #ffffff, 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.5), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.2), -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  62.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.5), 0em 2.5em 0 0em rgba(255, 255, 255, 0.7), -1.8em 1.8em 0 0em #ffffff, -2.6em 0em 0 0em rgba(255, 255, 255, 0.2), -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.5), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -2.6em 0em 0em rgba(255, 255, 255, 0.2), 1.8em -1.8em 0 0em rgba(255, 255, 255, 0.2), 2.5em 0em 0 0em rgba(255, 255, 255, 0.2), 1.75em 1.75em 0 0em rgba(255, 255, 255, 0.2), 0em 2.5em 0 0em rgba(255, 255, 255, 0.2), -1.8em 1.8em 0 0em rgba(255, 255, 255, 0.5), -2.6em 0em 0 0em rgba(255, 255, 255, 0.7), -1.8em -1.8em 0 0em #ffffff;\n  }\n}\n", ""]);
	
	// exports


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Atomic = __webpack_require__(39)
	var utils = __webpack_require__(17)
	var logger = __webpack_require__(15)
	
	// A component to import web pages, which works like
	// a iframe element or a webview.
	// attrs:
	//   - src
	// events:
	//   - pagestart
	//   - pagefinish
	//   - error
	function Web (data) {
	  Atomic.call(this, data)
	}
	
	Web.prototype = Object.create(Atomic.prototype)
	
	Web.prototype.create = function () {
	  // Iframe's defect: can't use position:absolute and top, left, right,
	  // bottom all setting to zero and use margin to leave specified
	  // height for a blank area, and have to use 100% to fill the parent
	  // container, otherwise it will use a unwanted default size instead.
	  // Therefore a div as a iframe wrapper is needed here.
	  var node = document.createElement('div')
	  node.classList.add('weex-container')
	  this.web = document.createElement('iframe')
	  node.appendChild(this.web)
	  this.web.classList.add('weex-element')
	  this.web.style.width = '100%'
	  this.web.style.height = '100%'
	  this.web.style.border = 'none'
	  return node
	}
	
	Web.prototype.bindEvents = function (evts) {
	  Atomic.prototype.bindEvents.call(this, evts)
	  var that = this
	  this.web.addEventListener('load', function (e) {
	    that.dispatchEvent('pagefinish', utils.extend({
	      url: that.web.src
	    }))
	  })
	  window.addEventListener('message', this.msgHandler.bind(this))
	}
	
	Web.prototype.msgHandler = function (evt) {
	  var msg = evt.data
	  if (typeof msg === 'string') {
	    try {
	      msg = JSON.parse(msg)
	    } catch (e) {}
	  }
	  if (!msg) {
	    return
	  }
	  if (msg.type === 'weex') {
	    if (!utils.isArray(msg.content)) {
	      return logger.error('weex msg received by web component. msg.content'
	        + ' should be a array:', msg.content)
	    }
	    callNative(this.getComponentManager().instanceId, msg.content)
	  }
	}
	
	Web.prototype.attr = {
	  src: function (val) {
	    this.web.src = val
	    setTimeout(function () {
	      this.dispatchEvent('pagestart', { url: val })
	    }.bind(this), 0)
	  }
	}
	
	Web.prototype.goBack = function () {
	  this.web.contentWindow.history.back()
	}
	
	Web.prototype.goForward = function () {
	  this.web.contentWindow.history.forward()
	}
	
	Web.prototype.reload = function () {
	  this.web.contentWindow.location.reload()
	}
	
	module.exports = Web


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var dom = __webpack_require__(93)
	var event = __webpack_require__(101)
	var pageInfo = __webpack_require__(102)
	var stream = __webpack_require__(103)
	var modal = __webpack_require__(105)
	var animation = __webpack_require__(122)
	var webview = __webpack_require__(123)
	var timer = __webpack_require__(124)
	var navigator = __webpack_require__(125)
	
	var api = {
	  init: function (Weex) {
	    Weex.registerApiModule('dom', dom, dom._meta)
	    Weex.registerApiModule('event', event, event._meta)
	    Weex.registerApiModule('pageInfo', pageInfo, pageInfo._meta)
	    Weex.registerApiModule('stream', stream, stream._meta)
	    Weex.registerApiModule('modal', modal, modal._meta)
	    Weex.registerApiModule('animation', animation, animation._meta)
	    Weex.registerApiModule('webview', webview, webview._meta)
	    Weex.registerApiModule('timer', timer, timer._meta)
	    Weex.registerApiModule('navigator', navigator, navigator._meta)
	  }
	}
	
	module.exports = api

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var messageQueue = __webpack_require__(64)
	var FrameUpdater = __webpack_require__(21)
	var Component = __webpack_require__(27)
	var scroll = __webpack_require__(94)
	var config = __webpack_require__(16)
	var logger = __webpack_require__(15)
	
	var dom = {
	
	  /**
	   * createBody: create root component
	   * @param  {object} element
	   *    container|listview|scrollview
	   * @return {[type]}      [description]
	   */
	  createBody: function (element) {
	    var componentManager = this.getComponentManager()
	    element.scale = this.scale
	    element.instanceId = componentManager.instanceId
	    return componentManager.createBody(element)
	  },
	
	  addElement: function (parentRef, element, index) {
	    var componentManager = this.getComponentManager()
	    element.scale = this.scale
	    element.instanceId = componentManager.instanceId
	    return componentManager.addElement(parentRef, element, index)
	  },
	
	  removeElement: function (ref) {
	    var componentManager = this.getComponentManager()
	    return componentManager.removeElement(ref)
	  },
	
	  moveElement: function (ref, parentRef, index) {
	    var componentManager = this.getComponentManager()
	    return componentManager.moveElement(ref, parentRef, index)
	  },
	
	  addEvent: function (ref, type) {
	    var componentManager = this.getComponentManager()
	    return componentManager.addEvent(ref, type)
	  },
	
	  removeEvent: function (ref, type) {
	    var componentManager = this.getComponentManager()
	    return componentManager.removeEvent(ref, type)
	  },
	
	  /**
	   * updateAttrs: update attributes of component
	   * @param  {string} ref
	   * @param  {obj} attr
	   */
	  updateAttrs: function (ref, attr) {
	    var componentManager = this.getComponentManager()
	    return componentManager.updateAttrs(ref, attr)
	  },
	
	  /**
	   * updateStyle: udpate style of component
	   * @param {string} ref
	   * @param {obj} style
	   */
	  updateStyle: function (ref, style) {
	    var componentManager = this.getComponentManager()
	    return componentManager.updateStyle(ref, style)
	  },
	
	  createFinish: function () {
	    // TODO
	    // FrameUpdater.pause()
	  },
	
	  refreshFinish: function () {
	    // TODO
	  },
	
	  /**
	   * scrollToElement
	   * @param  {string} ref
	   * @param  {obj} options {offset:Number}
	   *   ps: scroll-to has 'ease' and 'duration'(ms) as options.
	   */
	  scrollToElement: function (ref, options) {
	    !options && (options = {})
	    var componentManager = this.getComponentManager()
	    var elem = componentManager.getElementByRef(ref)
	    if (!elem) {
	      return logger.error('component of ref ' + ref + ' doesn\'t exist.')
	    }
	    var parentScroller = elem.getParentScroller()
	    if (parentScroller) {
	      parentScroller.scroller.scrollToElement(elem.node, true)
	    } else {
	      var offsetTop = elem.node.getBoundingClientRect().top
	          + document.body.scrollTop
	      var offset = (Number(options.offset) || 0) * this.scale
	      var tween = scroll(0, offsetTop + offset, options)
	      tween.on('end', function () {
	        logger.log('scroll end.')
	      })
	    }
	  }
	
	}
	
	dom._meta = {
	  dom: [{
	    name: 'createBody',
	    args: ['object']
	  }, {
	    name: 'addElement',
	    args: ['string', 'object', 'number']
	  }, {
	    name: 'removeElement',
	    args: ['string']
	  }, {
	    name: 'moveElement',
	    args: ['string', 'string', 'number']
	  }, {
	    name: 'addEvent',
	    args: ['string', 'string']
	  }, {
	    name: 'removeEvent',
	    args: ['string', 'string']
	  }, {
	    name: 'updateAttrs',
	    args: ['string', 'object']
	  }, {
	    name: 'updateStyle',
	    args: ['string', 'object']
	  }, {
	    name: 'createFinish',
	    args: []
	  }, {
	    name: 'refreshFinish',
	    args: []
	  }, {
	    name: 'scrollToElement',
	    args: ['string', 'object']
	  }]
	}
	
	module.exports = dom


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var Tween = __webpack_require__(95);
	var raf = __webpack_require__(100);
	
	/**
	 * Expose `scrollTo`.
	 */
	
	module.exports = scrollTo;
	
	/**
	 * Scroll to `(x, y)`.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @api public
	 */
	
	function scrollTo(x, y, options) {
	  options = options || {};
	
	  // start position
	  var start = scroll();
	
	  // setup tween
	  var tween = Tween(start)
	    .ease(options.ease || 'out-circ')
	    .to({ top: y, left: x })
	    .duration(options.duration || 1000);
	
	  // scroll
	  tween.update(function(o){
	    window.scrollTo(o.left | 0, o.top | 0);
	  });
	
	  // handle end
	  tween.on('end', function(){
	    animate = function(){};
	  });
	
	  // animate
	  function animate() {
	    raf(animate);
	    tween.update();
	  }
	
	  animate();
	  
	  return tween;
	}
	
	/**
	 * Return scroll position.
	 *
	 * @return {Object}
	 * @api private
	 */
	
	function scroll() {
	  var y = window.pageYOffset || document.documentElement.scrollTop;
	  var x = window.pageXOffset || document.documentElement.scrollLeft;
	  return { top: y, left: x };
	}


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var Emitter = __webpack_require__(96);
	var clone = __webpack_require__(97);
	var type = __webpack_require__(98);
	var ease = __webpack_require__(99);
	
	/**
	 * Expose `Tween`.
	 */
	
	module.exports = Tween;
	
	/**
	 * Initialize a new `Tween` with `obj`.
	 *
	 * @param {Object|Array} obj
	 * @api public
	 */
	
	function Tween(obj) {
	  if (!(this instanceof Tween)) return new Tween(obj);
	  this._from = obj;
	  this.ease('linear');
	  this.duration(500);
	}
	
	/**
	 * Mixin emitter.
	 */
	
	Emitter(Tween.prototype);
	
	/**
	 * Reset the tween.
	 *
	 * @api public
	 */
	
	Tween.prototype.reset = function(){
	  this.isArray = 'array' === type(this._from);
	  this._curr = clone(this._from);
	  this._done = false;
	  this._start = Date.now();
	  return this;
	};
	
	/**
	 * Tween to `obj` and reset internal state.
	 *
	 *    tween.to({ x: 50, y: 100 })
	 *
	 * @param {Object|Array} obj
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.to = function(obj){
	  this.reset();
	  this._to = obj;
	  return this;
	};
	
	/**
	 * Set duration to `ms` [500].
	 *
	 * @param {Number} ms
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.duration = function(ms){
	  this._duration = ms;
	  return this;
	};
	
	/**
	 * Set easing function to `fn`.
	 *
	 *    tween.ease('in-out-sine')
	 *
	 * @param {String|Function} fn
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.ease = function(fn){
	  fn = 'function' == typeof fn ? fn : ease[fn];
	  if (!fn) throw new TypeError('invalid easing function');
	  this._ease = fn;
	  return this;
	};
	
	/**
	 * Stop the tween and immediately emit "stop" and "end".
	 *
	 * @return {Tween}
	 * @api public
	 */
	
	Tween.prototype.stop = function(){
	  this.stopped = true;
	  this._done = true;
	  this.emit('stop');
	  this.emit('end');
	  return this;
	};
	
	/**
	 * Perform a step.
	 *
	 * @return {Tween} self
	 * @api private
	 */
	
	Tween.prototype.step = function(){
	  if (this._done) return;
	
	  // duration
	  var duration = this._duration;
	  var now = Date.now();
	  var delta = now - this._start;
	  var done = delta >= duration;
	
	  // complete
	  if (done) {
	    this._from = this._to;
	    this._update(this._to);
	    this._done = true;
	    this.emit('end');
	    return this;
	  }
	
	  // tween
	  var from = this._from;
	  var to = this._to;
	  var curr = this._curr;
	  var fn = this._ease;
	  var p = (now - this._start) / duration;
	  var n = fn(p);
	
	  // array
	  if (this.isArray) {
	    for (var i = 0; i < from.length; ++i) {
	      curr[i] = from[i] + (to[i] - from[i]) * n;
	    }
	
	    this._update(curr);
	    return this;
	  }
	
	  // objech
	  for (var k in from) {
	    curr[k] = from[k] + (to[k] - from[k]) * n;
	  }
	
	  this._update(curr);
	  return this;
	};
	
	/**
	 * Set update function to `fn` or
	 * when no argument is given this performs
	 * a "step".
	 *
	 * @param {Function} fn
	 * @return {Tween} self
	 * @api public
	 */
	
	Tween.prototype.update = function(fn){
	  if (0 == arguments.length) return this.step();
	  this._update = fn;
	  return this;
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	
	/**
	 * Expose `Emitter`.
	 */
	
	module.exports = Emitter;
	
	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */
	
	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};
	
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */
	
	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}
	
	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};
	
	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }
	
	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};
	
	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */
	
	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	
	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }
	
	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;
	
	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }
	
	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};
	
	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */
	
	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];
	
	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }
	
	  return this;
	};
	
	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */
	
	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};
	
	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */
	
	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies.
	 */
	
	var type;
	try {
	  type = __webpack_require__(98);
	} catch (_) {
	  type = __webpack_require__(98);
	}
	
	/**
	 * Module exports.
	 */
	
	module.exports = clone;
	
	/**
	 * Clones objects.
	 *
	 * @param {Mixed} any object
	 * @api public
	 */
	
	function clone(obj){
	  switch (type(obj)) {
	    case 'object':
	      var copy = {};
	      for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	          copy[key] = clone(obj[key]);
	        }
	      }
	      return copy;
	
	    case 'array':
	      var copy = new Array(obj.length);
	      for (var i = 0, l = obj.length; i < l; i++) {
	        copy[i] = clone(obj[i]);
	      }
	      return copy;
	
	    case 'regexp':
	      // from millermedeiros/amd-utils - MIT
	      var flags = '';
	      flags += obj.multiline ? 'm' : '';
	      flags += obj.global ? 'g' : '';
	      flags += obj.ignoreCase ? 'i' : '';
	      return new RegExp(obj.source, flags);
	
	    case 'date':
	      return new Date(obj.getTime());
	
	    default: // string, number, boolean, …
	      return obj;
	  }
	}


/***/ },
/* 98 */
/***/ function(module, exports) {

	/**
	 * toString ref.
	 */
	
	var toString = Object.prototype.toString;
	
	/**
	 * Return the type of `val`.
	 *
	 * @param {Mixed} val
	 * @return {String}
	 * @api public
	 */
	
	module.exports = function(val){
	  switch (toString.call(val)) {
	    case '[object Date]': return 'date';
	    case '[object RegExp]': return 'regexp';
	    case '[object Arguments]': return 'arguments';
	    case '[object Array]': return 'array';
	    case '[object Error]': return 'error';
	  }
	
	  if (val === null) return 'null';
	  if (val === undefined) return 'undefined';
	  if (val !== val) return 'nan';
	  if (val && val.nodeType === 1) return 'element';
	
	  val = val.valueOf
	    ? val.valueOf()
	    : Object.prototype.valueOf.apply(val)
	
	  return typeof val;
	};


/***/ },
/* 99 */
/***/ function(module, exports) {

	
	// easing functions from "Tween.js"
	
	exports.linear = function(n){
	  return n;
	};
	
	exports.inQuad = function(n){
	  return n * n;
	};
	
	exports.outQuad = function(n){
	  return n * (2 - n);
	};
	
	exports.inOutQuad = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n;
	  return - 0.5 * (--n * (n - 2) - 1);
	};
	
	exports.inCube = function(n){
	  return n * n * n;
	};
	
	exports.outCube = function(n){
	  return --n * n * n + 1;
	};
	
	exports.inOutCube = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n;
	  return 0.5 * ((n -= 2 ) * n * n + 2);
	};
	
	exports.inQuart = function(n){
	  return n * n * n * n;
	};
	
	exports.outQuart = function(n){
	  return 1 - (--n * n * n * n);
	};
	
	exports.inOutQuart = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n;
	  return -0.5 * ((n -= 2) * n * n * n - 2);
	};
	
	exports.inQuint = function(n){
	  return n * n * n * n * n;
	}
	
	exports.outQuint = function(n){
	  return --n * n * n * n * n + 1;
	}
	
	exports.inOutQuint = function(n){
	  n *= 2;
	  if (n < 1) return 0.5 * n * n * n * n * n;
	  return 0.5 * ((n -= 2) * n * n * n * n + 2);
	};
	
	exports.inSine = function(n){
	  return 1 - Math.cos(n * Math.PI / 2 );
	};
	
	exports.outSine = function(n){
	  return Math.sin(n * Math.PI / 2);
	};
	
	exports.inOutSine = function(n){
	  return .5 * (1 - Math.cos(Math.PI * n));
	};
	
	exports.inExpo = function(n){
	  return 0 == n ? 0 : Math.pow(1024, n - 1);
	};
	
	exports.outExpo = function(n){
	  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
	};
	
	exports.inOutExpo = function(n){
	  if (0 == n) return 0;
	  if (1 == n) return 1;
	  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
	  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
	};
	
	exports.inCirc = function(n){
	  return 1 - Math.sqrt(1 - n * n);
	};
	
	exports.outCirc = function(n){
	  return Math.sqrt(1 - (--n * n));
	};
	
	exports.inOutCirc = function(n){
	  n *= 2
	  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
	  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
	};
	
	exports.inBack = function(n){
	  var s = 1.70158;
	  return n * n * (( s + 1 ) * n - s);
	};
	
	exports.outBack = function(n){
	  var s = 1.70158;
	  return --n * n * ((s + 1) * n + s) + 1;
	};
	
	exports.inOutBack = function(n){
	  var s = 1.70158 * 1.525;
	  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
	  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
	};
	
	exports.inBounce = function(n){
	  return 1 - exports.outBounce(1 - n);
	};
	
	exports.outBounce = function(n){
	  if ( n < ( 1 / 2.75 ) ) {
	    return 7.5625 * n * n;
	  } else if ( n < ( 2 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
	  } else if ( n < ( 2.5 / 2.75 ) ) {
	    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
	  } else {
	    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
	  }
	};
	
	exports.inOutBounce = function(n){
	  if (n < .5) return exports.inBounce(n * 2) * .5;
	  return exports.outBounce(n * 2 - 1) * .5 + .5;
	};
	
	// aliases
	
	exports['in-quad'] = exports.inQuad;
	exports['out-quad'] = exports.outQuad;
	exports['in-out-quad'] = exports.inOutQuad;
	exports['in-cube'] = exports.inCube;
	exports['out-cube'] = exports.outCube;
	exports['in-out-cube'] = exports.inOutCube;
	exports['in-quart'] = exports.inQuart;
	exports['out-quart'] = exports.outQuart;
	exports['in-out-quart'] = exports.inOutQuart;
	exports['in-quint'] = exports.inQuint;
	exports['out-quint'] = exports.outQuint;
	exports['in-out-quint'] = exports.inOutQuint;
	exports['in-sine'] = exports.inSine;
	exports['out-sine'] = exports.outSine;
	exports['in-out-sine'] = exports.inOutSine;
	exports['in-expo'] = exports.inExpo;
	exports['out-expo'] = exports.outExpo;
	exports['in-out-expo'] = exports.inOutExpo;
	exports['in-circ'] = exports.inCirc;
	exports['out-circ'] = exports.outCirc;
	exports['in-out-circ'] = exports.inOutCirc;
	exports['in-back'] = exports.inBack;
	exports['out-back'] = exports.outBack;
	exports['in-out-back'] = exports.inOutBack;
	exports['in-bounce'] = exports.inBounce;
	exports['out-bounce'] = exports.outBounce;
	exports['in-out-bounce'] = exports.inOutBounce;


/***/ },
/* 100 */
/***/ function(module, exports) {

	/**
	 * Expose `requestAnimationFrame()`.
	 */
	
	exports = module.exports = window.requestAnimationFrame
	  || window.webkitRequestAnimationFrame
	  || window.mozRequestAnimationFrame
	  || fallback;
	
	/**
	 * Fallback implementation.
	 */
	
	var prev = new Date().getTime();
	function fallback(fn) {
	  var curr = new Date().getTime();
	  var ms = Math.max(0, 16 - (curr - prev));
	  var req = setTimeout(fn, ms);
	  prev = curr;
	  return req;
	}
	
	/**
	 * Cancel.
	 */
	
	var cancel = window.cancelAnimationFrame
	  || window.webkitCancelAnimationFrame
	  || window.mozCancelAnimationFrame
	  || window.clearTimeout;
	
	exports.cancel = function(id){
	  cancel.call(window, id);
	};


/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict'
	
	var event = {
	  /**
	   * openUrl
	   * @param  {string} url
	   */
	  openURL: function (url) {
	    location.href = url
	  }
	
	}
	
	event._meta = {
	  event: [{
	    name: 'openURL',
	    args: ['string']
	  }]
	}
	
	module.exports = event

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict'
	
	var pageInfo = {
	
	  setTitle: function (title) {
	    title = title || 'Weex HTML5'
	    try {
	      title = decodeURIComponent(title)
	    } catch (e) {}
	    document.title = title
	  }
	}
	
	pageInfo._meta = {
	  pageInfo: [{
	    name: 'setTitle',
	    args: ['string']
	  }]
	}
	
	module.exports = pageInfo

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	
	var utils = __webpack_require__(17)
	var logger = __webpack_require__(15)
	
	__webpack_require__(104)
	
	var jsonpCnt = 0
	var ERROR_STATE = -1
	
	function _jsonp(config, callback, progressCallback) {
	  var cbName = 'jsonp_' + (++jsonpCnt)
	  var script, url, head
	
	  if (!config.url) {
	    logger.error('config.url should be set in _jsonp for \'fetch\' API.')
	  }
	
	  global[cbName] = (function (cb) {
	    return function (response) {
	      callback(response)
	      delete global[cb]
	    }
	  })(cbName)
	
	  script = document.createElement('script')
	  try {
	    url = lib.httpurl(config.url)
	  } catch (err) {
	    logger.error('invalid config.url in _jsonp for \'fetch\' API: '
	      + config.url)
	  }
	  url.params.callback = cbName
	  script.type = 'text/javascript'
	  script.src = url.toString()
	  // script.onerror is not working on IE or safari.
	  // but they are not considered here.
	  script.onerror = (function (cb) {
	    return function (err) {
	      logger.error('unexpected error in _jsonp for \'fetch\' API', err)
	      callback(err)
	      delete global[cb]
	    }
	  })(cbName)
	  head = document.getElementsByTagName('head')[0]
	  head.insertBefore(script, null)
	}
	
	function _xhr(config, callback, progressCallback) {
	  var xhr = new XMLHttpRequest()
	  xhr.responseType = config.type
	  xhr.open(config.method, config.url, true)
	
	  xhr.onload = function (res) {
	    callback({
	      status: xhr.status,
	      ok: xhr.status >= 200 && xhr.status < 300,
	      statusText: xhr.statusText,
	      data: xhr.response,
	      headers: xhr.getAllResponseHeaders().split('\n')
	        .reduce(function (obj, headerStr) {
	          var headerArr = headerStr.match(/(.+): (.+)/)
	          if (headerArr) {
	            obj[headerArr[1]] = headerArr[2]
	          }
	          return obj
	        }, {})
	    })
	  }
	
	  if (progressCallback) {
	    xhr.onprogress = function (e) {
	      progressCallback({
	        readyState: xhr.readyState,
	        status: xhr.status,
	        length: e.loaded,
	        total: e.total,
	        statusText: xhr.statusText,
	        headers: xhr.getAllResponseHeaders().split('\n')
	          .reduce(function (obj, headerStr) {
	            var headerArr = headerStr.match(/(.+): (.+)/)
	            if (headerArr) {
	              obj[headerArr[1]] = headerArr[2]
	            }
	            return obj
	          }, {})
	      })
	    }
	  }
	
	  xhr.onerror = function (err) {
	    logger.error('unexpected error in _xhr for \'fetch\' API', err)
	    callback({
	      status: ERROR_STATE,
	      ok: false,
	      statusText: '',
	      data: '',
	      headers: {}
	    })
	  }
	
	  xhr.send(config.body)
	}
	
	var stream = {
	
	  /**
	   * sendHttp
	   * Note: This API is deprecated. Please use stream.fetch instead.
	   * send a http request through XHR.
	   * @deprecated
	   * @param  {obj} params
	   *  - method: 'GET' | 'POST',
	   *  - url: url requested
	   * @param  {string} callbackId
	   */
	  sendHttp: function (param, callbackId) {
	    if (typeof param === 'string') {
	      try {
	        param = JSON.parse(param)
	      } catch (e) {
	        return
	      }
	    }
	    if (typeof param !== 'object' || !param.url) {
	      return logger.error(
	        'invalid config or invalid config.url for sendHttp API')
	    }
	
	    var sender = this.sender
	    var method = param.method || 'GET'
	    var xhr = new XMLHttpRequest()
	    xhr.open(method, param.url, true)
	    xhr.onload = function () {
	      sender.performCallback(callbackId, this.responseText)
	    }
	    xhr.onerror = function (error) {
	      return logger.error('unexpected error in sendHttp API', error)
	      sender.performCallback(
	        callbackId,
	        new Error('unexpected error in sendHttp API')
	      )
	    }
	    xhr.send()
	  },
	
	  /**
	   * fetch
	   * use stream.fetch to request for a json file, a plain text file or
	   * a arraybuffer for a file stream. (You can use Blob and FileReader
	   * API implemented by most modern browsers to read a arraybuffer.)
	   * @param  {object} options config options
	   *   - method {string} 'GET' | 'POST'
	   *   - headers {obj}
	   *   - url {string}
	   *   - mode {string} 'cors' | 'no-cors' | 'same-origin' | 'navigate'
	   *   - body
	   *   - type {string} 'json' | 'jsonp' | 'text'
	   * @param  {string} callbackId
	   * @param  {string} progressCallbackId
	   */
	  fetch: function (options, callbackId, progressCallbackId) {
	
	    var DEFAULT_METHOD = 'GET'
	    var DEFAULT_MODE = 'cors'
	    var DEFAULT_TYPE = 'text'
	
	    var methodOptions = ['GET', 'POST']
	    var modeOptions = ['cors', 'no-cors', 'same-origin', 'navigate']
	    var typeOptions = ['text', 'json', 'jsonp', 'arraybuffer']
	
	    var fallback = false  // fallback from 'fetch' API to XHR.
	    var sender = this.sender
	
	    var config = utils.extend({}, options)
	
	    // validate options.method
	    if (typeof config.method === 'undefined') {
	      config.method = DEFAULT_METHOD
	      logger.warn('options.method for \'fetch\' API has been set to '
	        + 'default value \'' + config.method + '\'')
	    } else if (methodOptions.indexOf((config.method + '')
	        .toUpperCase()) === -1) {
	      return logger.error('options.method \''
	        + config.method
	        + '\' for \'fetch\' API should be one of '
	        + methodOptions + '.')
	    }
	
	    // validate options.url
	    if (!config.url) {
	      return logger.error('options.url should be set for \'fetch\' API.')
	    }
	
	    // validate options.mode
	    if (typeof config.mode === 'undefined') {
	      config.mode = DEFAULT_MODE
	    } else if (modeOptions.indexOf((config.mode + '').toLowerCase()) === -1) {
	      return logger.error('options.mode \''
	        + config.mode
	        + '\' for \'fetch\' API should be one of '
	        + modeOptions + '.')
	    }
	
	    // validate options.type
	    if (typeof config.type === 'undefined') {
	      config.type = DEFAULT_TYPE
	      logger.warn('options.type for \'fetch\' API has been set to '
	        + 'default value \'' + config.type + '\'.')
	    } else if (typeOptions.indexOf((config.type + '').toLowerCase()) === -1) {
	      return logger.error('options.type \''
	          + config.type
	          + '\' for \'fetch\' API should be one of '
	          + typeOptions + '.')
	    }
	
	    var _callArgs = [config, function (res) {
	      sender.performCallback(callbackId, res)
	    }]
	    if (progressCallbackId) {
	      _callArgs.push(function (res) {
	        // Set 'keepAlive' to true for sending continuous callbacks
	        sender.performCallback(progressCallbackId, res, true)
	      })
	    }
	
	    if (config.type === 'jsonp') {
	      _jsonp.apply(this, _callArgs)
	    } else {
	      _xhr.apply(this, _callArgs)
	    }
	  }
	
	}
	
	stream._meta = {
	  stream: [{
	    name: 'sendHttp',
	    args: ['object', 'function']
	  }, {
	    name: 'fetch',
	    args: ['object', 'function', 'function']
	  }]
	}
	
	module.exports = stream
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 104 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){var b={};Object.defineProperty(this,"params",{set:function(a){if("object"==typeof a){for(var c in b)delete b[c];for(var c in a)b[c]=a[c]}},get:function(){return b},enumerable:!0}),Object.defineProperty(this,"search",{set:function(a){if("string"==typeof a){0===a.indexOf("?")&&(a=a.substr(1));var c=a.split("&");for(var d in b)delete b[d];for(var e=0;e<c.length;e++){var f=c[e].split("=");if(void 0!==f[1]&&(f[1]=f[1].toString()),f[0])try{b[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}catch(g){b[f[0]]=f[1]}}}},get:function(){var a=[];for(var c in b)if(void 0!==b[c])if(""!==b[c])try{a.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]))}catch(d){a.push(c+"="+b[c])}else try{a.push(encodeURIComponent(c))}catch(d){a.push(c)}return a.length?"?"+a.join("&"):""},enumerable:!0});var c;Object.defineProperty(this,"hash",{set:function(a){"string"==typeof a&&(a&&a.indexOf("#")<0&&(a="#"+a),c=a||"")},get:function(){return c},enumerable:!0}),this.set=function(a){a=a||"";var b;if(!(b=a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$","i"))))throw new Error("Wrong uri scheme.");this.protocol=b[1]||("object"==typeof location?location.protocol:""),this.username=b[2]||"",this.password=b[3]||"",this.hostname=this.host=b[4],this.port=b[5]||"",this.pathname=b[6]||"/",this.search=b[7]||"",this.hash=b[8]||"",this.origin=this.protocol+"//"+this.hostname},this.toString=function(){var a=this.protocol+"//";return this.username&&(a+=this.username,this.password&&(a+=":"+this.password),a+="@"),a+=this.host,this.port&&"80"!==this.port&&(a+=":"+this.port),this.pathname&&(a+=this.pathname),this.search&&(a+=this.search),this.hash&&(a+=this.hash),a},a&&this.set(a.toString())}b.httpurl=function(a){return new c(a)}}(window,window.lib||(window.lib={}));;module.exports = window.lib['httpurl'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var modal = __webpack_require__(106)
	
	var msg = {
	
	  // duration: default is 0.8 seconds.
	  toast: function (config) {
	    modal.toast(config.message, config.duration)
	  },
	
	  // config:
	  //  - message: string
	  //  - okTitle: title of ok button
	  //  - callback
	  alert: function (config, callbackId) {
	    var sender =  this.sender
	    config.callback = function () {
	      sender.performCallback(callbackId)
	    }
	    modal.alert(config)
	  },
	
	  // config:
	  //  - message: string
	  //  - okTitle: title of ok button
	  //  - cancelTitle: title of cancel button
	  //  - callback
	  confirm: function (config, callbackId) {
	    var sender =  this.sender
	    config.callback = function (val) {
	      sender.performCallback(callbackId, val)
	    }
	    modal.confirm(config)
	  },
	
	  // config:
	  //  - message: string
	  //  - okTitle: title of ok button
	  //  - cancelTitle: title of cancel button
	  //  - callback
	  prompt: function (config, callbackId) {
	    var sender =  this.sender
	    config.callback = function (val) {
	      sender.performCallback(callbackId, val)
	    }
	    modal.prompt(config)
	  }
	
	}
	
	msg._meta = {
	  modal: [{
	    name: 'toast',
	    args: ['object']
	  }, {
	    name: 'alert',
	    args: ['object', 'string']
	  }, {
	    name: 'confirm',
	    args: ['object', 'string']
	  }, {
	    name: 'prompt',
	    args: ['object', 'string']
	  }]
	}
	
	module.exports = msg


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Alert = __webpack_require__(107)
	var Confirm = __webpack_require__(113)
	var Prompt = __webpack_require__(116)
	var toast = __webpack_require__(119)
	
	var modal = {
	
	  toast: function (msg, duration) {
	    toast.push(msg, duration)
	  },
	
	  alert: function (config) {
	    new Alert(config).show()
	  },
	
	  prompt: function (config) {
	    new Prompt(config).show()
	  },
	
	  confirm: function (config) {
	    new Confirm(config).show()
	  }
	
	}
	
	!window.lib && (window.lib = {})
	window.lib.modal = modal
	
	module.exports = modal

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Modal = __webpack_require__(108)
	__webpack_require__(111)
	
	var CONTENT_CLASS = 'content'
	var MSG_CLASS = 'content-msg'
	var BUTTON_GROUP_CLASS = 'btn-group'
	var BUTTON_CLASS = 'btn'
	
	function Alert(config) {
	  this.msg = config.message || ''
	  this.callback = config.callback
	  this.okTitle = config.okTitle || 'OK'
	  Modal.call(this)
	  this.node.classList.add('amfe-alert')
	}
	
	Alert.prototype = Object.create(Modal.prototype)
	
	Alert.prototype.createNodeContent = function () {
	  var content = document.createElement('div')
	  content.classList.add(CONTENT_CLASS)
	  this.node.appendChild(content)
	
	  var msg = document.createElement('div')
	  msg.classList.add(MSG_CLASS)
	  msg.appendChild(document.createTextNode(this.msg))
	  content.appendChild(msg)
	
	  var buttonGroup = document.createElement('div')
	  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
	  this.node.appendChild(buttonGroup)
	  var button = document.createElement('div')
	  button.classList.add(BUTTON_CLASS, 'alert-ok')
	  button.appendChild(document.createTextNode(this.okTitle))
	  buttonGroup.appendChild(button)
	}
	
	Alert.prototype.bindEvents = function () {
	  Modal.prototype.bindEvents.call(this)
	  var button = this.node.querySelector('.' + BUTTON_CLASS)
	  button.addEventListener('click', function () {
	    this.destroy()
	    this.callback && this.callback()
	  }.bind(this))
	}
	
	module.exports = Alert


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(109)
	
	// there will be only one instance of modal.
	var MODAL_WRAP_CLASS = 'amfe-modal-wrap'
	var MODAL_NODE_CLASS = 'amfe-modal-node'
	
	function Modal() {
	  this.wrap = document.querySelector(MODAL_WRAP_CLASS)
	  this.node = document.querySelector(MODAL_NODE_CLASS)
	  if (!this.wrap) {
	    this.createWrap()
	  }
	  if (!this.node) {
	    this.createNode()
	  }
	  this.clearNode()
	  this.createNodeContent()
	  this.bindEvents()
	}
	
	Modal.prototype = {
	
	  show: function () {
	    this.wrap.style.display = 'block'
	    this.node.classList.remove('hide')
	  },
	
	  destroy: function () {
	    document.body.removeChild(this.wrap)
	    document.body.removeChild(this.node)
	    this.wrap = null
	    this.node = null
	  },
	
	  createWrap: function () {
	    this.wrap = document.createElement('div')
	    this.wrap.className = MODAL_WRAP_CLASS
	    document.body.appendChild(this.wrap)
	  },
	
	  createNode: function () {
	    this.node = document.createElement('div')
	    this.node.classList.add(MODAL_NODE_CLASS, 'hide')
	    document.body.appendChild(this.node)
	  },
	
	  clearNode: function () {
	    this.node.innerHTML = ''
	  },
	
	  createNodeContent: function () {
	
	    // do nothing.
	    // child classes can override this method.
	  },
	
	  bindEvents: function () {
	    this.wrap.addEventListener('click', function (e) {
	      e.preventDefault()
	      e.stopPropagation()
	    })
	  }
	}
	
	module.exports = Modal


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(110);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./modal.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./modal.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.amfe-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n.amfe-modal-node.hide {\n  display: none;\n}\n.amfe-modal-node .content {\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 1px solid #ddd;\n}\n.amfe-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n}\n.amfe-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n}\n", ""]);
	
	// exports


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(112);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./alert.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./alert.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-alert .amfe-alert-ok {\n  width: 100%;\n}\n", ""]);
	
	// exports


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Modal = __webpack_require__(108)
	__webpack_require__(114)
	
	var CONTENT_CLASS = 'content'
	var MSG_CLASS = 'content-msg'
	var BUTTON_GROUP_CLASS = 'btn-group'
	var BUTTON_CLASS = 'btn'
	
	function Confirm(config) {
	  this.msg = config.message || ''
	  this.callback = config.callback
	  this.okTitle = config.okTitle || 'OK'
	  this.cancelTitle = config.cancelTitle || 'Cancel'
	  Modal.call(this)
	  this.node.classList.add('amfe-confirm')
	}
	
	Confirm.prototype = Object.create(Modal.prototype)
	
	Confirm.prototype.createNodeContent = function () {
	  var content = document.createElement('div')
	  content.classList.add(CONTENT_CLASS)
	  this.node.appendChild(content)
	
	  var msg = document.createElement('div')
	  msg.classList.add(MSG_CLASS)
	  msg.appendChild(document.createTextNode(this.msg))
	  content.appendChild(msg)
	
	  var buttonGroup = document.createElement('div')
	  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
	  this.node.appendChild(buttonGroup)
	  var btnOk = document.createElement('div')
	  btnOk.appendChild(document.createTextNode(this.okTitle))
	  btnOk.classList.add('btn-ok', BUTTON_CLASS)
	  var btnCancel = document.createElement('div')
	  btnCancel.appendChild(document.createTextNode(this.cancelTitle))
	  btnCancel.classList.add('btn-cancel', BUTTON_CLASS)
	  buttonGroup.appendChild(btnOk)
	  buttonGroup.appendChild(btnCancel)
	  this.node.appendChild(buttonGroup)
	}
	
	Confirm.prototype.bindEvents = function () {
	  Modal.prototype.bindEvents.call(this)
	  var btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok')
	  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel')
	  btnOk.addEventListener('click', function () {
	    this.destroy()
	    this.callback && this.callback(this.okTitle)
	  }.bind(this))
	  btnCancel.addEventListener('click', function () {
	    this.destroy()
	    this.callback && this.callback(this.cancelTitle)
	  }.bind(this))
	}
	
	module.exports = Confirm


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(115);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./confirm.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./confirm.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-confirm .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n", ""]);
	
	// exports


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Modal = __webpack_require__(108)
	__webpack_require__(117)
	
	var CONTENT_CLASS = 'content'
	var MSG_CLASS = 'content-msg'
	var BUTTON_GROUP_CLASS = 'btn-group'
	var BUTTON_CLASS = 'btn'
	var INPUT_WRAP_CLASS = 'input-wrap'
	var INPUT_CLASS = 'input'
	
	function Prompt(config) {
	  this.msg = config.message || ''
	  this.defaultMsg = config.default || ''
	  this.callback = config.callback
	  this.okTitle = config.okTitle || 'OK'
	  this.cancelTitle = config.cancelTitle || 'Cancel'
	  Modal.call(this)
	  this.node.classList.add('amfe-prompt')
	}
	
	Prompt.prototype = Object.create(Modal.prototype)
	
	Prompt.prototype.createNodeContent = function () {
	
	  var content = document.createElement('div')
	  content.classList.add(CONTENT_CLASS)
	  this.node.appendChild(content)
	
	  var msg = document.createElement('div')
	  msg.classList.add(MSG_CLASS)
	  msg.appendChild(document.createTextNode(this.msg))
	  content.appendChild(msg)
	
	  var inputWrap = document.createElement('div')
	  inputWrap.classList.add(INPUT_WRAP_CLASS)
	  content.appendChild(inputWrap)
	  var input = document.createElement('input')
	  input.classList.add(INPUT_CLASS)
	  input.type = 'text'
	  input.autofocus = true
	  input.placeholder = this.defaultMsg
	  inputWrap.appendChild(input)
	
	  var buttonGroup = document.createElement('div')
	  buttonGroup.classList.add(BUTTON_GROUP_CLASS)
	  var btnOk = document.createElement('div')
	  btnOk.appendChild(document.createTextNode(this.okTitle))
	  btnOk.classList.add('btn-ok', BUTTON_CLASS)
	  var btnCancel = document.createElement('div')
	  btnCancel.appendChild(document.createTextNode(this.cancelTitle))
	  btnCancel.classList.add('btn-cancel', BUTTON_CLASS)
	  buttonGroup.appendChild(btnOk)
	  buttonGroup.appendChild(btnCancel)
	  this.node.appendChild(buttonGroup)
	}
	
	Prompt.prototype.bindEvents = function () {
	  Modal.prototype.bindEvents.call(this)
	  var btnOk = this.node.querySelector('.' + BUTTON_CLASS + '.btn-ok')
	  var btnCancel = this.node.querySelector('.' + BUTTON_CLASS + '.btn-cancel')
	  var that = this
	  btnOk.addEventListener('click', function () {
	    var val = document.querySelector('input').value
	    this.destroy()
	    this.callback && this.callback({
	      result: that.okTitle,
	      data: val
	    })
	  }.bind(this))
	  btnCancel.addEventListener('click', function () {
	    var val = document.querySelector('input').value
	    this.destroy()
	    this.callback && this.callback({
	      result: that.cancelTitle
	    })
	  }.bind(this))
	}
	
	module.exports = Prompt


/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(118);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./prompt.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./prompt.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  padding: 0.24rem 0.213333rem 0.213333rem;\n  height: 0.96rem;\n}\n.amfe-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.32rem;\n}\n.amfe-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n.amfe-prompt .btn-group .btn.btn-ok {\n  border-right: 1px solid #ddd;\n}\n", ""]);
	
	// exports


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(120)
	
	var queue = []
	var timer
	var isProcessing = false
	var toastWin
	var TOAST_WIN_CLASS_NAME = 'amfe-toast'
	
	var DEFAULT_DURATION = 0.8
	
	function showToastWindow(msg, callback) {
	  var handleTransitionEnd = function () {
	    toastWin.removeEventListener('transitionend', handleTransitionEnd)
	    callback && callback()
	  }
	  if (!toastWin) {
	    toastWin = document.createElement('div')
	    toastWin.classList.add(TOAST_WIN_CLASS_NAME, 'hide')
	    document.body.appendChild(toastWin)
	  }
	  toastWin.innerHTML = msg
	  toastWin.addEventListener('transitionend', handleTransitionEnd)
	  setTimeout(function () {
	    toastWin.classList.remove('hide')
	  }, 0)
	}
	
	function hideToastWindow(callback) {
	  var handleTransitionEnd = function () {
	    toastWin.removeEventListener('transitionend', handleTransitionEnd)
	    callback && callback()
	  }
	  if (!toastWin) {
	    return
	  }
	  toastWin.addEventListener('transitionend', handleTransitionEnd)
	  toastWin.classList.add('hide')
	}
	
	var toast = {
	
	  push: function (msg, duration) {
	    queue.push({
	      msg: msg,
	      duration: duration || DEFAULT_DURATION
	    })
	    this.show()
	  },
	
	  show: function () {
	    var that = this
	
	    // All messages had been toasted already, so remove the toast window,
	    if (!queue.length) {
	      toastWin && toastWin.parentNode.removeChild(toastWin)
	      toastWin = null
	      return
	    }
	
	    // the previous toast is not ended yet.
	    if (isProcessing) {
	      return
	    }
	    isProcessing = true
	
	    var toastInfo = queue.shift()
	    showToastWindow(toastInfo.msg, function () {
	      timer = setTimeout(function () {
	        timer = null
	        hideToastWindow(function () {
	          isProcessing = false
	          that.show()
	        })
	      }, toastInfo.duration * 1000)
	    })
	  }
	
	}
	
	module.exports = {
	  push: toast.push.bind(toast)
	}


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(121);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../css-loader/index.js!./toast.css", function() {
				var newContent = require("!!./../../../../css-loader/index.js!./toast.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".amfe-toast {\n  font-size: 0.32rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 2.666667rem;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.6;\n  transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n\n.amfe-toast.hide {\n  opacity: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var Sender = __webpack_require__(31)
	
	var _data = {}
	
	var animation = {
	
	  /**
	   * transition
	   * @param  {string} ref        [description]
	   * @param  {obj} config     [description]
	   * @param  {string} callbackId [description]
	   */
	  transition: function (ref, config, callbackId) {
	    var refData = _data[ref]
	    var stylesKey = JSON.stringify(config.styles)
	    var weexInstance = this
	    // If the same component perform a animation with exactly the same
	    // styles in a sequence with so short interval that the prev animation
	    // is still in playing, then the next animation should be ignored.
	    if (refData && refData[stylesKey]) {
	      return
	    }
	    if (!refData) {
	      refData = _data[ref] = {}
	    }
	    refData[stylesKey] = true
	    return this.getComponentManager().transition(ref, config, function () {
	      // Remove the stylesKey in refData so that the same animation
	      // can be played again after current animation is already finished.
	      delete refData[stylesKey]
	      weexInstance.sender.performCallback(callbackId)
	    })
	  }
	
	}
	
	animation._meta = {
	  animation: [{
	    name: 'transition',
	    args: ['string', 'object', 'string']
	  }]
	}
	
	module.exports = animation


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var sender = __webpack_require__(31)
	
	var webview = {
	
	  // ref: ref of the web component.
	  goBack: function (ref) {
	    var webComp = this.getComponentManager().getElementByRef(ref)
	    if (!webComp.goBack) {
	      console.error('error: the specified component has no method of'
	          + ' goBack. Please make sure it is a webview component.')
	      return
	    }
	    webComp.goBack()
	  },
	
	  // ref: ref of the web component.
	  goForward: function (ref) {
	    var webComp = this.getComponentManager().getElementByRef(ref)
	    if (!webComp.goForward) {
	      console.error('error: the specified component has no method of'
	          + ' goForward. Please make sure it is a webview component.')
	      return
	    }
	    webComp.goForward()
	  },
	
	  // ref: ref of the web component.
	  reload: function (ref) {
	    var webComp = this.getComponentManager().getElementByRef(ref)
	    if (!webComp.reload) {
	      console.error('error: the specified component has no method of'
	          + ' reload. Please make sure it is a webview component.')
	      return
	    }
	    webComp.reload()
	  }
	
	}
	
	webview._meta = {
	  webview: [{
	    name: 'goBack',
	    args: ['string']
	  }, {
	    name: 'goForward',
	    args: ['string']
	  }, {
	    name: 'reload',
	    args: ['string']
	  }]
	}
	
	module.exports = webview


/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict'
	
	var timer = {
	
	  setTimeout: function (timeoutCallbackId, delay) {
	    var sender = this.sender
	    var timerId = setTimeout(function () {
	      sender.performCallback(timeoutCallbackId)
	    }, delay)
	  },
	
	  clearTimeout: function (timerId) {
	    clearTimeout(timerId)
	  }
	
	}
	
	timer._meta = {
	  timer: [{
	    name: 'setTimeout',
	    args: ['function', 'number']
	  }, {
	    name: 'clearTimeout',
	    args: ['number']
	  }]
	}
	
	module.exports = timer


/***/ },
/* 125 */
/***/ function(module, exports) {

	'use strict'
	
	var navigator = {
	
	  // config
	  //  - url: the url to push
	  //  - animated: this configuration item is native only
	  //  callback is not currently supported
	  push: function (config, callbackId) {
	    window.location.href = config.url
	    this.sender.performCallback(callbackId)
	  },
	
	  // config
	  //  - animated: this configuration item is native only
	  //  callback is note currently supported
	  pop: function (config, callbackId) {
	    window.history.back()
	    this.sender.performCallback(callbackId)
	  }
	
	}
	
	navigator._meta = {
	  navigator: [{
	    name: 'push',
	    args: ['object', 'function']
	  }, {
	    name: 'pop',
	    args: ['object', 'function']
	  }]
	}
	
	module.exports = navigator


/***/ },
/* 126 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){Object.defineProperty(this,"val",{value:a.toString(),enumerable:!0}),this.gt=function(a){return c.compare(this,a)>0},this.gte=function(a){return c.compare(this,a)>=0},this.lt=function(a){return c.compare(this,a)<0},this.lte=function(a){return c.compare(this,a)<=0},this.eq=function(a){return 0===c.compare(this,a)}}b.env=b.env||{},c.prototype.toString=function(){return this.val},c.prototype.valueOf=function(){for(var a=this.val.split("."),b=[],c=0;c<a.length;c++){var d=parseInt(a[c],10);isNaN(d)&&(d=0);var e=d.toString();e.length<5&&(e=Array(6-e.length).join("0")+e),b.push(e),1===b.length&&b.push(".")}return parseFloat(b.join(""))},c.compare=function(a,b){a=a.toString().split("."),b=b.toString().split(".");for(var c=0;c<a.length||c<b.length;c++){var d=parseInt(a[c],10),e=parseInt(b[c],10);if(window.isNaN(d)&&(d=0),window.isNaN(e)&&(e=0),e>d)return-1;if(d>e)return 1}return 0},b.version=function(a){return new c(a)}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c)for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1])}catch(f){b.env.params[d[e][0]]=d[e][1]}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))b.env.os={name:"Windows Phone",isWindowsPhone:!0,version:c[1]};else if(d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/)))b.env.os={version:c[1]},d.match(/Mobile\s+Safari/)?(b.env.os.name="Android",b.env.os.isAndroid=!0):(b.env.os.name="AndroidPad",b.env.os.isAndroidPad=!0);else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")}}else b.env.os={name:"unknown",version:"0.0.0"};b.version&&(b.env.os.version=b.version(b.env.os.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/Firefox\/([\d\.]+)/))?b.env.browser={name:"Firefox",isFirefox:!0,version:c[1]}:(c=d.match(/MSIE\s([\d\.]+)/))||(c=d.match(/IEMobile\/([\d\.]+)/))?(b.env.browser={version:c[1]},d.match(/IEMobile/)?(b.env.browser.name="IEMobile",b.env.browser.isIEMobile=!0):(b.env.browser.name="IE",b.env.browser.isIE=!0),d.match(/Android|iPhone/)&&(b.env.browser.isIELikeWebkit=!0)):(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?(b.env.browser={name:"Chrome",isChrome:!0,version:c[1]},d.match(/Version\/[\d+\.]+\s*Chrome/)&&(b.env.browser.name="Chrome Webview",b.env.browser.isWebview=!0)):d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)?d.match(/Safari/)?(c=d.match(/Version\/([\d\.]+)/),b.env.browser={name:"Safari",isSafari:!0,version:c[1]}):(c=d.match(/OS ([\d_\.]+) like Mac OS X/),b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/g,".")}):b.env.browser={name:"unknown",version:"0.0.0"},b.version&&(b.env.browser.version=b.version(b.env.browser.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.navigator.userAgent;c.match(/Weibo/i)?b.env.thirdapp={appname:"Weibo",isWeibo:!0}:c.match(/MicroMessenger/i)?b.env.thirdapp={appname:"Weixin",isWeixin:!0}:b.env.thirdapp=!1}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d,e=a.navigator.userAgent;(d=e.match(/WindVane[\/\s]([\d\.\_]+)/))&&(c=d[1]);var f=!1,g="",h="",i="";(d=e.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))&&(f=!0,g=d[1],i=d[2],h=g.indexOf("-PD")>0?b.env.os.isIOS?"iPad":b.env.os.isAndroid?"AndroidPad":b.env.os.name:b.env.os.name),!g&&e.indexOf("TBIOS")>0&&(g="TB"),f?b.env.aliapp={windvane:b.version(c||"0.0.0"),appname:g||"unkown",version:b.version(i||"0.0.0"),platform:h||b.env.os.name}:b.env.aliapp=!1,b.env.taobaoApp=b.env.aliapp}(window,window.lib||(window.lib={}));;module.exports = window.lib['env'];

/***/ },
/* 127 */
/***/ function(module, exports) {

	'use strict'
	
	function loadByMtop(pageId, callback) {
	  lib.mtop.request({
	    api: 'mtop.geb.weappplus.viewloader.query',
	    v: '2.0',
	    data: {
	      page: pageId,
	      clientVersion: 10000
	    },
	    ecode: 0
	  }).then(function (result) {
	    var code = result.data && result.data.jsStr
	    if (code) {
	      callback(null, code)
	    }
	  }, function (error) {
	    callback(new Error('load'), error)
	  })
	}
	
	module.exports = {
	  loadByMtop: loadByMtop
	}


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var event = __webpack_require__(129)
	var pageInfo = __webpack_require__(134)
	var stream = __webpack_require__(135)
	var user = __webpack_require__(138)
	var userTrack = __webpack_require__(139)
	var windvane = __webpack_require__(140)
	
	var api = {
	  init: function (Weex) {
	    Weex.registerApiModule('event', event, event._meta)
	    Weex.registerApiModule('pageInfo', pageInfo, pageInfo._meta)
	    Weex.registerApiModule('stream', stream, stream._meta)
	    Weex.registerApiModule('user', user, user._meta)
	    Weex.registerApiModule('userTrack', userTrack, userTrack._meta)
	    Weex.registerApiModule('windvane', windvane, windvane._meta)
	  }
	}
	
	module.exports = api

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	// require('envd')
	// require('httpurl')
	__webpack_require__(130)
	__webpack_require__(133)
	
	// is url of taoke?
	var url = lib.httpurl(location.href)
	var isInTaoke = url.params['ali_trackid']
	  && url.params['ali_trackid'].indexOf('2:') === 0
	
	// is this app of alibaba inc.?
	var isAliApp = lib.env.aliapp
	
	/**
	 * Call taobao app from a non-alibaba non-taoke app client.
	 * Will add second parameter for telling whether or not to call taobao app
	 * in future. (not supported for now.)
	 */
	function callApp(url) {
	  if (!isAliApp && !isInTaoke) {
	    try {
	      lib.callapp.gotoPage(url)
	    } catch (err) {
	      // do nothing.
	    }
	    setTimeout(function () {
	      location.href = url
	    }, 300)
	  }
	  else {
	    location.href = url
	  }
	}
	
	var event = {
	
	  /**
	   * openUrl
	   * @param  {string} url
	   */
	  openURL: function (url) {
	    if (lib.env.aliapp) {
	      // TM app will create no webview instance when not intentionally
	      // telling it to.
	      // Ali relies on http://g.alicdn.com/hybrid/api/3.0.11/hybrid.min.js
	      if (lib.env.aliapp.appname === 'TM') {
	        Ali.pushWindow(url, function (data) {
	          if (data.errorCode) {
	            window.open(url)
	          }
	        })
	      }
	      // TB ios client will destory current webview because of cpp=1.
	      // Therefor the method openWindow of windvane is needed.
	      else if (lib.env.aliapp.appname === 'TB' && lib.env.os.isIOS) {
	        lib.windvane.call('Base', 'openWindow', {
	          url: url
	        })
	      }
	      else {
	        // callApp(url)
	        location.href = url
	      }
	    }
	    else {
	      // callApp(url)
	      location.href = url
	    }
	  }
	
	}
	
	event._meta = {
	  meta: [{
	    name: 'openURL',
	    args: ['string']
	  }]
	}
	
	module.exports = event

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});__webpack_require__(131);__webpack_require__(132);!function(a,b){function c(a,b){var c=new j(location.href),d=h.getElementById("buried"),e=c.params.ttid,f=c.params.ad_id,g=c.params.source_type,i=c.params.refpid,k=c.params.actparam,l=c.params.actname,m=c.params.ali_trackid,n=c.params.pid,o=h.cookie.match(/(?:^|\s)cna=([^;]+)(?:;|$)/);c.search="",c.hash="";var p={};if(d&&(e=d.value),p.from="h5",e&&(p.ttid=e),i&&(p.refpid=i),k&&(p.actparam=k),l&&(p.actname=l),p.url=c.toString(),n&&(p.pid=n),f&&(p.ad_id=f),g&&(p.source_type=g),m&&(p.ali_trackid=m),o&&(p.h5_uid=o[1]),"object"==typeof b)for(var q in b)p[q]=b[q];return a.params.point=JSON.stringify(p),a}function d(a,b){var c=new j(location.href),d=h.getElementById("buried");for(var e in c.params)a.params.hasOwnProperty(e)||(a.params[e]=c.params[e]);if(d&&(a.params.ttid=d.value),"object"==typeof b)for(var e in b)a.params[e]=b[e];return a}function e(a){o||(o=h.createElement("iframe"),o.id="callapp_iframe_"+Date.now(),o.frameborder="0",o.style.cssText="display:none;border:0;width:0;height:0;",h.body.appendChild(o)),o.src=a}function f(a,b){b.replace===!1||!l&&b.replace!==!0?location.href=a:location.replace(a)}function g(a){var b=document.createElement("a");b.setAttribute("href",a),b.style.display="none",document.body.appendChild(b);var c=document.createEvent("HTMLEvents");c.initEvent("click",!1,!1),b.dispatchEvent(c)}var h=a.document,i=a.navigator.userAgent,j=b.httpurl,k=b.env.os,l=(b.env.params,b.env.aliapp),m=b.env.browser,n={"taobao:":"com.taobao.taobao","taobaowebview:":"com.taobao.taobao","tmall:":"com.tmall.wireless"};b.callapp=b.callapp||{};var o;b.callapp.gotoPage=function(a,b){b=b||{},"undefined"==typeof b.point&&(b.point=!0),"undefined"==typeof b.params&&(b.params=!0);var h=new j(a||location.href);if(a=new j(a),("http:"===a.protocol||"https:"===a.protocol)&&(k.isAndroid&&l&&"TB"===l.appname?(a=new j("taobaowebview://m.taobao.com/"),a.params.weburl=h.toString()):a.protocol="taobao:"),"taobao:"===a.protocol)b.point&&c(a,b.point),b.params&&d(a,b.params);else if("taobaowebview:"===a.protocol){b.point&&c(a,b.point);var o=new j(a.params.weburl);b.params&&d(o,b.params),b.point&&c(o,b.point),a.params.weburl=o.toString()}else"tmall:"!==a.protocol.toLowerCase()&&"kddcpublic:"!==a.protocol.toLowerCase()&&"mdatadwphone:"!==a.protocol.toLowerCase()&&b.params&&d(a,b.params);var p=k.isAndroid&&m.isChrome&&!m.isWebview,q=k.isAndroid&&!!i.match(/samsung/i)&&k.version.gte("4.3")&&k.version.lt("4.5"),r=k.isIPhone&&k.version.gte("9.0")&&m.isSafari;(p||q||b.forceIntent)&&(a.hash="Intent;scheme="+a.protocol.replace(":","")+";package="+(b["package"]||n[a.protocol])+";end",a.protocol="intent:"),r?setTimeout(function(){g(a.toString(),b)},100):l||"intent:"===a.protocol?setTimeout(function(){f(a.toString(),b)},100):e(a.toString())},b.callapp.download=function(a,b){b=b||{},a||(a=k.isIPhone?"http://itunes.apple.com/cn/app/id387682726?mt=8":k.isIPad?"https://itunes.apple.com/app/id438865278":k.isAndroid?"//download.alicdn.com/wireless/taobao4android/latest/taobao4android_703248.apk":""),a=new j(a),k.isAndroid&&a.pathname.match(/\.apk$/)?(a.search="",a.hash=""):b.params&&d(a,b.params),a=a.toString(),f(a,b)}}(window,window.lib||(window.lib={}));;module.exports = window.lib.callapp;

/***/ },
/* 131 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){Object.defineProperty(this,"val",{value:a.toString(),enumerable:!0}),this.gt=function(a){return c.compare(this,a)>0},this.gte=function(a){return c.compare(this,a)>=0},this.lt=function(a){return c.compare(this,a)<0},this.lte=function(a){return c.compare(this,a)<=0},this.eq=function(a){return 0===c.compare(this,a)}}b.env=b.env||{},c.prototype.toString=function(){return this.val},c.prototype.valueOf=function(){for(var a=this.val.split("."),b=[],c=0;c<a.length;c++){var d=parseInt(a[c],10);isNaN(d)&&(d=0);var e=d.toString();e.length<5&&(e=Array(6-e.length).join("0")+e),b.push(e),1===b.length&&b.push(".")}return parseFloat(b.join(""))},c.compare=function(a,b){a=a.toString().split("."),b=b.toString().split(".");for(var c=0;c<a.length||c<b.length;c++){var d=parseInt(a[c],10),e=parseInt(b[c],10);if(window.isNaN(d)&&(d=0),window.isNaN(e)&&(e=0),e>d)return-1;if(d>e)return 1}return 0},b.version=function(a){return new c(a)}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.location.search.replace(/^\?/,"");if(b.env.params={},c)for(var d=c.split("&"),e=0;e<d.length;e++){d[e]=d[e].split("=");try{b.env.params[d[e][0]]=decodeURIComponent(d[e][1])}catch(f){b.env.params[d[e][0]]=d[e][1]}}}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;if(c=d.match(/Windows\sPhone\s(?:OS\s)?([\d\.]+)/))b.env.os={name:"Windows Phone",isWindowsPhone:!0,version:c[1]};else if(d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/)))b.env.os={version:c[1]},d.match(/Mobile\s+Safari/)?(b.env.os.name="Android",b.env.os.isAndroid=!0):(b.env.os.name="AndroidPad",b.env.os.isAndroidPad=!0);else if(c=d.match(/(iPhone|iPad|iPod)/)){var e=c[1];(c=d.match(/OS ([\d_\.]+) like Mac OS X/))&&(b.env.os={name:e,isIPhone:"iPhone"===e||"iPod"===e,isIPad:"iPad"===e,isIOS:!0,version:c[1].split("_").join(".")})}b.env.os||(b.env.os={name:"unknown",version:"0.0.0"}),b.version&&(b.env.os.version=b.version(b.env.os.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d=a.navigator.userAgent;(c=d.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/))?b.env.browser={name:"UC",isUC:!0,version:c[1]}:(c=d.match(/MQQBrowser\/([\d\.]+)/))?b.env.browser={name:"QQ",isQQ:!0,version:c[1]}:(c=d.match(/(?:Firefox|FxiOS)\/([\d\.]+)/))?b.env.browser={name:"Firefox",isFirefox:!0,version:c[1]}:(c=d.match(/MSIE\s([\d\.]+)/))||(c=d.match(/IEMobile\/([\d\.]+)/))?(b.env.browser={version:c[1]},d.match(/IEMobile/)?(b.env.browser.name="IEMobile",b.env.browser.isIEMobile=!0):(b.env.browser.name="IE",b.env.browser.isIE=!0),d.match(/Android|iPhone/)&&(b.env.browser.isIELikeWebkit=!0)):(c=d.match(/(?:Chrome|CriOS)\/([\d\.]+)/))?(b.env.browser={name:"Chrome",isChrome:!0,version:c[1]},d.match(/Version\/[\d+\.]+\s*Chrome/)&&(b.env.browser.name="Chrome Webview",b.env.browser.isWebview=!0)):d.match(/Safari/)&&(c=d.match(/Android[\s\/]([\d\.]+)/))?b.env.browser={name:"Android",isAndroid:!0,version:c[1]}:d.match(/iPhone|iPad|iPod/)&&(d.match(/Safari/)&&(c=d.match(/Version\/([\d\.]+)/))?b.env.browser={name:"Safari",isSafari:!0,version:c[1]}:(c=d.match(/OS ([\d_\.]+) like Mac OS X/))&&(b.env.browser={name:"iOS Webview",isWebview:!0,version:c[1].replace(/\_/g,".")})),b.env.browser||(b.env.browser={name:"unknown",version:"0.0.0"}),b.version&&(b.env.browser.version=b.version(b.env.browser.version))}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c=a.navigator.userAgent;b.env.thirdapp=c.match(/Weibo/i)?{appname:"Weibo",isWeibo:!0}:c.match(/MicroMessenger/i)?{appname:"Weixin",isWeixin:!0}:!1}(window,window.lib||(window.lib={})),function(a,b){b.env=b.env||{};var c,d,e=a.navigator.userAgent;(d=e.match(/WindVane[\/\s]([\d\.\_]+)/))&&(c=d[1]);var f=!1,g="",h="",i="",j=a._ua_popLayer||"",k=!1,l="";(d=e.match(/AliApp\(([A-Z\-]+)\/([\d\.]+)\)/i))&&(f=!0,g=d[1],i=d[2],h=g.indexOf("-PD")>0?b.env.os.isIOS?"iPad":b.env.os.isAndroid?"AndroidPad":b.env.os.name:b.env.os.name),!g&&e.indexOf("TBIOS")>0&&(g="TB"),j&&(d=j.match(/PopLayer\/([\d\.]+)/i))&&(k=!0,l=d[1]),b.env.aliapp=f?{windvane:b.version(c||"0.0.0"),appname:g||"unkown",version:b.version(i||"0.0.0"),platform:h||b.env.os.name,poplayer:k||!1,poplayerVersion:b.version(l||"0.0.0")}:!1,b.env.taobaoApp=b.env.aliapp}(window,window.lib||(window.lib={}));;module.exports = window.lib['env'];

/***/ },
/* 132 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){var b={};Object.defineProperty(this,"params",{set:function(a){if("object"==typeof a){for(var c in b)delete b[c];for(var c in a)b[c]=a[c]}},get:function(){return b},enumerable:!0}),Object.defineProperty(this,"search",{set:function(a){if("string"==typeof a){0===a.indexOf("?")&&(a=a.substr(1));var c=a.split("&");for(var d in b)delete b[d];for(var e=0;e<c.length;e++){var f=c[e].split("=");if(void 0!==f[1]&&(f[1]=f[1].toString()),f[0])try{b[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}catch(g){b[f[0]]=f[1]}}}},get:function(){var a=[];for(var c in b)if(void 0!==b[c])if(""!==b[c])try{a.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]))}catch(d){a.push(c+"="+b[c])}else try{a.push(encodeURIComponent(c))}catch(d){a.push(c)}return a.length?"?"+a.join("&"):""},enumerable:!0});var c;Object.defineProperty(this,"hash",{set:function(a){"string"==typeof a&&(a&&a.indexOf("#")<0&&(a="#"+a),c=a||"")},get:function(){return c},enumerable:!0}),this.set=function(a){a=a||"";var b;if(!(b=a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$","i"))))throw new Error("Wrong uri scheme.");this.protocol=b[1]||("object"==typeof location?location.protocol:""),this.username=b[2]||"",this.password=b[3]||"",this.hostname=this.host=b[4],this.port=b[5]||"",this.pathname=b[6]||"/",this.search=b[7]||"",this.hash=b[8]||"",this.origin=this.protocol+"//"+this.hostname},this.toString=function(){var a=this.protocol+"//";return this.username&&(a+=this.username,this.password&&(a+=":"+this.password),a+="@"),a+=this.host,this.port&&"80"!==this.port&&(a+=":"+this.port),this.pathname&&(a+=this.pathname),this.search&&(a+=this.search),this.hash&&(a+=this.hash),a},a&&this.set(a.toString())}b.httpurl=function(a){return new c(a)}}(window,window.lib||(window.lib={}));;module.exports = window.lib.httpurl;

/***/ },
/* 133 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a,b){a=a.toString().split("."),b=b.toString().split(".");for(var c=0;c<a.length||c<b.length;c++){var d=parseInt(a[c],10),e=parseInt(b[c],10);if(window.isNaN(d)&&(d=0),window.isNaN(e)&&(e=0),e>d)return-1;if(d>e)return 1}return 0}var d=a.Promise,e=a.document,f=a.navigator.userAgent,g=/Windows\sPhone\s(?:OS\s)?[\d\.]+/i.test(f)||/Windows\sNT\s[\d\.]+/i.test(f),h=g&&a.WindVane_Win_Private&&a.WindVane_Win_Private.call,i=/iPhone|iPad|iPod/i.test(f),j=/Android/i.test(f),k=f.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/),l=Object.prototype.hasOwnProperty,m=b.windvane=a.WindVane||(a.WindVane={}),n=(a.WindVane_Native,1),o=[],p=3,q="hybrid",r="wv_hybrid",s="iframe_",t="suc_",u="err_",v="defer_",w="param_",x="chunk_",y=6e5,z=6e5,A=6e4;k=k?(k[1]||"0.0.0").replace(/\_/g,"."):"0.0.0";var B={isAvailable:1===c(k,"0"),call:function(a,b,c,e,f,g){var h,i;return"number"==typeof arguments[arguments.length-1]&&(g=arguments[arguments.length-1]),"function"!=typeof e&&(e=null),"function"!=typeof f&&(f=null),d&&(i={},i.promise=new d(function(a,b){i.resolve=a,i.reject=b})),h=g>0?setTimeout(function(){B.onFailure(h,{ret:"HY_TIMEOUT"})},g):C.getSid(),C.registerCall(h,e,f,i),C.registerGC(h,g),B.isAvailable?C.callMethod(a,b,c,h):B.onFailure(h,{ret:"HY_NOT_IN_WINDVANE"}),i?i.promise:void 0},fireEvent:function(a,b,c){var d=e.createEvent("HTMLEvents");d.initEvent(a,!1,!0),d.param=C.parseData(b||C.getData(c)),e.dispatchEvent(d)},getParam:function(a){return C.getParam(a)},setData:function(a,b){C.setData(a,b)},onSuccess:function(a,b){C.onComplete(a,b,"success")},onFailure:function(a,b){C.onComplete(a,b,"failure")}},C={params:{},chunks:{},calls:{},getSid:function(){return Math.floor(Math.random()*(1<<50))+""+n++},buildParam:function(a){return a&&"object"==typeof a?JSON.stringify(a):a||""},getParam:function(a){return this.params[w+a]||""},setParam:function(a,b){this.params[w+a]=b},parseData:function(a){var b;if(a&&"string"==typeof a)try{b=JSON.parse(a)}catch(c){b={ret:["WV_ERR::PARAM_PARSE_ERROR"]}}else b=a||{};return b},setData:function(){this.chunks[x+sid]=this.chunks[x+sid]||[],this.chunks[x+sid].push(chunk)},getData:function(a){return this.chunks[x+a]?this.chunks[x+a].join(""):""},registerCall:function(a,b,c,d){b&&(this.calls[t+a]=b),c&&(this.calls[u+a]=c),d&&(this.calls[v+a]=d)},unregisterCall:function(a){var b=t+a,c=u+a,d=v+a,e={};return this.calls[b]&&(e.success=this.calls[b],delete this.calls[b]),this.calls[c]&&(e.failure=this.calls[c],delete this.calls[c]),this.calls[d]&&(e.deferred=this.calls[d],delete this.calls[d]),e},useIframe:function(a,b){var c=s+a,d=o.pop();d||(d=e.createElement("iframe"),d.setAttribute("frameborder","0"),d.style.cssText="width:0;height:0;border:0;display:none;"),d.setAttribute("id",c),d.setAttribute("src",b),d.parentNode||setTimeout(function(){e.body.appendChild(d)},5)},retrieveIframe:function(a){var b=s+a,c=e.querySelector("#"+b);o.length>=p?e.body.removeChild(c):o.push(c)},callMethod:function(b,c,d,e){if(d=C.buildParam(d),g)h?a.WindVane_Win_Private.call(b,c,e,d):this.onComplete(e,{ret:"HY_NO_HANDLER_ON_WP"},"failure");else{var f=q+"://"+b+":"+e+"/"+c+"?"+d;if(i)this.setParam(e,d),this.useIframe(e,f);else if(j){var k=r+":";window.prompt(f,k)}else this.onComplete(e,{ret:"HY_NOT_SUPPORT_DEVICE"},"failure")}},registerGC:function(a,b){var c=this,d=Math.max(b||0,y),e=Math.max(b||0,A),f=Math.max(b||0,z);setTimeout(function(){c.unregisterCall(a)},d),i?setTimeout(function(){c.params[w+a]&&delete c.params[w+a]},e):j&&setTimeout(function(){c.chunks[x+a]&&delete c.chunks[x+a]},f)},onComplete:function(a,b,c){clearTimeout(a);var d=this.unregisterCall(a),e=d.success,f=d.failure,g=d.deferred;b=b?b:this.getData(a),b=this.parseData(b);var h=b.ret;"string"==typeof h&&(b=b.value||b,b.ret||(b.ret=[h])),"success"===c?(e&&e(b),g&&g.resolve(b)):"failure"===c&&(f&&f(b),g&&g.reject(b)),i?(this.retrieveIframe(a),this.params[w+a]&&delete this.params[w+a]):j&&this.chunks[x+a]&&delete this.chunks[x+a]}};for(var D in B)l.call(m,D)||(m[D]=B[D])}(window,window.lib||(window.lib={}));;module.exports = window.lib['windvane'];

/***/ },
/* 134 */
/***/ function(module, exports) {

	'use strict'
	
	var pageInfo = {
	
	  setTitle: function (title) {
	    title = title || 'Weex HTML5'
	    try {
	      title = decodeURIComponent(title)
	    } catch (e) {}
	    document.title = title
	    if (lib.env.taobaoApp
	        && lib.env.taobaoApp.appname == 'TB'
	        && lib.windvane) {
	      lib.windvane.call('WebAppInterface'
	                        ,'setCustomPageTitle'
	                        ,{ title: title })
	    }
	  },
	
	  setSpm: function (a, b) {
	    if (a) {
	      var meta = document.querySelector('meta[name="data-spm"]')
	      if (!meta) {
	        meta = document.createElement('meta')
	        meta.setAttribute('name', 'data-spm')
	        document.head.appendChild(meta)
	      }
	      meta.setAttribute('content', a)
	    }
	
	    if (b) {
	      document.body.setAttribute('data-spm', b)
	    }
	  }
	}
	
	pageInfo._meta = {
	  pageInfo: [{
	    name: 'setTitle',
	    args: ['string']
	  }, {
	    name: 'setSpm',
	    args: ['string', 'string']
	  }]
	}
	
	module.exports = pageInfo

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict'
	
	var weex = __webpack_require__(9)
	var extend = weex.utils.extend
	
	// require('envd')
	__webpack_require__(133)
	__webpack_require__(136)
	__webpack_require__(137)
	
	var stream = {
	  /**
	   * sendMtop
	   * @param  {obj}   config
	   *   string api 请求的 API 名称。(optional: apiName)
	   *   string ecode (可选)是否使用 ecode 签名，需要与服务端 API 约定，
	   *     '1' 表示使用，'0' 表示不使用。默认为 '0'。
	   *   string isHttps (可选)是否使用 Https，'1' 表示使用，'0' 表示不
	   *     使用。默认为 '0'。
	   *   string isSec (可选)是否使用 WUA，（是否走黑匣子加签，是底层决定
	   *     的），'1' 表示使用，'0' 表示不使用。默认为 '0'。
	   *   object param (可选)请求的参数，JSON 对象。
	   *   string (post)(可选)是否使用 POST 方式请求，'1' 表示使用，'0' 表
	   *     示不使用。默认为 '0'。
	   *   int timer (可选)发送网络请求的超时时间（毫秒），如果在指定时间内
	   *     网络请求没有回来，则自动走缓存；如果没有缓存，则返回超时错误。-1
	   *     或不传表示不设置超时，总是会等待网络请求。
	   *   string v (可选)API 版本号，默认为 '*'。(optional: apiVersion)
	   *   string sessionOption (可选)如果请求的 API 需要登录，是否拉起登
	   *     录界面。'AutoLoginOnly' 表示只做自动登录，
	   *     'AutoLoginAndManualLogin' 做自动登录，登录失败则拉起登录界面，
	   *     默认为'AutoLoginOnly'（手淘 iOS 5.2.8 或更高，Android 平台
	   *     总是允许拉起登录界面）
	   * @param  {string} callbackId
	   */
	  sendMtop: function (config, callbackId) {
	
	    var reqBody, needLogin
	    var self = this
	
	    if (typeof config === 'string') {
	      try {
	        config = JSON.parse(config)
	      } catch (e) {
	        // console.error('mtop 请求参数错误, 请处理!')
	        return
	      }
	    }
	    if (typeof config !== 'object' || (!config.api && !config.apiName)) {
	      // console.error('mtop 请求参数不全, 请处理!')
	      return
	    }
	
	
	    reqBody = extend({}, config)
	
	    // 整理请求参数
	    reqBody.api = reqBody.api || reqBody.apiName
	    reqBody.v = reqBody.v || reqBody.apiVersion
	    needLogin = typeof reqBody.needLogin === 'boolean'
	              ? reqBody.needLogin
	              : reqBody.sessionOption === 'AutoLoginAndManualLogin'
	    reqBody.data = reqBody.param || reqBody.requestParams
	    reqBody.ecode = reqBody.ecode ? parseInt(reqBody.ecode) : 0
	    delete reqBody.apiName
	    delete reqBody.apiVersion
	    delete reqBody.needLogin
	    delete reqBody.isHttps
	    delete reqBody.post
	    delete reqBody.sessionOption
	    delete reqBody.param
	    delete reqBody.requestParams
	
	    // 在纯H5环境，且有 ecode 时，要加 ua 参数用于安全校验
	    var appname = lib.env.aliapp && lib.env.aliapp.appname
	    var isTBTM = appname === 'TB' || appname === 'TM'
	    if (reqBody.ecode
	        && !isTBTM
	        && global['UA_Opt']
	        && (typeof global.getUA === 'function')
	      ) {
	      reqBody.data.ua = getUA()
	    }
	
	    // 只有在 acds 且 客户端版本达到时(只有 TB&5.4 或 TM&5.10 之后才有 acds 插件)，才会真正的发 acds
	    var aliapp = lib.env.aliapp
	    var appname = aliapp && aliapp.appname
	    var version = aliapp && aliapp.version
	    var realRequestType =
	        reqBody.requestType === 'acds' && aliapp &&
	        ((appname === 'TB' && version.gte('5.4')) ||
	        (appname === 'TM' && version.gte('5.10'))) ?
	        'acds' : 'mtop'
	
	    // 包装回调函数
	    var reqCb = function (resp) {
	      // var m = Object.create(null)
	      // m.errCode = resp.retType
	      // m.errMsg = resp.ret
	      // m.data = resp.data
	
	      // 如果是 acds 因为版本不够降到了h5，则需要 mock acds 的返回，因为 js-framework 根据 不同的请求抹平了差异
	      if (reqBody.requestType === 'acds' && realRequestType === 'mtop') {
	        resp = resp.data
	      }
	
	      // resp = JSON.stringify(resp)
	      self.sender.performCallback(callbackId, resp)
	    }
	
	    // 发送请求
	    if (realRequestType === 'acds') {
	      lib.windvane.call('HCWVPlugin', 'getCategrid', {}, function (ret) {
	        // FIXED: ret.result 是一个 stringify 后的 JSON
	        // 坑：当第一次通过此插件访问 acds 数据时
	        // 在 Android Hybrid 中返回的是 ret: {result: '}
	        // 在 iOS Hybrid 中返回的是 ret: {result: '{}'}
	        ret = JSON.parse(ret.result || '{}')
	        reqCb(ret)
	      }, reqCb)
	    }
	    // 如果需要登录，且在纯 H5 环境，使用 loginRequest
	    else if (needLogin && !aliapp) {
	      lib.mtop.loginRequest(reqBody).then(reqCb, reqCb)
	    }
	    // 在 Hybrid 下，windvane 会判断未登录拉起登录界面，直接发请求即可
	    else {
	      lib.mtop.request(reqBody).then(reqCb, reqCb)
	    }
	  }
	
	}
	
	stream._meta = {
	  stream: [{
	    name: 'sendMtop',
	    args: ['object', 'function']
	  }]
	}
	
	module.exports = stream
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 136 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b,c){function d(a){var b=new RegExp("(?:^|;\\s*)"+a+"\\=([^;]+)(?:;\\s*|$)").exec(v.cookie);return b?b[1]:c}function e(a){return a.preventDefault(),!1}function f(b,c){var d=this,f=a.dpr||1,g=document.createElement("div"),h=document.documentElement.getBoundingClientRect(),i=Math.max(h.width,window.innerWidth)/f,j=Math.max(h.height,window.innerHeight)/f;g.style.cssText=["-webkit-transform:scale("+f+") translateZ(0)","-ms-transform:scale("+f+") translateZ(0)","transform:scale("+f+") translateZ(0)","-webkit-transform-origin:0 0","-ms-transform-origin:0 0","transform-origin:0 0","width:"+i+"px","height:"+j+"px","z-index:999999","position:absolute","left:0","top:0px","background:#FFF","display:none"].join(";");var k=document.createElement("div");k.style.cssText=["width:100%","height:52px","background:#EEE","line-height:52px","text-align:left","box-sizing:border-box","padding-left:20px","position:absolute","left:0","top:0","font-size:16px","font-weight:bold","color:#333"].join(";"),k.innerText=b;var l=document.createElement("a");l.style.cssText=["display:block","position:absolute","right:0","top:0","height:52px","line-height:52px","padding:0 20px","color:#999"].join(";"),l.innerText="关闭";var m=document.createElement("iframe");m.style.cssText=["width:100%","height:100%","border:0","overflow:hidden"].join(";"),k.appendChild(l),g.appendChild(k),g.appendChild(m),v.body.appendChild(g),m.src=c,l.addEventListener("click",function(){d.hide();var a=v.createEvent("HTMLEvents");a.initEvent("close",!1,!1),g.dispatchEvent(a)},!1),this.addEventListener=function(){g.addEventListener.apply(g,arguments)},this.removeEventListener=function(){g.removeEventListener.apply(g,arguments)},this.show=function(){document.addEventListener("touchmove",e,!1),g.style.display="block",window.scrollTo(0,0)},this.hide=function(){document.removeEventListener("touchmove",e),window.scrollTo(0,-h.top),v.body.removeChild(g)}}function g(a){if(!a||"function"!=typeof a||!b.mtop){var d=this.getUserNick();return!!d}b.mtop.request({api:"mtop.user.getUserSimple",v:"1.0",data:{isSec:0},H5Request:!0},function(d){d.retType===b.mtop.RESPONSE_TYPE.SUCCESS?a(!0,d):d.retType===b.mtop.RESPONSE_TYPE.SESSION_EXPIRED?a(!1,d):a(c,d)})}function h(a){var b;return u&&(b={},b.promise=new u(function(a,c){b.resolve=a,b.reject=c})),this.isLogin(function(c,d){a&&a(c,d),c===!0?b&&b.resolve(d):b&&b.reject(d)}),b?b.promise:void 0}function i(a){if(!a||"function"!=typeof a){var b="",e=d("_w_tb_nick"),f=d("_nk_")||d("snk"),g=d("sn");return e&&e.length>0&&"null"!=e?b=decodeURIComponent(e):f&&f.length>0&&"null"!=f?b=unescape(unescape(f).replace(/\\u/g,"%u")):g&&g.length>0&&"null"!=g&&(b=decodeURIComponent(g)),b=b.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")}this.isLogin(function(b,d){a(b===!0&&d&&d.data&&d.data.nick?d.data.nick:b===!1?"":c)})}function j(a){var b;return u&&(b={},b.promise=new u(function(a,c){b.resolve=a,b.reject=c})),this.getUserNick(function(c){a&&a(c),c?b&&b.resolve(c):b&&b.reject()}),b?b.promise:void 0}function k(a,b){var c="//"+G+"."+H.subDomain+"."+E+"/"+H[(a||"login")+"Name"];if(b){var d=[];for(var e in b)d.push(e+"="+encodeURIComponent(b[e]));c+="?"+d.join("&")}return c}function l(a,b){if(b)location.replace(a);else{var c=v.createElement("a"),d=v.createEvent("HTMLEvents");c.style.display="none",c.href=a,v.body.appendChild(c),d.initEvent("click",!1,!0),c.dispatchEvent(d)}}function m(b,c,d){function e(b){j.removeEventListener("close",e),a.removeEventListener("message",g),d("CANCEL")}function g(b){var c=b.data||{};c&&"child"===c.type&&c.content.indexOf("SUCCESS")>-1?(j.removeEventListener("close",e),a.removeEventListener("message",g),j.hide(),d("SUCCESS")):d("FAILURE")}var h=location.protocol+"//h5."+H.subDomain+".taobao.com/"+("waptest"===H.subDomain?"src":"other")+"/"+b+"end.html?origin="+encodeURIComponent(location.protocol+"//"+location.hostname),i=k(b,{ttid:"h5@iframe",tpl_redirect_url:h}),j=new f(c.title||"您需要登录才能继续访问",i);j.addEventListener("close",e,!1),a.addEventListener("message",g,!1),j.show()}function n(b,c,d){var e=k(b,{wvLoginCallback:"wvLoginCallback"});a.wvLoginCallback=function(b){delete a.wvLoginCallback,d(b.indexOf(":SUCCESS")>-1?"SUCCESS":b.indexOf(":CANCEL")>-1?"CANCEL":"FAILURE")},l(e)}function o(a,b,c){if("function"==typeof b?(c=b,b=null):"string"==typeof b&&(b={redirectUrl:b}),b=b||{},c&&A)n(a,b,c);else if(c&&!z&&"login"===a)m(a,b,c);else{var d=k(a,{tpl_redirect_url:b.redirectUrl||location.href});l(d,b.replace)}}function p(a,b,c){var d;return u&&(d={},d.promise=new u(function(a,b){d.resolve=a,d.reject=b})),o(a,b,function(a){c&&c(a),"SUCCESS"===a?d&&d.resolve(a):d&&d.reject(a)}),d?d.promise:void 0}function q(a){o("login",a)}function r(a){return p("login",a)}function s(a){o("logout",a)}function t(a){return p("logout",a)}var u=a.Promise,v=a.document,w=a.navigator.userAgent,x=location.hostname,y=(a.location.search,w.match(/WindVane[\/\s]([\d\.\_]+)/)),z=w.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i),A=!!(z&&"TB"===z[1]&&y&&parseFloat(y[1])>5.2),B=["taobao.net","taobao.com"],C=new RegExp("([^.]*?)\\.?((?:"+B.join(")|(?:").replace(/\./g,"\\.")+"))","i"),D=x.match(C)||[],E=function(){var a=D[2]||"taobao.com";return a.match(/\.?taobao\.net$/)?"taobao.net":"taobao.com"}(),F=function(){var a=E,b=D[1]||"m";return"taobao.net"===a&&(b="waptest"),b}(),G="login";b.login=b.login||{};var H={loginName:"login.htm",logoutName:"logout.htm",subDomain:F};b.login.config=H,b.login.isLogin=g,b.login.isLoginAsync=h,b.login.getUserNick=i,b.login.getUserNickAsync=j,b.login.generateUrl=k,b.login.goLogin=q,b.login.goLoginAsync=r,b.login.goLogout=s,b.login.goLogoutAsync=t}(window,window.lib||(window.lib={}));;module.exports = window.lib.login;

/***/ },
/* 137 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(){var a={},b=new m(function(b,c){a.resolve=b,a.reject=c});return a.promise=b,a}function d(a,b){for(var c in b)void 0===a[c]&&(a[c]=b[c]);return a}function e(a){var b=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]||document.firstElementChild||document;b.appendChild(a)}function f(a){var b=[];for(var c in a)a[c]&&b.push(c+"="+encodeURIComponent(a[c]));return b.join("&")}function g(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}function h(a){var b=new RegExp("(?:^|;\\s*)"+a+"\\=([^;]+)(?:;\\s*|$)").exec(document.cookie);return b?b[1]:void 0}function i(a,b,c){var d=new Date;d.setTime(d.getTime()-864e5);var e="/";doc.cookie=a+"=;path="+e+";domain=."+b+";expires="+d.toGMTString(),doc.cookie=a+"=;path="+e+";domain=."+c+"."+b+";expires="+d.toGMTString()}function j(){var b=a.location.hostname,c=["taobao.net","taobao.com","tmall.com","tmall.hk","etao.com"],d=new RegExp("([^.]*?)\\.?((?:"+c.join(")|(?:").replace(/\./g,"\\.")+"))","i"),e=b.match(d)||[],f=e[2]||"taobao.com",g=e[1]||"m";"taobao.net"!==f||"x"!==g&&"waptest"!==g&&"daily"!==g?"taobao.net"===f&&"demo"===g?g="demo":"waptest"!==g&&"wapa"!==g&&"m"!==g&&(g="m"):g="waptest";var h="etao.com"===f?"apie":"api";r.mainDomain=f,r.subDomain=g,r.prefix=h}function k(){var b=a.navigator.userAgent,c=b.match(/WindVane[\/\s]([\d\.\_]+)/);c&&(r.WindVaneVersion=c[1]);var d=b.match(/AliApp\(([^\/]+)\/([\d\.\_]+)\)/i);d&&(r.AliAppName=d[1],r.AliAppVersion=d[2])}function l(a){this.id=++u,this.params=d(a||{},{v:"*",data:{},type:"get",dataType:"jsonp"}),this.params.type=this.params.type.toLowerCase(),"object"==typeof this.params.data&&(this.params.data=JSON.stringify(this.params.data)),this.middlewares=s.slice(0)}var m=a.Promise;if(!m){var n="当前浏览器不支持Promise，请参考文档（http://gitlab.alibaba-inc.com/mtb/lib-es6polyfill/tree/master）中的解决方案";return b.mtop={ERROR:n},void console.error(n)}var o=m.resolve(),p=a.localStorage;if(p)try{p.setItem("@private","false")}catch(q){p=!1}var r={useAlipayJSBridge:!1},s=[],t={ERROR:-1,SUCCESS:0,TOKEN_EXPIRED:1,SESSION_EXPIRED:2};j(),k();var u=0;l.prototype.use=function(a){if(!a)throw new Error("middleware is undefined");return this.middlewares.push(a),this},l.prototype.__processRequestMethod=function(a){var b=this.params,c=this.options;"get"===b.type&&"jsonp"===b.dataType?c.getJSONP=!0:"get"===b.type&&"json"===b.dataType?c.getJSON=!0:"post"===b.type&&(c.postJSON=!0),a()},l.prototype.__processRequestType=function(a){var c=this,d=this.options;if(r.H5Request===!0&&(d.H5Request=!0),r.WindVaneRequest===!0&&(d.WindVaneRequest=!0),d.H5Request===!1&&d.WindVaneRequest===!0){if(!b.windvane||parseFloat(d.WindVaneVersion)<5.4)throw new Error("WINDVANE_NOT_FOUND::缺少WindVane环境")}else d.H5Request===!0?d.WindVaneRequest=!1:"undefined"==typeof d.WindVaneRequest&&"undefined"==typeof d.H5Request&&(b.windvane&&parseFloat(d.WindVaneVersion)>=5.4?d.WindVaneRequest=!0:d.H5Request=!0);a().then(function(){var a=d.retJson.ret;return a instanceof Array&&(a=a.join(",")),d.WindVaneRequest===!0&&(!a||a.indexOf("HY_FAILED")>-1||a.indexOf("HY_NO_HANDLER")>-1||a.indexOf("HY_CLOSED")>-1||a.indexOf("HY_EXCEPTION")>-1||a.indexOf("HY_NO_PERMISSION")>-1)?(r.H5Request=!0,c.__sequence([c.__processRequestType,c.__processToken,c.__processRequestUrl,c.__processUnitPrefix,c.middlewares,c.__processRequest])):void 0})};var v="_m_h5_tk",w="_m_h5_tk_enc";l.prototype.__getTokenFromAlipay=function(){var b=c(),d=this.options,e=(a.navigator.userAgent,!!location.protocol.match(/^https?\:$/)),f="AP"===d.AliAppName&&parseFloat(d.AliAppVersion)>=8.2;return d.useAlipayJSBridge===!0&&!e&&f&&a.AlipayJSBridge&&a.AlipayJSBridge.call?a.AlipayJSBridge.call("getMtopToken",function(a){a&&a.token&&(d.token=a.token),b.resolve()},function(){b.resolve()}):b.resolve(),b.promise},l.prototype.__getTokenFromCookie=function(){var a=this.options;return a.token=a.token||h(v),a.token&&(a.token=a.token.split("_")[0]),m.resolve()},l.prototype.__processToken=function(a){{var b=this,c=this.options;this.params}return c.token&&delete c.token,c.WindVaneRequest!==!0?o.then(function(){return b.__getTokenFromAlipay()}).then(function(){return b.__getTokenFromCookie()}).then(a).then(function(){var a=c.retJson,d=a.ret;if(d instanceof Array&&(d=d.join(",")),d.indexOf("TOKEN_EMPTY")>-1||d.indexOf("TOKEN_EXOIRED")>-1){if(c.maxRetryTimes=c.maxRetryTimes||5,c.failTimes=c.failTimes||0,c.H5Request&&++c.failTimes<c.maxRetryTimes)return b.__sequence([b.__processToken,b.__processRequestUrl,b.__processUnitPrefix,b.middlewares,b.__processRequest]);maxRetryTimes>0&&(i(v,c.mainDomain,c.subDomain),i(w,c.mainDomain,c.subDomain)),a.retType=t.TOKEN_EXPIRED}}):void a()},l.prototype.__processRequestUrl=function(a){var b=this.params,c=this.options;if(c.H5Request===!0){var d="//"+(c.prefix?c.prefix+".":"")+(c.subDomain?c.subDomain+".":"")+c.mainDomain+"/h5/"+b.api.toLowerCase()+"/"+b.v.toLowerCase()+"/",e=b.appKey||("waptest"===c.subDomain?"4272":"12574478"),f=(new Date).getTime(),h=g(c.token+"&"+f+"&"+e+"&"+b.data),i={appKey:e,t:f,sign:h},j={data:b.data,ua:b.ua};Object.keys(b).forEach(function(a){"undefined"==typeof i[a]&&"undefined"==typeof j[a]&&(i[a]=b[a])}),c.getJSONP?i.type="jsonp":(c.getJSON||c.postJSON)&&(i.type="originaljson"),c.querystring=i,c.postdata=j,c.path=d}a()},l.prototype.__processUnitPrefix=function(b){var c=this.params,d=this.options;if(p&&d.H5Request===!0){var f=c.api,g=!1,i=h("_m_user_unitinfo_"),j=p.getItem("unitinfo");i&&i.split("|")[0].indexOf("center")<0&&j&&j.indexOf(f.toLowerCase())>=0&&(g=i.split("|")[1]),g&&d.path&&(d.path=d.path.replace(/^\/\//,"//"+g+".")),b().then(function(){if(p){var b=h("_m_unitapi_v_"),c=p.getItem("unitinfo");if(b){var f=c?JSON.parse(c):{};if(!c||b!==f.version){var g=!1,i="//h5."+d.subDomain+".taobao.com/js/mtop/unit/"+b+"/unitApi.js",j=document.createElement("script");j.src=i;var k=function(){g||(g=!0,j.onload=j.onerror=null,j.parentNode&&j.parentNode.removeChild(j))};j.onerror=function(){k()},a.jsonp_unitapi||(a.jsonp_unitapi=function(a){k(),p.setItem("unitinfo",JSON.stringify(a))}),e(j)}}}})}else b()};var x=0;l.prototype.__requestJSONP=function(a){function b(a){if(k&&clearTimeout(k),l.parentNode&&l.parentNode.removeChild(l),"TIMEOUT"===a)window[j]=function(){window[j]=void 0;try{delete window[j]}catch(a){}};else{window[j]=void 0;try{delete window[j]}catch(b){}}}var d=c(),g=this.params,h=this.options,i=g.timeout||2e4,j="mtopjsonp"+ ++x,k=setTimeout(function(){b("TIMEOUT"),a("TIMEOUT::接口超时")},i);h.querystring.callback=j;var l=document.createElement("script");return l.src=h.path+"?"+f(h.querystring)+"&"+f(h.postdata),l.async=!0,l.onerror=function(){b("ABORT"),a("ABORT::接口异常退出")},window[j]=function(){h.results=Array.prototype.slice.call(arguments),b(),d.resolve()},e(l),d.promise},l.prototype.__requestJSON=function(b){function d(a){k&&clearTimeout(k),"TIMEOUT"===a&&i.abort()}var e=c(),g=this.params,h=this.options,i=new a.XMLHttpRequest,j=g.timeout||2e4,k=setTimeout(function(){d("TIMEOUT"),b("TIMEOUT::接口超时")},j);i.onreadystatechange=function(){if(4==i.readyState){var a,c,f=i.status;if(f>=200&&300>f||304==f){d(),a=i.responseText,c=i.getAllResponseHeaders()||"";try{a=/^\s*$/.test(a)?{}:JSON.parse(a),a.responseHeaders=c,h.results=[a],e.resolve()}catch(g){b("PARSE_JSON_ERROR::解析JSON失败")}}else d("ABORT"),b("ABORT::接口异常退出")}};var l,m,n=h.path+"?"+f(h.querystring);if(h.getJSON?(l="GET",n+="&"+f(h.postdata)):h.postJSON&&(l="POST",m=f(h.postdata)),i.open(l,n,!0),i.withCredentials=!0,i.setRequestHeader("Accept","application/json"),i.setRequestHeader("Content-type","application/x-www-form-urlencoded"),g.headers)for(var o in g.headers)i.setRequestHeader(o,g.headers[o]);return i.send(m),e.promise},l.prototype.__requestWindVane=function(a){function d(a){j.results=[a],h.resolve()}var e,f,g,h=c(),i=this.params,j=this.options,k=i.data,l=i.api,m=i.v,n=j.postJSON?1:0,o=j.getJSON||j.postJSON?"orginaljson":"",p="https"===location.protocol?1:0,q=i.isSec||0,r=i.sessionOption||"AutoLoginOnly";if("undefined"==typeof i.ecode)throw new Error("UNEXCEPT_PARAM_ECODE::缺少ecode参数");return e=parseInt(i.ecode),g="undefined"!=typeof i.timer?parseInt(i.timer):"undefined"!=typeof i.timeout?parseInt(i.timeout):2e4,f=2*g,b.windvane.call("MtopWVPlugin","send",{api:l,v:m,post:String(n),type:o,isHttps:String(p),ecode:String(e),isSec:String(q),param:JSON.parse(k),timer:g,sessionOption:r},d,d,f),h.promise},l.prototype.__processRequest=function(a,b){var c=this;return o.then(function(){var a=c.options;if(a.H5Request&&a.getJSONP)return c.__requestJSONP(b);if(a.H5Request&&(a.getJSON||a.postJSON))return c.__requestJSON(b);if(a.WindVaneRequest)return c.__requestWindVane(b);throw new Error("UNEXCEPT_REQUEST::错误的请求类型")}).then(a).then(function(){var a=c.options,b=(c.params,a.results[0]),d=b&&b.ret||[];b.ret=d,d instanceof Array&&(d=d.join(",")),d.indexOf("SUCCESS")>-1?b.retType=t.SUCCESS:b.retType=t.ERROR,a.retJson=b})},l.prototype.__sequence=function(a){function b(a){if(a instanceof Array)a.forEach(b);else{var g,h=c(),i=c();e.push(function(){return h=c(),g=a.call(d,function(a){return h.resolve(a),i.promise},function(a){return h.reject(a),i.promise}),g&&(g=g["catch"](function(a){h.reject(a)})),h.promise}),f.push(function(a){return i.resolve(a),g})}}var d=this,e=[],f=[];a.forEach(b);for(var g,h=o;g=e.shift();)h=h.then(g);for(;g=f.pop();)h=h.then(g);return h};var y=function(a){a()},z=function(a){a()};l.prototype.request=function(a){var b=this;this.options=d(a||{},r);var c=m.resolve([y,z]).then(function(a){var c=a[0],d=a[1];return b.__sequence([c,b.__processRequestMethod,b.__processRequestType,b.__processToken,b.__processRequestUrl,b.__processUnitPrefix,b.middlewares,b.__processRequest,d])}).then(function(){var a=b.options.retJson;return a.retType!==t.SUCCESS?m.reject(a):b.options.successCallback?void b.options.successCallback(a):m.resolve(a)})["catch"](function(a){var c;return a instanceof Error?(console.error(a.stack),c={ret:[a.message],stack:[a.stack],retJson:t.ERROR}):c="string"==typeof a?{ret:[a],retJson:t.ERROR}:void 0!==a?a:b.options.retJson,b.options.failureCallback?void b.options.failureCallback(c):m.reject(c)});return y=function(a){c.then(a)["catch"](a)},c},b.mtop=function(a){return new l(a)},b.mtop.request=function(a,b,c){var d={H5Request:a.H5Request,WindVaneRequest:a.WindVaneRequest,LoginRequest:a.LoginRequest,AntiCreep:a.AntiCreep,AntiFlood:a.AntiFlood,successCallback:b,failureCallback:c||b};return new l(a).request(d)},b.mtop.H5Request=function(a,b,c){var d={H5Request:!0,successCallback:b,failureCallback:c||b};return new l(a).request(d)},b.mtop.middlewares=s,b.mtop.config=r,b.mtop.RESPONSE_TYPE=t,b.mtop.CLASS=l}(window,window.lib||(window.lib={})),function(a,b){function c(a){return a.preventDefault(),!1}function d(b,d){var e=this,f=a.dpr||1,g=document.createElement("div"),h=document.documentElement.getBoundingClientRect(),i=Math.max(h.width,window.innerWidth)/f,j=Math.max(h.height,window.innerHeight)/f;g.style.cssText=["-webkit-transform:scale("+f+") translateZ(0)","-ms-transform:scale("+f+") translateZ(0)","transform:scale("+f+") translateZ(0)","-webkit-transform-origin:0 0","-ms-transform-origin:0 0","transform-origin:0 0","width:"+i+"px","height:"+j+"px","z-index:999999","position:absolute","left:0","top:0px","background:#FFF","display:none"].join(";");var k=document.createElement("div");k.style.cssText=["width:100%","height:52px","background:#EEE","line-height:52px","text-align:left","box-sizing:border-box","padding-left:20px","position:absolute","left:0","top:0","font-size:16px","font-weight:bold","color:#333"].join(";"),k.innerText=b;var l=document.createElement("a");l.style.cssText=["display:block","position:absolute","right:0","top:0","height:52px","line-height:52px","padding:0 20px","color:#999"].join(";"),l.innerText="关闭";var m=document.createElement("iframe");m.style.cssText=["width:100%","height:100%","border:0","overflow:hidden"].join(";"),k.appendChild(l),g.appendChild(k),g.appendChild(m),document.body.appendChild(g),m.src=d,l.addEventListener("click",function(){e.hide();var a=document.createEvent("HTMLEvents");a.initEvent("close",!1,!1),g.dispatchEvent(a)},!1),this.addEventListener=function(){g.addEventListener.apply(g,arguments)},this.removeEventListener=function(){g.removeEventListener.apply(g,arguments)},this.show=function(){document.addEventListener("touchmove",c,!1),g.style.display="block",window.scrollTo(0,0)},this.hide=function(){document.removeEventListener("touchmove",c),window.scrollTo(0,-h.top),g.parentNode&&g.parentNode.removeChild(g)}}function e(a){{var c=this,d=this.options;this.params}return a().then(function(){var a=d.retJson,e=a.ret;if(e instanceof Array&&(e=e.join(",")),(e.indexOf("SESSION_EXPIRED")>-1||e.indexOf("SID_INVALID")>-1||e.indexOf("AUTH_REJECT")>-1||e.indexOf("NEED_LOGIN")>-1)&&(a.retType=k.SESSION_EXPIRED,!d.WindVaneRequest&&(j.LoginRequest===!0||d.LoginRequest===!0))){if(!b.login)throw new Error("LOGIN_NOT_FOUND::缺少lib.login");return b.login.goLoginAsync().then(function(a){return c.__sequence([c.__processToken,c.__processRequestUrl,c.__processUnitPrefix,c.middlewares,c.__processRequest])})["catch"](function(a){throw new Error("CANCEL"===a?"LOGIN_CANCEL::用户取消登录":"LOGIN_FAILURE::用户登录失败")})}})}function f(a){{var b=this.options;this.params}return b.AliAppName||b.AliAppVersion||j.AntiFlood!==!0&&b.AntiFlood!==!0?void a():a().then(function(){var a=b.retJson,c=a.ret;c instanceof Array&&(c=c.join(",")),c.indexOf("FAIL_SYS_USER_VALIDATE")>-1&&a.data.url&&(location.href=a.data.url)})}function g(b){var c=this,e=this.options,f=this.params;return e.AliAppName||e.AliAppVersion||j.AntiCreep!==!0&&e.AntiCreep!==!0?void b():b().then(function(){var b=e.retJson,g=b.ret;return g instanceof Array&&(g=g.join(",")),g.indexOf("RGV587_ERROR::SM")>-1&&b.data.url?new h(function(e,g){function h(){k.removeEventListener("close",h),a.removeEventListener("message",i),g("USER_INPUT_CANCEL::用户取消输入")}function i(b){k.removeEventListener("close",h),a.removeEventListener("message",i),k.hide();var d;try{d=JSON.parse(b.data)||{}}catch(j){}if(d&&"child"===d.type){var l;try{l=JSON.parse(decodeURIComponent(d.content)),"string"==typeof l&&(l=JSON.parse(l));for(var m in l)f[m]=l[m];c.__sequence([c.__processToken,c.__processRequestUrl,c.__processUnitPrefix,c.middlewares,c.__processRequest]).then(e)}catch(j){g("USER_INPUT_FAILURE::用户输入失败")}}else e()}var j=b.data.url,k=new d("",j);k.addEventListener("close",i,!1),a.addEventListener("message",i,!1),k.show()}):void 0})}var h=a.Promise,i=b.mtop.CLASS,j=b.mtop.config,k=b.mtop.RESPONSE_TYPE;b.mtop.middlewares.push(e),b.mtop.loginRequest=function(a,b,c){var d={LoginRequest:!0,H5Request:!0,successCallback:b,failureCallback:c||b};return new i(a).request(d)},b.mtop.antiFloodRequest=function(a,b,c){var d={AntiFlood:!0,successCallback:b,failureCallback:c||b};return new i(a).request(d)},b.mtop.middlewares.push(f),b.mtop.antiCreepRequest=function(a,b,c){var d={AntiCreep:!0,successCallback:b,failureCallback:c||b};return new i(a).request(d)},b.mtop.middlewares.push(g)}(window,window.lib||(window.lib={}));;module.exports = window.lib.mtop;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	// require('envd')
	__webpack_require__(133)
	__webpack_require__(136)
	__webpack_require__(137)
	
	var user = {
	  /**
	   * get current user info.
	   *   response format: {'isLogin':'true','userId':'userid','nick':'jb'｝
	   * @param  {string} calllbackId
	   */
	  getUserInfo: function (callbackId) {
	    var self = this
	    var performCb = function (isLogin, info) {
	      self.sender.performCallback(callbackId, {
	        isLogin: isLogin + '',
	        userId: info.userNumId,
	        nick: info.nick
	      })
	    }
	    lib.login.isLoginAsync(function (res, info) {
	      var data = info ? info.data || {} : {}
	      if (res) {
	        performCb(true, data)
	      } else {
	        performCb(false, data)
	      }
	    })
	
	  },
	
	  /**
	   * callback返回参数：status：string；info：jsonMap
	   * 参数值：登录状态Success、failure 用户信息｛'userid':'userId','nick':'jb'｝
	   * @param  {string} callback
	   */
	  login: function (callbackId) {
	    var self = this
	    lib.login.goLoginAsync().then(function (status) {
	      var performCb = function (status, info) {
	        self.sender.performCallback(callbackId, {
	          status: status,
	          info: info
	        })
	      }
	      if ((status + '').match(/success/i)) {
	        lib.login.isLoginAsync(function (res, info) {
	          var data = info ? info.data || {} : info
	          if (res) {
	            performCb('success', { userid: data.userNumId, nick: data.nick })
	          } else {
	            performCb('failure')
	          }
	        })
	      } else {
	        performCb('failure')
	      }
	    }).catch(function (err) {
	      console && console.error(err)
	    })
	  },
	
	  /**
	   * logout (response: { status：string })
	   * 参数值success、failure
	   */
	  logout: function (callbackId) {
	    var self = this
	    lib.login.goLogoutAsync(function (status) {
	      if ((status + '').match(/success/i)) {
	        status = 'success'
	      } else {
	        status = 'failure'
	      }
	      self.sender.performCallback(callbackId, {
	        status: status
	      })
	    })
	  }
	
	}
	
	user._meta = {
	  user: [{
	    name: 'getUserInfo',
	    args: ['function']
	  }, {
	    name: 'login',
	    args: ['function']
	  }, {
	    name: 'logout',
	    args: ['function']
	  }]
	}
	
	module.exports = user

/***/ },
/* 139 */
/***/ function(module, exports) {

	'use strict'
	
	// ref: 'http://gitlab.alibaba-inc.com/aplus/aplus_technical_manual'
	// + '/raw/master/_book/aplus/cdn.html'
	var userTrack = {
	  /**
	   * commit 埋点
	   * @param  {string} type 埋点类型: enter, click, expose, updateNextProp
	   * @param  {string} name 页面名称
	   * @param  {string} ctrlName 控件名称: 以ut定义的类型为标准 Button Text Image
	   * @param  {obj} param 页面参数(监控平台显示)
	   */
	  commit: function (type, pageName, ctrlName, param) {
	    // 处理 params
	    var gokey = ''
	    if (Object.prototype.toString.call(param).slice(8, -1) === 'Object') {
	      gokey = Object.keys(param).reduce(function (result, item, index, array) {
	        var key = item
	        var value = result.param[item]
	        result.result.push(key + '=' + encodeURIComponent(value))
	
	        return result
	      }, { param: param, result: [] })
	      gokey = gokey.result.join('&')
	    }
	
	    // 有可能页面没有 goldlog 方法，需要 try
	    try {
	      // enter 2001
	      if (type === 'enter') {
	        // 如果是 2001 事件，需要判断是否有 waiting 标识，如果没有的话 spm.js 已经发出了 2001，不应该再发
	        var meta = document.querySelector('meta[name="aplus-waiting"]')
	        if (meta) {
	          goldlog.launch(params)
	        }
	      }
	      // 点击埋点
	      // else if (type === 'click') {
	      //  // TODO
	      //  //goldlog.record(appname, "", gokey, "")
	      // }
	      // // 曝光埋点
	      // else if (type === 'expose') {
	      //  // TODO
	      //  //goldlog.record(appname, "", gokey, "")
	      // }
	    }
	    catch (err) {
	    }
	  }
	}
	
	userTrack._meta = {
	  userTrack: [{
	    name: 'commit',
	    args: ['string', 'string', 'string', 'object']
	  }]
	}
	
	module.exports = userTrack

/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict'
	
	var windvane = {
	
	  /**
	   * @param  {obj} config
	   *         class
	   *         method
	   *         data
	   * @param  {[type]} callbackId [description]
	   * @return {[type]}            [description]
	   */
	  call: function (config, callbackId) {
	
	    var self = this
	
	    var cb = function (resp) {
	
	      self.sender.performCallback(callbackId, resp)
	
	    }
	
	    if (lib.windvane) {
	
	      lib.windvane.call(config.class, config.method, config.data)
	        .then(function (res) {
	          cb(res)
	        }, function (err) {
	          console.log('windvane call error: ', err)
	          cb(err)
	        })
	
	    } else {
	      console.error('lib.windvane not found.')
	    }
	  }
	}
	
	windvane._meta = {
	  windvane: [{
	    name: 'call',
	    args: ['object', 'function']
	  }]
	}
	
	module.exports = windvane


/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var Image = __webpack_require__(142)
	var Slider = __webpack_require__(149)
	
	var components = {
	  init: function (Weex) {
	    Weex.registerComponent('image', Image)
	    Weex.registerComponent('slider', Slider)
	  }
	}
	
	module.exports = components

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var weex = __webpack_require__(9)
	var Component = weex.Component
	var LazyLoad = __webpack_require__(143)
	
	__webpack_require__(147)
	
	var DEFAULT_SIZE = 200
	var RESIZE_MODES = ['stretch', 'cover', 'contain']
	var DEFAULT_RESIZE_MODE = 'stretch'
	
	var QUALITIES = {
	  low: [
	    {
	      name: 'data-q-normal',
	      value: 'q50'
	    }, {
	      name: 'data-q-weak',
	      value: 'q50'
	    }
	  ],
	  normal: [
	    {
	      name: 'data-q-normal',
	      value: 'q75'
	    }, {
	      name: 'data-q-weak',
	      value: 'q50'
	    }
	  ],
	  high: [
	    {
	      name: 'data-q-normal',
	      value: 'q90'
	    }, {
	      name: 'data-q-weak',
	      value: 'q75'
	    }
	  ],
	  original: [
	    {
	      name: 'data-q-normal',
	      value: 'original'
	    }, {
	      name: 'data-q-weak',
	      value: 'original'
	    }
	  ]
	}
	var SHAPREN = {
	  sharpen: 's150',
	  unsharpen: 'original'
	}
	
	/**
	 * resize=cover|contain|stretch default:stretch
	 * src=url
	 * quality=normal(q75)|low(q50)|high(q90)|origin default:low
	 * sharpen=unsharpen|sharpen(s150) default:unsharpen
	 */
	function Image (data) {
	  var quality, sharpen, origin
	  var attr = data.attr
	  if (attr) {
	    quality = attr.quality || attr.imageQuality
	    sharpen = attr.sharpen || attr.imageSharpen
	    origin = attr.origin || attr.dataOrigin
	  }
	  this.quality = QUALITIES[quality]
	  this.sharpen = SHAPREN[sharpen]
	  this.origin = origin && origin !== 'false' ? true : false
	  Component.call(this, data)
	}
	
	Image.prototype = Object.create(Component.prototype)
	
	Image.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('weex-img')
	  // if 'quality'/'sharpen' is not specified it will
	  // use default config of lib.img which is set in lazyload.js
	  if (this.quality) {
	    for (var i = 0, l = this.quality.length; i < l; i++) {
	      var attr = this.quality[i]
	      node.setAttribute(attr.name, attr.value)
	    }
	  }
	  if (this.sharpen) {
	    node.setAttribute('data-sharpen', this.sharpen)
	  }
	  node.setAttribute('data-original', this.origin ? 'true' : 'false')
	  return node
	}
	
	Image.prototype.style = weex.utils.extend(
	    Object.create(Component.prototype.style), {
	  width: function (val) {
	    val = parseFloat(val) * this.data.scale
	    if (val < 0 || val !== val) {
	      val = DEFAULT_SIZE
	    }
	    this.node.style.width = val + 'px'
	    var _dpr = window.devicePixelRatio
	    if (window.dpr === 1 && _dpr !== 1) {
	      val = val * _dpr
	    }
	    this.node.setAttribute('data-width', val)
	  },
	
	  height: function (val) {
	    val = parseFloat(val) * this.data.scale
	    if (val < 0 || val !== val) {
	      val = DEFAULT_SIZE
	    }
	    this.node.style.height = val + 'px'
	    var _dpr = window.devicePixelRatio
	    if (window.dpr === 1 && _dpr !== 1) {
	      val = val * _dpr
	    }
	    this.node.setAttribute('data-height', val)
	  }
	})
	
	Image.prototype.attr = {
	  src: function (val) {
	    if (!this.src) {
	      this.src = lib.img.defaultSrc
	      this.node.style.backgroundImage = 'url(' + this.src + ')'
	    }
	    LazyLoad.makeImageLazy(this.node, val)
	  },
	
	  resize: function (val) {
	    if (RESIZE_MODES.indexOf(val) === -1) {
	      val = 'stretch'
	    }
	    this.node.style.backgroundSize = val === 'stretch'
	                                    ? '100% 100%'
	                                    : val
	  }
	}
	
	Image.prototype.clearAttr = function () {
	  this.src = ''
	  this.node.style.backgroundImage = ''
	}
	
	Image.prototype.appendChild = function (data) {
	  // do nothing
	  return
	}
	
	Image.prototype.insertBefore = function (child, before) {
	  // do nothing
	  return
	}
	
	Image.prototype.removeChild = function (child) {
	  // do nothing
	  return
	}
	
	module.exports = Image
	


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	__webpack_require__(144)
	
	var DEFAULT_DESIGN_WIDTH = 750
	
	var lazyloadTimer
	var isConfigSetup = false
	
	var LazyLoad = {
	
	  makeImageLazy: function (image, src) {
	
	    image.removeAttribute('img-src')
	    image.removeAttribute('i-lazy-src')
	    image.style.backgroundImage = ''
	    image.setAttribute('img-src', src)
	    // should replace 'src' with 'img-src'. but for now lib.img.fire is
	    // not working for the situation that the appear event has been
	    // already triggered.
	    this.fire()
	  },
	
	  // TODO: make it a decent impl
	  // because we don't know when all image are appended
	  // just use setTimeout to do delay lazyload
	  //
	  // -- actually everytime we add a element or update styles,
	  // the component manager will call startIfNeed to fire
	  // lazyload once again in the handleAppend function. so there
	  // is no way that any image element can miss it. See source
	  // code in componentMangager.js.
	  startIfNeeded: function (component) {
	    if (component.data.type === 'image') {
	      if (!lazyloadTimer) {
	        lazyloadTimer = setTimeout(function () {
	          lib.img.fire()
	          clearTimeout(lazyloadTimer)
	          lazyloadTimer = null
	        }, 16)
	      }
	    }
	  },
	
	  loadIfNeeded: function (elementScope) {
	    var notPreProcessed = elementScope.querySelectorAll('[img-src]')
	    // image elements which have attribute 'i-lazy-src' were elements
	    // that had been preprocessed by lib-img-core, but not loaded yet, and
	    // must be loaded when 'appear' events were fired. It turns out the
	    // 'appear' event was not fired correctly in the css-translate-transition
	    // situation, so 'i-lazy-src' must be checked and lazyload must be
	    // fired manually.
	    var preProcessed = elementScope.querySelectorAll('[i-lazy-src]')
	    if (notPreProcessed.length > 0 || preProcessed.length > 0) {
	      lib.img.fire()
	    }
	  },
	
	  // fire lazyload.
	  fire: function () {
	    if (!isConfigSetup) {
	      lib.img.setConfig({
	        baseDpr: ({ 750: 2, 1125: 3 })[DEFAULT_DESIGN_WIDTH] || 1,
	        autoSize: true,
	        defaultAttr: {
	          qNormal: 'q90',
	          qWeak: 'q60'
	        }
	      })
	      isConfigSetup = true
	    }
	    lib.img.fire()
	  }
	
	}
	
	module.exports = LazyLoad


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(25)
	__webpack_require__(145)
	
	; (function (win, lib) {
	
	  var adapter = {}
	  var appearInstance
	  var runtimeFlags = {}
	
	  var config = {
	    defaultAttr: {
	      qNormal: 'q50', // 强网质量
	      qWeak: 'q30', // 弱网质量
	      sharpen: 's150', // 锐化参数
	      lazy: true, // 懒加载开关
	      width: 400, // 宽度
	      height: 400, // 高度
	      type: 'square', // 裁剪类型
	      original: false // 仅仅收敛CDN域名, 不添加任何质量控制后缀
	    },
	    // 启用自动尺寸: 若未通过元素attibute指定大小, 则获取坑位大小;
	    // 禁用自动尺寸: 若未通过元素attibute指定大小, 则采用defaultAttr中指定的大小;
	    autoSize: true,
	    dataSrc: 'img-src', // 指定图片地址的attribute名, 兼做lazy-class的作用
	    lazyHeight: 0, // 以此高度提前触发懒加载
	    lazyWidth: 0, // 以此宽度提前触发懒加载
	    baseDpr: 2, // 指定尺寸的基础dpr
	    ignoreGif: true, // 是否忽略gif图，默认区分并且不做任何处理
	    ignorePng: false, // 是否忽略png图片
	    filterDomains: [
	      'a.tbcdn.cn',
	      'assets.alicdn.com',
	      'wwc.taobaocdn.com',
	      'wwc.alicdn.com'
	    ] // 自定义过滤的域名命令，适用于不能收敛的域名url
	  }
	
	
	  function extendStrict(main, sub) {
	    var ret = {}
	    for (var k in main) {
	      if (main.hasOwnProperty(k)) {
	        ret[k] = sub.hasOwnProperty(k) ? sub[k] : main[k]
	      }
	    }
	    return ret
	  }
	
	  function extendSimple(main, sub) {
	    for (var k in sub) {
	      if (sub.hasOwnProperty(k)) {
	        main[k] = sub[k]
	      }
	    }
	    return main
	  }
	
	
	  function detectNetwork() {
	    if (!(navigator.userAgent.match(/WindVane/i) && win.WindVane)) {
	      return
	    }
	    WindVane.call('WVNetwork', 'getNetworkType', {}, function (info) {
	      if (info && info.type) {
	        runtimeFlags.isWiFi = (info.type.toLowerCase() == 'wifi')
	      }
	    }, function () {})
	  }
	
	  function detectLibs() {
	    if (!win.lib || !win.lib.flexible) {
	      console.warn('lib-img: 未检测到 lib-flexible, autoSize 特性可能不能正常工作')
	    } else {
	      runtimeFlags.flexibleSupport = true
	    }
	  }
	
	  function detectWebp() {
	    try {
	      var webP = new Image()
	      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdAS'
	       + 'oCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	      webP.onload = function () {
	        if (webP.height === 2) {
	          runtimeFlags.webpSupport = true
	        }
	      }
	    } catch (e) {
	
	    }
	  }
	
	  function calcAutoSize(item) {
	    var height = item.offsetHeight
	    var width = item.offsetWidth
	
	    if (runtimeFlags.flexibleSupport && win.lib.flexible.dpr == 1) {
	      height = height * win.devicePixelRatio
	      width = width * win.devicePixelRatio
	    }
	    return {
	      width: Math.round(width),
	      height: Math.round(height)
	    }
	  }
	
	  function applySrc(item, processedSrc) {
	    if (!processedSrc) {
	      return
	    }
	    if (item.nodeName.toUpperCase() == 'IMG') {
	      item.setAttribute('src', processedSrc)
	    } else {
	      item.style.backgroundImage = 'url("' + processedSrc + '")'
	    }
	  }
	
	
	  function processSrc(item, originalSrc) {
	    if (!originalSrc) {
	      return
	    }
	    var param = extendStrict(config.defaultAttr, item.dataset)
	    if (typeof param.original != 'boolean') {
	      param.original = (param.original == 'true')
	    }
	    if (config.autoSize && !param.original
	        && !(item.dataset.width && item.dataset.height)) {
	      extendSimple(param, calcAutoSize(item))
	    } else {
	      param.height = Math.round(parseInt(param.height, 10)
	        * window.devicePixelRatio / config.baseDpr)
	      param.width = Math.round(parseInt(param.width, 10)
	        * window.devicePixelRatio / config.baseDpr)
	    }
	
	    if (typeof runtimeFlags.isWiFi === 'undefined') {
	      param.q = param.qNormal
	    } else {
	      param.q = runtimeFlags.isWiFi ? param.qNormal : param.qWeak
	    }
	    param.webpSupport = runtimeFlags.webpSupport ? true : false
	    param.ignoreGif = config.ignoreGif
	    param.ignorePng = config.ignorePng
	    param.filterDomains = config.filterDomains
	
	    return lib.imgcore.getNewUrl(originalSrc, param)
	  }
	
	
	
	  function init() {
	    appearInstance = lib.appear.init({
	      cls: 'imgtmp', // 可选，需要遍历的元素
	      once: true, // 可选，是否只触发一次
	      x: config.lazyWidth, // 可选，容器右边距离x以内的元素加载，默认为0
	      y: config.lazyHeight, // 可选，容器底部距离y以内的元素加载，默认为0
	      onAppear: function (evt) {
	        var item = this
	        applySrc(item, processSrc(item, item.getAttribute('i-lazy-src')))
	        item.removeAttribute('i-lazy-src')
	      }
	    })
	    if (runtimeFlags.isWiFi
	        && navigator.userAgent.match(/(iPhone|iPad|iPod)/)) {
	      config.defaultAttr.lazy = false
	    }
	  }
	
	
	  adapter.logConfig = function () {
	    console.log('lib-img Config\n',
	      config,
	      '\nlib-img Runtime\n',
	      runtimeFlags)
	  }
	
	  adapter.setConfig = function (newCfg) {
	    if (newCfg.defaultAttr) {
	      newCfg.defaultAttr = extendStrict(config.defaultAttr, newCfg.defaultAttr)
	    }
	    if (newCfg.filterDomains) {
	      newCfg.filterDomains = newCfg.filterDomains.concat(config.filterDomains)
	    }
	    config = extendStrict(config, newCfg)
	  }
	
	  adapter.fire = function () {
	
	    if (!appearInstance) {
	      init()
	    }
	
	    var label = 'i_' + Date.now() % 100000
	    var domList = document.querySelectorAll('[' + config.dataSrc + ']')
	
	    ; [].forEach.call(domList, function (item) {
	      if (item.dataset.lazy == 'false'
	        || !config.defaultAttr.lazy
	        && item.dataset.lazy != 'true') {
	        applySrc(item, processSrc(item, item.getAttribute(config.dataSrc)))
	      } else {
	        item.classList.add(label)
	        item.setAttribute('i-lazy-src', item.getAttribute(config.dataSrc))
	      }
	      item.removeAttribute(config.dataSrc)
	    })
	
	    appearInstance.bind('.' + label)
	    appearInstance.fire()
	  }
	
	  adapter.defaultSrc = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAA'
	    + 'ABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=='
	
	  lib.img = adapter
	  exports.module = lib.img
	  detectWebp()
	  document.addEventListener('DOMContentLoaded', function () {
	    detectNetwork()
	    detectLibs()
	  })
	
	})(window, window['lib'] || (window['lib'] = {}))


/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	"undefined"==typeof window&&(window={ctrl:{},lib:{}}),!window.ctrl&&(window.ctrl={}),!window.lib&&(window.lib={}),__webpack_require__(146),function(){function t(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i]);return t}function e(t){var e,i=t.width,r=t.height,a=t.type,n=t.dpr||2;a=a||o;var s=d.square;if(!(i+"").match(/^\d+$/)||!(r+"").match(/^\d+$/))throw new Error("height or width is not number");switch(e=a==c?r:i>=r?i:r,a){case h:s=d.widths;break;case c:s=d.heights;break;case p:s=d.xzs}var l=s[s.length-1],w=s[0],f=0,u=g.baseDpr;if(e=parseInt(n*e/u),e>=l)return l;if(w>=e)return w;for(var m=s.length;m>=0;m--)if(s[m]<=e){s[m]==e?f=e:m<s.length-1&&(f=s[m+1]);break}return f}function i(t){var i="",r="",a=g.q,n=g.sharpen,d=(g.defaultSize,o),s=t.width||g.width,l=t.height||g.height;switch(t&&t.type&&t.type.match(new RegExp("^("+[o,h,c,p].join("|")+")$"))&&(d=t.type),i=e({width:s,height:l,type:d}),d){case o:i=i+"x"+i;break;case h:i+="x10000";break;case c:i="10000x"+i;break;case p:i=i+"x"+i+"xz"}return r="_"+i,"original"===a&&(a=""),"original"===n&&(n=""),r+=a+n+".jpg"}function r(r,o){var o=o||{};if(t(g,o),!r||"string"!=typeof r)return"";g.defaultSize=g.defaultSize||e({height:o.height,width:o.width,dpr:o.dpr});var h=g.defaultSize+"x"+g.defaultSize,c=g.q,p="_"+h+c+g.sharpen+".jpg";try{var s=new lib.httpurl(r)}catch(l){return console.log("[error]wrong img url:",r),r}var w=s.host,f=s.pathname;if(s.protocol="",d.filterDomains=d.filterDomains.concat(g.filterDomains),-1!=d.filterDomains.indexOf(w))return/alicdn/.test(w)||(s.protocol="http:"),s.toString();var u=w.match(/(.+\.(?:alicdn|taobaocdn|taobao|mmcdn)\.com)/);if(u&&u[0]!=a&&(s.host=a),o&&o.original)return s.toString();var m=f.match(n),b=f.match(/-(\d+)-(\d+)\.(?:jpg|png|gif)/);if(b){var x,v;x=parseInt(b[1])<parseInt(g.defaultSize)?g.defaultSize:b[1]>760?760:b[1],v=e({height:x,width:x,dpr:o.dpr}),p="_"+v+"x"+v+c+g.sharpen+".jpg"}return o&&"string"==typeof o?p=i({size:o}):o&&"object"==typeof o&&Object.keys(o).length>0&&(p=i(o)),/\.png/.test(f)&&(p=p.replace(/(q\d+)(s\d+)/,"")),/\.gif/.test(f)&&o.ignoreGif?s.toString():/\.png/.test(f)&&o.ignorePng?s.toString():(o.webpSupport&&(p+="_.webp"),m?m[1]||m[2]||m[3]||m[4]?s.pathname=f.replace(n,p):m[0].match(/_\.(jpg|png|gif|jpef)/)&&(s.pathname+=p):f.match(/_\.webp$/g)?s.pathname=f.replace(/_\.webp$/g,p):s.pathname=f+p,s.toString())}lib||(lib={});var a="gw.alicdn.com",n=/_(\d+x\d+|cy\d+i\d+|sum|m|b)?(xz|xc)?(q\d+)?(s\d+)?(\.jpg)?(_\.webp)?$/i,o="square",h="widthFixed",c="heightFixed",p="xz",d={};d.widths=[110,150,170,220,240,290,450,570,580,620,790],d.heights=[170,220,340,500],d.xzs=[72,80,88,90,100,110,120,145,160,170,180,200,230,270,290,310,360,430,460,580,640],d.square=[16,20,24,30,32,36,40,48,50,60,64,70,72,80,88,90,100,110,120,125,128,145,180,190,200,200,210,220,230,240,250,270,300,310,315,320,336,360,468,490,540,560,580,600,640,720,728,760,970],d.filterDomains=["a.tbcdn.cn","assets.alicdn.com","wwc.taobaocdn.com","wwc.alicdn.com","cbu01.alicdn.com"];var g={width:320,height:320,webpSupport:!1,ignoreGif:!0,ignorePng:!1,sharpen:"s150",q:"q50",baseDpr:2,original:!1,filterDomains:[]},s={getNewUrl:r};lib.imgcore=s,module.exports=s}();

/***/ },
/* 146 */
/***/ function(module, exports) {

	(typeof window === 'undefined') && (window = {ctrl: {}, lib: {}});!window.ctrl && (window.ctrl = {});!window.lib && (window.lib = {});!function(a,b){function c(a){var b={};Object.defineProperty(this,"params",{set:function(a){if("object"==typeof a){for(var c in b)delete b[c];for(var c in a)b[c]=a[c]}},get:function(){return b},enumerable:!0}),Object.defineProperty(this,"search",{set:function(a){if("string"==typeof a){0===a.indexOf("?")&&(a=a.substr(1));var c=a.split("&");for(var d in b)delete b[d];for(var e=0;e<c.length;e++){var f=c[e].split("=");if(void 0!==f[1]&&(f[1]=f[1].toString()),f[0])try{b[decodeURIComponent(f[0])]=decodeURIComponent(f[1])}catch(g){b[f[0]]=f[1]}}}},get:function(){var a=[];for(var c in b)if(void 0!==b[c])if(""!==b[c])try{a.push(encodeURIComponent(c)+"="+encodeURIComponent(b[c]))}catch(d){a.push(c+"="+b[c])}else try{a.push(encodeURIComponent(c))}catch(d){a.push(c)}return a.length?"?"+a.join("&"):""},enumerable:!0});var c;Object.defineProperty(this,"hash",{set:function(a){"string"==typeof a&&(a&&a.indexOf("#")<0&&(a="#"+a),c=a||"")},get:function(){return c},enumerable:!0}),this.set=function(a){a=a||"";var b;if(!(b=a.match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$","i"))))throw new Error("Wrong uri scheme.");this.protocol=b[1]||("object"==typeof location?location.protocol:""),this.username=b[2]||"",this.password=b[3]||"",this.hostname=this.host=b[4],this.port=b[5]||"",this.pathname=b[6]||"/",this.search=b[7]||"",this.hash=b[8]||"",this.origin=this.protocol+"//"+this.hostname},this.toString=function(){var a=this.protocol+"//";return this.username&&(a+=this.username,this.password&&(a+=":"+this.password),a+="@"),a+=this.host,this.port&&"80"!==this.port&&(a+=":"+this.port),this.pathname&&(a+=this.pathname),this.search&&(a+=this.search),this.hash&&(a+=this.hash),a},a&&this.set(a.toString())}b.httpurl=function(a){return new c(a)}}(window,window.lib||(window.lib={}));;module.exports = window.lib.httpurl;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(148);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./image.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./image.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".weex-img {\n\tbox-sizing: border-box;\n  position: relative;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  background-position: 50%;\n}", ""]);
	
	// exports


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	
	var weex = __webpack_require__(9)
	var utils = weex.utils
	var extend = utils.extend
	var Component = weex.Component
	var ComponentManager = weex.ComponentManager
	__webpack_require__(150)
	
	var DEFAULT_DESIGN_WIDTH = 750
	
	var defaults = {
	  baseDpr: ({ 750: 2, 1125: 3 })[DEFAULT_DESIGN_WIDTH] || 1,
	  qNormal: 'q90',
	  qWeak: 'q60'
	}
	
	// opts:
	//  - autoPlay
	//  - playstatus
	function Slider (data) {
	  this.autoPlay = false  // default value is false.
	  this.direction = 'row' // 'column' is not temporarily supported.
	  this.children = []
	  this.isPageShow = true
	  this.isDomRendering = true
	
	  // bind event 'pageshow' and 'pagehide' on window.
	  this._idleWhenPageDisappear()
	  // bind event 'renderBegin' and 'renderEnd' on window.
	  this._idleWhenDomRendering()
	
	  Component.call(this, data)
	}
	
	Slider.prototype = Object.create(Component.prototype)
	
	Slider.prototype._idleWhenPageDisappear = function () {
	  var _this = this
	  window.addEventListener('pageshow', function () {
	    _this.isPageShow = true
	    _this.autoPlay && !_this.isDomRendering && _this.play()
	  })
	  window.addEventListener('pagehide', function () {
	    _this.isPageShow = false
	    _this.stop()
	  })
	}
	
	Slider.prototype._idleWhenDomRendering = function () {
	  var _this = this
	  window.addEventListener('renderend', function () {
	    _this.isDomRendering = false
	    _this.autoPlay && _this.isPageShow && _this.play()
	  })
	  window.addEventListener('renderbegin', function () {
	    _this.isDomRendering = true
	    _this.stop()
	  })
	}
	
	Slider.prototype.attr = {
	  interval: function (val) {
	    this.interval = parseInt(val) || 3000
	    if (this.carrousel) {
	      this.carrousel.playInterval = this.interval
	    }
	  },
	
	  playstatus: function (val) {
	    this.playstatus = val && val !== 'false' ? true : false
	    this.autoPlay = this.playstatus
	    if (this.carrousel) {
	      if (this.playstatus) {
	        this.play()
	      } else {
	        this.stop()
	      }
	    }
	  },
	
	  // support playstatus' alias auto-play for compatibility
	  autoPlay: function (val) {
	    this.attr.playstatus.call(this, val)
	  }
	}
	
	Slider.prototype.create = function () {
	  var node = document.createElement('div')
	  node.classList.add('slider')
	  node.style.position = 'relative'
	  node.style.overflow = 'hidden'
	  return node
	}
	
	Slider.prototype._doRender = function () {
	  var _this = this
	  _this.createChildren()
	  _this.onAppend()
	}
	
	Slider.prototype.removeChild = function (child) {
	  var children = this.data.children
	  if (children) {
	    for (var i = 0; i < children.length; i++) {
	      if (child.data.ref === children[i].ref) {
	        children.splice(i, 1)
	        break
	      }
	    }
	  }
	
	  this._doRender()
	}
	
	Slider.prototype.insertBefore = function (child, before) {
	  var children = this.data.children
	  var childIndex = -1
	  for (var i = 0, l = children.length; i < l; i++) {
	    if (children[i].ref === before.data.ref) {
	      childIndex = i
	      break
	    }
	  }
	  children.splice(childIndex, 0, child.data)
	
	  this._doRender()
	  if (this.children.length > 0) {
	    return this.children[this.children.length - 1]
	  }
	}
	
	Slider.prototype.appendChild = function (data) {
	  var children = this.data.children || (this.data.children = [])
	  children.push(data)
	  this._doRender()
	  if (this.children.length > 0) {
	    return this.children[this.children.length - 1]
	  }
	}
	
	Slider.prototype.createChildren = function () {
	
	  // recreate slider container.
	  if (this.sliderContainer) {
	    this.node.removeChild(this.sliderContainer)
	  }
	  if (this.indicator) {
	    this.indicator.node.parentNode.removeChild(this.indicator.node)
	  }
	  this.children = []
	
	  var sliderContainer = document.createElement('ul')
	  sliderContainer.style.listStyle = 'none'
	  this.node.appendChild(sliderContainer)
	  this.sliderContainer = sliderContainer
	
	  var componentManager = this.getComponentManager()
	
	  var children = this.data.children
	  var scale = this.data.scale
	  var fragment = document.createDocumentFragment()
	  var indicatorData, width, height
	  var childWidth = 0
	  var childHeight = 0
	
	  if (children && children.length) {
	    for (var i = 0; i < children.length; i++) {
	      var child
	      children[i].scale = this.data.scale
	      children[i].instanceId = this.data.instanceId
	      if (children[i].type === 'indicator') {
	        indicatorData = extend(children[i], {
	          extra: {
	            amount: children.length - 1,
	            index: 0
	          }
	        })
	      } else {
	        child = componentManager.createElement(children[i], 'li')
	        this.children.push(child)
	        fragment.appendChild(child.node)
	        width = child.data.style.width || 0
	        height = child.data.style.height || 0
	        width > childWidth && (childWidth = width)
	        height > childHeight && (childHeight = height)
	        child.parentRef = this.data.ref
	      }
	    }
	    // append indicator
	    if (indicatorData) {
	      indicatorData.extra.width = this.data.style.width || childWidth
	      indicatorData.extra.height = this.data.style.height || childHeight
	      this.indicator = componentManager.createElement(indicatorData)
	      this.indicator.parentRef = this.data.ref
	      this.indicator.slider = this
	      this.node.appendChild(this.indicator.node)
	    }
	
	    sliderContainer.style.height = scale * this.data.style.height + 'px'
	    sliderContainer.appendChild(fragment)
	  }
	}
	
	Slider.prototype.onAppend = function () {
	  if (this.carrousel) {
	    this.carrousel.removeEventListener('change', this._getSliderChangeHandler())
	    this.carrousel.stop()
	    this.carrousel = null
	  }
	  this.carrousel = new lib.carrousel(this.sliderContainer, {
	    autoplay: this.autoPlay,
	    useGesture: true
	  })
	
	  this.carrousel.playInterval = this.interval
	  this.carrousel.addEventListener('change', this._getSliderChangeHandler())
	
	  this.currentIndex = 0
	
	  // preload all images for slider
	  // because:
	  // 1. lib-img doesn't listen to event transitionend
	  // 2. even if we fire lazy load in slider's change event handler,
	  //    the next image still won't be preloaded utill the moment it
	  //    slides into the view, which is too late.
	  if (this.preloadImgsTimer) {
	    clearTimeout(this.preloadImgsTimer)
	  }
	  // The time just before the second slide appear and enough
	  // for all child elements to append is ok.
	  var preloadTime = 0.8
	  this.preloadImgsTimer = setTimeout(function () {
	    var imgs = this.carrousel.element.querySelectorAll('.weex-img')
	    for (var i = 0, l = imgs.length; i < l; i++) {
	      var img = imgs[i]
	      var iLazySrc = img.getAttribute('i-lazy-src')
	      var imgSrc = img.getAttribute('img-src')
	      var realSrc = iLazySrc || imgSrc
	      // transfer the imgUrl to a cdn suffixed url.
	      realSrc && (realSrc = lib.imgcore.getNewUrl(realSrc, {
	        dpr: defaults.baseDpr,
	        webpSupport: utils.detectWebp(),
	        ignoreGif: true,
	        ignorePng: false,
	        width: ~~img.getAttribute('data-width') || 320,
	        height: ~~img.getAttribute('data-height') || 320,
	        sharpen: img.getAttribute('data-sharpen') || 's150',
	        q: img.getAttribute('data-q-normal') || defaults.qNormal
	      }))
	      realSrc && (img.style.backgroundImage = 'url(' + realSrc + ')')
	      img.removeAttribute('i-lazy-src')
	      img.removeAttribute('img-src')
	    }
	  }.bind(this), preloadTime * 1000)
	
	  // avoid page scroll when panning
	  var panning = false
	  this.carrousel.element.addEventListener('panstart', function (e) {
	    if (!e.isVertical) {
	      panning = true
	    }
	  })
	  this.carrousel.element.addEventListener('panend', function (e) {
	    if (!e.isVertical) {
	      panning = false
	    }
	  })
	
	  document.addEventListener('touchmove', function (e) {
	    if (panning) {
	      e.preventDefault()
	      return false
	    }
	    return true
	  }.bind(this))
	
	}
	
	Slider.prototype._updateIndicators = function () {
	  this.indicator && this.indicator.setIndex(this.currentIndex)
	}
	
	Slider.prototype._getSliderChangeHandler = function (e) {
	  if (!this.sliderChangeHandler) {
	    this.sliderChangeHandler = (function (e) {
	      var index = this.carrousel.items.index
	      this.currentIndex = index
	
	      // updateIndicators
	      this._updateIndicators()
	
	      this.dispatchEvent('change', { index: index })
	    }).bind(this)
	  }
	  return this.sliderChangeHandler
	}
	
	Slider.prototype.play = function () {
	  this.carrousel.play()
	}
	
	Slider.prototype.stop = function () {
	  this.carrousel.stop()
	}
	
	Slider.prototype.slideTo = function (index) {
	  var offset = index - this.currentIndex
	  this.carrousel.items.slide(offset)
	}
	
	module.exports = Slider
	


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(151);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./slider.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./slider.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, ".slider {\n  position: relative;\n}\n\n.slider .indicator-container {\n  position: absolute;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-box-align: center;\n  box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  font-size: 0;\n}\n.slider .indicator-container .indicator {\n  border-radius: 50%;\n}\n.slider .indicator-container.row {\n  -webkit-box-orient: horizontal;\n  box-orient: horizontal;\n  -webkit-flex-direction: row;\n  flex-direction: row;\n}\n.slider .indicator-container.column {\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  -webkit-flex-direction: column;\n  flex-direction: column;\n}\n", ""]);
	
	// exports


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// For debug: require the latest version which is not published
	// to the npm yet.
	
	__webpack_require__(153)
	
	// For release: require the npm published version of jsframework.
	// require('@ali/weex-jsframework')
	
	__webpack_require__(3)
	
	var weex = __webpack_require__(8)

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by godsong on 16/6/15.
	 */
	var WebsocketClient=__webpack_require__(154);
	var websocketClient=new WebsocketClient('ws://'+location.host+'/debugProxy/native');
	[
	    'createInstance',
	    'refreshInstance',
	    'destroyInstance',
	    'registerComponents',
	    'registerModules',
	    'registerMethods',
	    'getRoot',
	    'callJS'
	].forEach(function(name){
	    window[name]=function(){
	        var args=Array.prototype.slice.call(arguments);
	        websocketClient.send({
	            method:'WxDebug.callJS',
	            params:{
	                method:name,
	                args:args
	            }
	        })
	    }
	});
	websocketClient.on('WxDebug.callNative',function(message){
	    window.callNative(message.params.instance,message.params.tasks,message.params.callback);
	});
	websocketClient.send({
	    method:"WxDebug.initJSRuntime"
	});

/***/ },
/* 154 */
/***/ function(module, exports) {

	/**
	 * Created by godsong on 16/6/14.
	 */
	class WebsocketClient {
	    constructor(url) {
	        this._handlers = {};
	        this.connect(url);
	        this.context={};
	    }
	    connect(url){
	        let This=this;
	        This.isSocketReady=false;
	        if(This.ws){
	            This.ws.onopen=null;
	            This.ws.onmessage=null;
	            This.ws.onclose=null;
	            if(This.ws.readyState==WebSocket.OPEN){
	                This.ws.close();
	            }
	
	        }
	        let ws = new WebSocket(url);
	        This.ws=ws;
	        ws.onopen = function () {
	            This.isSocketReady=true;
	            This.emit('socketOpened');
	        };
	        ws.onmessage = function (e) {
	            let message = JSON.parse(e.data);
	            if (message.method) {
	                This.emit(message.method, message);
	            }
	        };
	        ws.onclose=function(){
	            This.isSocketReady=false;
	            setTimeout(function(){
	                This.connect(url);
	            },800);
	        };
	
	    }
	    send(data){
	        if(this.isSocketReady){
	            this.ws.send(JSON.stringify(data));
	        }
	        else{
	            this.once('socketOpened',()=>{this.ws.send(JSON.stringify(data))});
	        }
	    }
	    off(method,handler){
	        if(handler){
	            for(let i=0;i<this._handlers[method].length;i++){
	                if(this._handlers[method][i]===handler){
	                    this._handlers[method].splice(i,1);
	                    i--;
	                }
	            }
	        }
	        else{
	            this._handlers[method]=[];
	        }
	    }
	    once(method,handler){
	        let self = this;
	        let fired = false;
	
	        function g() {
	            self.off(method, g);
	            if (!fired) {
	                fired = true;
	                handler.apply(self, Array.prototype.slice.call(arguments));
	            }
	        }
	
	        this.on(method, g);
	    }
	    on(method, handler) {
	        if (this._handlers[method]) {
	            this._handlers[method].push(handler);
	        }
	        else {
	            this._handlers[method] = [handler];
	        }
	    }
	
	    _emit(method, args,context) {
	        let handlers = this._handlers[method];
	        if (handlers && handlers.length > 0) {
	            handlers.forEach(handler=>handler.apply(context, args));
	            return true;
	        }
	        else {
	            return false;
	        }
	    }
	
	    emit(method, ...args) {
	        let context={};
	        if (!this._emit(method, args,context)) {
	            this._emit('$default', args,context)
	        }
	        this._emit('$finally', args,context);
	        return context;
	    }
	}
	module.exports=WebsocketClient;

/***/ }
/******/ ]);