const multer = require('multer')

const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const { columnId, cardId } = req.headers
        let path = `attachments/${columnId}/${cardId}`


        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        req.fileDir = tempPath
        return cb(null, path)

    },
    filename: (req, res, cb) => {
        const { filename, ext } = req.headers
        req.filename = `${filename}.${ext}`
        cb(null, `${filename}.${ext}`)
    }
})

const upload = multer({ storage })

module.exports = { upload };