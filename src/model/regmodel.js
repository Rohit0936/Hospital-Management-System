let conn = require("../config/db.js");



exports.show = (id) => {
       return new Promise((resolve, reject) => {
              conn.query("select role from user where uid=?", [id], (err, result1) => {
                     if (err) {
                            reject(err);
                     }

                     else {

                            if (result1[0].role === 'Admin') {
                                   conn.query("select *from admin where uid=?", [id], (err, result) => {
                                          if (err) {
                                                 reject(err);
                                          }
                                          else {
                                                 resolve({ data: result[0], role: result1[0].role });
                                          }
                                   })
                            }
                            else if (result1[0].role === 'Doctor') {
                                   conn.query("select *from doctor where did=?", [id], (err, result) => {
                                          if (err) {
                                                 reject(err);
                                          }
                                          else {
                                                 resolve({ data: result[0], role: result1[0].role });
                                          }
                                   })
                            }
                            else {
                                   conn.query("select *from reception where uid=?", [id], (err, result) => {
                                          if (err) {
                                                 reject(err);
                                          }
                                          else {
                                                 resolve({ data: result[0], role: result1[0].role });
                                          }
                                   })
                            }
                     }
              })
       })
}
exports.loginuser = (username, department) => {


       return new Promise((resolve, reject) => {
              conn.query("select * from user where userName=? && role=?", [username, department], (err, result1) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            //.log(result1)
                          if(result1.length==0)
                          {
                            reject(err);
                          }
                          else
                          {
                            if (result1[0].Role === 'Admin') {
                                   conn.query("select *from admin where uid=?", [result1[0].uid], (err, result) => {
                                          if (err) {
                                                 console.log(err);
                                                 reject(err);
                                          }
                                          else {
                                                 //console.log(result);
                                                 resolve({ data: result[0], pass: result1[0].user_password });
                                          }
                                   })
                            }
                            else if (result1[0].Role === 'Doctor') {
                                   conn.query("select *from doctor where uid=?", [result1[0].uid], (err, result) => {
                                          if (err) {
                                                 reject(err);
                                          }
                                          else {
                                                 // console.log(result[0]);
                                                 resolve({ data: result[0], pass: result1[0].user_password });
                                          }
                                   })
                            }
                            else {
                                   conn.query("select *from reception where uid=?", [result1[0].uid], (err, result) => {
                                          if (err) {
                                                 reject(err);
                                          }
                                          else {
                                                 resolve({ data: result[0], pass: result1[0].user_password });
                                          }
                                   })
                            }
                          }
                            
                     }
              })
       });

}

exports.reguser = (...user) => {

       let max;
       let name = user[0];
       let email = user[1];
       let Specialization = user[2];
       let contact = user[3];
       let experience = user[4];
       let img = user[5];
       let password = user[6];
       let aid = user[7];
       //console.log(user);

       return new Promise((resolve, reject) => {
              conn.query("insert into user values('0',?,?,'Doctor')", [email, password], (err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            //  console.log("Success");
                            conn.query("select max(uid) as 'id' from user", (err, result) => {

                                   if (err) {

                                   }
                                   else {
                                          max = result[0].id;
                                          // console.log(max);
                                          conn.query("insert into Doctor (doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image,uid,aid)values(?,?,?,?,?,?,?,?)", [name, email, Specialization, contact, experience, img, max, aid], (err, result) => {
                                                 if (err) {
                                                        console.log("Error Is " + err);
                                                        conn.query("delete from user where uid=?", [max], (err, result) => {
                                                               if (err) {
                                                                      reject(err);
                                                               }
                                                               else {
                                                                      resolve("false");
                                                               }
                                                        })
                                                        reject(err);
                                                 }
                                                 else {
                                                        resolve("true");
                                                 }
                                          });
                                   }
                            });
                     }
              });

       })
}

