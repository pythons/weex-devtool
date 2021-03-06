/**
 * Created by godsong on 16/6/14.
 */
    function EventEmitter(){
    this._handlers = {};
}
EventEmitter.prototype={
    constructor:EventEmitter,
    off:function(method,handler){
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
    },
    once:function(method,handler){
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
    },
    on:function(method, handler) {
        if (this._handlers[method]) {
            this._handlers[method].push(handler);
        }
        else {
            this._handlers[method] = [handler];
        }
    },

    _emit:function(method, args,context) {
        let handlers = this._handlers[method];
        if (handlers && handlers.length > 0) {
            handlers.forEach(handler=>handler.apply(context, args));
            return true;
        }
        else {
            return false;
        }
    },

    emit:function(method, ...args) {
        let context={};
        if (!this._emit(method, args,context)) {
            this._emit('$default', args,context)
        }
        this._emit('$finally', args,context);
        return context;
    }
}
function WebsocketClient(url){
    this.connect(url);
}
WebsocketClient.prototype={
    constructor:WebsocketClient,
    connect:function(url){
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
           /* setTimeout(function(){
                This.connect(url);
            },800);*/
        };

    },
    send:function(data){
        if(this.isSocketReady){
            this.ws.send(JSON.stringify(data));
        }
        else{
            this.once('socketOpened',()=>{this.ws.send(JSON.stringify(data))});
        }
    }

};
WebsocketClient.prototype.__proto__=new EventEmitter();
