// === santtu clicker vars ===
let santtus = parseFloat(localStorage.getItem('santtus')) || 0;
let santtuPerClick = 3;
let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];
let prestigePoints = parseInt(localStorage.getItem('prestige')) || 0;

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

const shopList = [
  {name:"Mini Santtu", baseCost:100, clickBonus:0, autoBonus:1, unlocked:true, description:"Spawns 1 mini santtu per purchase, clicks automatically."},
  {name:"Santtu Multiplier", baseCost:500, clickBonus:2, autoBonus:0, description:"Increases each click by 2 santtus."},
  {name:"Lanttu Machine", baseCost:2000, clickBonus:0, autoBonus:1, description:"Generates 1 santtu automatically per second."},
  {name:"Mega Santtu", baseCost:10000, clickBonus:2, autoBonus:2, description:"Adds 2 per click and 2 auto santtus per second."},
  {name:"Auto Lanttu", baseCost:50000, clickBonus:0, autoBonus:5, description:"Generates 5 auto santtus per second."},
  {name:"Santtu Portal", baseCost:200000, clickBonus:5, autoBonus:10, description:"Adds 5 per click and 10 auto santtus per second."},
  {name:"Quantum Lanttu", baseCost:1e6, clickBonus:10, autoBonus:25, description:"Adds 10 per click and 25 auto santtus per second."},
  {name:"Santtu Factory", baseCost:5e6, clickBonus:0, autoBonus:50, description:"Generates 50 auto santtus per second."},
  {name:"Ultra Mini Santtu", baseCost:2e7, clickBonus:5, autoBonus:75, description:"Adds 5 per click and 75 auto santtus per second."},
  {name:"Santtu Blast", baseCost:1e8, clickBonus:10, autoBonus:150, description:"Adds 10 per click and 150 auto santtus per second."},
  {name:"Mega Portal", baseCost:5e8, clickBonus:25, autoBonus:300, description:"Adds 25 per click and 300 auto santtus per second."},
  {name:"Galactic Santtu", baseCost:2e9, clickBonus:50, autoBonus:600, description:"Adds 50 per click and 600 auto santtus per second."},
  {name:"Santtu Wormhole", baseCost:1e10, clickBonus:0, autoBonus:1200, description:"Generates 1200 auto santtus per second."},
  {name:"Lanttu Frenzy", baseCost:5e10, clickBonus:75, autoBonus:2500, description:"Adds 75 per click and 2500 auto santtus per second."},
  {name:"Quantum Blast", baseCost:2e11, clickBonus:150, autoBonus:5000, description:"Adds 150 per click and 5000 auto santtus per second."},
  {name:"Infinite Santtu", baseCost:1e12, clickBonus:0, autoBonus:1e4, description:"Generates 10,000 auto santtus per second."},
  {name:"Ludicrous Lanttu", baseCost:5e12, clickBonus:300, autoBonus:2e4, description:"Adds 300 per click and 20,000 auto santtus per second."},
  {name:"Santtu Dimension", baseCost:2e13, clickBonus:0, autoBonus:5e4, description:"Generates 50,000 auto santtus per second."},
  {name:"Mega Frenzy", baseCost:1e14, clickBonus:600, autoBonus:1e5, description:"Adds 600 per click and 100,000 auto santtus per second."},
  {name:"Galactic Portal", baseCost:5e14, clickBonus:0, autoBonus:2e5, description:"Generates 200,000 auto santtus per second."},
  {name:"Santtu Clone", baseCost:2e15, clickBonus:1200, autoBonus:4e5, description:"Adds 1200 per click and 400,000 auto santtus per second."},
  {name:"Ultra Overload", baseCost:1e16, clickBonus:0, autoBonus:8e5, description:"Generates 800,000 auto santtus per second."},
  {name:"Quantum Multiplier", baseCost:5e16, clickBonus:2500, autoBonus:1.6e6, description:"Adds 2500 per click and 1,600,000 auto santtus per second."},
  {name:"Santtu Reactor", baseCost:2e17, clickBonus:0, autoBonus:3e6, description:"Generates 3,000,000 auto santtus per second."},
  {name:"Mega Overlord", baseCost:1e18, clickBonus:5000, autoBonus:6e6, description:"Adds 5000 per click and 6,000,000 auto santtus per second."},
  {name:"Santtu Portal X", baseCost:5e18, clickBonus:0, autoBonus:1.2e7, description:"Generates 12,000,000 auto santtus per second."},
  {name:"Galactic Lanttu Machine", baseCost:2e19, clickBonus:1e4, autoBonus:2.4e7, description:"Adds 10,000 per click and 24,000,000 auto santtus per second."},
  {name:"Infinite Frenzy", baseCost:1e20, clickBonus:0, autoBonus:5e7, description:"Generates 50,000,000 auto santtus per second."},
  {name:"Ludicrous Reactor", baseCost:5e20, clickBonus:2e4, autoBonus:1e8, description:"Adds 20,000 per click and 100,000,000 auto santtus per second."},
  {name:"Ultimate Portal", baseCost:2e21, clickBonus:0, autoBonus:2e8, description:"Generates 200,000,000 auto santtus per second."},
  {name:"Santtu Wormhole X", baseCost:1e22, clickBonus:5e4, autoBonus:4e8, description:"Adds 50,000 per click and 400,000,000 auto santtus per second."},
  {name:"Mega Blast", baseCost:5e22, clickBonus:0, autoBonus:8e8, description:"Generates 800,000,000 auto santtus per second."},
  {name:"Galactic Reactor", baseCost:2e23, clickBonus:1e5, autoBonus:1.6e9, description:"Adds 100,000 per click and 1,600,000,000 auto santtus per second."},
  {name:"Quantum Lanttu Factory", baseCost:1e24, clickBonus:0, autoBonus:3e9, description:"Generates 3,000,000,000 auto santtus per second."},
  {name:"Ultra Portal X", baseCost:5e24, clickBonus:2e5, autoBonus:6e9, description:"Adds 200,000 per click and 6,000,000,000 auto santtus per second."},
  {name:"Infinite Clone", baseCost:2e25, clickBonus:0, autoBonus:1.2e10, description:"Generates 12,000,000,000 auto santtus per second."},
  {name:"Santtu Overload", baseCost:1e26, clickBonus:5e5, autoBonus:2.4e10, description:"Adds 500,000 per click and 24,000,000,000 auto santtus per second."},
  {name:"Mega Dimension", baseCost:5e26, clickBonus:0, autoBonus:5e10, description:"Generates 50,000,000,000 auto santtus per second."},
  {name:"Galactic Blast X", baseCost:2e27, clickBonus:1e6, autoBonus:1e11, description:"Adds 1,000,000 per click and 100,000,000,000 auto santtus per second."},
  {name:"Quantum Reactor X", baseCost:1e28, clickBonus:0, autoBonus:2e11, description:"Generates 200,000,000,000 auto santtus per second."},
  {name:"Ultra Frenzy X", baseCost:5e28, clickBonus:2e6, autoBonus:4e11, description:"Adds 2,000,000 per click and 400,000,000,000 auto santtus per second."},
  {name:"Infinite Portal X", baseCost:2e29, clickBonus:0, autoBonus:8e11, description:"Generates 800,000,000,000 auto santtus per second."},
  {name:"Santtu Machine X", baseCost:1e30, clickBonus:5e6, autoBonus:1.6e12, description:"Adds 5,000,000 per click and 1,600,000,000,000 auto santtus per second."},
  {name:"Mega Clone X", baseCost:5e30, clickBonus:0, autoBonus:3e12, description:"Generates 3,000,000,000,000 auto santtus per second."},
  {name:"Galactic Dimension X", baseCost:2e31, clickBonus:1e7, autoBonus:6e12, description:"Adds 10,000,000 per click and 6,000,000,000,000 auto santtus per second."},
  {name:"Ultimate Reactor X", baseCost:1e32, clickBonus:0, autoBonus:1.2e13, description:"Generates 12,000,000,000,000 auto santtus per second."},
  {name:"Santtu Overlord X", baseCost:5e32, clickBonus:2e7, autoBonus:2.4e13, description:"Adds 20,000,000 per click and 24,000,000,000,000 auto santtus per second."},
  {name:"Final Santtu God", baseCost:9.99e33, clickBonus:5e7, autoBonus:1e14, description:"Adds 50,000,000 per click and 100,000,000,000,000 auto santtus per second."}
];

