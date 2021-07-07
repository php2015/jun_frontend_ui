//var express = require('express');

import express from 'express';
import UserC from '../controller/user';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: '这个是app应用下的user模块'
	});
});

router.get('/DbInit', UserC.DbInit);
//router.get('/saveToDb', UserC.saveToDb);
router.use('/saveToDb', UserC.saveToDb);
router.use('/readFromDb', UserC.readFromDb);
router.use('/updateDb', UserC.updateDb);
router.use('/deleteFromDb', UserC.deleteFromDb);

export default router;
//module.exports = router;
