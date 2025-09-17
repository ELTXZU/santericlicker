// GAME DATA
let santtus = parseFloat(localStorage.getItem('santtus'))||0;
let santtuPerClick = parseFloat(localStorage.getItem('santtuPerClick'))||1;
let upgrades = JSON.parse(localStorage.getItem('upgrades'))||[];
let prestigePoints = parseInt(localStorage.getItem('prestige'))||0;

// RANKS
const ranks=[
{name:"Gay Lanttu", img:"santtu.png", required:0},
{name:"Santtu 1", img:"santtu1.png", required:10000},
{name:"Santtu 2", img:"santtu2.png", required:500000},
{name:"Santtu 3", img:"santtu3.png", required:5000000},
{name:"Santtu 4", img:"santtu4.png", required:50000000},
{name:"Santtu 5", img:"santtu5.png", required:500000000},
{name:"Santtu 6", img:"santtu6.png", required:999000000000000}
];

// SHOP ITEMS
const shopList=[
{name:"Mini Santtu", baseCost:100, cps:1, unlocked:false, type:"mini"},
{name:"Santtu Clone", baseCost:1000, cps:5, unlocked:false},
{name:"Santtu Tower", baseCost:10000, cps:20, unlocked:false},
{name:"Santtu Factory", baseCost:50000, cps:100, unlocked:false},
{name:"Santtu Galaxy", baseCost:500000, cps:1000, unlocked:false},
{name:"Santtu Wormhole", baseCost:5000000, cps:10000, unlocked:false},
{name:"Santtu Dimension", baseCost:50000000, cps:100000, unlocked:false},
{name:"Santtu Multiverse", baseCost:500000000, cps:1000000, unlocked:false}
];

// SAVE
function saveGame(){
localStorage.setItem('santtus',santtus);
localStorage.setItem('santtuPerClick',santtuPerClick);
localStorage.setItem('upgrades',JSON.stringify(upgrades));
localStorage.setItem('prestige',prestigePoints);
}

// UPDATE DISPLAY
function updateDisplay(){
document.getElementById('santtu-count').innerText=santtus.toLocaleString()+" Santtus";
// Rank
let currentRank=ranks[0];
for(let i=ranks.length-1;i>=0;i--){if(santtus>=ranks[i].required){currentRank=ranks[i];break;}}
document.getElementById('rank-name').innerText=currentRank.name;
document.getElementById('rank-img').src=currentRank.img;

renderShop();
}

// TABS
function showTab(tab){
document.querySelectorAll('.tab').forEach(t=>t.style.display='none');
document.getElementById(tab).style.display='block';
}

// CLICK EFFECT
function clickEffect(e){
const effect=document.getElementById('click-effect');
effect.style.left=e.clientX+'px';
effect.style.top=e.clientY+'px';
effect.style.display='block';
setTimeout(()=>effect.style.display='none',300);
}

// CLICK SANTTU
function clickSanttu(e){
santtus+=santtuPerClick;
clickEffect(e);
spawnMiniSanttu();
updateDisplay();
saveGame();
}

// MINI SANTTU SPAWN
function spawnMiniSanttu(){
let miniUpgrade=upgrades[0]||0;
if(miniUpgrade<1)return;
const container=document.querySelector('.santtu-container');
for(let i=0;i<miniUpgrade;i++){
const img=document.createElement('img');
img.src=document.getElementById('rank-img').src;
img.className='mini-santtu';
const angle=Math.random()*2*Math.PI;
const radius=80;
img.style.left=100+radius*Math.cos(angle)+'px';
img.style.top=100+radius*Math.sin(angle)+'px';
container.appendChild(img);
setTimeout(()=>img.remove(),5000);}
}

// SHOP
function renderShop(){
const shopDiv=document.getElementById('shop-items');
shopDiv.innerHTML='';
shopList.forEach((item,index)=>{
let owned=upgrades[index]||0;
let cost=Math.floor(item.baseCost*Math.pow(1.15,owned));
// Unlock gradually
if(!item.unlocked && santtus>cost*0.5)item.unlocked=true;
if(!item.unlocked)return;
const btn=document.createElement('div');
btn.className='shop-item'+(santtus>=cost?'':' disabled');
btn.innerHTML=`<h3>${item.name}</h3><p>Cost: ${cost.toLocaleString()} Santtus</p><p>Owned: ${owned}</p><p>+${item.cps} per click</p>`;
if(santtus>=cost){btn.onclick=()=>{
santtus-=cost;
upgrades[index]=owned+1;
santtuPerClick+=item.cps;
updateDisplay();
saveGame();
}}
shopDiv.appendChild(btn);
});
}

// RESET
function resetGame(){
if(confirm("Are u sure u wanna reset ur progress?")){
santtus=0;
santtuPerClick=1;
upgrades=[];
updateDisplay();
saveGame();
}
}

// PRESTIGE
function prestige(){
if(santtus>=1e12){
let gained=Math.floor(Math.sqrt(santtus/1e12));
prestigePoints+=gained;
alert(`U prestiged and got ${gained} prestige points 🙏`);
santtus=0;
santtuPerClick=1+prestigePoints;
upgrades=[];
updateDisplay();
saveGame();
}else alert("U need at least 1 trillion Santtus to prestige 😭");
}

// AUTO SAVE
setInterval(()=>saveGame(),5000);

// INIT
updateDisplay();
