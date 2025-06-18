let model=require("../model/regmodel.js");
let bcrypt=require("bcryptjs");
class login{

    async loginuser(username,password,role)
    {
       
        let flag;
        try{
            let flag= await model.loginuser(username,password,role)
            if(flag.name==="admin")
            {
                return flag
            }
            else{

                let result=bcrypt.compareSync(password,flag.passwo)
                //console.log(result);
                if(result)
                {
                    return  flag
                }
                else{
                   
                    return flag=[];
                }
            }
         
        }
        catch(err)
        {
           // console.log(err);
            return flag
        }
}

}
module.exports=login;


// //try{
//    let temp=await module.loginuser(username,password,role)
//    return temp;
// //}
// catch(err)
// {
//     console
// }
