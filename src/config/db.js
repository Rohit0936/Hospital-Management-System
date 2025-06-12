let mysql=require("mysql2");

let conn=mysql.createConnection(
    {
        host:"localhost",
       user:"root",
       password:"root",
       database:"hospital"
    }

);

conn.connect((err)=>{
    if(err)
    {
        console.log("Database connection failed "+err);
    }
    else
    {
        console.log("Database Connection successfully");
    }
});

module.exports=conn;