const express=require("express")

const router=express.Router()
const Expense=require("../models/expenses");
const { where } = require("sequelize");
router.post("/addExpenses",async(req,res,next)=>{
    const body = req.body;

    try {
      const expense = await Expense.create({
        title: body.title,
        category: body.category,
        amount: body.amount
      });
      console.log("expense is", expense);
      res.json(expense);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create expense" });
    }
})

router.post("/deleteExpense",(req,res,next)=>{
const id=req.body.id
Expense.destroy({where:{id:id}})
.then(()=>res.json("deleted expense"))
.catch((err)=>res.json(err))
})

router.get("/allExpenses",async(req,res,next)=>{

    try {
        const expenses=await Expense.findAll()
        res.json(expenses)
    } catch (error) {
        res.json(error)
    }
})




module.exports=router