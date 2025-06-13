let user=require("../services/reguser_services");
let bcrypt=require("bcryptjs");
let model=require("../model/regmodel.js");
class Doctor extends user{

    regDoctor(name,email,specialzation,contact,experience,docImg,role,password,)
    {
        let hasPassword=bcrypt.hashSync(password,8);
        //console.log(hasPassword);
       let flag=model.reguser(name,email,specialzation,contact,experience,docImg,role,hasPassword);
     // console.log(name,"  ",email,"  ",specialzation,"  ",contact,"  ",experience,"  ",docImg,"  ",hasPassword);
    }
}

module.exports=Doctor;