exports.addadmin = (name, contact, email, image, password) => {

       // console.log(data);
       return new Promise((resolve, reject) => {
              conn.query("insert into user values('0',?,?,'Admin')", [email, password], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            conn.query("select max(uid) as 'id' from user", (err, result1) => {
                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          conn.query("insert into admin value('0',?,?,?,?,?)", [name, contact, email, image, result1[0].id], (err, result) => {
                                                 if (err) {
                                                        conn.query("delete from user where uid=?", [result1[0].id], (err, result) => {
                                                               if (err) {
                                                                      console.log(err);
                                                                      reject(err);
                                                               }
                                                               else {
                                                                      reject("false");
                                                               }
                                                        });
                                                 }
                                                 else {
                                                        resolve(result);
                                                 }
                                          })
                                   }
                            })
                     }
              })
       })
}
exports.showDoctor = (show, aid) => {

       return new Promise((resolve, reject) => {
              if (show == 1 || show == 0) {
                     conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image from Doctor where Status=? && aid=?", [show, aid], (err, result) => {
                            if (err) {
                                   reject(err);
                            }
                            else {

                                   resolve(result);
                            }
                     })
              }
              else {
                     conn.query("select Did,uid,doctor_name,doctor_email,doctor_specialization,doctor_contact,doctor_Experience,Doctor_Image from Doctor where aid=?", [aid], (err, result) => {
                            if (err) {
                                   reject(err);
                            }
                            else {

                                   resolve(result);
                            }
                     })
              }

       });
}

exports.updatdoc = (id) => {
       return new Promise((resolve, reject) => {

              conn.query("select *from doctor where Did=?", [id], (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result[0]);
                     }
              });
       });
}

exports.finalupdatedoc = (name, email, specialization, contact, experience, uid) => {


       return new Promise((resolve, reject) => {
              conn.query("update doctor set doctor_name=?,doctor_email=?,doctor_specialization=?,doctor_contact=?,doctor_Experience=? where did=?", [name, email, specialization, contact, experience, uid], (err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);

                     }
                     else {
                            conn.query("select uid from doctor where did=?", [uid], (err, result) => {
                                   if (err) {

                                          console.log(err);
                                   }
                                   else {
                                          uid = result[0].uid;
                                          conn.query("update user set UserName=? where uid=?", [email, uid], (err, result) => {
                                                 if (err) {
                                                        console.log(err);
                                                        reject("false");
                                                 }
                                                 else {
                                                        resolve("true");
                                                 }
                                          });
                                   }
                            })
                     }
              })
       });
}

exports.deletedoc = (id) => {

       return new Promise((resolve, reject) => {
              conn.query("delete from user where uid=?", [id], (err, result) => {

                     if (err) {
                            console.log(err);
                     }
                     else {
                            conn.query("select *from doctor", (err, result) => {
                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          resolve(result);
                                   }
                            });
                     }
              });
       })
}

exports.searchdoc = (na, aid) => {

       return new Promise((resolve, reject) => {
              conn.query("select *from doctor where Doctor_name  like '%" + na + "%' && aid=? ", [aid], (err, result) => {

                     if (err) {

                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              });
       })
}

exports.regReception = (...user) => {

       let max;
       let name = user[0];
       let email = user[1];
       let contact = user[2];
       let password = user[3];
       let img = user[4];
       let aid = user[5];

       //  console.log(password);

       return new Promise((resolve, reject) => {
              conn.query("insert into user values('0',?,?,'Reception')", [email, password], (err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            //  console.log("Success");
                            conn.query("select max(uid) as 'id' from user", (err, result) => {

                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          max = result[0].id;
                                          // console.log(max);
                                          conn.query("insert into Reception (reception_name,reception_contact,reception_email,uid,aid,rec_Image)values(?,?,?,?,?,?)", [name, contact, email, max, aid, img], (err, result) => {
                                                 if (err) {
                                                        conn.query("delete from user where uid=?", [max], (err, result) => {
                                                               if (err) {
                                                                      reject(err);
                                                               }
                                                               else {
                                                                      resolve("false");
                                                               }
                                                        })
                                                        reject(err);
                                                 }
                                                 else {
                                                        resolve("true");
                                                 }
                                          });
                                   }
                            });
                     }
              });


       })
}

exports.showrec = (aid) => {

       return new Promise((resolve, reject) => {

              conn.query("select *from reception where aid=?", [aid], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              });
       });
}

exports.recepudate = (...user) => {

       return new Promise((resolve, reject) => {

              conn.query("update reception set reception_name=?,reception_email=?,reception_contact=? where rid=?", [user[0], user[1], user[2], user[3]], (err, result) => {

                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            resolve("true");
                     }
              })
       })
}

exports.recepdelete = (id) => {

       return new Promise((resolve, reject) => {

              conn.query("delete from user where uid=?", [id], (err, result) => {

                     if (err) {
                            console.log(err);
                            reject("false");
                     }
                     else {
                            resolve("true");
                     }
              });
       })
};

