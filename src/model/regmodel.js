

let conn=require("../config/db.js");
const user = require("../services/reguser_services.js");

exports.loginuser=(username,password,department)=>{

     
       if(username==="Admin" && password==="Admin" && department==="admin")
       {
        return true;
       }
       else{
        return false;
       }
}

 exports.reguser=(...user)=>
 {
       
        let max;
        let name=user[0];
        let email=user[1];
        let specialzation=user[2];
        let contact=user[3];
        let experience=user[4];
        let img=user[5];
        let role=user[6];
        let password=user[7];
       //  console.log(password);
         conn.query("insert into user values('0',?,?,?)",[email,password,role],(err,result)=>{
              if(err)
              {
                console.log(err);
              }
              else{
                    console.log("Success");
       conn.query("select max(uid) as 'id' from user",(err,result)=>{

              if(err)
              {

              }
              else
              {
                     max=result[0].id;
                     console.log(max);
                     conn.query("insert into Doctor (doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image,uid,aid)values(?,?,?,?,?,?,?,201)",[name,email,specialzation,contact,experience,img,max],(err,result)=>{
                            if(err)
                            {
                                console.log(err);
                            }
                            else{
                                console.log("Doctor Success");
                            }
                         });
              }
       });
              }
         });
        
      //  name,email,specialzation,contact,experience,docImg,role,password
      
        
 }