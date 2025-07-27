
let model = require("../model/regmodel.js");
let jsonwebtoken=require("jsonwebtoken");
let nurse=require("../services/regnurse_service.js");
 let Doctor = require("../services/reg_doc_services.js");
 let reception=require("../services/reg_reception.js");
 let login=require("../services/login_service.js");
 let room=require("../services/room.js");
let patient=require("../services/patient_service.js");
let admin=require("../services/reg_admin.js");

let securitykey=process.env.JWT_SECURITYKEY;
let time=process.env.JWT_EXPIERESIN;
exports.logout=(req,res)=>{

    //console.log("logout");
    res.clearCookie("xyz");
    res.render("home.ejs");
}
exports.home = (req, res) => {
    
   
   try{
    let token=req.cookies.xyz;
    if(typeof(token)==="undefined")
    {
        res.render("home.ejs");
    }
    else{
        
       jsonwebtoken.verify(token,securitykey,(err,result)=>{
        req.user=result;
         //sconsole.log(result);
         let role=model.show(result.uid);
        
         role.then((r)=>{
             
            if(r.role==='Admin')
            {
                res.render("admindashbord.ejs",{data:r.data});
            }
            else if(r.role==='Doctor')
            {
                res.render("doc_dashboard.ejs",{data:{name:req.user.name,image:req.user.image}});
            }
            else
            {
                
                res.render("rec_dashbord.ejs",{data:[req.user.name,req.user.image]})
            }
         }).catch((err)=>{
            
             res.redirect("/login")
         })
       })
    }
  
   }
   catch(err)
   {
    console.log(err);
    res.render("home.ejs");
   }
   
 };

exports.admindashbord=(req,res)=>{
    res.render("admindashbord.ejs");
}


 exports.loginuser = async (req, res) => {

     let { username, password, department } = req.body;
     const lo=new login();

     try{
       let result = await lo.loginuser(username, password, department);
      
        if(typeof(result)!="undefined" &&  result.length!=0 && department=="Admin")
        {
            
          let token=jsonwebtoken.sign({
                aid:result.aid,
                uid:result.uid,
                name:result.Name,
                image:result.admin_Image            
          },securitykey,{expiresIn:time});
    
          res.cookie("xyz",token,{

            maxAge:24*60*60*1000,
            httpOnly:true
          });
          
          admindata=result;
            res.render("admindashbord.ejs",{data:result});
        }
        else if(typeof(result)!="undefined" &&  result.length!=0 && department=="Reception")
        {
           
            let token=jsonwebtoken.sign({
                uid:result.uid,
                aid:result.aid,
                name:result.reception_name,
                image:result.rec_Image
            },securitykey,{expiresIn:time});

            res.cookie("xyz",token,{

                maxAge: 24*60*60*1000,
                httpOnly:true
             });
            

            res.render("rec_dashbord.ejs",{data:[result.reception_name,result.rec_Image]});
        }
        else if(typeof(result)!="undefined" &&  result.length!=0 && department=="Doctor")
            {     
                let token=jsonwebtoken.sign({

                    uid:result.uid,
                    aid:result.aid,
                    name:result.doctor_name,
                    image:result.Doctor_Image
                },securitykey,{expiresIn:time});

                 res.cookie("xyz",token,{

                    maxAge: 24*60*60*1000,
                    httpOnly:true
                 });

                res.render("doc_dashboard.ejs",{data:{name:result.doctor_name,image:result.Doctor_Image}});
            }
        else{
            res.render("login.ejs", { msg: "Invalid Username and Password" });
        }
     }
     catch(err)
     {
        console.log(err);
        res.render("login.ejs", { msg: "Invalid Username and Password" });
     }
 }


 exports.login=(req,res)=>{
    res.render("login.ejs",{msg:""});
}

exports.aboutpage=(req,res)=>{
    res.render("aboutpage.ejs");
}

//Admin Registraction form
exports.adminrege=(req,res)=>{
     res.render("adminlogin.ejs",{msg:""});
}

exports.addadmin= async (req,res)=>{
    let image=req.file.path;
    image = "./upload/" + image.substring(14);
    let {name,email,contact,password}=req.body;

    let Admin=new admin();
    try{
       await  Admin.addadmin(name,contact,email,image,password);

       res.redirect("/login");
    }
    catch(err)
    {
        //console.log(err);
        res.render("adminlogin.ejs",{msg:"This user name already present"})
    }
   
   //  console.log(name,email,contact,username,image,password);
}

