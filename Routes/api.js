const {signup,login,user}=require('../sql')
const Router=require('express').Router();

Router.post('/signup',async(req,res)=>{
    try {
        await signup(req.body.username,req.body.password,req.body.email)
          .then((resp)=>{
              if(resp.error==false)
                res.json({
                 error:false,
                 message:"User login successfull",
                 userId:resp.userId
                })
          })
    } catch (error) {
         console.log("ERROR IN SIGN UP")
         res.json({
            error:true,
            message:error.message
         })
    }
})
Router.post('/login',async(req,res)=>{
  try {
      console.log("req body",req.body)
      await login(req.body.email,req.body.password)
            .then((resp)=>{
               if(resp.error==false)
                 res.json({
                      error:false,
                      userId:resp.id,
                      message:"Login successfull"
                    })
               else
                 res.json({
                    error:true,
                    message:resp.message
              })
            })
  } catch (error) {
      console.log("ERROR IN LOGIN")
      res.json({
        error:true,
        message:error.message
      })
  }
})
Router.get('/user/:id',(req,res)=>{
  try {
    user(req.params.id).then((resp)=>{
      if(resp.error==false)
       res.json({
        error:false,
        userData:resp.data
      })
      else
        res.json({
      error:true,
      message:resp.message
    })
    })
  } catch (error) {
     console.log("QUERY ERROR");
     res.json({
      error:true,
      message:error.message
     })
  }
})
module.exports={Router}