// === localStorage save ===
function saveGame(){
    localStorage.setItem('santtus', santtus);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('prestige', prestigePoints);
    localStorage.setItem('lastActive', Date.now());
}

function showTab(tabId, btn){
    document.querySelectorAll('.tab').forEach(t => t.style.display='none');
    document.getElementById(tabId).style.display='block';
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// === current rank ===
function getCurrentRank(){
    let rank = ranks[0];
    for(let i=ranks.length-1; i>=0; i--){
        if(santtus >= ranks[i].required){
            rank = ranks[i];
            break;
        }
    }
    return rank;
}

function updateMiniSanttu(){
    const container = document.querySelector('.santtu-container');
    const rank = getCurrentRank();

    // check if main santtu btn exists, create once
    let mainImg = document.getElementById('santtu-btn');
    if(!mainImg){
        mainImg = document.createElement('img');
        mainImg.id = "santtu-btn";
        mainImg.onclick = clickSanttu;
        mainImg.style.animation = "spin 20s linear infinite";
        container.appendChild(mainImg);
    }
    mainImg.src = rank.img;

    // remove old mini santtus
    const oldMiniRows = document.querySelectorAll('.mini-row');
    oldMiniRows.forEach(r => r.remove());

    const miniCount = upgrades[0] || 0;
    const maxDisplay = 50; // cap for performance
    const displayCount = Math.min(miniCount, maxDisplay);
    if(displayCount === 0){
        document.getElementById('mini-count').innerText = "Mini Santtus: 0";
        return;
    }

    // create mini santtus rows
    const rowDiv = document.createElement('div');
    rowDiv.className = "mini-row";
    rowDiv.style.display = 'flex';
    rowDiv.style.flexWrap = 'wrap';
    rowDiv.style.justifyContent = 'center';

    for(let i=0; i<displayCount; i++){
        const mini = document.createElement('img');
        mini.src = rank.img;
        mini.className='mini-santtu';
        rowDiv.appendChild(mini);
    }

    container.appendChild(rowDiv);
    document.getElementById('mini-count').innerText = `Mini Santtus: ${miniCount}`;
}

// === click santtu ===
function getClickBoost(){
    let boost = 1;
    for(let i=0; i<upgrades.length; i++){
        boost += (upgrades[i]||0) * (shopList[i]?.clickBonus||0);
    }
    return boost;
}

function clickSanttu(){
    const boost = 1 + 0.01*prestigePoints;
    const clickBoost = getClickBoost();
    santtus += santtuPerClick * boost * clickBoost;
    bounceSanttu();
    updateDisplay();
    saveGame();
}

function bounceSanttu(){
    const btn = document.getElementById('santtu-btn');
    btn.style.transform='scale(1.05)';
    setTimeout(()=>{btn.style.transform='scale(1)';},150);
}

// === render shop ===
function renderShop(){
    const shopDiv = document.getElementById('shop-items');
    shopDiv.innerHTML = '';

    shopList.forEach((item, index)=>{
        let owned = upgrades[index] || 0;
        let cost = Math.floor(item.baseCost * Math.pow(1.15, owned));
        const btn = document.createElement('div');
        btn.className = 'shop-item' + (santtus>=cost ? '' : ' disabled');
        btn.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p><p>Cost: ${formatNumber(cost)}</p><p>Owned: ${owned}</p>`;
        if(santtus>=cost){
            btn.onclick = ()=>{
                santtus -= cost;
                upgrades[index] = owned+1;
                glowUpgrade(btn);
                updateDisplay();
                saveGame();
            }
        }
        shopDiv.appendChild(btn);
    });
}

function glowUpgrade(btn){
    btn.style.boxShadow = "0 0 20px #ffb347";
    setTimeout(()=>{btn.style.boxShadow="0 4px 10px rgba(0,0,0,0.5)";},500);
}

// === render ranks ===
function renderRanks(){
    const div = document.getElementById('ranks-list');
    div.innerHTML = '';
    const currentRank = getCurrentRank();
    ranks.forEach(rank=>{
        const progress = rank.required === 0 ? 100 : Math.min(100, (santtus/rank.required)*100);
        const item = document.createElement('div');
        item.className = 'rank-item' + (currentRank.name===rank.name ? ' current' : '');
        item.innerHTML = `<img src="${rank.img}"><span>${rank.name}</span><div>${Math.floor(progress)}%</div>`;
        div.appendChild(item);
    });
}

// === auto santtus ===
setInterval(()=>{
    let autoClicks = 0;
    for(let i=0;i<upgrades.length;i++){
        autoClicks += (upgrades[i]||0) * (shopList[i]?.autoBonus||0);
    }
    const boost = 1 + 0.01*prestigePoints;
    santtus += autoClicks / 10 * boost;
    updateDisplay();
    saveGame();
},100);

// === update display ===
function updateDisplay(){
    document.getElementById('santtu-count').innerText = formatNumber(santtus) + " Santtus";
    updateMiniSanttu();
    renderShop();
    renderRanks();
}

// === reset / prestige ===
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
        let gained = Math.floor(Math.sqrt(santtus/1e12));
        prestigePoints += gained;
        alert(`U prestiged and got ${gained} prestige points 🙏`);
        santtus = 0;
        upgrades = [];
        updateDisplay();
        saveGame();
    }else alert("Need at least 1 trillion Santtus 😭");
}

// === number formatting ===
function formatNumber(num){
    const suffixes = ["","K","M","B","T","Qa","Qi","Sx","Sp","Oc","No","Dc"];
    let i=0;
    while(num>=1000 && i<suffixes.length-1){
        num/=1000;
        i++;
    }
    return num.toFixed(2)+suffixes[i];
}

// === offline progress ===
function loadOfflineProgress(){
    const last = parseInt(localStorage.getItem('lastActive')) || Date.now();
    const now = Date.now();
    let elapsed = (now - last) / 1000; // seconds
    const maxSeconds = 24*60*60;
    if(elapsed > maxSeconds) elapsed = maxSeconds;

    let autoPerSecond = 0;
    for(let i=0;i<upgrades.length;i++){
        autoPerSecond += (upgrades[i]||0)*(shopList[i]?.autoBonus||0);
    }
    const boost = 1 + 0.01*prestigePoints;
    const totalGain = autoPerSecond * boost * elapsed;

    if(totalGain>0){
        alert(`💀 You gained ${formatNumber(totalGain)} Santtus while offline!`);
        santtus += totalGain;
    }
}

// === init ===
loadOfflineProgress();
updateDisplay();
