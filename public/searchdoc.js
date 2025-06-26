let doc=(str)=>{
    let xhr=new XMLHttpRequest();
    
    xhr.open("get","/searchdoc?na="+str,true);
 
    xhr.onreadystatechange=()=>{

        if(xhr.readyState==4 && xhr.status==200)
        {
            let data=xhr.responseText;
            data=JSON.parse(data);
            let maindiv=document.getElementById("main");
            maindiv.innerHTML="";
            maindiv.setAttribute("class","row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4");

            maindiv.innerHTML="";  
            if(data.length==0)
                {
                    maindiv.innerHTML="<h2 style='color:red; width:100%; text-align:center;'>Doctor Not Found</h2>"
                }   
                else{
                    data.forEach((item,index)=>{
                        let d1=document.createElement("div");
                        d1.setAttribute("class","col");
                        let div1=document.createElement("div");
                        div1.setAttribute("class","card h-100 shadow doctor-card-new text-center");
                        let div2=document.createElement("div");
                        div2.setAttribute("class","card-body d-flex flex-column align-items-center p-4");
                        // This div store a doctor detail
                        let div3=document.createElement("div");
                        div3.setAttribute("class","doctor-avatar mb-3");
                        //console.log(item.Doctor_Image);
                        let img=document.createElement("img")
                        img.setAttribute("src",item.Doctor_Image);
                        img.setAttribute("class","img-fluid");
                        div3.appendChild(img);
                        div2.appendChild(div3);
        
                        let h5=document.createElement("h5");
                        h5.setAttribute("class","fw-bold text-dark mb-1");
                        h5.innerHTML="DR."+item.doctor_name;
                        div2.appendChild(h5);
                       // div3.appendChild(div2);
                        let p=document.createElement("p");
                        p.setAttribute("class","text-muted mb-2");
                        let i=document.createElement("i");
                        i.setAttribute("class","fas fa-stethoscope me-1 text-danger");
                        p.appendChild(i);
                        p.append(item.doctor_specialization);
                        div2.appendChild(p);
        
                         p=document.createElement("p");
                         p.setAttribute("class","mb-1");
                         i=document.createElement("i")
                         i.setAttribute("class","fas fa-phone me-1 text-primary");
                        p.appendChild(i);
                        p.append(" +91 "+item.doctor_contact);
                        div2.appendChild(p);
        
                        p=document.createElement("p")
                        p.setAttribute("class","mb-1");
                        i=document.createElement("i");
                        i.setAttribute("class","fas fa-briefcase me-1 text-success");
                       p.appendChild(i);
                       p.append(item.doctor_Experience+" years experience");
                       div2.appendChild(p);
        
                       p=document.createElement("p")
                       p.setAttribute("class","mb-3");
                        i=document.createElement("i")
                        i.setAttribute("class","fas fa-envelope me-1 text-warning");
                       p.appendChild(i);
                       p.append(item.doctor_email);
                       div2.appendChild(p);
        
                      
        
                       
                       // div2.appendChild(div3);
                        // this div store footer (delete and update)
        
                        let div4=document.createElement("div");
                        div4.setAttribute("class","card-footer bg-white d-flex justify-content-center gap-2");
                        let a=document.createElement("a");
                        console.log(item.did);
                        a.setAttribute("href","/updatedoctor?did="+item.did);
                        a.setAttribute("class","btn btn-outline-primary btn-sm px-3");
                        i=document.createElement("i");
                        i.setAttribute("class","fas fa-pen me-1");
                        a.appendChild(i);
                        a.append("Edit");
                        div4.appendChild(a);
        
                        a=document.createElement("a");
                        a.setAttribute("href","/deletedoctor?uid="+item.uid);
                        a.setAttribute("class","btn btn-outline-danger btn-sm px-3");
                        i=document.createElement("i");
                        i.setAttribute("class","fas fa-trash me-1");
                        a.appendChild(i);
                        a.append("Delete");
        
                        div4.appendChild(a);// close footer
                      
        
                        div1.appendChild(div2);
                        div1.appendChild(div4);
                        d1.appendChild(div1);
                        maindiv.append(d1);
                    });
                }       
           

           
        }
    }
    xhr.send();
}

