'use strict';
const views = require('co-views');
const parse = require('co-body');
const fs = require('fs');

function read(src) {
  return new Promise((resolve, reject) => {
    fs.readFile(src, {'encoding': 'utf8'}, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  });
};

module.exports.home = async (ctx) => {
  ctx.body = await read('./views/index.html');
};