exports.searchrecep = (na, aid) => {

       return new Promise((resolve, reject) => {
              conn.query("select *from reception where reception_name like '%" + na + "%' && aid=?", [aid], (err, result) => {

                     if (err) {
                            console.log(err);
                            reject("false");
                     }
                     else {
                            resolve(result);
                     }
              })
       })
}

exports.regnurse = (data) => {
       return new Promise((resolve, reject) => {

              conn.query("insert into nurse (nurse_name,nurse_email,nurse_contact,nurse_shift,nurse_image,aid) values(?,?,?,?,?,?)", [...data], (err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              });
       });
}

exports.show_nurse = (no, aid) => {
       return new Promise((resolve, reject) => {
              if (no === "Day" || no === "Night") {
                     conn.query("select *from nurse where nurse_shift=? && aid=?", [no, aid], (err, result) => {

                            if (err) {
                                   reject(err);
                            }
                            else {
                                   resolve(result);
                            }
                     });
              }
              else {
                     conn.query("select *from nurse where aid=?", [aid], (err, result) => {
                            if (err) {
                                   reject(err);
                            }
                            else {
                                   resolve(result);
                            }
                     })
              }
       });
}

exports.searchnurse = (str, aid) => {

       return new Promise((resolve, reject) => {

              conn.query("select *from nurse where nurse_name like '%" + str + "%' && aid=?", [aid], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       });
}

exports.updatenurse = (id) => {

       return new Promise((resolve, reject) => {
              conn.query("select *from nurse where nid=?", [id], (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result[0]);
                     }
              });
       });
}

exports.finalnurseupdate = (...data) => {

       return new Promise((resolve, reject) => {
              // console.log(data);
              conn.query("update nurse set nurse_name=?, nurse_email=?, nurse_contact=?, nurse_shift=? where nid=?", [...data], (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              });
       });
}

exports.deleteNurse = (id) => {

       return new Promise((resolve, reject) => {

              conn.query("delete from nurse where nid=?", [id], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       });
}

exports.addromm = (data) => {

       return new Promise((resolve, reject) => {

              conn.query("select * from room where aid=? && room_no=?", [data[3], data[2]], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            if (result.length == 0) {
                                   conn.query("insert into room values('0','" + data[0] + "','" + data[1] + "','" + data[2] + "','true','" + data[3] + "')", (err, result) => {
                                          if (err) {
                                                 console.log(err);
                                                 reject(err);
                                          }
                                          else {
                                                 resolve(result);
                                          }
                                   })

                            }
                            else {
                                   reject(err);
                            }
                     }
              })
       })
}

exports.show_room = (s, aid) => {

       return new Promise((resolve, reject) => {

              if (s === "ICU" || s === "AC" || s === "General") {
                     conn.query("select *from room where room_type=? && aid=?", [s, aid], (err, result) => {

                            if (err) {
                                   reject(err);
                            }
                            else {
                                   resolve(result);
                            }
                     });
              }
              else if (s === "true" || s === "false") {
                     conn.query("select *from room where room_status=? && aid=?", [s, aid], (err, result) => {

                            if (err) {
                                   reject(err);
                            }
                            else {
                                   resolve(result);
                            }
                     });
              }
              else {
                     conn.query("select *from room where aid=?", [aid], (err, result) => {

                            if (err) {
                                   reject(err);
                            }
                            else {
                                   resolve(result);
                            }
                     });
              }
       })
}

exports.searchroom = (str, aid) => {

       return new Promise((resolve, reject) => {

              conn.query("select *from room where (room_no like '%" + str + "%' OR room_type like '%" + str + "%') && aid=?", [aid], (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            //console.log(result);
                            resolve(result);
                     }
              })
       });
}

exports.updateroom = (s) => {

       return new Promise((resolve, reject) => {

              conn.query("select *from room where room_id=?", [s], (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result[0]);
                     }
              });
       })
}

exports.finalupdateroom = (...data) => {

       return new Promise((resolve, reject) => {


              conn.query("select *from room where room_no=? && aid=?", [data[2], data[4]], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {

                            if (result.length == 0) {
                                   let qu = "update room set room_type=?, room_charges=?,room_no=? where room_id=?";
                                   conn.query(qu, [...data], (err, result) => {

                                          if (err) {
                                                 reject(err);
                                          }
                                          else {
                                                 resolve(result);
                                          }
                                   })
                            }
                            else {
                                   reject(err);
                            }
                     }
              })

       })
}

