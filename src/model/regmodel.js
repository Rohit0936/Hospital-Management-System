let conn=require("../config/db.js");



exports.show=(id)=>{
       return new Promise((resolve,reject)=>{
             conn.query("select role from user where uid=?",[id],(err,result)=>{
              if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result[0]);
                     }
             })
       })
}
exports.loginuser=(username,password,department)=>{

       let id;
     
       return new Promise((resolve,reject)=>{
              if(username==="Admin" && password==="Admin" && department==="admin")
               {
                    resolve({name:"admin",passwo:"admin"});
               }
               else if(department!=="admin")
              {
                 conn.query("select uid,user_password,role from user where username=? && Role=?",[username,department],(err,result)=>{
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
                                   let role=result[0].role;
                                   
                                   if(department=="Reception")
                                   {
                                          conn.query("select rid,uid,reception_name,rec_Image from reception where uid=?",[id],(err,result)=>{
                                                 if(err)
                                                 {
                                                 reject(result);
                                                 }
                                                 else{
                                                        resolve({name:result[0].reception_name,img:result[0].rec_Image,ro:role,passwo:pass,uid:result[0].uid,rid:result[0].rid});
                                                 }
                                               })
                                   }
                                   else{
                                          conn.query("select did,uid,doctor_name,doctor_Image from doctor where uid=?",[id],(err,result)=>{
                                                 if(err)
                                                 {
                                                 reject(result);
                                                 }
                                                 else{
                                                        resolve({name:result[0],ro:role,passwo:pass});
                                                 }
                                               })
                                   }
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
                                          conn.query("delete from user where uid=?",[max],(err,result)=>{
                                                 if(err)
                                                 {
                                                        reject(err);
                                                 }
                                                 else{
                                                        resolve("false");
                                                 }
                                          })
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
       conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image from Doctor where Status=?",[show],(err,result)=>{
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
       conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image from Doctor",(err,result)=>{
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
                                          conn.query("delete from user where uid=?",[max],(err,result)=>{
                                                 if(err)
                                                 {
                                                        reject(err);
                                                 }
                                                 else{
                                                        resolve("false");
                                                 }
                                          })
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
      // console.log(data);
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
              //console.log(data);
              conn.query("insert into room values('0','"+data[0]+"','"+data[1]+"','"+data[2]+"','true')",(err,result)=>{
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

             // console.log(data);
             let qu="update room set room_type=?, room_charges=?,room_no=? where room_id=?";
              conn.query(qu,[...data],(err,result)=>{

                     if(err)
                     {
                           // console.log("heelo");
                           //console.log("err");
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

exports.getallrnd=()=>{

       return new Promise((resolve,reject)=>{

            conn.query("select nid,nurse_name from nurse",(err,result1)=>{
              if(err)
              {
                     console.lo(err);
                     reject(err);
              }
              else{
                     conn.query("select room_id,room_type,room_no from room where room_status='true'",(err,result2)=>{
                            if(err)
                            {
                                   console.log(err);
                                   reject(err);
                            }
                            else{
                                   conn.query("select Did,doctor_name from doctor",(err,result3)=>{
                                          if(err)
                                          {
                                                 console.log(err);
                                                 reject(err);
                                          }
                                          else{
                                              
                                                 resolve({nurse:result1,room:result2,doctor:result3});
                                          }

                                   })
                            }
                     })
              }
            })
       })
}

exports.addpatient=(data)=>{

       return new Promise((resolve,reject)=>{

              conn.query("insert into patientdetail (patient_name,patient_age,patient_gender,patient_contact,patient_issue,admitted_date,room_id,nid,Did) values (?,?,?,?,?,?,?,?,?)",[...data],(err,result)=>{
                     if(err)
                     {
                            console.log(err);
                            reject(err);
                     }
                     else{

                        
                                   conn.query("update room set room_status='false' where room_id=?",[data[6]],(err,result)=>{
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
       });
}

exports.show_patient=()=>{

       return new Promise((resolve,reject)=>{

              conn.query("select pid,patient_name as 'pname',patient_age as age,patient_gender as gender,patient_contact as 'Contact',admitted_date as admit,discharge_date as 'discharge',room_no,room_type as 'roomtype',nurse_name as 'nname',doctor_name as 'dname',p.status as 'status',bill from patientdetail p inner join doctor d on d.did=p.Did inner join nurse n on n.nid=p.nid inner join room r on r.room_id=p.room_id",(err,result)=>{
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

exports.updatepatient=(id)=>{

       return new Promise((resolve,reject)=>{

              conn.query("select patient_name as 'pname',patient_age as age,patient_gender as gender,patient_contact as 'contact',room_no,room_type as 'roomtype',nurse_name as 'nname',doctor_name as 'dname',patient_issue as 'issue',p.nid,p.did,p.room_id,bill from patientdetail p inner join doctor d on d.did=p.Did inner join nurse n on n.nid=p.nid inner join room r on r.room_id=p.room_id where pid=?",[id],(err,result)=>{
                     if(err)
                     {
                            reject(err)
                     }
                     else{
                        
                            conn.query("select nid,nurse_name from nurse",(err,result1)=>{
                                   if(err)
                                   {
                                          console.lo(err);
                                          reject(err);
                                   }
                                   else{
                                          conn.query("select room_id,room_type,room_no from room where room_status='true'",(err,result2)=>{
                                                 if(err)
                                                 {
                                                        console.log(err);
                                                        reject(err);
                                                 }
                                                 else{
                                                        conn.query("select Did,doctor_name from doctor",(err,result3)=>{
                                                               if(err)
                                                               {
                                                                      console.log(err);
                                                                      reject(err);
                                                               }
                                                               else{
                                                                   
                                                                      resolve({nurse:result1,room:result2,doctor:result3,p:result[0]});
                                                               }
                     
                                                        })
                                                 }
                                          })
                                   }
                                 })
                     }
              })
       })
}

exports.finalupdatepatient=(...data)=>{

       return new Promise((resolve,reject)=>{

              conn.query("update patientdetail set patient_name=?,patient_age=?,patient_gender=?,patient_contact=?,patient_issue=?,room_id=?,nid=?,did=? where pid=?",[...data],(err,result)=>{
                     if(err)
                     {
                     reject(err);
                     }
                     else{
                     }
              })
       });
}

exports.deletepatient=(id)=>{

       return new Promise((resolve,reject)=>{

              conn.query("delete from patientdetail where pid=?",[id],(err,result)=>{

                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              })
       })
}

exports.showdocpatient=(id)=>
{
       
       return new Promise((resolve,reject)=>{

              conn.query("select *from patientdetail where did=?",[id],(err,result)=>{
                     if(err)
                     {
                            reject(err);
                     }
                     else{
                           // console.log(id)
                            //console.log(result);
                            resolve(result);
                     }
              })
       });
}

exports.showmedicine=(id)=>{

 return new Promise((resolve,reject)=>{

       conn.query("select *from medicine",(err,result)=>{

              if(err)
              {
                     reject(err);
              }
              else{
                     conn.query("select *from patientdetail where pid=?",[id],(err,result1)=>{
                            if(err)
                            {
                                   reject(err);
                            }
                            else{
                                   resolve({m:result,p:result1[0]}); 
                            }
                     });
              }
       });
 })
}

exports.addmedicine=(...data)=>
{
       return new Promise((resolve,reject)=>{

              conn.query("insert into patientmedicine values('0',?,?,?)",[...data],(err,result)=>{
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

exports.prescription=(pid)=>{
       return new Promise((resolve,reject)=>{

              conn.query("select medicine_name as 'name',price,qty from medicine m inner join patientmedicine p on m.mid=p.mid where p.pid=?",[pid],(err,result)=>{
                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              })
       })
}

exports.updatepatientstatus=(id)=>{

       return new Promise((resolve,reject)=>{
              conn.query("update patientdetail set bill='true' where pid=?",[id],(err,result)=>{
                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            resolve(result);
                     }
              })
       })
}

// bill

exports.bill=(id)=>{

       return new Promise((resolve,reject)=>{

              conn.query("select pid,doctor_name,doctor_specialization,patient_name,patient_contact,admitted_date,room_no,room_charges from patientdetail p inner join doctor d on d.did=p.did inner join room r on r.room_id=p.room_id where pid=?",[id],(err,result)=>{
                     if(err)
                     {
                            reject(err);
                     }
                     else{
                            conn.query("select medicine_name,qty,price from patientdetail p inner join patientmedicine pm on pm.pid=p.pid inner join medicine m on m.mid=pm.mid where p.pid=?",[id],(err,result1)=>{
                                   if(err)
                                   {
                                          reject(err);
                                   }
                                   else{
                                          resolve({b:result[0],m:result1});
                                   }
                            })
                     }
              })
       });
}

exports.submitbill=(pid,room_charges,doctor_charges,nurse_charges,date)=>{

       return new Promise((resolve,reject)=>{

              conn.query("select price,qty from medicine m inner join patientmedicine p on m.mid=p.mid where p.pid=?",[pid],(err,result)=>{
                  if(err)
                  {
                     console.log(err);
                  }
                  else{
                     let medicinecharges=0;
                     result.forEach((item)=>{
                            medicinecharges=medicinecharges+(item.price*item.qty);
                     });
                     medicinecharges=medicinecharges+medicinecharges*0.18;
                   
                     let toatl_amount=parseFloat(medicinecharges)+parseFloat(doctor_charges)+parseFloat(nurse_charges)+parseFloat(room_charges);
                     
                     conn.query("insert into bill values('0',?,?,?,?,?,?,?)",[pid,room_charges,doctor_charges,nurse_charges,medicinecharges,toatl_amount,date],(err,result)=>{
                            if(err)
                            {
                                   reject(err);
                            }
                            else{
                                   conn.query("update patientdetail set discharge_date=?,Status='Discharge' where pid=?",[date,pid],(err,result)=>{
                                          if(err)
                                          {
                                                 reject(err);
                                          }
                                          else
                                          {
                                                   resolve(result);
                                          }
                                   })
                                 
                            }
                     })
                  }
              });
       });
};