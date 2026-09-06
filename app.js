
const D = window.HURUDGANNA;
let lang = "ru";
const $ = s => document.querySelector(s);
const tr = (o, key) => o[key + (lang === "ru" ? "Ru" : "En")] || "";

function applyLang(){
  document.body.classList.toggle("en", lang === "en");
  $("#lang").textContent = lang === "ru" ? "EN" : "RU";
  document.documentElement.lang = lang;
  renderProjects();
  renderArchive();
  renderAbout();
}
$("#lang").addEventListener("click",()=>{lang = lang==="ru"?"en":"ru"; applyLang();});

function ph(){
  return `<div class="placeholder">${lang==="ru"?"Фото":"Image"}</div>`;
}
function image(src, alt=""){
  return src ? `<img src="${src}" alt="${alt}">` : "";
}
function statusText(x){
  if(x.status==="available") return lang==="ru" ? `В наличии${x.size ? " · размер "+x.size : ""}` : `Available${x.size ? " · size "+x.size : ""}`;
  if(x.status==="commission") return lang==="ru" ? "Под заказ" : "Made to order";
  return lang==="ru" ? "Архив" : "Archive";
}

function renderProjects(){
  const box=$("#projectGrid"); box.innerHTML="";
  D.projects.forEach(p=>{
    const el=document.createElement("article");
    el.className="project-card";
    el.innerHTML=`<div class="project-cover">${p.cover?image(p.cover,tr(p,"title")):ph()}</div>
      <h3>${tr(p,"title")}</h3><p>${tr(p,"intro")}</p>`;
    el.addEventListener("click",()=>openProject(p.id));
    box.appendChild(el);
  });
}
function openProject(id){
  const p=D.projects.find(x=>x.id===id); if(!p) return;
  $("#overlayTitle").textContent=tr(p,"title");
  $("#overlayName").textContent=tr(p,"title");
  $("#overlayIntro").textContent=tr(p,"intro");
  const grid=$("#itemGrid"); grid.innerHTML="";
  p.items.forEach(x=>{
    const el=document.createElement("article"); el.className="item";
    el.innerHTML=`<div class="item-photo">${x.image?image(x.image,tr(x,"name")):ph()}</div>
      <h3>${tr(x,"name")}</h3><p>${tr(x,"material")}</p><span class="status">${statusText(x)}</span>`;
    grid.appendChild(el);
  });
  $("#overlay").classList.add("open");
  document.body.style.overflow="hidden";
}
function closeProject(){
  $("#overlay").classList.remove("open");
  document.body.style.overflow="";
}
$("#closeOverlay").addEventListener("click",closeProject);
$("#overlay").addEventListener("click",e=>{if(e.target.id==="overlay") closeProject();});
document.addEventListener("keydown",e=>{if(e.key==="Escape") closeProject();});

function renderArchive(){
  const box=$("#archiveGrid"); box.innerHTML="";
  D.archive.forEach(x=>{
    const el=document.createElement("article"); el.className="archive-card";
    el.innerHTML=`<div class="image">${x.image?image(x.image,tr(x,"title")):ph()}</div>
      <h3>${tr(x,"title")}</h3><p>${tr(x,"meta")}</p>`;
    box.appendChild(el);
  });
}
function renderAbout(){
  $("#aboutText").textContent=tr(D.about,"text");
  $("#facts").innerHTML=(lang==="ru"?D.about.factsRu:D.about.factsEn).join("<br>");
  const photo=$("#aboutPhoto");
  photo.innerHTML=D.about.portrait ? image(D.about.portrait,"Anna Khurudzhi") : `<span>${lang==="ru"?"Фото Анны":"Anna's photo"}</span>`;
}
function contact(type){
  const value=D.contacts[type];
  if(!value){ alert(lang==="ru"?"Добавим реальную ссылку перед публикацией.":"We will add the real contact before publishing."); return false; }
  if(type==="email") window.location.href="mailto:"+value;
  else window.open(value,"_blank");
  return false;
}
window.contact=contact;
window.openProject=openProject;

applyLang();
