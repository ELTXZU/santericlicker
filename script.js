// GAME DATA
let santtus = parseFloat(localStorage.getItem('santtus'))||0;
let santtuPerClick = parseFloat(localStorage.getItem('santtuPerClick'))||1;
let upgrades = JSON.parse(localStorage.getItem('upgrades'))||[];
let prestigePoints = parseInt(localStorage.getItem('prestige'))||0;

// RANKS (meme names)
const ranks=[
{name:"Gay Lanttu", img:"santtu.png", required:0},
{name:"Based Santtu", img:"santtu1.png", required:10000},
{name:"Lanttu God", img:"santtu2.png", required:500000},
{name:"Mega Lanttu", img:"santtu3.png", required:5000000},
{name:"Ultra Lanttu", img:"santtu4.png", required:50000000},
{name:"Lanttu Overlord", img:"santtu5.png", required:500000000},
{name:"Santtu Infinity", img:"santtu6.png", required:999000000000000}
];

// SHOP ITEMS (100+ simulated)
const shopList=[];
for(let i=0;i<100;i++){
shopList.push({name:"Upgrade "+(i+1), baseCost:Math.pow(10,i), cps:Math.pow(10,i-1)||1, unlocked:false, type:"auto"});
}

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
renderShop();
renderRanks();
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
updateMiniSanttu();
updateDisplay();
saveGame();
}

// MINI SANTTU SPAWN (rows, max 3)
function updateMiniSanttu(){
const container=document.querySelector('.santtu-container');
container.innerHTML='<img id="santtu-btn" src="'+getCurrentRank().img+'" onclick="clickSanttu(event)">'; // main santtu
let miniCount=upgrades[0]||0;
let maxPerRow=8;
let rowCount=Math.min(3,Math.ceil(miniCount/maxPerRow));
for(let r=0;r<rowCount;r++){
for(let i=0;i<Math.min(maxPerRow,miniCount-r*maxPerRow);i++){
const img=document.createElement('img');
img.src=getCurrentRank().img;
img.className='mini-santtu';
let angle=(360/maxPerRow)*i*Math.PI/180;
let radius=80+20*r;
img.style.left=100+radius*Math.cos(angle)+'px';
img.style.top=100+radius*Math.sin(angle)+'px';
container.appendChild(img);
}}
}

// GET CURRENT RANK
function getCurrentRank(){
let currentRank=ranks[0];
for(let i=ranks.length-1;i>=0;i--){if(santtus>=ranks[i].required){currentRank=ranks[i];break;}}
return currentRank;
}

// SHOP
function renderShop(){
const shopDiv=document.getElementById('shop-items');
shopDiv.innerHTML='';
shopList.forEach((item,index)=>{
let owned=upgrades[index]||0;
let cost=Math.floor(item.baseCost*Math.pow(1.15,owned));
if(!item.unlocked && santtus>cost*0.5)item.unlocked=true;
if(!item.unlocked)return;
const btn=document.createElement('div');
btn.className='shop-item'+(santtus>=cost?'':' disabled');
btn.innerHTML=`<h3>${item.name}</h3><p>Cost: ${cost.toLocaleString()} Santtus</p><p>Owned: ${owned}</p><p>+${item.cps} auto clicks/sec</p>`;
if(santtus>=cost){
btn.onclick=()=>{
santtus-=cost;
upgrades[index]=owned+1;
saveGame();
}
}
shopDiv.appendChild(btn);
});
}

// RANKS PAGE
function renderRanks(){
const div=document.getElementById('ranks-list');
div.innerHTML='';
ranks.forEach(rank=>{
let progress=Math.min(100,(santtus/rank.required)*100);
const item=document.createElement('div');
item.className='rank-item';
item.innerHTML=`<img src="${rank.img}"><span>${rank.name}</span><div>${Math.floor(progress)}%</div>`;
div.appendChild(item);
});
}

// AUTO CLICKER
setInterval(()=>{
let autoClicks=0;
for(let i=0;i<upgrades.length;i++){
autoClicks+= (upgrades[i]||0)* (shopList[i]?.cps||0);
}
santtus+=autoClicks/10; // 10x per sec division
updateMiniSanttu();
updateDisplay();
saveGame();
},100);

// RESET
function resetGame(){
if(confirm("Are u sure u wanna reset ur progress?")){
santtus=0; santtuPerClick=1; upgrades=[]; updateDisplay(); saveGame();
}
}

// PRESTIGE
function prestige(){
if(santtus>=1e12){
let gained=Math.floor(Math.sqrt(santtus/1e12));
prestigePoints+=gained;
alert(`U prestiged and got ${gained} prestige points 🙏`);
santtus=0; upgrades=[]; updateDisplay(); saveGame();
}else alert("U need at least 1 trillion Santtus to prestige 😭");
}

// INIT
updateDisplay();
