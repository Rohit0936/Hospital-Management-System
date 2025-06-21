let model=require("../model/regmodel.js");
let user=require("../services/reguser_services.js");
class patient extends user{

    addpatient(...data)
    {
        return model.addpatient(data);
    }
}

module.exports=patient;