const app = module.exports = require('express')();

require('dotenv').config();


// const mongoose = require('mongoose');
// const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// const app = express();
app.use(bodyParser.json());
app.use(cors());



// app.use(require('./lib/mongoose')(app));

// app.use('/images', require('./lib/router')(app));

// app.use('/images', require('./src/controllers/image')(app));

// const router = require('./lib/router')(app);
// const router = require('./src/controllers/image')(app);

const router = require('./src/controllers/image');
app.use('/images', router);

// db.on('error', (err) => { console.log(err); });
// db.once('open', () => {
//   const Image = db.model('Image');
//
//   // routing
//   app.get('/images', (req, res, next) => {
//     Image.find((err, images) => {
//       if (err) { return next(err);
//       } else if (!images) {
//         err = new Error('No images were found');
//         err.status = 404;
//         return next(err);
//       }
//       res.json(images);
//     });
//   });
//
//   app.get('/images/:imageId', (req, res, next) => {
//     const imageId = req.params.imageId;
//     Image.findOne({ _id: imageId }, (err, image) => {
//       if (err) { return next(err);
//       } else if (!image) {
//         err = new Error('Image was not found');
//         err.status = 404;
//         return next(err);
//       }
//       res.json(image);
//     });
//   });
//
//   app.post('/images', (req, res, next) => {
//     if (req.body.src === '' || req.body.description === '') {
//       const err = new Error('Required fields are not populated');
//       err.status = 400;
//       return next(err);
//     }
//     const image = new Image(req.body);
//     image.save((err) => {
//       if (err) { return next(err); }
//       res.json(image);
//     });
//   });
//
//   app.put('/images/:imageId', (req, res, next) => {
//     if (req.body.src === '' || req.body.description === '') {
//       const err = new Error('Required fields are not populated');
//       err.status = 400;
//       return next(err);
//     }
//     const imageId = req.params.imageId;
//     const image = req.body;
//     Image.findOneAndUpdate({ _id: imageId }, image, (err, image) => {
//       if (err) { return next(err);
//       } else if (!image) {
//         err = new Error('Image was not found');
//         err.status = 404;
//         return next(err);
//       }
//       res.json(image);
//     });
//   });
//
//   app.delete('/images/:imageId', (req, res, next) => {
//     const imageId = req.params.imageId;
//     Image.remove({ _id: imageId }, (err, image) => {
//       if (err) { return next(err);
//       } else if (!image) {
//         err = new Error('Image was not found');
//         err.status = 404;
//         return next(err);
//       }
//       res.json(image);
//     });
//   });
//
//   // error handling
//   app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.send(err.toString());
//   });
// });



//  PURE MONGO
// MongoClient.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/imageGallery`, function (err, db) {
//   assert.equal(err, null);
//
//   app.get('/images', function (req, res) {
//     db.collection('images').find().toArray(function(err, images) {
//       assert.equal(err, null);
//       res.send(images);
//     });
//   });
//
//   app.get('/images/:imageId', function (req, res, next) {
//     const imageId = req.params.imageId;
//     db.collection('images').findOne({ _id: ObjectId(imageId) }, function(err, image) {
//       assert.equal(null, err);
//       res.send(image);
//     });
//   });
//
//   app.post('/images', function (req, res, next) {
//     const image = req.body;
//     if (image.src == 'undefined' || image.description == 'undefined') {
//       next(Error('Required fields are not populated'));
//     } else {
//       db.collection('images').insert(image, function(err) {
//         assert.equal(err, null);
//         res.send('Image was successfully inserted');
//       });
//     }
//   });
//
//   app.put('/images:imageId', function(req, res, next) {
//     const imageId = req.params.imageId;
//     const image = req.body;
//     if (image.src == 'undefined' || image.description == 'undefined') {
//       next(Error('Required fields are not populated'));
//     } else {
//       db.collection('images').update({ _id: ObjectId(imageId) }, image, function(err) {
//         assert.equal(err, null);
//         res.send('Image was successfully updated');
//       });
//     }
//   });
//
//   app.delete('/images/:imageId', function (req, res, next) {
//     const imageId = req.params.imageId;
//     db.collection('images').remove({ _id: ObjectId(imageId) }, function(err) {
//       assert.equal(err, null);
//       res.send('image was deleted successfully');
//     });
//   });
// });

if (!module.parent) {
  app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`app listening on host ${process.env.SERVER_HOST} port ${process.env.SERVER_PORT}!`);
  });
}
