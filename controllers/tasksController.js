const Task = require('../models/TaskModel')
const mongoose = require('mongoose')

// GET all tasks
const getTasks = async (req, res) => {
    const tasks = await Task.find({}).sort({ createdAt: -1 })
    res.status(200).json(tasks)
}

//POST a new task
const createTask = async (req, res) => {
    const { title, comment, status } = req.body

    let emptyFields = []
    if (!title) {
        emptyFields.push('title')
    }

    if (!status) {
        emptyFields.push('status')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please fill in all fields", emptyFields })
    }

    // Validate the status using the schema's enum validation
    try {
        const task = await Task.create({ title, comment, status })
        res.status(200).json(task)
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: "Invalid status value" })
        }
        res.status(400).json({ error: error.message })
    }
}

// DELETE a task
const deleteTask = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
    }

    const task = await Task.findByIdAndDelete({ _id: id })

    if (!task) {
        return res.status(404).json({ error: 'No such task' })
    }

    res.status(200).json(task)
}

//UPDATE a task 
const updateTask = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such task' })
    }
    const task = await Task.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!task) {
        return res.status(404).json({ error: 'No such task' })
    }
    res.status(200).json({ msg: 'task is update' })
}

module.exports = {
    getTasks,
    createTask,
    deleteTask,
    updateTask
}