exports.deleteroom = (id) => {

       return new Promise((resolve, reject) => {

              conn.query("delete from room where room_id=?", [id], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       });
}

exports.getallrnd = (aid) => {

       return new Promise((resolve, reject) => {

              conn.query("select nid,nurse_name from nurse where aid=?",[aid],(err, result1) => {
                     if (err) {
                            console.lo(err);
                            reject(err);
                     }
                     else {
                            conn.query("select room_id,room_type,room_no from room where room_status='true' && aid=?",[aid], (err, result2) => {
                                   if (err) {
                                          console.log(err);
                                          reject(err);
                                   }
                                   else {
                                          conn.query("select Did,doctor_name from doctor where aid=?",[aid], (err, result3) => {
                                                 if (err) {
                                                        console.log(err);
                                                        reject(err);
                                                 }
                                                 else {

                                                        resolve({ nurse: result1, room: result2, doctor: result3 });
                                                 }

                                          })
                                   }
                            })
                     }
              })
       })
}

exports.addpatient = (data) => {

       return new Promise((resolve, reject) => {

              conn.query("insert into patientdetail (patient_name,patient_age,patient_gender,patient_contact,patient_issue,admitted_date,room_id,nid,Did,aid) values (?,?,?,?,?,?,?,?,?,?)", [...data], (err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {


                            conn.query("update room set room_status='false' where room_id=?", [data[6]], (err, result) => {
                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          resolve(result);
                                   }
                            });


                     }
              })
       });
}

