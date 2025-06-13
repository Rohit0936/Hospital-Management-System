let routes=require("express");
let control=require("../controller/regCtlr.js");
let router=routes.Router();

router.get("/",control.home);
router.get("/home",control.home);

router.get("/admindashbord",control.admindashbord);
router.get("/login",control.login);
router.get("/reg_doc",control.reg_doc);
router.get("/show_doc",control.show_doc);
router.get("/reg_rec",control.reg_rec);
router.get("/show_rec",control.show_rec);
router.post("/loginuser",control.loginuser);

module.exports=router;