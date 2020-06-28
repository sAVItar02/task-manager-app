const express = require('express')
const app = express()

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const PORT = process.env.PORT || 3000

app.use(express.json())

//-------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------USERS----------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------

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


app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    
    if(!isValidOperation)
    {
        return res.status(400).send({ error: 'Invalid Updates!' })
    }
    
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if(!user){
            res.status(404).send()
        }
        else{
            res.send(user)
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/users/:id', async (req, res) => {
    
    try{
        const user = await User.findByIdAndDelete(req.params.id)

        if(!user) {
            res.status(404).send()
        }
        else {
            res.send(user)
        }
    } catch (e) {
        res.status(500).send()
    }
})

//---------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------TASKS-----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

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

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every( (update) => allowedUpdates.includes(update) )

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid Update!' })
    }

    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if(!task){
            res.status(404).send()
        }
        else {
            res.send(task)
        }
    } catch (e) {
        res.status(400).send(e)
    }
})

app.delete('/tasks/:id', async (req, res) => {
    
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            res.status(404).send()
        } else {
            res.send(task)            
        }
    } catch (e) {
        res.status(500).send()
    }
})

//---------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------LISTEN----------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT )
})