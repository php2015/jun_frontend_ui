import Sequelize from 'sequelize';
import sequelizeDB from "../db/user";
const sequelize = sequelizeDB(Sequelize);
import userM from '../model/user.js';
const um = userM(sequelize, Sequelize);

var constant = require('../utils/constant');

//var crypto = require('crypto'); //md5 加密
//var jwt = require('jsonwebtoken'); //token模块
var bodyParser = require('body-parser')

class userC {
	constructor(x, y, z) {
		this.sequelize = x;
		this.Sequelize = y;
		this.um = z;
	}
	DbInit = (req, res, next) => {
		um.createTable().then(result => {
			res.json({
				code: constant.RESULT.SUCCESS.code,
				msg: constant.RESULT.SUCCESS.msg,
				data: '创建表成功'
			});
		}).catch(err => {
			res.json({
				code: constant.RESULT.NO_DATA.code,
				msg: constant.RESULT.NO_DATA.msg,
				data: err
			});
		})
	}
	//追加新的文章 并返回插入ID
	saveToDb = (req, res, next) => {
		//获取post数据
		let postAtext = req.body.params.Atext;
		let jsonText = {
			Atext: postAtext
		}
		//console.log(postAtext)
		um.create(jsonText).then(result => {
			res.json({
				code: constant.RESULT.SUCCESS.code,
				msg: constant.RESULT.SUCCESS.msg,
				data: result
			});
		}).catch(err => {
			res.json({
				code: constant.RESULT.NO_DATA.code,
				msg: constant.RESULT.NO_DATA.msg,
				data: err
			});
		})
	}



	//获取指定ID文章的内容
	readFromDb = (req, res, next) => {
		let Aid = req.body.params.Aid;
		let jsonText = {
			where: {
				id: Aid,
			}
		}
		//console.log(Aid)
		um.findOne(jsonText).then(result => {
			res.json({
				code: constant.RESULT.SUCCESS.code,
				msg: constant.RESULT.SUCCESS.msg,
				data: result
			});
		}).catch(err => {
			res.json({
				code: constant.RESULT.NO_DATA.code,
				msg: constant.RESULT.NO_DATA.msg,
				data: err
			});
		})
	}
	//删除指定指定ID文章的内容
	deleteFromDb = (req, res, next) => {
		let Aid = req.body.params.Aid;
		let jsonText = {
			where: {
				id: Aid,
			}
		}
		um.destroy(jsonText).then(result => {
			res.json({
				code: constant.RESULT.SUCCESS.code,
				msg: constant.RESULT.SUCCESS.msg,
				data: result
			});
		}).catch(err => {
			res.json({
				code: constant.RESULT.NO_DATA.code,
				msg: constant.RESULT.NO_DATA.msg,
				data: err
			});
		})
	}

	//更新指定指定ID文章的内容
	updateDb = (req, res, next) => {
		let Aid = req.body.params.Aid;
		let Atext = req.body.params.Atext;
		//内容
		let jsonText = {
			Atext: Atext
		}
		//条件
		let TJText = {
			where: {
				id: Aid
			}
		}
		um.update(jsonText, TJText).then(result => {
			res.json({
				code: constant.RESULT.SUCCESS.code,
				msg: constant.RESULT.SUCCESS.msg,
				data: result
			});
		}).catch(err => {
			res.json({
				code: constant.RESULT.NO_DATA.code,
				msg: constant.RESULT.NO_DATA.msg,
				data: err
			});
		})
	}

}


module.exports = new userC(sequelize, Sequelize, um);
