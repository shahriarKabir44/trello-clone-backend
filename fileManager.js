const multer = require('multer')

const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        const { columnid, cardid } = req.headers
        let path = `attachments/${columnid}/${cardid}`


        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        return cb(null, path)

    },
    filename: (req, res, cb) => {
        const { filename, ext } = req.headers
        cb(null, `${filename}`)
    }
})

const upload = multer({ storage })

module.exports = { upload };