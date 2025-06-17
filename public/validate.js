
let flag1=true;
function namevalid(str){
    let temp="";
    let label=document.getElementById("name");
    label.innerHTML="";
    for(let i=0;i<str.length;i++)
    {
          let ch=str.charCodeAt(i);
          if((ch>=97 && ch<=122) || (ch>=65 && ch<=90) || (ch==32))
          {
            temp=temp+str.charAt(i);
            flag1=true;
          }
          else{
            temp="";
            flag1=false;
            label.innerHTML="Invalid name (Enter only character)";
          }
    }
}

function setname1()
{

    if(flag1)
    {
        let strtemp=document.getElementById("setname").value;
   
        let str=strtemp.split(" ");
        strtemp="";
        
        for(let i=0;i<str.length;i++)
        {
           
            str[i]=str[i].trim();
            for(let j=0;j<str[i].length;j++)
                {
                    let ch=str[i].charCodeAt(j);
                    
                    if(ch>=97 && ch<=122 && j==0 && ch!=32)
                    {
                        strtemp=strtemp+String.fromCharCode(ch-32);
                    }
                    else if(ch>=65 && ch<=90 && j!=0 && ch!=32)
                    { 
                        //alert(strtemp);
                        strtemp=strtemp+String.fromCharCode(ch+32);
                    }
                    else if(ch!=32){
                        
                        strtemp=strtemp+String.fromCharCode(ch);
                    }
                }   
              if(str[i].length!=0)
              {
                strtemp=strtemp+" ";
              }
                
        }
       // alert(temp);
      
    
      let inp=document.getElementById("setname").value="";
       inp=document.getElementById("setname").value=strtemp;
    
    }
}

let flag2=true;
function emailvalid(str){

    let email=document.getElementById("email");
    if(str.endsWith(".com"))
    {
        email.innerHTML="";
        flag2=true;
    }
    else{
        email.innerHTML="Invalid email";
        flag2=false
    }
}

let flag3=true;
function cont(str)
{
    
    let con=document.getElementById("con");
    if(str.length==10)
    {
       con.innerHTML="";
       flag3=true;
    }
    else{
        flag3=false;
        con.innerHTML="Invalid Contact";
    }
}

let flag4=false;
function compare(str){
    let pass=document.getElementById("pass").value;
    let label=document.getElementById("comfirmpass");
    if(pass==str)
    {
        flag4=true;
        label.innerHTML="";
    }
    else{
        flag4=false;
        label.innerHTML="Password not match"
    }
}

function submitfrom()
{
    console.log(flag1+" "+flag2+" "+flag3+" "+flag4);
    if(flag1 && flag2 && flag3 && flag4)
    {
       return true;
    }
    else{
        alert("hello");
        return false;
    }
}
