const http=require("http")
const express=require("express")
const cors=require("cors")
const bodyParser=require("body-parser")
const app=express()
const sequelize=require("./utils/db")
const server=http.createServer(app)
const expenseRouter=require("./routes/expenses")
app.use(bodyParser.json())

app.use(cors())
app.use("/expense",expenseRouter)


sequelize.sync()
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log("Error :",err))


server.listen(3000,console.log("Server started on port 3000"))