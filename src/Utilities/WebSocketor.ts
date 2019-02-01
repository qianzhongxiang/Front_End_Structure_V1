import { Extend } from "./Extend";

export interface WebSocketorOptions {
    Url: string
    Reconnection?: boolean
    AutoReconnectInterval?: number
}
export class WebSocketor {
    private WebSocket: WebSocket
    constructor(private options: WebSocketorOptions) {
        this.options = Extend(this.options, { Reconnection: true, AutoReconnectInterval: 5000 });
    }
    public Open(onmessage?: (evt: MessageEvent) => void, onOpen?: () => void, onClose?: (closeEvent: CloseEvent) => void) {
        let ws: WebSocket = this.WebSocket = new WebSocket(this.options.Url);
        ws.onopen = () => {
            console.log("ws open");
            if (onOpen) onOpen();
        };
        ws.onmessage = (evt) => {//TODO needs remove garphic
            //console.log(evt.data);
            if (onmessage) onmessage(evt);
        };
        ws.onerror = (evt) => {
            console.log("onerror")
            console.log(evt["message"]);
        };
        ws.onclose = (evt) => {
            if (onClose) onClose(evt)
            switch (evt.code) {
                case 1000:	// CLOSE_NORMAL
                    console.log("WebSocket: closed");
                    break;
                default:	// Abnormal closure
                    if (this.options.Reconnection)
                        this.Reconnect(evt, onOpen, onmessage);
                    break;
            }
        };
        return ws;
    }

    Reconnect(e: CloseEvent, onOpen: () => void, onmessage: (evt: MessageEvent) => void) {
        console.log(`WebSocketClient: retry in ${this.options.AutoReconnectInterval}ms`, e.reason);
        setTimeout(() => {
            console.log("WebSocketClient: reconnecting...");
            this.WebSocket = this.Open(onmessage, onOpen);
        }, this.options.AutoReconnectInterval);
    }
    SendMsg(postData: Object) {
        let ws = this.WebSocket;
        if (ws && ws.readyState == 1)
            ws.send(JSON.stringify(postData));
        else console.log("socket readyState is not 1, send fail");
    }
    Close(onclose?: () => void) {
        if (onclose) this.WebSocket.onclose = onclose
        this.WebSocket.close();
    }
}