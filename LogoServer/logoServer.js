const async = require('async');
const net = require('net');

class LogoScreen {
    constructor()
    {
        this._x = 15;
        this._y = 15;
        this._height = 30;
        this._width = 30;
        this._screen = [];

        this.createScreen(); 
    }

    coord = () => `(${this._x},${this._y})`;
    
    createScreen = () => {
        for (let i = 0; i < 30; i++)
        {
            this._screen.push(" ".repeat(30));
        }
    }

    render = () => {
        let renderization = this._screen.reduce((t, i) => `${t}\r\n║${i}║`, "╔══════════════════════════════╗");
        renderization += "\r\n╚══════════════════════════════╝\r\n";

        return renderization;
    }
}

class LogoServer {
    constructor(port) {
        this._port = port;
        this._logo = new LogoScreen();
        this._messages = [];
        this._quitting = false;
    }

    sendHandshakeThrough = s => {
        this.enqueueReply("hello");
        this.sendReply(s);
        this._quitting = false;
    }

    clearReplies = () => this._messages = [];

    sendReply = (s) =>{
        if (this._messages.length > 0)
        {
            s.write(this._messages.reduce((p, n) => `${p}\r\n${n}`) + "\r\n");
            this.clearReplies();
        }
    }

    enqueueReply = m => this._messages.push(m);

    quit = () => this._quitting = true;

    processMessage = d => {
        for (let msg of d.split("\r\n").map(x => x.trim()))
        {
            switch (msg)
            {
                case "coord": this.enqueueReply(this._logo.coord()); break;
                case "render": this.enqueueReply(this._logo.render()); break;
                case "quit": this.quit(); break;
            }
        }
    }

    run() {
        var server = net.createServer(s =>
        {
            this.sendHandshakeThrough(s);

            s.on('data', d => {
                this.processMessage(d.toString());
                this.sendReply(s);

                if (this._quitting) s.end();
            });

            s.on('error', e => console.log(e));
        }).listen(this._port);
    }
}

const server = new LogoServer(8124);
server.run();