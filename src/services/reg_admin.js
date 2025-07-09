let bcrypt=require("bcrypt");
let model=require("../model/regmodel");
class admin
{
   addadmin(name,contact,email,image,password)
   {
      let passwordhash=bcrypt.hashSync(password,8);

      return model.addadmin(name,contact,email,image,passwordhash);
   }
}

module.exports=admin;