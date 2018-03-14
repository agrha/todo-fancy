const userSchema = require('../models/Users')
var bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')

class Users {

    static viewAll(req,res){
        userSchema.find()
        .exec()
        .then(dataUser=>{
            res.status(200).json({
                message:'this is list of users',
                dataUser
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static signUp(req,res){
        const plainPassword  = req.body.password;
        let salt = bcrypt.genSaltSync(saltRounds)
        let password = bcrypt.hashSync(plainPassword,salt)
        let obj = {
            username:req.body.username,
            password:password,
            email:req.body.email,
            role:'user'
        }
        userSchema.create(obj)
        .then(data=>{
            res.status(200).json({
                message:'successfully created user',
                data
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static createAdmin(req,res){
        const plainPassword  = req.body.password;
        let salt = bcrypt.genSaltSync(saltRounds)
        let password = bcrypt.hashSync(plainPassword,salt)
        let obj = {
            username:req.body.username,
            password:password,
            email:req.body.email,
            role:'admin'
        }
        userSchema.create(obj)
        .then(data=>{
            res.status(200).json({
                message:'successfully created user',
                data
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static update(req,res){
        let target = {
            _id:req.params.id
        }
        const plainPassword  = req.body.password;
        let salt = bcrypt.genSaltSync(saltRounds)
        let password = bcrypt.hashSync(plainPassword,salt)
        let objUpdate = {
            username:req.body.username,
            password:password,
            email:req.body.email
        }
        userSchema.findOneAndUpdate(target,objUpdate)
        .exec()
        .then(data =>{
            res.status(200).json({
              message:'update user successfull',
              data  
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static delete(req,res){
        let target = {
            _id:req.params.id
        }
        userSchema.findOneAndRemove(target)
        .exec()
        .then(data=>{
            res.status(200).json({
                message:'delete user successfully',
                data
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static signIn(req,res,next){
        let username = req.body.username
        let password = req.body.password
        User.findOne({
          where: {
            username: req.body.username
          }
        }).then(user => {
            let condition = bcrypt.compareSync(req.body.password, user.password)
            if(condition === true){
              let token = jwt.sign({user},'secret key')
              res.status(200).json({
                message:'login berhasil',
                data:user,
                token
              })
            } else {
              res.status(404).json({
                message:'login error!'
              })
            }
          })
        }
}

module.exports = Users