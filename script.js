// GAME DATA
let santtus = parseFloat(localStorage.getItem('santtus')) || 0;
let santtuPerClick = parseFloat(localStorage.getItem('santtuPerClick')) || 1;
let upgrades = JSON.parse(localStorage.getItem('upgrades')) || [];
let prestigePoints = parseInt(localStorage.getItem('prestige')) || 0;

// RANKS
const ranks = [
    {name: "Gay Lanttu", img: "santtu.png", required: 0},
    {name: "Santtu 1", img: "santtu1.png", required: 10000},
    {name: "Santtu 2", img: "santtu2.png", required: 500000},
    {name: "Santtu 3", img: "santtu3.png", required: 5000000},
    {name: "Santtu 4", img: "santtu4.png", required: 50000000},
    {name: "Santtu 5", img: "santtu5.png", required: 500000000},
    {name: "Santtu 6", img: "santtu6.png", required: 999000000000000} // 999 trillion
];

// SHOP ITEMS
const shopList = [
    {name: "Santtu Finger", baseCost: 50, cps: 1},
    {name: "Santtu Factory", baseCost: 500, cps: 10},
    {name: "Santtu Farm", baseCost: 5000, cps: 100},
    {name: "Santtu Planet", baseCost: 50000, cps: 1000},
    {name: "Santtu Galaxy", baseCost: 500000, cps: 10000},
    {name: "Santtu Universe", baseCost: 5000000, cps: 100000},
];

function saveGame(){
    localStorage.setItem('santtus', santtus);
    localStorage.setItem('santtuPerClick', santtuPerClick);
    localStorage.setItem('upgrades', JSON.stringify(upgrades));
    localStorage.setItem('prestige', prestigePoints);
}

// DISPLAY
function updateDisplay(){
    document.getElementById('santtu-count').innerText = santtus.toLocaleString() + " Santtus";

    // Update rank
    let currentRank = ranks[0];
    for(let i=ranks.length-1;i>=0;i--){
        if(santtus >= ranks[i].required){
            currentRank = ranks[i];
            break;
        }
    }
    document.getElementById('rank-name').innerText = currentRank.name;
    document.getElementById('rank-img').src = currentRank.img;

    renderShop();
}

// TABS
function showTab(tab){
    document.querySelectorAll('.tab').forEach(t => t.style.display='none');
    document.getElementById(tab).style.display='block';
}

// CLICK SANTTU
function clickSanttu(){
    santtus += santtuPerClick;
    updateDisplay();
    saveGame();
}

// SHOP
function renderShop(){
    const shopDiv = document.getElementById('shop-items');
    shopDiv.innerHTML = '';
    shopList.forEach((item, index)=>{
        let owned = upgrades[index] || 0;
        let cost = Math.floor(item.baseCost * Math.pow(1.15, owned));
        const btn = document.createElement('div');
        btn.className = 'shop-item' + (santtus >= cost ? '' : ' disabled');
        btn.innerHTML = `
            <h3>${item.name}</h3>
            <p>Cost: ${cost.toLocaleString()} Santtus</p>
            <p>Owned: ${owned}</p>
            <p>+${item.cps} per click</p>
        `;
        if(santtus >= cost){
            btn.onclick = ()=>{
                santtus -= cost;
                upgrades[index] = owned + 1;
                santtuPerClick += item.cps;
                updateDisplay();
                saveGame();
            }
        }
        shopDiv.appendChild(btn);
    });
}

// RESET
function resetGame(){
    if(confirm("Are u sure u wanna reset ur progress?")){
        santtus = 0;
        santtuPerClick = 1;
        upgrades = [];
        updateDisplay();
        saveGame();
    }
}

// PRESTIGE
function prestige(){
    if(santtus >= 1e12){ // minimum for prestige
        let gained = Math.floor(Math.sqrt(santtus/1e12));
        prestigePoints += gained;
        alert(`U prestiged and got ${gained} prestige points`);
        santtus = 0;
        santtuPerClick = 1 + prestigePoints; // bonus per prestige
        upgrades = [];
        updateDisplay();
        saveGame();
    }else{
        alert("U need at least 1 trillion Santtus to prestige vitun köyhä kasa paskaa");
    }
}

// AUTO SAVE
setInterval(()=>{
    saveGame();
}, 5000);

// INIT
updateDisplay();
