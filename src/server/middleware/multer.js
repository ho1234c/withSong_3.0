const path = require('path');
const multer = require('koa-multer');
const { APP } = require('../config');

function multerConfig(name) {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(APP.PATH.PUBLIC, '/thumbnails'));
      },
      filename: (req, file, cb) => {
        crypto.pseudoRandomBytes(16, (err, raw) => (err ? cb(err) : cb(null, raw.toString('hex') + path.extname(file.originalname))));
      }
    })
  }).single(name);
}

module.exports = multerConfig;
