function addimg(event){
   
   let img=document.createElement("img");
   img.setAttribute("src","");
   let temp= URL.createObjectURL(event.target.files[0]);
  // let image=document.getElementById("upload");
   img.src=temp;
   
   image.appendChild(img);
  // console.log("hello",temp);
}

function upimage(event){
   let temp=URL.createObjectURL(event.target.files[0]);
   let remove=document.getElementById("remove").src=temp;
  // image=document.getElementById("image");
}