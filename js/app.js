fetch("https://json-api.uz/api/project/fn44-amaliyot/cars",{})
.then(
(res)=>res.json())
.then(
(res)=>uiWrite(res.data))
.catch((err)=>console.log(err));
function uiWrite(data) {
    skeletonUiWrite(false)
    const elMainTemplate=document.getElementById("jsCardTemplate");
    data.forEach((el,inx) => {
    let elCloneTemplate=elMainTemplate.cloneNode(true).content;
    elCloneTemplate.querySelector(".js-data-img").src=el.image;
    elCloneTemplate.querySelector(".js-data-name").textContent=el.name ? el.name : "No title";
    elCloneTemplate.querySelector(".js-data-type").textContent=el.type ? el.type : "No about";
    elCloneTemplate.querySelector(".js-data-fuel").textContent=el.fuel ? el.fuel : "No about";
    elCloneTemplate.querySelector(".js-data-gearbox").textContent=el.details.gearbox ? el.details.gearbox : "No about";
    elCloneTemplate.querySelector(".js-data-drive").textContent=el.drive ? el.drive : "No about";
    elCloneTemplate.querySelector(".js-data-delete").setAttribute("data-delete", el.id ? el.id : inx) ;
    document.getElementById("cardsBox").appendChild(elCloneTemplate);
    });
    document.querySelectorAll(".js-card").forEach((el)=>{
      el.setAttribute("data-card-id",el.querySelector(".js-data-delete").getAttribute("data-delete"));
      elementDelete(el.querySelector(".js-data-delete"));
    });
};
function skeletonUiWrite(bool, len){
  if(bool==true) {
    let arr = Array.from({length: len},()=>Math.trunc(Math.random()*2));
    arr.forEach(()=>{
    const elMainTemplate=document.getElementById("jsSkeletonTemplate");
    let elCloneTemplate=elMainTemplate.cloneNode(true).content;
    document.getElementById("skeletonBox").append(elCloneTemplate)
    })
  } else if(bool==false) {
    document.getElementById("skeletonBox").innerHTML=null;
  }
};
skeletonUiWrite(true, 7);  
function elementDelete(element) {
  element.addEventListener("click",(evt)=>{
  let targetedCard =  document.querySelector(`[data-card-id="${evt.target.getAttribute("data-delete")}"]`);
  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/x/${evt.target.getAttribute("data-delete")}`,{
    method: "DELETE",
  }).then((res)=> {
    if(res.ok) {
      targetedCard.style.display="none";
    } else if(!res.ok) alert(`Tizimda qandaydur nosozlik bo'moqda!\nXatolik kodi - ${res.status?res.status:'No content'}`);
  }).catch((res)=>
    console.log(res));
  });
};