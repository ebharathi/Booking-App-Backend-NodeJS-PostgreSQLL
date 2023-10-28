const express=require('express')
const cors=require('cors');
//importing user router
const {Router}=require('./Routes/api')
const app=express();

app.use(cors())
app.use(express.json())
app.use('/',Router)
app.listen(9000,()=>{
     console.log("Booking app server running on port 9000")
})