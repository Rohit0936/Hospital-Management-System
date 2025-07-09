let user=require("../services/reguser_services");
let bcrypt=require("bcryptjs");
let model=require("../model/regmodel.js");
class reception extends user{

    regReception(name,email,contact,password,image,aid)
    {
        let hasPassword=bcrypt.hashSync(password,8);
        //console.log(hasPassword);
       return model.regReception(name,email,contact,hasPassword,image,aid);
     // console.log(name,"  ",email,"  ",specialzation,"  ",contact,"  ",experience,"  ",docImg,"  ",hasPassword);
    }
}

module.exports=reception;