function showrecep(str){

    let xhr=new XMLHttpRequest();
    
    xhr.open("get","/searchrecep?na="+str,true);
 
    xhr.onreadystatechange=()=>{

        if(xhr.readyState==4 && xhr.status==200)
        {
            let data=xhr.responseText;
            data=JSON.parse(data);
            let maindiv=document.getElementById("main");
            maindiv.innerHTML="";
            maindiv.setAttribute("class","row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4");

            maindiv.innerHTML="";  
            if(data.length==0)
                {
                    maindiv.innerHTML="<h2 style='color:red; width:100%; text-align:center;'>Doctor Not Found</h2>"
                }   
                else{
                    data.forEach((item,index)=>{
                        let d1=document.createElement("div");
                        d1.setAttribute("class","col");
                        let div1=document.createElement("div");
                        div1.setAttribute("class","card h-100 shadow doctor-card-new text-center");
                        let div2=document.createElement("div");
                        div2.setAttribute("class","card-body d-flex flex-column align-items-center p-4");
                        // This div store a doctor detail
                        let div3=document.createElement("div");
                        div3.setAttribute("class","doctor-avatar mb-3");
                        //console.log(item.Doctor_Image);
                        let img=document.createElement("img")
                        img.setAttribute("src",item.rec_Image);
                        img.setAttribute("class","img-fluid");
                        div3.appendChild(img);
                        div2.appendChild(div3);
        
                        let h5=document.createElement("h5");
                        h5.setAttribute("class","fw-bold text-dark mb-1");
                        h5.innerHTML=item.reception_name;
                        div2.appendChild(h5);
                       // div3.appendChild(div2);
                       
        
                        let p=document.createElement("p");
                         p.setAttribute("class","mb-1");
                         i=document.createElement("i")
                         i.setAttribute("class","fas fa-phone me-1 text-primary");
                        p.appendChild(i);
                        p.append(" +91 "+item.reception_contact);
                        div2.appendChild(p);
        
                       
        
                       p=document.createElement("p")
                       p.setAttribute("class","mb-3");
                        i=document.createElement("i")
                        i.setAttribute("class","fas fa-envelope me-1 text-warning");
                       p.appendChild(i);
                       p.append(item.reception_email);
                       div2.appendChild(p);
        
    
        
                        let div4=document.createElement("div");
                        div4.setAttribute("class","card-footer bg-white d-flex justify-content-center gap-2");
                        let a=document.createElement("a");
                        a.setAttribute("href","/recepupdate?rid="+item.rid);
                        a.setAttribute("class","btn btn-outline-primary btn-sm px-3");
                        i=document.createElement("i");
                        i.setAttribute("class","fas fa-pen me-1");
                        a.appendChild(i);
                        a.append("Edit")
                        div4.appendChild(a);
        
                        a=document.createElement("a");
                        a.setAttribute("href","/recepdelete?rid="+item.uid);
                        a.setAttribute("class","btn btn-outline-danger btn-sm px-3");
                        i=document.createElement("i");
                        i.setAttribute("class","fas fa-trash me-1");
                        a.appendChild(i);
                        a.append("Delete")
        
                        div4.appendChild(a);// close footer
                        
        
                        div1.appendChild(div2);
                        div1.appendChild(div4);
                        d1.appendChild(div1);
                        maindiv.append(d1);
                    });
                }       
           

           
        }
    }
    xhr.send();
}

function nurse(str)
{
    let xhr=new XMLHttpRequest();

    xhr.open("get","/searchnurse?str="+str,true);

    xhr.onreadystatechange=()=>{
  
        if(xhr.readyState==4 && xhr.status==200)
            {
            
                let data=xhr.responseText;
                data=JSON.parse(data);
                //console.log(data);
                let maindiv=document.getElementById("main");
                maindiv.innerHTML="";
                maindiv.setAttribute("class","row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4");
    
                maindiv.innerHTML="";  
                if(data.length==0)
                    {
                        maindiv.innerHTML="<h2 style='color:red; width:100%; text-align:center;'>Nurse Not Found</h2>"
                    }   
                    else{
                        data.forEach((item,index)=>{
                            let d1=document.createElement("div");
                            d1.setAttribute("class","col");
                            let div1=document.createElement("div");
                            div1.setAttribute("class","card h-100 shadow doctor-card-new text-center");
                            let div2=document.createElement("div");
                            div2.setAttribute("class","card-body d-flex flex-column align-items-center p-4");
                            // This div store a doctor detail
                            let div3=document.createElement("div");
                            div3.setAttribute("class","doctor-avatar mb-3");
                            //console.log(item.Doctor_Image);
                            let img=document.createElement("img")
                            img.setAttribute("src",item.nurse_image);
                            img.setAttribute("class","img-fluid");
                            div3.appendChild(img);
                            div2.appendChild(div3);
            
                            let h5=document.createElement("h5");
                            h5.setAttribute("class","fw-bold text-dark mb-1");
                            h5.innerHTML=item.nurse_name;
                            div2.appendChild(h5);
                           // div3.appendChild(div2);
                           
                         let p;
                           if(item.nurse_shift==="Day")
                           {
                            p=document.createElement("p");
                             p.setAttribute("class","mb-1");
                            // p.appendChild("🌤️ ");
                            // p.append(item.nurse_shift);
                            p.innerHTML="🌤️ "+item.nurse_shift;
                            div2.appendChild(p);
                           }
                           else{
                            p=document.createElement("p");
                            p.setAttribute("class","mb-1");
                        //    p.appendChild("🌙 ");
                        //    p.append("item.nurse_shift");
                           p.innerHTML="🌙 "+item.nurse_shift;
                           div2.appendChild(p);
                           }
                           

                             p=document.createElement("p");
                             p.setAttribute("class","mb-1");
                             i=document.createElement("i")
                             i.setAttribute("class","fas fa-phone me-1 text-primary");
                            p.appendChild(i);
                            p.append(" +91 "+item.nurse_contact);
                            div2.appendChild(p);
            
                           
            
                           p=document.createElement("p")
                           p.setAttribute("class","mb-3");
                            i=document.createElement("i")
                            i.setAttribute("class","fas fa-envelope me-1 text-warning");
                           p.appendChild(i);
                           p.append(item.nurse_email);
                           div2.appendChild(p);
            
        
            
                            let div4=document.createElement("div");
                            div4.setAttribute("class","card-footer bg-white d-flex justify-content-center gap-2");
                            let a=document.createElement("a");
                            a.setAttribute("href","/updatenurse?nid="+item.nid);
                            a.setAttribute("class","btn btn-outline-primary btn-sm px-3");
                            i=document.createElement("i");
                            i.setAttribute("class","fas fa-pen me-1");
                            a.appendChild(i);
                            a.append("Edit")
                            div4.appendChild(a);
            
                            a=document.createElement("a");
                            a.setAttribute("href","/deletenurse?nid="+item.uid);
                            a.setAttribute("class","btn btn-outline-danger btn-sm px-3");
                            i=document.createElement("i");
                            i.setAttribute("class","fas fa-trash me-1");
                            a.appendChild(i);
                            a.append("Delete")
            
                            div4.appendChild(a);// close footer
                            
            
                            div1.appendChild(div2);
                            div1.appendChild(div4);
                            d1.appendChild(div1);
                            maindiv.append(d1);
                        });
                    }      
            }

    }

    xhr.send();
}

