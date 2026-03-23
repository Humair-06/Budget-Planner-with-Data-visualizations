const { createApp } = Vue

createApp({

data(){
return{
amount:"",
category:"Food",
type:"expense",
transactions:[],
chart:null
}
},

methods:{

addTransaction(){

let transaction={
amount:Number(this.amount),
category:this.category,
type:this.type
}

this.transactions.push(transaction)

this.amount=""

this.updateChart()

},

updateChart(){

let categories={}
this.transactions.forEach(t=>{
if(t.type=="expense"){
if(!categories[t.category]){
categories[t.category]=0
}
categories[t.category]+=t.amount
}
})

let labels=Object.keys(categories)
let data=Object.values(categories)

if(this.chart){
this.chart.destroy()
}

const ctx=document.getElementById("expenseChart")

this.chart=new Chart(ctx,{
type:"pie",
data:{
labels:labels,
datasets:[{
data:data,
backgroundColor:[
"red","blue","green","orange","purple"
]
}]
}
})

}

},

mounted(){
this.updateChart()
}

}).mount("#app")