fetch("https://json-api.uz/api/project/fn44-amaliyot/cars",{})
.then(
(res)=>
{
if(!res.ok) {
document.querySelector("#errorBox").style.display="flex";
document.querySelector(".js-error-code").textContent=res.status;
}
 return res.json()
})
.then(
(res)=>uiWrite(res.data))
.catch((err)=>{
console.log(err);
document.querySelector("#errorBox").style.display="flex";
document.querySelector(".js-error-code").style.display="none";
});
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
  document.querySelector(".js-request-toast").style.backgroundColor="#c6e2ff";
  document.querySelector(".js-request-toast").style.color="#000";
  let uiClass = "justify-center items-center min-w-[320px] min-h-[50px] rounded-[20px] font-[Poppins] text-[18px] bg-[#C6E2FF] border-[1px solid] hidden js-request-toast px-4";
  uiClass=uiClass.split(" ").forEach(el=>document.querySelector(".js-request-toast").classList.add(el));
  document.querySelector(".js-request-toast").textContent="So'rov yuborilmoqda";
  let targetedCard =  document.querySelector(`[data-card-id="${evt.target.getAttribute("data-delete")}"]`);
  document.querySelector(".js-request-toast").style.display="flex";
  fetch(`https://json-api.uz/api/project/fn44-amaliyot/cars/${evt.target.getAttribute("data-delete")}`,{
    method: "DELETE",
  }).then((res)=> {
    if(res.ok) {
      targetedCard.style.display="none";
      document.querySelector(".js-request-toast").style.display="flex";
      document.querySelector(".js-request-toast").style.color="#000";
      document.querySelector(".js-request-toast").style.backgroundColor="#00ff00";
      document.querySelector(".js-request-toast").textContent="Muvaffaqiyatli bajarildi";
      setTimeout(()=>{
      document.querySelector(".js-request-toast").style.display="none";
      },1500)
    } else if(!res.ok) {
        document.querySelector(".js-request-toast").style.display="flex";
        document.querySelector(".js-request-toast").style.color="#fff";
        document.querySelector(".js-request-toast").style.backgroundColor="#ff0000";
        document.querySelector(".js-request-toast").textContent =`Tizimda qandaydur nosozlik bo'moqda!\nXatolik kodi - ${res.status?res.status:'No content'}`;
        setTimeout(()=>{
           document.querySelector(".js-request-toast").style.display="none";
        },1500)
    }
  }).catch((res)=>
    console.log(res));
  });
};