exports.reg_doc=(req,res)=>{
    let token=req.cookies.xyz;
    
      jsonwebtoken.verify(token,securitykey,(err,result)=>{
          res.render("reg_doc.ejs",{msg:"",data:{Name:result.name,admin_Image:result.image}});
      })
        // res.render("reg_doc.ejs",{msg:"",data:admindata});
}

exports.regDoctor = async (req, res) => {

    
    let aid;
let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
          //console.log(result);
          aid=result;
    });
    //console.log(aid);
     const u = new Doctor();
     let image = req.file.path;
     image = "./upload/" + image.substring(14);

     let { name, email, Specialization, contact, experience, password } = req.body;

     try {
         await u.regDoctor(name, email, Specialization, contact, experience, image, password,aid.aid);
       
        res.redirect("/showdoctor?status=n");
     } catch (err) {
         console.log(err);
         res.render("reg_doc.ejs", { msg: "This user name already present",data:{name:aid.name,admin_Image:aid.image}});
     }
};

 exports.showDoctor=(req,res)=>{

    let show=req.query.status.trim();
    let aid;
let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
          //console.log(result);
          aid=result;
    });
    let flag=model.showDoctor(show,aid.aid);
    flag.then((r)=>{
       // console.log(r);
        res.render("show_doc.ejs",{result:r,data:{name:aid.name,admin_Image:aid.image}});
    }).catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
 };

 let uid;

 exports.updateDocotr=(req,res)=>{
 let aid;
let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
          //console.log(result);
          aid=result;
    });
    let id=req.query.did;
    
    let flag=model.updatdoc(id)
    flag.then((u)=>{
        uid=[id,u];
          // console.log("hello");
        res.render("updatedoctor.ejs",{data1:u,msg:"",data:{name:aid.name,admin_Image:aid.image}});
    });
    
 };

 exports.finalupdatedoc=(req,res)=>{
    let {name,email,specialization,contact,experience}=req.body;
 let aid;
let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
          //console.log(result);
          aid=result;
    });

    let flag=model.finalupdatedoc(name,email,specialization,contact,experience,uid[0]);
    flag.then((r)=>{
        
                
                 res.redirect("/showdoctor?status=n");
                //res.render("updatedoctor.ejs",{data:"",msg:"Update successfully"});

    }).catch((err)=>{
        res.render("updatedoctor.ejs",{data1:uid[1],msg:"Update failed",data:{name:aid.name,admin_Image:aid.image}});
    })
 }
 
 exports.deletedoc=(req,res)=>{

    let id=req.query.uid;
    let flag=model.deletedoc(id);
    flag.then((r)=>{
         res.redirect("/showdoctor?status=n");
    }).catch((err)=>{
        res.send("Something Wrong")
    })
    
 };

 exports.searchdoc=(req,res)=>{
   
     let na=req.query.na.trim();
     let token=req.cookies.xyz;
    let aid;

    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        aid=result.aid;
    })
     let data=model.searchdoc(na,aid);
    data.then((r)=>{
        //console.log(r);
        res.json(r);
    }).catch((err)=>{
        res.send("Something went wrong");
    })
 }

 exports.reg_rec=(req,res)=>{

     let token=req.cookies.xyz;
    
      jsonwebtoken.verify(token,securitykey,(err,result)=>{
           res.render("reg_rec.ejs",{msg:"",data:{Name:result.name,admin_Image:result.image}});
      })
   
}

exports.regrecep= async (req,res)=>{

    let token=req.cookies.xyz;
    let aid;

    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        aid=result;
    })
    let rec=new reception();

    let {name,email,contact,password}=req.body;
    let image=req.file.path;
    image=image.substring(14,image.length);
    image="./upload/"+image;
     
    
    try
        {
        await rec.regReception(name,email,contact,password,image,aid.aid);
         res.redirect("/show_rec");
        }
        catch(err){
            console.log(err);
         res.render("reg_rec.ejs",{msg:"This user name already present",data:{name:aid.name,admin_Image:aid.image}});
        }
}
exports.show_rec=(req,res)=>{

    let token=req.cookies.xyz;
    let aid;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        aid=result;
    });
    let flag=model.showrec(aid.aid);
    flag.then((r)=>{
        res.render("show_rec.ejs",{result:r,data:{name:aid.name,admin_Image:aid.image}});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}


let rid;
exports.recepudate=(req,res)=>{

    let id=req.query.rid.trim();


    let token=req.cookies.xyz;
    let aid;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        aid=result;
    });
    let flag=model.showrec(aid.aid);
    flag.then((r)=>{
        r.forEach((item,index)=>{

            if(parseInt(item.rid)==id)
            {
               rid=[id,item];
                res.render("recepupdate.ejs",{data1:item,msg:"",data:{name:aid.name,admin_Image:aid.image}});
            }
        })
       
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })

  
}

