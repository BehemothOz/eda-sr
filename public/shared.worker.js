/*
    chrome://inspect/#workers
    help: https://stackoverflow.com/questions/2323778/how-to-debug-web-workers - debug Worker

    https://habr.com/ru/post/261307/ - about Worker

    https://html.spec.whatwg.org/dev/workers.html#shared-workers-introduction - spec Worker
*/

class Count {
    constructor(number) {
        this.count = 10;
        this.number = number;
    }

    inc() {
        this.count = this.count + this.number;
        return this;
    }

    get() {
        return this.count;
    }
}

class Banana extends Count {}
class Apple extends Count {}

const banana = new Banana(10);
const apple = new Apple(100);

let connections = [];

self.addEventListener('connect', function (e) {
    const port = e.ports[0];
    connections.push(port);

    console.log('connections', connections); // for debug;

    port.onmessage = function (event) {
        const [name] = event.data;
        console.log(event.data);

        let message;

        if (name === 'CLOSE') {
            const currentPort = event.target;
            connections = connections.filter(connection => connection !== currentPort);
            currentPort.close();   
            return;
        }

        switch (name) {
            case 'get::banana': {
                const count = banana.get();
                message = [name, count];
                break;
            }
            case 'add::banana': {
                const count = banana.inc().get();
                message = [name, count];
                break;
            }
            case 'GET_BANANA': {
                const count = banana.get();
                message = [name, count];
                break;
            }
            case 'ADD_BANANA': {
                const count = banana.inc().get();
                message = [name, count];
                break;
            }
            case 'GET_APPLE': {
                const count = apple.get();
                message = [name, count];
                break;
            }
            case 'ADD_APPLE': {
                const count = apple.inc().get();
                message = [name, count];
                break;
            }
            default:
                console.log('name is not found');
                break;
        }

        notify(message);
    };
});

function notify(message) {
    for (let connection of connections) {
        connection.postMessage(message);
    }
}
