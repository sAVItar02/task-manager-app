const express = require('express')
const app = express()

require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const PORT = process.env.PORT || 3000

app.use(express.json())

//----------------------------------------------------------USERS----------------------------------------------------

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) =>{
    User.find({}).then((users) => {
        res.send(users)
    }).catch(() => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if(!user)
        {
            res.status(404).send()
        }
        else
        {
            res.send(user)
        }
    }).catch((error) => {
        res.status(500).send(error)
    })
})

//-----------------------------------------------------TASKS-----------------------------------------------------------

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks)
    }).catch(() => {
        res.status(500).send()
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id
    
    Task.findById(_id).then((task) => {
        if(!task)
        {
            res.status(404).send()
        }
        else
        {
            res.send(task)
        }
    }).catch(() => {
        res.status(500).send()
    })
})

//-----------------------------------------------------LISTEN----------------------------------------------------------

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT )
})