exports.recefinalpudate=(req,res)=>{

   let {name,email,contact}=req.body;
let token=req.cookies.xyz;
    let aid;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        aid=result;
    });

 let flag=model.recepudate(name,email,contact,rid[0]);
 flag.then((f)=>{
    res.redirect("/show_rec");
    // res.render("recepupdate.ejs",{data:"",msg:"Update Successfully"});
 }).catch((err)=>{
    res.render("recepupdate.ejs",{data1:rid[1],msg:"Update failed",data:{name:aid.name,admin_Image:aid.image}});
 })
}

exports.recepdelete=(req,res)=>{

    let id=req.query.rid.trim();

    let flag=model.recepdelete(id);
    flag.then((r)=>{
        res.redirect("/show_rec");
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

exports.searchrecep=(req,res)=>{

    let na=req.query.na.trim();
    let token=req.cookies.xyz;
    let aid;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
       aid=result.aid;
    });
    let flag=model.searchrecep(na,aid);
    flag.then((r)=>{
      res.json(r);  
    }).catch((err)=>{

        res.send("<h1>Something went wrong</h1>")
    });
}
 

exports.reg_nurse=(req,res)=>{

     let token=req.cookies.xyz;

     jsonwebtoken.verify(token,securitykey,(err,result)=>{
        res.render("reg_nurse.ejs",{data:[result.name,result.image],msg:""});
     })
  
}

exports.insert_nurse= async (req,res)=>{

    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
      rid=result;
    });
    let {name,email,contact,nursedata}=req.body;
    let image=req.file.path;
    image=image.substring(14,image.length);
    image="./upload/"+image;
   
    let n=new nurse();

    try{
        await n.regnurse(name,email,contact,nursedata,image,rid.aid);
        res.redirect("/show_nurse");
    }
    catch(err)
    {
        console.log(err);
        res.render("reg_nurse.ejs",{msg:"This email and contact already present",data:[rid.name,rid.image]})
    }
}

exports.show_nurse=(req,res)=>{
    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
    })

      let no=req.query.s;
    let flag=model.show_nurse(no,rid.aid);

         flag.then((r)=>{
              res.render("show_nurse.ejs",{data:[rid.name,rid.image],result:r});
         }).catch((err)=>{
            console.log(err);
         });
};

exports.searchnurse=(req,res)=>{

    let str=req.query.str;
    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
      rid=result;
    })
   let flag=model.searchnurse(str,rid.aid);
   flag.then((r)=>{
    // console.log(r);
        res.json(r);
   }).catch((err)=>{
    res.send("<h1>Something went wrong</h1>");
   })
};

let nid;
exports.updatenurse=(req,res)=>{

    let id=req.query.nid;
    let result=model.updatenurse(id);
    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
       rid=result;
    });
    result.then((r)=>{
         nid=r.nid;
        res.render("nurse_update.ejs",{item:r,msg:"",data:[rid.name,rid.image]});
    }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>")
    });
}

exports.finalnurseupdate=(req,res)=>{

   let rid;
   let token=req.cookies.xyz;

   jsonwebtoken.verify(token,securitykey,(err,result)=>{
      rid=result;
   });

    let {name,email,contact,nurse_shift}=req.body;
    
       let flag= model.finalnurseupdate(name,email,contact,nurse_shift,nid);
       
       flag.then((r)=>{
        res.redirect("/show_nurse");
       }).catch((err)=>{
        console.log(err);
        res.render("nurse_update",{item:nid,data:[rid.name,rid.image],msg:"update failed"})
       })
}

exports.deleteNurse=(req,res)=>{

    let id=req.query.nid;
    
    let flag=model.deleteNurse(id)
    flag.then((r)=>{
        res.redirect("/show_nurse");
    }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>")
    })
}

