// const express = require('express');

function log(req,res,next){
    console.log('logging.....')
    next();
}

module.exports = log;