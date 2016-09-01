const app = require('../../server');
const express = require('express');

const router = express.Router();
router.use(checkImageFields);
const Image = app.db.model('Image');

router.param('imageId', (req, res, next, imageId) => {
  Image.findOne({ _id: imageId }, (err, image) => {
    if (err) { return next(err);
    } else if (!image) {
      err = new Error('Image was not found');
      err.status = 404;
      return next(err);
    }
    req.image = image;
    next();
  });
});

  // routing
router.get('/images', (req, res, next) => {
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

router.get('/images/:imageId', (req, res, next) => {
  res.json(req.image);
});

router.post('/images', (req, res, next) => {
  const image = new Image(req.body);
  image.save((err) => {
    if (err) { return next(err); }
    res.json(image);
  });
});

router.put('/images/:imageId', (req, res, next) => {
  const image = req.body;
  Image.findOneAndUpdate({ _id: req.params.imageId }, image, (err, image) => {
    if (err) { return next(err); }
    res.json(image);
  });
});

router.delete('/images/:imageId', (req, res, next) => {
  Image.remove({ _id: req.params.imageId }, (err, image) => {
    if (err) { return next(err); }
    res.json(image);
  });
});

  // error handling
router.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.toString());
});

function checkImageFields(req, res, next) {
  if (req.method in ['POST', 'PUT'] && (req.body.src === '' || req.body.description === '')) {
    const err = new Error('Required fields are not populated');
    err.status = 400;
    return next(err);
  }
  next();
}

module.exports = router;
