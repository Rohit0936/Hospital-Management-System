let conn=require("../config/db.js");

exports.loginuser=(username,password,department)=>{

     
       if(username==="Admin" && password==="Admin" && department==="admin")
       {
        return true;
       }
       else{
        return false;
       }
}