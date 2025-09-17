let santtus = parseFloat(localStorage.getItem('santtus'))||0;
let santtuPerClick = 3;
let upgrades = JSON.parse(localStorage.getItem('upgrades'))||[];
let prestigePoints = parseInt(localStorage.getItem('prestige'))||0;

// ranks
const ranks=[
  {name:"Gay Lanttu", img:"santtu.png", required:0},
  {name:"Based Santtu", img:"santtu1.png", required:10000},
  {name:"Lanttu God", img:"santtu2.png", required:500000},
  {name:"Mega Lanttu", img:"santtu3.png", required:1e9},
  {name:"Ultra Lanttu", img:"santtu4.png", required:1e12},
  {name:"Lanttu Overlord", img:"santtu5.png", required:1e36},
  {name:"Ultimate Lanttu", img:"santtu6.png", required:1e99}
];

// upgrades 50 fixed names & features
const shopList=[
  {name:"Mini Santtu", baseCost:100, clickBonus:0, autoBonus:1, unlocked:true},
  {name:"Santtu Multiplier", baseCost:500, clickBonus:2, autoBonus:0},
  {name:"Lanttu Machine", baseCost:2000, clickBonus:0, autoBonus:1},
  {name:"Mega Santtu", baseCost:10000, clickBonus:2, autoBonus:2},
  {name:"Auto Lanttu", baseCost:50000, clickBonus:0, autoBonus:5},
  {name:"Santtu Portal", baseCost:200000, clickBonus:5, autoBonus:10},
  {name:"Quantum Lanttu", baseCost:1e6, clickBonus:10, autoBonus:25},
  {name:"Santtu Factory", baseCost:5e6, clickBonus:0, autoBonus:50},
  {name:"Ultra Mini Santtu", baseCost:2e7, clickBonus:5, autoBonus:75},
  {name:"Santtu Blast", baseCost:1e8, clickBonus:10, autoBonus:150},
  {name:"Mega Portal", baseCost:5e8, clickBonus:25, autoBonus:300},
  {name:"Galactic Santtu", baseCost:2e9, clickBonus:50, autoBonus:600},
  {name:"Santtu Wormhole", baseCost:1e10, clickBonus:0, autoBonus:1200},
  {name:"Lanttu Frenzy", baseCost:5e10, clickBonus:75, autoBonus:2500},
  {name:"Quantum Blast", baseCost:2e11, clickBonus:150, autoBonus:5000},
  {name:"Infinite Santtu", baseCost:1e12, clickBonus:0, autoBonus:1e4},
  {name:"Ludicrous Lanttu", baseCost:5e12, clickBonus:300, autoBonus:2e4},
  {name:"Santtu Dimension", baseCost:2e13, clickBonus:0, autoBonus:5e4},
  {name:"Mega Frenzy", baseCost:1e14, clickBonus:600, autoBonus:1e5},
  {name:"Galactic Portal", baseCost:5e14, clickBonus:0, autoBonus:2e5},
  {name:"Santtu Clone", baseCost:2e15, clickBonus:1200, autoBonus:4e5},
  {name:"Ultra Overload", baseCost:1e16, clickBonus:0, autoBonus:8e5},
  {name:"Quantum Multiplier", baseCost:5e16, clickBonus:2500, autoBonus:1.6e6},
  {name:"Santtu Reactor", baseCost:2e17, clickBonus:0, autoBonus:3e6},
  {name:"Mega Overlord", baseCost:1e18, clickBonus:5000, autoBonus:6e6},
  {name:"Santtu Portal X", baseCost:5e18, clickBonus:0, autoBonus:1.2e7},
  {name:"Galactic Lanttu Machine", baseCost:2e19, clickBonus:1e4, autoBonus:2.4e7},
  {name:"Infinite Frenzy", baseCost:1e20, clickBonus:0, autoBonus:5e7},
  {name:"Ludicrous Reactor", baseCost:5e20, clickBonus:2e4, autoBonus:1e8},
  {name:"Ultimate Portal", baseCost:2e21, clickBonus:0, autoBonus:2e8},
  {name:"Santtu Wormhole X", baseCost:1e22, clickBonus:5e4, autoBonus:4e8},
  {name:"Mega Blast", baseCost:5e22, clickBonus:0, autoBonus:8e8},
  {name:"Galactic Reactor", baseCost:2e23, clickBonus:1e5, autoBonus:1.6e9},
  {name:"Quantum Lanttu Factory", baseCost:1e24, clickBonus:0, autoBonus:3e9},
  {name:"Ultra Portal X", baseCost:5e24, clickBonus:2e5, autoBonus:6e9},
  {name:"Infinite Clone", baseCost:2e25, clickBonus:0, autoBonus:1.2e10},
  {name:"Santtu Overload", baseCost:1e26, clickBonus:5e5, autoBonus:2.4e10},
  {name:"Mega Dimension", baseCost:5e26, clickBonus:0, autoBonus:5e10},
  {name:"Galactic Blast X", baseCost:2e27, clickBonus:1e6, autoBonus:1e11},
  {name:"Quantum Reactor X", baseCost:1e28, clickBonus:0, autoBonus:2e11},
  {name:"Ultra Frenzy X", baseCost:5e28, clickBonus:2e6, autoBonus:4e11},
  {name:"Infinite Portal X", baseCost:2e29, clickBonus:0, autoBonus:8e11},
  {name:"Santtu Machine X", baseCost:1e30, clickBonus:5e6, autoBonus:1.6e12},
  {name:"Mega Clone X", baseCost:5e30, clickBonus:0, autoBonus:3e12},
  {name:"Galactic Dimension X", baseCost:2e31, clickBonus:1e7, autoBonus:6e12},
  {name:"Ultimate Reactor X", baseCost:1e32, clickBonus:0, autoBonus:1.2e13},
  {name:"Santtu Overlord X", baseCost:5e32, clickBonus:2e7, autoBonus:2.4e13},
  {name:"Final Santtu God", baseCost:9.99e33, clickBonus:5e7, autoBonus:1e14} // last upgrade extreme cost
];

