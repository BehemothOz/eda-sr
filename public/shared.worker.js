onconnect = function (e) {
    console.log(e)
    // var port = e.ports[0];

    port.onmessage = function (e) {
        var workerResult = 'Result: ' + e.data[0] * e.data[1];
        port.postMessage('123123123123');
    };
};
