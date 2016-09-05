'use strict';
const app = require('../../server');
const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/git/:gitUserName/:gitRepository', (req, res, next) => {
  const gitUserName = req.params.gitUserName;
  const gitRepository = req.params.gitRepository;
  const async = app.sync(() => {
    try {
      const githubFetch = app.wait(fetch(`https://api.github.com/repos/${gitUserName}/${gitRepository}`));
      const githubFetchInfo = app.wait(githubFetch.json());
      res.json(githubFetchInfo);
    } catch (error) {
      res.send(error);
    }
  });
  async();
});

module.exports = router;
