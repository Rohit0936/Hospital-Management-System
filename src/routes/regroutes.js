let routes=require("express");
let control=require("../controller/regCtlr.js");
let router=routes.Router();

router.get("/",control.home);
router.get("/login",control.login);
router.post("/loginuser",control.loginuser)
module.exports=router;