const btn=document.getElementById("button1")
let category="None"
function getValue(name){
    category=name
}

document.addEventListener("DOMContentLoaded",function(event){
    event.preventDefault()
    const res=axios.get("http://localhost:3000/expense/allExpenses")
    .then((data)=>{
     console.log(data.data)
     for(let i=0;i<data.data.length;i++){
        createExpense(data.data[i].id,data.data[i].title,data.data[i].category,data.data[i].amount)
     }
    })
    .catch(err=>console.log(err))
})

const list=document.getElementById("listitems")

function createExpense(id,title,category,amount){
const newlist=document.createElement("li")
const t1=document.createTextNode(`Title - ${title} `)
const c1=document.createTextNode(`Category - ${category}`)
const a1=document.createTextNode(`Amount - ${amount}`)
const space=document.createTextNode("  ")
const delbtn=document.createElement("button")
const editbtn=document.createElement("button")
delbtn.className = "delete";
    editbtn.className = "edit";
    editbtn.appendChild(document.createTextNode("Edit"));
    delbtn.appendChild(document.createTextNode("Delete"));
    delbtn.style.border = "none";
    editbtn.style.border = "none";
    delbtn.style.backgroundColor = "#E70D0D";
    delbtn.style.color = "white";
    delbtn.style.borderRadius = "7px";
    editbtn.style.backgroundColor = "#E7830D";
    editbtn.style.color = "white";
    editbtn.style.borderRadius = "7px";
    newlist.style.color = "black";
    newlist.style.display = "flex";
    newlist.style.justifyContent = "center";
    newlist.style.padding = "10px";
    newlist.style.gap = "20px";
    newlist.style.fontSize="18px"
    newlist.className="custom_list"
    newlist.appendChild(t1);
    newlist.appendChild(space);
    newlist.appendChild(space);
    newlist.appendChild(a1);
    newlist.appendChild(space);
    newlist.appendChild(space);
    newlist.appendChild(c1)
   
  
    newlist.appendChild(delbtn);
    newlist.appendChild(editbtn);
    list.appendChild(newlist)
    editbtn.addEventListener("click",(event)=>{
        event.preventDefault()
   
        axios.post("http://localhost:3000/expense/deleteExpense",{id:id})
        .then(()=>{
            const name=document.getElementById("name").value=title
            const expense=document.getElementById("expense").value=amount
            list.removeChild(newlist)
        })
        .catch((err)=>console.log(err))
       

        
    })
    delbtn.addEventListener("click",(event)=>{
        axios.post("http://localhost:3000/expense/deleteExpense",{id:id})
        .then(()=>{
            list.removeChild(newlist)
        })
        .catch((err)=>console.log(err))
        

    })
}

btn.addEventListener("click",function(event){
event.preventDefault()
const name=document.getElementById("name")
const expense=document.getElementById("expense")
console.log(name)
console.log(name.value,expense.value,category)

axios.post("http://localhost:3000/expense/addExpenses", {
    category: category,
    amount: expense.value,
    title: name.value
  })
  .then((response) => {
    console.log(response.data);
    createExpense(response.data.id,response.data.title,response.data.category,response.data.amount)
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  name.value=""
  expense.value=""

})