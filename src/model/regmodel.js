let conn=require("../config/db.js");
const user = require("../services/reguser_services.js");

exports.loginuser=(username,password,department)=>{

       let id;
     
       return new Promise((resolve,reject)=>{
              if(username==="Admin" && password==="Admin" && department==="admin")
               {
                    resolve({name:"admin",passwo:"admin"});
               }
               else if(department!=="admin")
              {
                 conn.query("select uid,user_password from user where username=? && Role=?",[username,department],(err,result)=>{
                     if(err)
                     {
                            console.log(err);
                     }
                     else{
                            if(result.length==0)
                            {
                                 
                                   reject(result);
                            }
                            else
                            {
                                   id=result[0].uid;
                                   let pass=result[0].user_password;
                                   conn.query("select reception_name,rec_Image from reception where uid=?",[id],(err,result)=>{
                                          if(err)
                                          {
                                          reject(result);
                                          }
                                          else{
                                                 resolve({name:result[0].reception_name,img:result[0].rec_Image,passwo:pass});
                                          }
                                        })
                            }     
                     }
                    
                 }) ;    
              }
              else{
                      reject("false");
              }      
       });
       
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
                       reject(err);
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
                                          console.log("Error Is "+err);
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

 exports.showDoctor=(show)=>{

return new Promise((resolve,reject)=>{
  if(show==1 || show==0){
       conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Status,Doctor_Image from Doctor where Status=?",[show],(err,result)=>{
              if(err)
              {
                     reject(err);
              }
              else{
                     
                     resolve(result);
              }
          }) 
  }
else{
       conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Status,Doctor_Image from Doctor",(err,result)=>{
              if(err)
              {
                     reject(err);
              }
              else{
                     
                     resolve(result);
              }
          })
}
   
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

