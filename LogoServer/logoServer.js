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
        this._direction = +0;

        this.createScreen(); 
    }

    coord = () => `(${this._x},${this._y})`;
    
    createScreen = () => {
        for (let i = 0; i < 30; i++)
        {
            this._screen.push(" ".repeat(30).split(""));
        }
    }

    render = () =>
        this._screen
            .reduce((t, i) => `${t}\r\n║${i.join('')}║`, "╔══════════════════════════════╗") +
            "\r\n╚══════════════════════════════╝\r\n";

    steps = s => {
        s = (s === undefined)? 1 : parseInt(s);

        for (let i = 0; i < s; i++) {
            this._screen[this._y][this._x] = "*";

            switch (this._direction)
            {
                case 0:
                    if (this._y > 1) this._y--;
                    break;
                case 1:
                    if (this._x < 29 && this._y > 1) {
                        this._y--;
                        this._x++;
                    }
                    break;
                case 2:
                    if (this._x < 29) this._x++;
                    break;
                case 3:
                    if (this._x < 29 && this._y < 29) {
                        this._x++;
                        this._y++;
                    }
                    break;
                case 4:
                    if (this._y < 29) this._y++;
                    break;
                case 5:
                    if (this._x > 1 && this._y < 29) {
                        this._x--;
                        this._y++;
                    }
                    break;
                case 6:
                    if (this._x > 1) this._x--;
                    break;
                case 7:
                    if (this._x > 1 && this._y > 1) {
                        this._x--;
                        this._y--;
                    }
                    break;
            }
        };
    }

    right = r => {
        r = (r === undefined)? 1 : parseInt(r);

        if (! Number.isNaN(r))
            this._direction = (this._direction + r) % 8;
    }
}

class LogoServer {
    constructor(port) {
        this._port = port;
        this._messages = [];
        this._quitting = false;
    }

    sendHandshakeThrough = s => {
        this.enqueueReply("hello");
        this.sendReply(s);
        this._quitting = false;
        this._logo = new LogoScreen();
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
            let msgItems = msg.split(" ");

            switch (msgItems[0])
            {
                case "coord": this.enqueueReply(this._logo.coord()); break;
                case "render": this.enqueueReply(this._logo.render()); break;
                case "steps": this._logo.steps(msgItems[1]); break;
                case "right": this._logo.right(msgItems[1]); break;
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