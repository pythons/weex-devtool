/**
 * Created by godsong on 16/6/13.
 */
const Router = require('koa-router');
const P2PSession = require('../components/P2PSession');
const DeviceManager = require('../components/DeviceManager');
const MemoryFile = require('../components/MemoryFile');
const uuid = require('../util/uuid');
const Logger=require('../components/Logger');
let wsRouter = Router();
const bundleWrapper = 'function __weex_bundle_entry__(define, require, document, bootstrap,register, render, __weex_define__, __weex_bootstrap__){';
let chromeWsIndex=2;
let nativeWsIndex=1;
function _toFixed(num){
    let s=num.toString(16);
    if(s.length%2==1){
        return '0'+s;
    }
    else return s;
}
wsRouter.all('/debugProxy/inspector/:sessionId', function*(next) {
    Logger.log('new inspector client connected,join[' + this.params.sessionId + ']');
    this.websocket._info=`chrome-inspector[${this.params.sessionId}0x${_toFixed(chromeWsIndex++)}]`;
    if (P2PSession.join(this.params.sessionId, this.websocket));
    this.websocket.on('message', function (message) {
        message = JSON.parse(message);
        P2PSession.postMessage(this, message);
    });
    yield next;
});
wsRouter.all('/debugProxy/debugger/:sessionId', function*(next) {
    Logger.log('new debugger client connected,join[' + this.params.sessionId + ']');
    this.websocket._info=`chrome-debugger[${this.params.sessionId}0x${_toFixed(chromeWsIndex++)}]`;
    if(!P2PSession.join(this.params.sessionId, this.websocket)){
        P2PSession.postMessage(this.websocket, {method:"WxDebug.reload"});
    }
    this.websocket.on('message', function (message) {
        message = JSON.parse(message);
        Logger.printMessage(message,'chrome');
        P2PSession.postMessage(this, message);
    });
    yield next;
});
let _listSocket = null;
DeviceManager.on('update', function (deviceList) {
    if (_listSocket) {
        _listSocket.send(JSON.stringify(deviceList));
    }
});
wsRouter.all('/debugProxy/list', function*(next) {
    _listSocket = this.websocket;
    this.websocket.on('close', function () {
        _listSocket = null;
    });
    _listSocket.send(JSON.stringify(DeviceManager.getDeviceList()));
});


wsRouter.all('/debugProxy/native', function*(next) {
    Logger.log('new native  client connected');
    this.websocket._info=nativeWsIndex.toString(16)+' unregistered';
    nativeWsIndex++;
    this.websocket.on('message', function (messageText) {
        let message = JSON.parse(messageText);
        Logger.printMessage(message,'native');
        let device = DeviceManager.getDevice(this);
        if (message.method) {
            let [domain,method] = message.method.split('.');
            if (domain == 'WxDebug') {
                if (method == 'registerDevice') {
                    DeviceManager.registerDevice(message.params, this);
                    this.send(JSON.stringify({id: message.id, result: 'ready'}));
                }
                else if (method == 'initJSRuntime') {
                    message.params.url = new MemoryFile('js-framework.js', message.params.source).getUrl();
                    device.debuggerSession.postMessage(this, message);
                }
                else if (method == 'callJS' && message.params.method == 'createInstance') {
                    message.params.sourceUrl = new MemoryFile(message.params.args[2].bundleUrl || (uuid() + '.js'), bundleWrapper + message.params.args[1] + '}').getUrl();
                    device.debuggerSession.postMessage(this, message);
                }
                else {
                    if (device)
                        device.debuggerSession.postMessage(this, message);
                    else
                        Logger.error('undefined device');
                }
            }
            else {
                if (device)
                    device.inspectorSession.postMessage(this, message);
                else
                    Logger.error('undefined device');
            }
        }
        else {
            if (device)
                device.inspectorSession.postMessage(this, message);
            else
                Logger.error('undefined device');
        }
    });
    yield next;

});
module.exports = wsRouter;
