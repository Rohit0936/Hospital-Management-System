const user = require("./reguser_services");
let model=require("../model/regmodel.js");
class nurse extends user
{
   regnurse(...data)
      {
            return model.regnurse(data);
      }
}


module.exports=nurse;