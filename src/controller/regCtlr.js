
let model = require("../model/regmodel.js");
let nurse=require("../services/regnurse_service.js");
 let Doctor = require("../services/reg_doc_services.js");
 let reception=require("../services/reg_reception.js");
 let login=require("../services/login_service.js");
 let room=require("../services/room.js");
let patient=require("../services/patient_service.js");

exports.logout=(req,res)=>{

   // console.log("logout");
    res.clearCookie("xyz");
    res.render("home.ejs");
}
exports.home = (req, res) => {
    
   
   try{
    let temp=req.cookies.xyz;
   // let rec=req.cookies.rec;
    //console.log(req.cookie.xyz);
    if(typeof(temp)==="undefined")
    {
        res.render("home.ejs");
       
    }
    else{
        
        let role=model.show(temp);
        role.then((r)=>{
            let arr=[req.session.name,req.session.image,req.session.uid];
            if(r.role==="Reception")
            {
                res.render("rec_dashbord.ejs",{data:arr});
            }
            else{
               
                res.render("doc_dashboard.ejs",{data:arr});
            }

        }).catch((err)=>{
            res.redirect("/login")
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

// exports.home=(req,res)=>{
//     res.render("home.ejs");
// };

 exports.loginuser = async (req, res) => {

     let { username, password, department } = req.body;
     const lo=new login();

      
     //console.log(flag);
     try{
       let result = await lo.loginuser(username, password, department);
       // console.log(result);
        if(typeof(result)!="undefined" &&  result.length!=0 && department=="admin")
        {

            res.render("admindashbord.ejs");
        }
        else if(typeof(result)!="undefined" &&  result.length!=0 && department=="Reception")
        {
           
         //console.log(result);
            req.session.uid=result.uid;
            req.session.tid=result.rid;//reception id;
            req.session.name=result.name;
            req.session.image=result.img;
            res.cookie("xyz",req.session.uid,{

                maxAge: 24*60*60*1000,
                httpOnly:true
             });
            //console.log(result);
            //req.cookie('xyz',result.name.did)

            let arr=[req.session.name,req.session.image,req.session.uid];
            res.render("rec_dashbord.ejs",{data:arr});
        }
        else if(typeof(result)!="undefined" &&  result.length!=0 && department=="doctor")
            {
                //console.log(result);
                 req.session.uid=result.name.uid;
                 req.session.tid=result.name.did;// doctor id;
                 req.session.name=result.name.doctor_name;
                 req.session.image=result.name.doctor_Image;
                 //console.log(req.session.uid);

                 res.cookie("xyz",req.session.uid,{

                    maxAge: 24*60*601000,
                    httpOnly:true
                 });
                 let arr=[req.session.name,req.session.image];
                res.render("doc_dashboard.ejs",{data:arr});
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

exports.reg_doc=(req,res)=>{
    res.render("reg_doc.ejs",{msg:""});
}

// exports.show_doc=(req,res)=>{
//     let result=model.showDoctor()
//     result.then((r)=>{
//        res.render("show_doc.ejs",{data:r});
//     }).catch((err)=>{
        
//        res.send("Something wrong");
//     });
// }

exports.regDoctor = async (req, res) => {
    const u = new Doctor();
    let image = req.file.path;
    image = "./upload/" + image.substring(14);

    let { name, email, Specialization, contact, experience, role, password } = req.body;

    try {
        await u.regDoctor(name, email, Specialization, contact, experience, image, role, password);
        res.render("reg_doc.ejs", { msg: "Doctor registration Successfully" });
    } catch (err) {
        console.log(err);
        res.render("reg_doc.ejs", { msg: "This user name already present" });
    }
};


 exports.showDoctor=(req,res)=>{
   
    let show=req.query.status.trim();
    //console.log(show);
    let flag=model.showDoctor(show);
    flag.then((r)=>{
       // console.log(r);
        res.render("show_doc.ejs",{result:r});
    }).catch((err)=>{
        console.log(err);
        res.send("Something went wrong");
    })
 };

 let uid;
 exports.updateDocotr=(req,res)=>{

    let id=req.query.did;
    uid=id;
    let flag=model.updatdoc(id)
    flag.then((u)=>{

        res.render("updatedoctor.ejs",{data:u,msg:""});
    });
    
 };

 exports.finalupdatedoc=(req,res)=>{
    let {name,email,specialization,contact,experience}=req.body;
 
    let flag=model.finalupdatedoc(name,email,specialization,contact,experience,uid);
    flag.then((r)=>{
        if(r)
            {
                res.render("updatedoctor.ejs",{data:"",msg:"Update successfully"});
            }
            else{
                res.render("updatedoctor.ejs",{data:"",msg:"Update failed"});
            }

    }).catch((err)=>{
        res.send("Something Error");
    })
 }
 
 exports.deletedoc=(req,res)=>{

    let id=req.query.uid;
    let flag=model.deletedoc(id);
    flag.then((r)=>{
        res.render("show_doc.ejs",{result:r});
    }).catch((err)=>{
        res.send("Something Wrong")
    })
    
 };

 exports.searchdoc=(req,res)=>{

     let na=req.query.na.trim();
    
     let data=model.searchdoc(na);
    data.then((r)=>{
        res.json(r);
    }).catch((err)=>{
        res.send("Something went wrong");
    })
 }

 exports.reg_rec=(req,res)=>{
    res.render("reg_rec.ejs",{msg:""});
}

exports.regrecep= async (req,res)=>{

    let rec=new reception();

    let {name,email,contact,password}=req.body;
    let image=req.file.path;
    image=image.substring(14,image.length);
    image="./upload/"+image;
     
    
    try
        {
        await rec.regReception(name,email,contact,password,image);
         res.render("reg_rec.ejs",{msg:"Receptionists registration Successfully"});
        }
        catch(err){
            
         res.render("reg_rec.ejs",{msg:"This user name already present"});
        }
}
exports.show_rec=(req,res)=>{

    let flag=model.showrec();
    flag.then((r)=>{
        res.render("show_rec.ejs",{result:r});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

let rid;
exports.recepudate=(req,res)=>{

    let id=req.query.rid.trim();
    rid=id;

    let flag=model.showrec();
    flag.then((r)=>{
        r.forEach((item,index)=>{

            if(parseInt(item.rid)==id)
            {
               
                res.render("recepupdate.ejs",{data:item,msg:""});
            }
        })
       
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })

  
}

exports.recefinalpudate=(req,res)=>{

   let {name,email,contact}=req.body;

 let flag=model.recepudate(name,email,contact,rid);
 flag.then((f)=>{
     res.render("recepupdate.ejs",{data:"",msg:"Update Successfully"});
 }).catch((err)=>{
     res.send("<h1>Something went wrong</h1>")
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

    let flag=model.searchrecep(na);
    flag.then((r)=>{
      res.json(r);  
    }).catch((err)=>{

        res.send("<h1>Something went wrong</h1>")
    });
}
 

exports.reg_nurse=(req,res)=>{

    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }

  res.render("reg_nurse.ejs",{data:arr,msg:""});
}

exports.insert_nurse= async (req,res)=>{

    let {name,email,contact,nursedata}=req.body;
    console.log(nursedata);
    let image=req.file.path;
    image=image.substring(14,image.length);
    image="./upload/"+image;
   
    let n=new nurse();
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];

    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
    //console.log(name+" "+email+" "+contact+" "+image);
    try{
        await n.regnurse(name,email,contact,nursedata,image);
        res.render("reg_nurse.ejs",{msg:"Registration Successfully",data:arr})
    }
    catch(err)
    {
        console.log(err);
        res.render("reg_nurse.ejs",{msg:"This email and contact already present",data:arr})
    }
}

exports.show_nurse=(req,res)=>{

    let no=req.query.s;
        let flag=model.show_nurse(no);
       let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];

        if(typeof(arr[0])=="undefined")
            {
                return res.send("<h1>Some thing went wrong</h1>")
            }
       // console.log(arr);
         flag.then((r)=>{
              res.render("show_nurse.ejs",{data:arr,result:r});
         }).catch((err)=>{
            console.log(err);
         });
};

exports.searchnurse=(req,res)=>{

    let str=req.query.str;
    
   let flag=model.searchnurse(str);
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
   //  nid=id;
    let result=model.updatenurse(id);
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
    result.then((r)=>{
         nid=r.nid;
        res.render("nurse_update.ejs",{item:r,msg:"",data:arr});
    }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>")
    });
}

exports.finalnurseupdate=(req,res)=>{

   
    let {name,email,contact,nurse_shift}=req.body;
  //let name1=req.body.name;

  //  console.log(nurse_shift);
    
       let flag= model.finalnurseupdate(name,email,contact,nurse_shift,nid);
       let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
       if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
      // console.log(arr);
       flag.then((r)=>{
        res.redirect("/show_nurse");
       }).catch((err)=>{
        console.log(err);
        res.render("nurse_update",{item:nid,data:arr,msg:"update failed"})
       })
}

exports.deleteNurse=(req,res)=>{

    let id=req.query.nid;

    let flag=model.deleteNurse(id)
    flag.then((r)=>{
        res.redirect("/show_nurse");
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

exports.add_room=(req,res)=>{
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
    res.render("add_room.ejs",{msg:"",data:arr});
}

exports.addromm= async (req,res)=>{

    let {room_type,room_charges,id}=req.body;
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
    try{
        let ro=new room();
      
      await ro.addromm(room_type,room_charges,id);

        res.render("add_room.ejs",{data:arr,msg:"Room Add Successfully"});
    }
    catch(err)
    {
        res.render("add_room",{data:arr,msg:"Room Id already present"})
        //res.send("<h1>Something went wrong</h1>")
    }
}

exports.show_room=(req,res)=>{

    let s=req.query.s;

    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
       let flag=model.show_room(s);
       flag.then((r)=>{
         res.render("show_room.ejs",{item:r,data:arr});
       }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>")
       })
             
}

exports.searchroom=(req,res)=>{

    let str=req.query.str;
   // console.log(str);
    let flag=model.searchroom(str);
    flag.then((r)=>{
       //console.log(r);
        res.json(r);
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>")
    })
}

let roomtemp;
exports.updateroom=(req,res)=>{
    let rid=req.query.rid;
    
    let flag=model.updateroom(rid);
    uid=rid;
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
    flag.then((r)=>{
       // console.log(r);
       roomtemp=r;
        res.render("room_update.ejs",{item:r,msg:"",data:arr});
    }).catch((err)=>{
        res.send("<h1>Something went wrong</h1>");
    })
    
}

exports.finalupdateroom=(req,res)=>{

   
    let {room_type,room_charges,id}=req.body;
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }

    
       let flag=model.finalupdateroom(room_type,room_charges,id,uid);
        flag.then(()=>{
            res.redirect("/show_room");
        }).catch((err)=>
    {console.log("hello");
        res.render("room_update.ejs",{item:roomtemp,data:arr,msg:"Update Failed"});
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

   
    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
   // console.log(arr[0]);
    if(typeof(arr[0])=="undefined")
    {
        return res.send("<h1>Some thing went wrong</h1>")
    }
   try{
     flag= await model.getallrnd();
   res.render("reg_patient.ejs",{nurse:flag.nurse,room:flag.room,doctor:flag.doctor,msg:"",data:arr})
   }
   catch(err)
   {
    res.send("<h1>Something went wrong</h1>")
   }
    // flag.then((r)=>{

        
    // }).catch((err)=>{
    //     alert("this contact already present")
    //     res.sen("/reg_patient");

    // })
   // res.render("reg_patient.ejs",{room:"",nurse:"",doctor:"",msg:""});
}

exports.addpatient= async (req,res)=>{

    //let {patientage}=req.body;
   // console.log(patientage);
    let {patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor}=req.body;
    let date=new Date();
    //console.log(date.getDate()+" "+(parseInt(date.getMonth())+1)+" "+date.getFullYear());
    date=date.getFullYear()+"-"+(parseInt(date.getMonth())+1)+"-"+date.getDate();

let p=new patient();
    
let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
if(typeof(arr[0])=="undefined")
    {
        return res.send("<h1>Some thing went wrong</h1>")
    }
    try{
       // res.render("reg_patient.ejs",{});
     await p.addpatient(patientname,patientage,gender,contact_number,medical_issue,date,room,nurse,doctor);
        res.redirect("/show_patient");
    }
    catch(err)
    {  console.log(err);
        //res.render("reg_patient.ejs",{msg:"Contact Already present"});
        //flag= await model.getallrnd();
        res.render("reg_patient.ejs",{nurse:flag.nurse,room:flag.room,doctor:flag.doctor,msg:"Contact Already Present",data:arr});
    }
}

exports.show_patient=(req,res)=>{

    let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
    if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
        let flag=model.show_patient()
         flag.then((r)=>{
          //console.log(typeof (r[0].discharge));
            res.render("show_patient.ejs",{item:r,data:arr});
         }).catch((err)=>{
            console.log(err);
            res.render("show_patient.ejs",{item:[],data:arr});
         })
      //  res.render("show_patient.ejs");
}


exports.updatepatient=(req,res)=>{

     let id=req.query.id;
     uid=id;
     let arr=[req.session.name,req.session.image,req.session.uid];
   
     req.session.uid=arr[2];      
     req.session.name=arr[0];
     req.session.image=arr[1];
     if(typeof(arr[0])=="undefined")
        {
            return res.send("<h1>Some thing went wrong</h1>")
        }
     let result=model.updatepatient(id);
     result.then((r)=>{
       //console.log(r);
       res.render("update_patient.ejs",{nurse:r.nurse,room:r.room,doctor:r.doctor,pen:r.p,msg:"",data:arr})
     }).catch((err)=>{
        console.log(err);
        res.send("<h1>Something went wrong</h1>");
     })
    // console.log(id);
}

exports.finalupdatepatient=(req,res)=>
{
    let {patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor}=req.body;

    try{
        model.finalupdatepatient(patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor,uid);
        res.redirect("/show_patient");
    }
    catch(err)
    {
        res.send("<h1>Something went wrong</h1>")
    }
     //console.log(patientname,patientage,gender,contact_number,medical_issue,room,nurse,doctor);   
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

        let uid=req.session.tid;
        //console.log(id);
        let arr=[req.session.name,req.session.image,req.session.uid];
   
    req.session.uid=arr[2];      
    req.session.name=arr[0];
    req.session.image=arr[1];
        if(typeof(arr[0])=="undefined")
            {
                return res.send("<h1>Some thing went wrong</h1>")
            }
        let flag=model.showdocpatient(uid);

        flag.then((r)=>{
                //console.log(r);
                  //console.log(r);
                    res.render("showdoc_patient.ejs",{data:arr,result:r});
               
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

exports.prescription=(req,res)=>{
    let pid=req.query.pid;
   // let {medicine,qty}=req.body;
    //console.log(pid);

    let flag=model.prescription(pid);
    flag.then((r)=>{
        //console.log(r);
        res.render("Prescription.ejs",{m:r});        
    }).catch((err)=>{
        console.log(err);
        res.send("<h>Something went wrong</h");
    })

    //res.render("Prescription.ejs");
}

exports.addmedicine= async(req,res)=>{

    let pid=req.query.pid;
    let {medicine,qty}=req.body;
     try{
       await  model.addmedicine(pid,medicine,qty);
       res.redirect("/showmedicinefrom?id="+pid);
     }
     catch(err){
        console.log(err);
        res.send("<h1>Something went wrong</h1>");
     }
};

// update patient status 
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

// bill
exports.bill=(req,res)=>{

   // console.log(req.query.id);
    let flag=model.bill(req.query.id);
     flag.then((r)=>{
          console.log(r)
          res.render("bill.ejs",{bill:r.b,medi:r.m});
     }).catch((err)=>{

        res.send("<h1>Something went wrong</h1>");
     });
   // res.render("bill.ejs");
}