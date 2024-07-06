const Sequelize=require("sequelize")
const sequelize=require("../utils/db")


const Expense=sequelize.define("Expense",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    
    title:{
        type:Sequelize.STRING,
        
    },
    category:{
        type:Sequelize.STRING
    },
    amount:{
        type:Sequelize.STRING
    }

},{
    timestamps:true
});


module.exports=Expense