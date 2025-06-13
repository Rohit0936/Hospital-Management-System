let routes=require("express");
let control=require("../controller/regCtlr.js");
let router=routes.Router();

router.get("/",control.home);
router.get("/login",control.login);
router.get("/reg_doc",control.reg_doc);
router.get("/show_doc",control.show_doc);
router.post("/loginuser",control.loginuser);

module.exports=router;