exports.add_room=(req,res)=>{
   
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        res.render("add_room.ejs",{msg:"",data:[result.name,result.image]});
    })
    
}

exports.addromm= async (req,res)=>{

    let {room_type,room_charges,id}=req.body;
      
    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
    })
    try{
        let ro=new room();
      await ro.addromm(room_type,room_charges,id,rid.aid);

       res.redirect("/show_room");
    }
    catch(err)
    {  console.log(err);
        res.render("add_room",{data:[rid.name,rid.image],msg:"Room Id already present"})
    }
}

exports.show_room=(req,res)=>{

    let s=req.query.s;

   let rid;
   let token=req.cookies.xyz;
   jsonwebtoken.verify(token,securitykey,(err,result)=>{
     rid=result;
   })
       let flag=model.show_room(s,rid.aid);
       flag.then((r)=>{
         res.render("show_room.ejs",{item:r,data:[rid.name,rid.image]});
       }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>")
       })
             
}

exports.searchroom=(req,res)=>{

let token=req.cookies.xyz;

jsonwebtoken.verify(token,securitykey,(err,result)=>{
 let str=req.query.str;
    let flag=model.searchroom(str,result.aid);
    flag.then((r)=>{
        res.json(r);
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
})
}

let roomtemp;
exports.updateroom=(req,res)=>{
    let rid=req.query.rid;
    let temp;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        temp=result;
    })
    let flag=model.updateroom(rid);
    uid=rid;
    flag.then((r)=>{
       // console.log(r);
       roomtemp=r;
        res.render("room_update.ejs",{item:r,msg:"",data:[temp.name,temp.image]});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>");
    })
    
}

exports.finalupdateroom=(req,res)=>{

   
    let {room_type,room_charges,id}=req.body;
    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
    })
    
       let flag=model.finalupdateroom(room_type,room_charges,id,uid,rid.aid);
       
        flag.then((r)=>{
            res.redirect("/show_room");
        }).catch((err)=>
    {
        res.render("room_update.ejs",{item:roomtemp,data:[rid.name,rid.image],msg:"Room already present"});
    });
}

exports.deleteroom=(req,res)=>{

    let id=req.query.rid;
    try{
        model.deleteroom(id);
          res.redirect("/show_room");
    }
    catch(err)
    {
        res.send("<h1>Something went wrong</h1>");
    }
}

let flag;
exports.reg_patient= async (req,res)=>{

   let rid;
   let token=req.cookies.xyz;
   jsonwebtoken.verify(token,securitykey,(err,result)=>{
      rid=result;
   });
     
   try{
     flag= await model.getallrnd(rid.aid);
   res.render("reg_patient.ejs",{nurse:flag.nurse,room:flag.room,doctor:flag.doctor,msg:"",data:[rid.name,rid.image]})
   }
   catch(err)
   {
    res.send("<h1>Something went wrong</h1>")
   }
}

exports.addpatient= async (req,res)=>{

    let rid;
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
    })
    let {patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor}=req.body;
    let date=new Date();
   
    date=date.getFullYear()+"-"+(parseInt(date.getMonth())+1)+"-"+date.getDate();

let p=new patient();
    
    try{
  
     await p.addpatient(patientname,patientage,gender,contact_number,medical_issue,date,room,nurse,doctor,rid.aid);
        res.redirect("/show_patient?s=n");
    }
    catch(err)
    {  console.log(err);
        res.render("reg_patient.ejs",{nurse:flag.nurse,room:flag.room,doctor:flag.doctor,msg:"Contact Already Present",data:[rid.name,rid.image]});
    }
}

exports.show_patient=(req,res)=>{

   let rid;
   let s=req.query.s;
   let token=req.cookies.xyz;
   jsonwebtoken.verify(token,securitykey,(err,result)=>{
    rid=result;
   })

        let flag=model.show_patient(rid.aid,s)
         flag.then((r)=>{
            res.render("show_patient.ejs",{item:r,data:[rid.name,rid.image]});
         }).catch((err)=>{
            console.log(err);
            res.send("<h1>Something went wrong</h1>")
         })
}


exports.updatepatient=(req,res)=>{

     let id=req.query.id;
     uid=id;
    
     let rid;
     let token=req.cookies.xyz;
     jsonwebtoken.verify(token,securitykey,(err,result)=>{
         rid=result;
     })
     let result=model.updatepatient(id,rid.aid);
     result.then((r)=>{
       res.render("update_patient.ejs",{nurse:r.nurse,room:r.room,doctor:r.doctor,pen:r.p,msg:"",data:[rid.name,rid.image]})
     }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>");
     })
}

