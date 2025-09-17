// ==========================
// GAME DATA
// ==========================
let santtus = parseFloat(localStorage.getItem('santtus'))||0;
let santtuPerClick = 3; // early game easier
let upgrades = JSON.parse(localStorage.getItem('upgrades'))||[];
let prestigePoints = parseInt(localStorage.getItem('prestige'))||0;

// ==========================
// RANKS
// ==========================
const ranks=[
  {name:"Gay Lanttu", img:"santtu.png", required:0},
  {name:"Based Santtu", img:"santtu1.png", required:10000},
  {name:"Lanttu God", img:"santtu2.png", required:500000},
  {name:"Mega Lanttu", img:"santtu3.png", required:1e9},
  {name:"Ultra Lanttu", img:"santtu4.png", required:1e12},
  {name:"Lanttu Overlord", img:"santtu5.png", required:1e36} // vigintillion
];

// ==========================
// SHOP UPGRADES
// ==========================
const shopList=[];
const prefixes=["Mini","Mega","Ultra","Quantum","Ludicrous","Galactic","Infinite","Santtu","Lanttu"];
const suffixes=["Factory","Machine","Wormhole","Dimension","Overload","Clone","Multiplier","Blast","Frenzy","Portal"];
for(let i=0;i<100;i++){
    const name = prefixes[i%prefixes.length]+" "+suffixes[i%suffixes.length]+" #"+(i+1);
    const baseCost = Math.floor(Math.pow(10, i*0.5+2));
    const cps = Math.floor(Math.pow(2, i*0.5));
    shopList.push({name:name, baseCost:baseCost, cps:cps, unlocked:i<3?true:false, feature:i%5});
}

// ==========================
// SAVE / LOAD
// ==========================
function saveGame(){
    localStorage.setItem('santtus',santtus);
    localStorage.setItem('santtuPerClick',santtuPerClick);
    localStorage.setItem('upgrades',JSON.stringify(upgrades));
    localStorage.setItem('prestige',prestigePoints);
}

// ==========================
// DISPLAY
// ==========================
function updateDisplay(){
    document.getElementById('santtu-count').innerText=formatNumber(santtus)+" Santtus";
    updateMiniSanttu();
    renderShop();
    renderRanks();
}

// ==========================
// TABS
// ==========================
function showTab(tab){
    document.querySelectorAll('.tab').forEach(t=>t.style.display='none');
    document.getElementById(tab).style.display='block';
}

// ==========================
// CLICK EFFECT
// ==========================
function clickEffect(e,value){
    const effect=document.getElementById('click-effect');
    effect.innerText = "+"+value;
    effect.style.left=e.clientX+'px';
    effect.style.top=e.clientY+'px';
    effect.style.display='block';
    effect.style.transform="translate(-50%,-50%) scale(1.2)";
    setTimeout(()=>{
        effect.style.display='none';
        effect.style.transform="translate(-50%,-50%) scale(1)";
    },300);
}

// ==========================
// CLICK SANTTU
// ==========================
function clickSanttu(e){
    let boost = 1 + 0.01*prestigePoints;
    santtus += santtuPerClick*boost;
    bounceSanttu();
    clickEffect(e,santtuPerClick*boost);
    updateDisplay();
    saveGame();
}

// ==========================
// BOUNCE EFFECT
// ==========================
function bounceSanttu(){
    const santtu=document.getElementById('santtu-btn');
    santtu.style.transform="scale(1.1)";
    setTimeout(()=>{santtu.style.transform="scale(1)";},100);
}

// ==========================
// MINI SANTTU ORBIT
// ==========================
function updateMiniSanttu(){
    const container=document.querySelector('.santtu-container');
    container.innerHTML='<img id="santtu-btn" src="'+getCurrentRank().img+'" onclick="clickSanttu(event)">';
    let miniCount = upgrades[0]||0;
    let maxPerRow=8;
    let maxRows=3;
    let rowCount=Math.min(maxRows, Math.ceil(miniCount/maxPerRow));
    for(let r=0;r<rowCount;r++){
        for(let i=0;i<Math.min(maxPerRow, miniCount - r*maxPerRow);i++){
            const img=document.createElement('img');
            img.src=getCurrentRank().img;
            img.className='mini-santtu';
            let angle=(360/maxPerRow)*i*Math.PI/180;
            let radius=70+20*r;
            img.style.left=100 + radius*Math.cos(angle)+'px';
            img.style.top=100 + radius*Math.sin(angle)+'px';
            container.appendChild(img);
        }
    }
}

