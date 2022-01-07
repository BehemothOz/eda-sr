const connections = [];

self.addEventListener('connect', function (e) {
    connections.push(`item ${connections.length}`);
    const port = e.ports[0];

    port.onmessage = function (e) {
        port.postMessage(`${connections.join(', ')}`);
    };
});