exports.finalupdatepatient=(req,res)=>
{
    let {patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor}=req.body;
   // console.log(uid);
    try{
        model.finalupdatepatient(patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor,uid);
        res.redirect("/show_patient");
    }
    catch(err)
    {
        res.send("<h1>Something went wrong</h1>")
    } 
}

exports.deletepatient=(req,res)=>{
    let id=req.query.id;

    try{
        model.deletepatient(id);
        res.redirect("/show_patient");
    }
    catch(err)
    {
        res.send("<h1>Something went wrong</h1>");
    }
}

exports.showdocpatient=(req,res)=>{

        let token=req.cookies.xyz;
        let uid;
         jsonwebtoken.verify(token,securitykey,(err,result)=>{
           // console.log(result);
            uid=result;
         });
     let no=req.query.s;
        let flag=model.showdocpatient(no,uid.uid,uid.aid);
        flag.then((r)=>{
            res.render("showdoc_patient.ejs",{data:{name:uid.name,image:uid.image},result:r});
        }).catch((err)=>{
            console.log(err);
            res.send("<h1>Something went wrong</h1>");
        })
}

exports.showmedicine=(req,res)=>{

    let pid=req.query.id;
   let flag=model.showmedicine(pid);
   //console.log(pid);
   //console.log(req.query.id);
   flag.then((r)=>{
 
      res.render("medicine.ejs",{item:r.m,p:r.p});
   }).catch((err)=>{
    console.log(err);
       res.send("<h1>Something went wrong</h1>")
   });
}

exports.addmedicine= async(req,res)=>{

    let pid=req.query.pid;
    let {medicine,qty}=req.body;
     try{
       await  model.addmedicine(medicine,pid,qty);
       res.redirect("/showmedicinefrom?id="+pid);
     }
     catch(err){
        console.log(err);
        res.send("<h1>Something went wrong</h1>");
     }
};


exports.prescription=(req,res)=>{
    let pid=req.query.pid;

    let flag=model.prescription(pid);
    flag.then((r)=>{
        //console.log(r);
        res.render("Prescription.ejs",{m:r});        
    }).catch((err)=>{
        console.log(err);
        res.send("<h>Something went wrong</h");
    })

}

exports.updatepatientstatus=(req,res)=>{

    try{
        let id=req.query.pid;
         model.updatepatientstatus(id);
         res.redirect("/showdocpatient");
    }catch(err)
    {
        console.log(err);
        res.send("<h1>Something went wrong</h1>");
    }
}

exports.bill=(req,res)=>{

    let flag=model.bill(req.query.id);
     flag.then((r)=>{
          res.render("bill.ejs",{bill:r.b,medi:r.m});
     }).catch((err)=>{

        res.send("<h1>Something went wrong</h1>");
     });
}

exports.submitbill=async(req,res)=>{

let pid=req.query.id;
 
  let token=req.cookies.xyz;
  let rid;
   
     jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
     })

    let{room_charges,doctor_charges,nurse_charges,day}=req.body;
    let date=new Date();
    date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    //console.log(room_charges*day,doctor_charges,nurse_charges,date);

   
    try{
         let save= await model.submitbill(pid,room_charges*day,doctor_charges,nurse_charges,date,rid.aid);
         res.redirect("/show_patient");
    }
    catch(err)
    {
        console.log(err);
    }
}

exports.searchdocpatient= async(req,res)=>{

    let str=req.query.str.trim();
    let rid;
  
    let token=req.cookies.xyz;
    jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
    })

   try{
    let falg= await model.searchdocpatient(str,rid.aid,rid.uid);
    res.json(falg);
   }
   catch(err)
   {
     console.log(err);
     res.send("<h1>Something Went wrong</h1>")
   }
}

exports.searchpatient= async(req,res)=>{

       let str=req.query.str.trim();
       let rid;
       let token=req.cookies.xyz;
       jsonwebtoken.verify(token,securitykey,(err,result)=>{
        rid=result;
       })
       try{
          
            let flag= await model.searchpatient(str,rid.aid);
            console.log(flag);
           res.json(flag);
       }
       catch(err)
       {
        console.log(err);
        res.send("<h1>Something Went wrong</h1>");
       }

       
}