// ==========================
// CURRENT RANK
// ==========================
function getCurrentRank(){
    let currentRank=ranks[0];
    for(let i=ranks.length-1;i>=0;i--){
        if(santtus>=ranks[i].required){
            currentRank=ranks[i];
            break;
        }
    }
    return currentRank;
}

// ==========================
// SHOP RENDER
// ==========================
function renderShop(){
    const shopDiv=document.getElementById('shop-items');
    shopDiv.innerHTML='';
    shopList.forEach((item,index)=>{
        let owned = upgrades[index]||0;
        let cost = Math.floor(item.baseCost * Math.pow(1.15,owned));
        if(!item.unlocked && santtus >= cost*0.8) item.unlocked=true;
        if(!item.unlocked) return;
        const btn=document.createElement('div');
        btn.className='shop-item'+(santtus>=cost?'':' disabled');
        btn.innerHTML=`<h3>${item.name}</h3><p>Cost: ${formatNumber(cost)} Santtus</p><p>Owned: ${owned}</p><p>+${item.cps} auto clicks/sec</p>`;
        if(santtus>=cost){
            btn.onclick=()=>{
                santtus-=cost;
                upgrades[index]=owned+1;
                glowUpgrade(btn);
                saveGame();
                updateDisplay();
            }
        }
        shopDiv.appendChild(btn);
    });
}

// ==========================
// GLOW EFFECT
// ==========================
function glowUpgrade(btn){
    btn.style.boxShadow="0 0 20px #ffb347";
    setTimeout(()=>{btn.style.boxShadow="0 4px 10px rgba(0,0,0,0.5)";},500);
}

// ==========================
// RANKS RENDER
// ==========================
function renderRanks(){
    const div=document.getElementById('ranks-list');
    div.innerHTML='';
    ranks.forEach(rank=>{
        let progress = rank.required === 0 ? 100 : Math.min(100, (santtus/rank.required)*100);
        const item=document.createElement('div');
        item.className='rank-item'+(getCurrentRank().name===rank.name?' current':'');
        item.innerHTML=`<img src="${rank.img}"><span>${rank.name}</span><div>${Math.floor(progress)}%</div>`;
        div.appendChild(item);
    });
}

// ==========================
// AUTO CLICKER
// ==========================
setInterval(()=>{
    let autoClicks=0;
    for(let i=0;i<upgrades.length;i++){
        autoClicks += (upgrades[i]||0)*(shopList[i]?.cps||0);
    }
    let boost = 1 + 0.01*prestigePoints;
    santtus += autoClicks/10 * boost;
    updateDisplay();
    saveGame();
},100);

// ==========================
// RESET / PRESTIGE
// ==========================
function resetGame(){
    if(confirm("Are u sure u wanna reset?")){
        santtus=0;
        upgrades=[];
        updateDisplay();
        saveGame();
    }
}

function prestige(){
    if(santtus>=1e12){
        let gained=Math.floor(Math.sqrt(santtus/1e12));
        prestigePoints+=gained;
        alert(`U prestiged and got ${gained} prestige points 🙏`);
        santtus=0;
        upgrades=[];
        updateDisplay();
        saveGame();
    }else alert("Need at least 1 trillion Santtus 😭");
}

// ==========================
// NUMBER FORMATTING
// ==========================
function formatNumber(num){
    const suffixes = ["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","Ud","Dd","Td","Qad","Qid","Sxd","Spd","Ocd","Nod","Vig"];
    let i=0;
    while(num >= 1000 && i<suffixes.length-1){
        num/=1000;
        i++;
    }
    return num.toFixed(2)+suffixes[i];
}

// ==========================
// INIT
// ==========================
updateDisplay();
