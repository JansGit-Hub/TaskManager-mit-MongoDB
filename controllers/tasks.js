const Task = require('../models/Task')

// get all Tasks
const getAllTasks = async (req,res)=>{
    try {
        const tasks = await Task.find({})
        if(!tasks){
            return res.status(404).json({msg:'No Tasks there'})
        }
        res.status(200).json({tasks})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
// create a new Task
const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//get a single task
const getTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Task.findById(taskID)
        if(!task){
            return res.status(404).json({msg:`no task with id: ${taskID}`})
        }     
         res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

//update an existing task
const updateTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Task.findByIdAndUpdate(taskID,req.body,{
            new:true,runValidators:true
        })
        if(!task){
            return res.status(404).json({msg:`no task with id: ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}


//delete a task

const deleteTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`no task with id: ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}