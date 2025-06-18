const user = require("./reguser_services");
let model=require("../model/regmodel");
class room extends user
{
    addromm(...data)
    {
        
       return model.addromm(data);
    }
}
module.exports=room;