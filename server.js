const express = require('express')
const cluster = require('cluster');
const { upload } = require('./fileManager');
const totalCPUs = require('os').cpus().length;
if (cluster.isMaster) {

    for (let i = 0; i < totalCPUs; i++) {
        const worker = cluster.fork();

        worker.id = i
    }


    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
    });

} else {
    startExpress();

}

function startExpress() {
    const app = express()
    app.use(require('cors'))
    app.get('/countAttachments/:columnId/:cardId', (req, res) => {
        fs.readdir(`/attachments/${req.params.columnId}/${req.params.cardId}`, (err, files) => {
            if (err) {
                res.send({ count: 0 })
                return;
            }
            res.send({ count: files.length })

        });
    })
    app.post('/upload', upload.single('file'), (req, res) => {
        res.send({ data: 1 })
    })

    app.listen(process.env.PORT || 8080)
}
