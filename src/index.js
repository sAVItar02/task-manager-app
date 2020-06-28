const express = require('express')
const app = express()

require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(PORT, () => {
    console.log("Server listening on port " + PORT )
})