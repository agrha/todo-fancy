const todoSchema = require('../models/Todo')


class Todo {

    static viewAll(req,res){
        todoSchema.find()
        .exec()
        .then(dataTodo=>{
            res.status(200).json({
                message:'this is list of all todos',
                dataTodo
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static viewTodo(req,res){
        let target = {
            userId:req.params.id
        }
        todoSchema.find(target)
        .populate('users')
        .exec()
        .then(dataTodo=>{
            res.status(200).json({
                message:'this is your todo list',
                dataTodo
            })
        })
        .catch(err=>{
            res.status(500).json({
                message:'something went wrong',
                err
            })
        })
    }

    static viewOne(req,res){
        let target = {
            _id:req.params.id
        }
        todoSchema.findOne(target)
        .exec()
        .then(dataTodo=>{
            res.status(200).json({
                message:'this is your searched todo',
                dataTodo
            })
        })
    }

    static create(req,res){
        let todo = {
            userId:req.body.userId,
            title:req.body.title,
            action:req.body.action,
            priority:req.body.priority,
            status:req.body.status
        }
        todoSchema.create(todo)
        .then((data)=>{
            res.status(200).json({
                message:'your todo creation is a success',
                data:data   
            })
        })
        .catch(error=>{
            res.status(500).json({
                message:'something went wrong when creating todo item',
                error
            })
        })
    }

    static update(req,res){
        let target = {
            _id:req.params.id
        }
        let objUpdate = {
            title:req.body.title,
            action:req.body.action,
            priority:req.body.priority,
            status:req.body.status
        }
        todoSchema.findOneAndUpdate(target,objUpdate)
        .exec()
        .then(data=>{
            res.status(200).json({
                message:'your todo is successfully updated'
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
        todoSchema.findOneAndRemove(target)
        .exec()
        .then(data=>{
            res.status(200).json({
                message:'your todo is successfully removed',
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

}

module.exports = Todo