function room(s)
{
    let xhr=new XMLHttpRequest();

    
    xhr.open("get","/searchroom?str="+s,true);

    xhr.onreadystatechange=()=>{

        if(xhr.readyState==4 && xhr.status==200)
        {
        
           let data=xhr.responseText;
           data=JSON.parse(data);
          
           let maindiv=document.getElementById("maindiv");
           maindiv.innerHTML="";

           //console.log(data);
           data.forEach((item,index)=>{
                
                let div1=document.createElement("div");
                div1.setAttribute("class","col");

                let div2=document.createElement("div");
                div2.setAttribute("class","card h-100 shadow room-card text-center");

                let div3=document.createElement("div");
                div3.setAttribute("class","card-body d-flex flex-column align-items-center p-4");

                let div4=document.createElement("div");
                div4.setAttribute("class","room-icon mb-3");

                let i=document.createElement("i");
                i.setAttribute("class","fas fa-bed");
                div4.appendChild(i);
                div3.appendChild(div4);

                if(item.Room_type==="General")
                {
                    let h5=document.createElement("h5")
                    h5.innerHTML="Bed No: "+item.room_no;
                    div3.appendChild(h5);
                }
                else
                {
                    let h5=document.createElement("h5")
                    h5.innerHTML="<h5 class='fw-bold text-dark mb-1'>Room No: "+item.room_no+"</h5>";
                    div3.appendChild(h5);
                }

                let p=document.createElement("p");
                p.setAttribute("class","text-muted mb-2")
                i=document.createElement("i");
                i.setAttribute("class","fas fa-hospital me-1 text-danger");
                p.appendChild(i);
                p.append(item.room_type);
                div3.appendChild(p);

                p=document.createElement("p");
                p.setAttribute("class","mb-3")
                i=document.createElement("i");
                i.setAttribute("class","fas fa-money-bill me-1 text-success");
                p.appendChild(i);
                p.append("₹"+item.room_charges+"/day");
                div3.appendChild(p);

                if(item.room_status==="true")
                {
                    let h6=document.createElement("h6");
                    h6.innerHTML="<label >Status:</label><label  style='color: green;'>Avaiable</label>"
                    div3.appendChild(h6);
                }
                else{
                    let h6=document.createElement("h6");
                    h6.innerHTML="<label >Status:</label><label  style='color: red;'>Not Avaiable</label>"
                    div3.appendChild(h6);
                }
               div2.appendChild(div3);

               let div5=document.createElement("div");
               div5.setAttribute("class","card-footer bg-white d-flex justify-content-center gap-2");

               let a=document.createElement("a");
               a.setAttribute("href","/updateroom?rid="+item.room_id);
               a.setAttribute("class","btn btn-outline-primary btn-sm px-3");
               i=document.createElement("i");
               i.setAttribute("class","fas fa-pen me-1");
               a.appendChild(i)
               a.append("Edit")
               div5.appendChild(a);

               a=document.createElement("a");
               a.setAttribute("href","/deleteroom?rid="+item.room_id);
               a.setAttribute("class","btn btn-outline-danger btn-sm px-3");
               i=document.createElement("i");
               i.setAttribute("class","fas fa-trash me-1");
               a.appendChild(i)
               a.append("Delete");
               div5.appendChild(a);

             div2.appendChild(div3);
             div2.appendChild(div5);
             div1.appendChild(div2);
             maindiv.appendChild(div1);
           });
        }
    }
    xhr.send();
}