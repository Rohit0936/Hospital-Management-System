let app=require("./src/app.js");

let PORT=3000;
app.listen(PORT,()=>{
    console.log("Server Started "+PORT);
});