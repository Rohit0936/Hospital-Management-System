let user=require("../services/reguser_services");
let bcrypt=require("bcryptjs");
let model=require("../model/regmodel.js");
class Doctor extends user{

  regDoctor(name, email, Specialization, contact, experience, docImg,password,aid) {
    let hasPassword = bcrypt.hashSync(password, 8);
    return model.reguser(name, email, Specialization, contact, experience, docImg, hasPassword,aid);
}

}

module.exports=Doctor;