let routes=require("express");
let control=require("../controller/regCtlr.js");
let  multer=require("multer");
let path=require("path");
let router=routes.Router();


let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public/upload');
    },

    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})

let upload=multer({storage:storage});

router.get("/",control.home);
router.get("/login",control.login);
router.get("/reg_doc",control.reg_doc);
router.get("/show_doc",control.show_doc);
router.post("/loginuser",control.loginuser);
router.post("/regdoctor",upload.single("imag"),control.regDoctor);
router.get("/showdoctor",control.showDoctor);
router.get("/updatedoctor",control.updateDocotr);
router.post("/finalupdatedoc",upload.single("imag"),control.finalupdatedoc);
router.get("/deletedoctor",control.deletedoc);
router.get("/searchdoc",control.searchdoc);
module.exports=router; 
