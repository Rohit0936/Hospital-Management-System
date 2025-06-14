


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
        let Specialization=user[2];
        let contact=user[3];
        let experience=user[4];
        let img=user[5];
       
        let password=user[7];
       //  console.log(password);

       return new Promise((resolve,reject)=>{
              conn.query("insert into user values('0',?,?,'Doctor')",[email,password],(err,result)=>{
                     if(err)
                     {
                       console.log(err);
                     }
                     else{
                         //  console.log("Success");
              conn.query("select max(uid) as 'id' from user",(err,result)=>{
       
                     if(err)
                     {
       
                     }
                     else
                     {
                            max=result[0].id;
                           // console.log(max);
                            conn.query("insert into Doctor (doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image,uid,aid)values(?,?,?,?,?,?,?,201)",[name,email,Specialization,contact,experience,img,max],(err,result)=>{
                                   if(err)
                                   {
                                       reject(err);
                                   }
                                   else{
                                       resolve("true");
                                   }
                                });
                     }
              });
                     }
                });
               
       })
 }

 exports.showDoctor=()=>{

return new Promise((resolve,reject)=>{
        
   conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image from Doctor",(err,result)=>{
       if(err)
       {
              reject(err);
       }
       else{
              
              resolve(result);
       }
   })
});
}

exports.updatdoc=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query("select *from doctor where Did=?",[id],(err,result)=>{

              if(err)
              {
                 reject(err);
              }
              else{
                     resolve(result[0]);
              }
    });
    });
}

exports.finalupdatedoc=(name,email,specialization,contact,experience,image,uid)=>{

      
    return new Promise((resolve,reject)=>{
         conn.query("update doctor set doctor_name=?,doctor_email=?,doctor_specialization=?,doctor_contact=?,doctor_Experience=?,doctor_image=? where did=?",[name,email,specialization,contact,experience,image,uid],(err,result)=>{
              if(err)
              {
                     console.log(err);
                     
              }
              else{
                 conn.query("select uid from doctor where did=?",[uid],(err,result)=>{
                     if(err)
                     {
                            
                            console.log(err);
                     }
                     else{
                            uid=result[0].uid;
                            conn.query("update user set UserName=? where uid=?",[email,uid],(err,result)=>{
                                   if(err)
                                   {
                                          console.log(err);
                                          reject("false");
                                   }
                                   else{
                                          resolve("true");
                                   }
                            });
                     }
                 })
              }
         })
    });
}

exports.deletedoc=(id)=>{

       return new Promise((resolve,reject)=>{
              conn.query("delete from user where uid=?",[id],(err,result)=>{

                     if(err)
                     {
                            console.log(err);
                     }
                     else{
                            conn.query("select *from doctor",(err,result)=>{
                                   if(err)
                                   {
                                          reject(err);
                                   }
                                   else{
                                          resolve(result);
                                   }
                            });
                     }
              });
       })
       
}