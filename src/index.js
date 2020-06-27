const express = require('express')
const app = express()

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const PORT = process.env.PORT || 3000

app.use(express.json())

//----------------------------------------------------------USERS----------------------------------------------------

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/users', async (req, res) =>{
    
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if(!user){
            res.status(400).send()
        }
        else{
            res.send(user)
        }
    } catch (e) {
        res.status(500).send(e)
    }
})

//-----------------------------------------------------TASKS-----------------------------------------------------------

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {
    
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if(!task){
            res.status(404).send()
        } 
        else {
            res.send(task)
        }
    } catch (e) {
        res.status(500).send()
    }
})

//-----------------------------------------------------LISTEN----------------------------------------------------------

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT )
})