// save/load
function saveGame(){
    localStorage.setItem('santtus',santtus);
    localStorage.setItem('upgrades',JSON.stringify(upgrades));
    localStorage.setItem('prestige',prestigePoints);
}

// tabs
function showTab(tab){
    document.querySelectorAll('.tab').forEach(t=>t.style.display='none');
    document.getElementById(tab).style.display='block';
}

// current rank
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

// render ranks
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

// render shop
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
        btn.innerHTML=`<h3>${item.name}</h3><p>Cost: ${formatNumber(cost)} Santtus</p><p>Owned: ${owned}</p>`;
        if(santtus>=cost){
            btn.onclick=()=>{
                santtus-=cost;
                upgrades[index]=owned+1;
                glowUpgrade(btn);
                updateDisplay();
                saveGame();
            }
        }
        shopDiv.appendChild(btn);
    });
}

// glow upgrade
function glowUpgrade(btn){
    btn.style.boxShadow="0 0 20px #ffb347";
    setTimeout(()=>{btn.style.boxShadow="0 4px 10px rgba(0,0,0,0.5)";},500);
}

// click santtu
function getClickBoost(){
    let boost=1;
    for(let i=0;i<upgrades.length;i++){
        boost += (upgrades[i]||0)*(shopList[i]?.clickBonus||0);
    }
    return boost;
}

function clickSanttu(e){
    let boost = 1 + 0.01*prestigePoints;
    let clickBoost = getClickBoost();
    santtus += santtuPerClick * boost * clickBoost;
    bounceSanttu();
    updateDisplay();
    saveGame();
}

// bounce effect
function bounceSanttu(){
    const btn=document.getElementById('santtu-btn');
    btn.style.transform='scale(1.05)';
    setTimeout(()=>{btn.style.transform='scale(1)';},100);
}

// mini santtus rows
function updateMiniSanttu(){
    const container=document.querySelector('.santtu-container');
    container.innerHTML='<img id="santtu-btn" src="'+getCurrentRank().img+'" onclick="clickSanttu(event)">';

    let miniCount = upgrades[0]||0; // first upgrade controls mini santtus
    const maxPerRow = 8;
    const maxRows = 3;
    let rowCount = Math.min(maxRows, Math.ceil(miniCount/maxPerRow));

    for(let r=0; r<rowCount; r++){
        const rowDiv = document.createElement('div');
        rowDiv.style.display='flex';
        rowDiv.style.justifyContent='center';
        rowDiv.style.marginTop='5px';

        for(let i=0; i<Math.min(maxPerRow, miniCount - r*maxPerRow); i++){
            const mini = document.createElement('img');
            mini.src=getCurrentRank().img;
            mini.className='mini-santtu';
            rowDiv.appendChild(mini);
        }
        container.appendChild(rowDiv);
    }
}

// auto santtus
setInterval(()=>{
    let autoClicks=0;
    for(let i=0;i<upgrades.length;i++){
        autoClicks += (upgrades[i]||0)*(shopList[i]?.autoBonus||0);
    }
    let boost = 1 + 0.01*prestigePoints;
    santtus += autoClicks/10 * boost;
    updateDisplay();
    saveGame();
},100);

// update display
function updateDisplay(){
    document.getElementById('santtu-count').innerText = formatNumber(santtus)+" Santtus";
    updateMiniSanttu();
    renderShop();
    renderRanks();
}

// reset / prestige
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
        alert(`U prestiged and got ${gained} prestige points!`);
        santtus=0;
        upgrades=[];
        updateDisplay();
        saveGame();
    }else alert("Need at least 1 trillion Santtus u broke boi");
}

// number formatting
function formatNumber(num){
    const suffixes = ["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc","Ud","Dd","Td","Qad","Qid","Sxd","Spd","Ocd","Nod","Vig"];
    let i=0;
    while(num >= 1000 && i<suffixes.length-1){
        num/=1000;
        i++;
    }
    return num.toFixed(2)+suffixes[i];
}

// init
updateDisplay();
