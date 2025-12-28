const input = document.getElementById("input");
const startBtn = document.getElementById("startBtn");
const popupBox = document.getElementById("popup-container");
const appBox = document.getElementById("appBox");
const chill = document.getElementById("chill-popup");

/* Snow */
(function(){
  for(let i=0;i<40;i++){
    const snow=document.createElement("span");
    snow.innerText="❄";
    snow.style.left=Math.random()*100+"vw";
    snow.style.animationDuration=3+Math.random()*5+"s";
    snow.style.fontSize=10+Math.random()*20+"px";
    document.getElementById("snow-container").appendChild(snow);
  }
})();

/* Thoughts */
const calm=[
  "Maybe it's nothing… but maybe not 👀",
  "Feels okay… suspiciously okay",
  "Overthinking starter pack loading…"
];

const panic=[
  "What if everyone noticed 😭",
  "This could totally ruin everything",
  "WHY DID YOU DO THAT 💀"
];

const chaos=[
  "Congrats this will haunt you forever 💀",
  "Villain story unlocked",
  "See you at 3:17 AM 😌"
];

function spawn(text,shake=false){
  const div=document.createElement("div");
  div.className="popup";
  const colors=["red","green","gold"];
  div.classList.add(colors[Math.floor(Math.random()*colors.length)]);
  if(shake) div.classList.add("shiver");
  div.innerText=text;
  div.style.top=Math.random()*80+"%";
  div.style.left=Math.random()*80+"%";
  popupBox.appendChild(div);
  setTimeout(()=>div.remove(),3500);
}

function runPhase(list,speed,shake,next){
  let loop=setInterval(()=>{
    spawn(list[Math.floor(Math.random()*list.length)],shake);
  },speed);

  setTimeout(()=>{
    clearInterval(loop);
    if(next) next();
  },4500);
}

function chaosMode(){
  appBox.classList.add("trr");
  document.body.classList.add("flash");

  let loop=setInterval(()=>{
    spawn(chaos[Math.floor(Math.random()*chaos.length)],true);
  },220);

  setTimeout(()=>{
    clearInterval(loop);
    showEnd();
  },4500);
}

function showEnd(){
  chill.classList.remove("hidden");
}

window.resetAll=()=>location.reload();

/* START */
startBtn.addEventListener("click",()=>{
  const value=input.value.trim();
  if(!value){
    alert("Enter what you're overthinking 😭");
    return;
  }

  startBtn.disabled=true;

  runPhase(calm,1200,false,()=>runPhase(panic,700,true,()=>chaosMode()));
});
