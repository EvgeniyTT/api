// const app = require('../../server');
const express = require('express');
const router = express.Router();

const db = require('../../lib/mongoose').db;
// db.on('error', (err) => { console.log(err); });
// db.once('open', () => {

// module.exports = (app) => {

  // const Image = app.db.model('Image');

  const Image = db.model('Image');

  // routing
  router.get('/', (req, res, next) => {
    Image.find((err, images) => {
      if (err) { return next(err);
      } else if (!images) {
        err = new Error('No images were found');
        err.status = 404;
        return next(err);
      }
      res.json(images);
    });
  });

  router.get('/:imageId', (req, res, next) => {
    const imageId = req.params.imageId;
    Image.findOne({ _id: imageId }, (err, image) => {
      if (err) { return next(err);
      } else if (!image) {
        err = new Error('Image was not found');
        err.status = 404;
        return next(err);
      }
      res.json(image);
    });
  });

  router.post('/', (req, res, next) => {
    if (req.body.src === '' || req.body.description === '') {
      const err = new Error('Required fields are not populated');
      err.status = 400;
      return next(err);
    }
    const image = new Image(req.body);
    image.save((err) => {
      if (err) { return next(err); }
      res.json(image);
    });
  });

  router.put('/:imageId', (req, res, next) => {
    if (req.body.src === '' || req.body.description === '') {
      const err = new Error('Required fields are not populated');
      err.status = 400;
      return next(err);
    }
    const imageId = req.params.imageId;
    const image = req.body;
    Image.findOneAndUpdate({ _id: imageId }, image, (err, image) => {
      if (err) { return next(err);
      } else if (!image) {
        err = new Error('Image was not found');
        err.status = 404;
        return next(err);
      }
      res.json(image);
    });
  });

  router.delete('/:imageId', (req, res, next) => {
    const imageId = req.params.imageId;
    Image.remove({ _id: imageId }, (err, image) => {
      if (err) { return next(err);
      } else if (!image) {
        err = new Error('Image was not found');
        err.status = 404;
        return next(err);
      }
      res.json(image);
    });
  });

  // error handling
  router.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.toString());
  });

// });

console.log('------------------');
console.log(router);
console.log('------------------');

//   return router;
// };

module.exports = router;
