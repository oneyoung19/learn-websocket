# SSE

`SSE` 全称为 `Server-sent Events`。即**服务端推送事件**。

在实际业务中，我们可以利用 `SSE` 向客户端不间断的推送实时信息。

## 1.特点

`SSE` 具有以下特点：

1. **单向通信**。只能由服务端向客户端推动消息。而 `websocket` 属于全双工通信；
2. **依赖HTTP协议**。而 `websocket` 依赖的是 `ws` 或者 `wss` 协议；
3. **传输数据只能是文本数据**。而 `websocket` 可以传输二进制和文本数据；
4. **持久化连接**。与 `websocket` 类似，`Connection` 的值为 `keep-alive`；（**且 `SSE` 的连接，客户端会不断发送请求，除非显示调用 `source.close()` 实例方法关闭连接**。）
5. **特有的重连机制**。在网络不好或者连接出错时，`SSE` 会自动 `retry` 连接。

## 2.兼容性

[caniuse.com](https://caniuse.com/eventsource)

![](https://raw.githubusercontent.com/oneyoung19/vuepress-blog-img/Not-Count-Contribution/img/20240509163849.png)