exports.show_patient = (aid,s) => {

       return new Promise((resolve, reject) => {
          if(s==='Admit' || s==='Discharge')
          {
              conn.query("select pid,patient_name as 'pname',patient_age as age,patient_gender as gender,patient_contact as 'Contact',admitted_date as admit,discharge_date as 'discharge',room_no,room_type as 'roomtype',nurse_name as 'nname',doctor_name as 'dname',p.status as 'status',bill from patientdetail p inner join doctor d on d.did=p.Did inner join nurse n on n.nid=p.nid inner join room r on r.room_id=p.room_id where p.aid=? && status=?",[aid,s],(err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
          }
          else{
              conn.query("select pid,patient_name as 'pname',patient_age as age,patient_gender as gender,patient_contact as 'Contact',admitted_date as admit,discharge_date as 'discharge',room_no,room_type as 'roomtype',nurse_name as 'nname',doctor_name as 'dname',p.status as 'status',bill from patientdetail p inner join doctor d on d.did=p.Did inner join nurse n on n.nid=p.nid inner join room r on r.room_id=p.room_id where p.aid=?",[aid],(err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
          }
              
       })
}

exports.updatepatient = (id,aid) => {

       return new Promise((resolve, reject) => {

              conn.query("select patient_name as 'pname',patient_age as age,patient_gender as gender,patient_contact as 'contact',room_no,room_type as 'roomtype',nurse_name as 'nname',doctor_name as 'dname',patient_issue as 'issue',p.nid,p.did,p.room_id,bill from patientdetail p inner join doctor d on d.did=p.Did inner join nurse n on n.nid=p.nid inner join room r on r.room_id=p.room_id where pid=? && p.aid=?", [id,aid], (err, result) => {
                     if (err) {
                            reject(err)
                     }
                     else {

                            conn.query("select nid,nurse_name from nurse where aid=?",[aid], (err, result1) => {
                                   if (err) {
                                          console.lo(err);
                                          reject(err);
                                   }
                                   else {
                                          conn.query("select room_id,room_type,room_no from room where room_status='true' && aid=?",[aid],(err, result2) => {
                                                 if (err) {
                                                        console.log(err);
                                                        reject(err);
                                                 }
                                                 else {
                                                        conn.query("select Did,doctor_name from doctor where aid=?",[aid],(err, result3) => {
                                                               if (err) {
                                                                      console.log(err);
                                                                      reject(err);
                                                               }
                                                               else {

                                                                      resolve({ nurse: result1, room: result2, doctor: result3, p: result[0] });
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

exports.finalupdatepatient = (...data) => {

       return new Promise((resolve, reject) => {

              conn.query("update patientdetail set patient_name=?,patient_age=?,patient_gender=?,patient_contact=?,patient_issue=?,room_id=?,nid=?,did=? where pid=?", [...data], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                     }
              })
       });
}

exports.deletepatient = (id) => {

       return new Promise((resolve, reject) => {

              conn.query("delete from patientdetail where pid=?", [id], (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       })
}

exports.showdocpatient = (no,id, aid) => {

       return new Promise((resolve, reject) => {
          if(no==='Admit' || no==='Discharge')
          {
              conn.query("select *from patientdetail where status=? && did=(select did from doctor where uid=?) && aid=?", [no,id, aid], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })   
          }
          else{
              conn.query("select *from patientdetail where did=(select did from doctor where uid=?) && aid=?", [id, aid], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            // console.log(id)
                            //console.log(result);
                            resolve(result);
                     }
              })
          }
              
       });
}

exports.showmedicine = (id) => {

       return new Promise((resolve, reject) => {

              conn.query("select *from medicine", (err, result) => {

                     if (err) {
                            reject(err);
                     }
                     else {
                            conn.query("select *from patientdetail where pid=?", [id], (err, result1) => {
                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          resolve({ m: result, p: result1[0] });
                                   }
                            });
                     }
              });
       })
}

exports.addmedicine = (...data) => {
       return new Promise((resolve, reject) => {

              conn.query("insert into patientmedicine values('0',?,?,?)", [...data], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       });
}

exports.prescription = (pid) => {
       return new Promise((resolve, reject) => {

              conn.query("select medicine_name as 'name',price,qty from medicine m inner join patientmedicine p on m.mid=p.mid where p.pid=?", [pid], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       })
}

exports.updatepatientstatus = (id) => {

       return new Promise((resolve, reject) => {
              conn.query("update patientdetail set bill='true' where pid=?", [id], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       })
}

// bill

exports.bill = (id) => {

       return new Promise((resolve, reject) => {

              conn.query("select pid,doctor_name,doctor_specialization,patient_name,patient_contact,admitted_date,room_no,room_charges from patientdetail p inner join doctor d on d.did=p.did inner join room r on r.room_id=p.room_id where pid=?", [id], (err, result) => {
                     if (err) {
                            reject(err);
                     }
                     else {
                            conn.query("select medicine_name,qty,price from patientdetail p inner join patientmedicine pm on pm.pid=p.pid inner join medicine m on m.mid=pm.mid where p.pid=?", [id], (err, result1) => {
                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          resolve({ b: result[0], m: result1 });
                                   }
                            })
                     }
              })
       });
}

exports.submitbill = (pid, room_charges, doctor_charges, nurse_charges, date,aid) => {

       return new Promise((resolve, reject) => {

              conn.query("select price,qty from medicine m inner join patientmedicine p on m.mid=p.mid where p.pid=?", [pid], (err, result) => {
                     if (err) {
                            console.log(err);
                     }
                     else {
                            let medicinecharges = 0;
                            result.forEach((item) => {
                                   medicinecharges = medicinecharges + (item.price * item.qty);
                            });
                            medicinecharges = medicinecharges + medicinecharges * 0.18;

                            let toatl_amount = parseFloat(medicinecharges) + parseFloat(doctor_charges) + parseFloat(nurse_charges) + parseFloat(room_charges);

                            conn.query("insert into bill values('0',?,?,?,?,?,?,?,?)", [pid, room_charges, doctor_charges, nurse_charges, medicinecharges, toatl_amount, date,aid], (err, result) => {
                                   if (err) {
                                          reject(err);
                                   }
                                   else {
                                          conn.query("update patientdetail set discharge_date=?,Status='Discharge' where pid=?", [date, pid], (err, result) => {
                                                 if (err) {
                                                        reject(err);
                                                 }
                                                 else {
                                                        resolve(result);
                                                 }
                                          })

                                   }
                            })
                     }
              });
       });
};

exports.searchdocpatient=(str,aid,uid)=>{
       return new Promise((resolve,reject)=>{
         conn.query("select *from patientdetail where (patient_name like '%"+str+"%' || patient_contact like '%"+str+"%') && aid=? && did=(select did from doctor where uid=?)",[aid,uid],(err,result)=>{
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

exports.searchpatient=(str,aid)=>{
         return new Promise((resolve, reject) => {

              conn.query("select pid,patient_name as 'pname',patient_age as age,patient_gender as gender,patient_contact as 'Contact',admitted_date as admit,discharge_date as 'discharge',room_no,room_type as 'roomtype',nurse_name as 'nname',doctor_name as 'dname',p.status as 'status',bill from patientdetail p inner join doctor d on d.did=p.Did inner join nurse n on n.nid=p.nid inner join room r on r.room_id=p.room_id where p.aid=? && (patient_name like '%"+str+"%' || patient_contact like '%"+str+"%') ",[aid],(err, result) => {
                     if (err) {
                            console.log(err);
                            reject(err);
                     }
                     else {
                            resolve(result);
                     }
              })
       })
}