exports.finalupdatedoc=(name,email,specialization,contact,experience,uid)=>{

      
    return new Promise((resolve,reject)=>{
         conn.query("update doctor set doctor_name=?,doctor_email=?,doctor_specialization=?,doctor_contact=?,doctor_Experience=? where did=?",[name,email,specialization,contact,experience,uid],(err,result)=>{
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

exports.searchdoc=(na)=>{

      return new Promise((resolve,reject)=>{
       conn.query("select *from doctor where Doctor_name  like '%"+na+"%' ",(err,result)=>{

              if(err)
              {
                    
                     reject(err);
              }
              else{
                     resolve(result);
              }
       });
      }) 
}

exports.regReception=(...user)=>
       {
             
              let max;
              let name=user[0];
              let email=user[1];
              let contact=user[2];
              let password=user[3];
              let img=user[4];
              
             //  console.log(password);
      
             return new Promise((resolve,reject)=>{
                    conn.query("insert into user values('0',?,?,'Reception')",[email,password],(err,result)=>{
                           if(err)
                           {  
                             console.log(err);
                             reject(err);
                           }
                           else{
                               //  console.log("Success");
                    conn.query("select max(uid) as 'id' from user",(err,result)=>{
             
                           if(err)
                           {
                             reject(err);
                           }
                           else
                           {
                                  max=result[0].id;
                                 // console.log(max);
                                  conn.query("insert into Reception (reception_name,reception_contact,reception_email,uid,aid,rec_Image)values(?,?,?,?,201,?)",[name,contact,email,max,img],(err,result)=>{
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

exports.showrec=()=>{

       return new Promise((resolve,reject)=>{

              conn.query("select *from reception",(err,result)=>{
                     if(err)
                     {
                            reject(err);
                     }
                     else
                     {
                            resolve(result);
                     }
              });
       });
}

exports.recepudate=(...user)=>{

       return new Promise((resolve,reject)=>{

              conn.query("update reception set reception_name=?,reception_email=?,reception_contact=? where rid=?",[user[0],user[1],user[2],user[3]],(err,result)=>{

                     if(err)
                     {
                            console.log(err);
                            reject("false");
                     }
                     else{
                            resolve("true");
                     }
              })
       })
}

exports.recepdelete=(id)=>{

return new Promise((resolve,reject)=>{

       conn.query("delete from user where uid=?",[id],(err,result)=>{

              if(err)
              {
                     console.log(err);
                     reject("false");
              }
              else{
                     resolve("true");
              }
       });
})
};

exports.searchrecep=(na)=>{

       return new Promise((resolve,reject)=>{
              conn.query("select *from reception where reception_name like '%"+na+"%'",(err,result)=>{

                  if(err)
                  {
                     console.log(err);
                     reject("false");
                  }
                  else{
                     resolve(result);
                  }
              })
       })   
}

exports.regnurse=(data)=>
{
       return new Promise((resolve,reject)=>{

              conn.query("insert into nurse (nurse_name,nurse_email,nurse_contact,nurse_shift,nurse_image) values(?,?,?,?,?)",[...data],(err,result)=>{
                     if(err)
                     {
                            console.log(err);
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              });
       });
}

exports.show_nurse=(no)=>
{
   return new Promise((resolve,reject)=>{
        if(no==="Day" || no==="Night")
        {
              conn.query("select *from nurse where nurse_shift=?",[no],(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              });
        }
        else{
              conn.query("select *from nurse",(err,result)=>{
                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              }) 
       }
   });
}

exports.searchnurse=(str)=>{

       return new Promise((resolve,reject)=>{

              conn.query("select *from nurse where nurse_name like '%"+str+"%' ",(err,result)=>{
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

exports.updatenurse=(id)=>{

       return new Promise((resolve,reject)=>{
              conn.query("select *from nurse where nid=?",[id],(err,result)=>{

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

exports.finalnurseupdate=(...data)=>{

       return new Promise((resolve,reject)=>{

              conn.query("update nurse set nurse_name=?, nurse_email=?, nurse_contact=?, nurse_shift=? where nid=?",[...data],(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              });
       });
}

exports.deleteNurse=(id)=>{

       return new Promise((resolve,reject)=>{

              conn.query("delete from nurse where nid=?",[id],(err,result)=>{
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

exports.addromm=(data)=>{

       return new Promise((resolve,reject)=>{

              conn.query("insert into room values('0','"+data[0]+"','1','"+data[1]+"','"+data[2]+"')",(err,result)=>{
                     if(err)
                     {
                            console.log(err);
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              })
       })
}

exports.show_room=(s)=>{

       return new Promise((resolve,reject)=>{

          if(s==="ICU" || s==="AC" || s==="General")
          {
              conn.query("select *from room where room_type=?",[s],(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
                  });
          }
          else if(s==="true" || s==="false")
          {
              conn.query("select *from room where room_status=?",[s],(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
                  });
          }
          else
          {
              conn.query("select *from room",(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
                  });
          }
       })
}

exports.searchroom=(str)=>{

       return new Promise((resolve,reject)=>{

              conn.query("select *from room where room_no like '%"+str+"%' OR room_type like '%"+str+"%'",(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            //console.log(result);
                            resolve(result);
                     }
              })
       });
}

exports.updateroom=(s)=>{

       return new Promise((resolve,reject)=>{

              conn.query("select *from room where room_id=?",[s],(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result[0]);
                     }
              });
       })
}

exports.finalupdateroom=(...data)=>{

       return new Promise((resolve,reject)=>{

              //console.log(data);
              conn.query("update room set room_type=?, room_charges=?,room_no=? where room_id=?",[...data],(err,result)=>{

                     if(err)
                     {
                            console.log(err);
                            reject(err);
                     }
                     else{
                            //console.log(result);
                            resolve(result);
                     }
              })
       })
}

exports.deleteroom=(id)=>{

       return new Promise((resolve,reject)=>{

              conn.query("delete from room where room_id=?",[id],(err,result)=>{
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