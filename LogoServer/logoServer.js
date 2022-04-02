const async = require('async');
const net = require('net');

class LogoServer {
    constructor(port) {
        this._port = port;
    }

    run() {
        var server = net.createServer(s =>
        {
            console.log("connected...");
            s.write("hello\r\n");
            s.pipe(s);

            s.on('data', d => {
                console.log(d.toString());
            });

            s.on('error', e => console.log(e));
        }).listen(this._port);
    }
}

const server = new LogoServer(8124);
server.run();