const {Client,Pool}=require('pg')

const pool=new Pool(
    {
        host:'127.0.0.1',
        user:'postgres',
        database:'Booking_App',
        password:'elaya55555',
        port:5432
    }
)
const signup=async(name,pass,email)=>{
   const client=await pool.connect();
   console.log("[+]CONNECTED");
   try {
       const result=await client.query('INSERT INTO users(name,password,email) VALUES($1,$2,$3) RETURNING id',[name,pass,email])
       return{
        error:false,
        userId:result.rows[0].id
       }
    } catch (error) {
      console.log("QUERY EXECUTION FAIL SIGNUP");
      return {
        error:true,
        message:error.message
      }
   }
   finally{
    await client.release();
    console.log("[-]DISCONNECTED")
   }
}
const login=async(email,pass)=>{
    const client=await pool.connect();
    console.log("[+]CONNECTED");
    try {
        const result=await client.query('SELECT * FROM users WHERE email=$1 AND password=$2',[email,pass])
        console.log(result);
        if(result.rows.length==1)
          return {
            error:false,
            id:result.rows[0].id
         }
        else
         return {
                error:true,
                message:"Invalid user"  
                }
    } catch (error) {  
         console.log("QUERY FAILED FOR LOGIN")
         return {
            error:true,
            message:error.message
         }
    }
}
const user=async(id)=>{
    const client=await pool.connect();
    console.log("[+]CONNECTED")
    try {
        const result=await client.query('SELECT * FROM users WHERE id=$1',[id])
        return {
            error:false,
            data:result.rows[0]
        }
    } catch (error) {
        console.log("QUERY ERROR IN USER")
        return {
            error:true,
            message:error.message
        }
    }
    finally{
        await client.release();
        console.log("[+]DISCONNECTED")
    }
}
module.exports={signup,login,user}