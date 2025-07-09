let mysql=require("mysql2");

let conn=mysql.createConnection(
    {
       
        host:process.env.DB_HOST,
       user:process.env.DB_USER,
       password:process.env.DB_PASS,
       database:process.env.DB_NAME
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