function get(id) { return document.getElementById(id); }

function makePixels(rows, colors, cssClass) {
  var out = "";
  for (var y = 0; y < rows.length; y++) {
    for (var x = 0; x < rows[y].length; x++) {
      var c = rows[y][x];
      if (c === ".") continue;
      out += '<rect x="' + x + '" y="' + y + '" width="1" height="1" fill="' + colors[c] + '"/>';
    }
  }
  var cls = cssClass ? ' class="' + cssClass + '"' : "";
  return '<svg' + cls + ' viewBox="0 0 ' + rows[0].length + ' ' + rows.length + '">' + out + '</svg>';
}

var icons = {
  food: makePixels([
    "....GG..", "..G.GG..", ".GG.GG..", "GGG.GGGG",
    ".GG.GGG.", "..G.GG..", "...GG...", "...GG..."
  ], { G: "#7fc04f" }, "icon"),
  water: makePixels([
    "...BB...", "...BB...", "..BBBB..", ".BBBBBB.",
    "BBBBBBBB", "BBBBBBBB", ".BBBBBB.", "..BBBB.."
  ], { B: "#5fb4e8" }, "icon"),
  seeds: makePixels([
    "..OOOO..", ".OYYYYO.", "OYOOOOYO", "OYOWWOYO",
    "OYOWWOYO", "OYOOOOYO", ".OYYYYO.", "..OOOO.."
  ], { O: "#8a5a22", Y: "#d9932e", W: "#f2c14e" }, "icon"),
  health: makePixels([
    ".RR..RR.", "RRRRRRRR", "RRRRRRRR", "RRRRRRRR",
    ".RRRRRR.", "..RRRR..", "...RR...", "........"
  ], { R: "#e0473c" }, "icon"),
  days: makePixels([
    "PPPPPPPP", "PWWWWWWP", "PPPPPPPP", "PWPWPWPP",
    "PWWWWWWP", "PWPWPWPP", "PWWWWWWP", "PPPPPPPP"
  ], { P: "#8a7f96", W: "#d9cdb8" }, "icon")
};

get("tagFood").innerHTML = icons.food + " Food";
get("tagWater").innerHTML = icons.water + " Water";
get("tagSeeds").innerHTML = icons.seeds + " Seeds";
get("tagHealth").innerHTML = icons.health + " Land Health";
get("tagDays").innerHTML = icons.days + " Days Left";

var cropArt = {
  greens: makePixels([
    "..G.....G..", ".GGG.G.GGG.", "GGGGGGGGGGG", ".GGGGGGGGG.",
    "..GGGGGGG..", "...GGGGG...", "....GDG....", "....DDD....",
    ".....D.....", ".....D....."
  ], { G: "#5f9e3a", D: "#3d6b28" }),
  wheat: makePixels([
    "..Y.Y.Y.Y..", ".YWY.Y.YWY.", ".YWY.Y.YWY.", "..YWYWYWY..",
    "..YWYWYWY..", "...YWYWY...", "....SSS....", "....SSS....",
    "....SSS....", "....SSS...."
  ], { Y: "#d9a02e", W: "#f2c94e", S: "#b8842a" }),
  berries: makePixels([
    "..G..G..G..", ".GGG.GG.GG.", "GGRGGGRGGGG", ".GRRG.GRRG.",
    "..GG.G.GG..", ".GRRGGGRRG.", "..GGRGRGG..", "....GGG....",
    ".....D.....", ".....D....."
  ], { G: "#4d8a33", R: "#cc3b2e", D: "#3d6b28" }),
  cactus: makePixels([
    "...........", "..C.....C..", "..C..C..C..", "..CCCCCCC..",
    "....CCC....", "....CCC....", "....CCC....", "....CCC....",
    "....CCC....", "....CCC...."
  ], { C: "#4f8a4a" }),
  corn: makePixels([
    "....GGG....", "...GYWYG...", "..GYWYWYG..", "..GYWYWYG..",
    "..GYWYWYG..", "...GYWYG...", "....GGG....", ".....S.....",
    ".....S.....", ".....S....."
  ], { G: "#6b8a2a", Y: "#c9a12e", W: "#e8cc5a", S: "#5a7024" }),
  pumpkin: makePixels([
    ".....G.....", "....GG.....", "..OOOOOOO..", ".OOWOOOWOO.",
    "OOOWOOOWOOO", "OOOWOOOWOOO", ".OOWOOOWOO.", "..OOOOOOO..",
    "....DDD....", ".....D....."
  ], { O: "#d97b2b", W: "#b85f1e", G: "#5f9e3a", D: "#3d6b28" }),
  sprout: makePixels([
    "...........", "...........", "....G.G....", "...GGGGG...",
    "....GGG....", ".....D.....", ".....D.....", "...........",
    "...........", "..........."
  ], { G: "#6fae4a", D: "#4a7a30" }),
  dead: makePixels([
    "...........", "..D.....D..", "...D...D...", "....D.D....",
    "...DDDDD...", "..D..D..D..", ".....D.....", ".....D.....",
    ".....D.....", ".....D....."
  ], { D: "#5a4a3a" })
};

var crops = {
  greens:  { art: cropArt.greens,  label: "Greens",  seedCost: 1, days: 2, food: 3,  water: 1, seedBack: 0, damage: 3,  unlock: 1 },
  wheat:   { art: cropArt.wheat,   label: "Wheat",   seedCost: 1, days: 3, food: 5,  water: 0, seedBack: 0, damage: 5,  unlock: 1 },
  berries: { art: cropArt.berries, label: "Berries", seedCost: 1, days: 4, food: 4,  water: 0, seedBack: 1, damage: 6,  unlock: 1 },
  cactus:  { art: cropArt.cactus,  label: "Cactus",  seedCost: 1, days: 4, food: 2,  water: 3, seedBack: 0, damage: 1,  unlock: 5, tough: true },
  corn:    { art: cropArt.corn,    label: "Corn",    seedCost: 2, days: 4, food: 8,  water: 0, seedBack: 0, damage: 8,  unlock: 10 },
  pumpkin: { art: cropArt.pumpkin, label: "Pumpkin", seedCost: 2, days: 5, food: 10, water: 0, seedBack: 2, damage: 10, unlock: 18 }
};

var tools = {
  plow:     { pic: "🪓", label: "Plow",           costFood: 4, costSeeds: 2, info: "Harvests hurt the land 40% less." },
  windmill: { pic: "🌬️", label: "Windmill Repair", costFood: 5, costSeeds: 3, info: "Water collecting gives +5." },
  compost:  { pic: "🧺", label: "Compost Bin",     costFood: 3, costSeeds: 2, info: "Resting heals +8% instead of +4%." }
};

var timeNames = ["Dawn", "Noon", "Dusk", "Night"];

var skies = [
  { bands: ["#2a1b3d", "#6b2f5e", "#c2483f", "#e8763a", "#f2a24e"], sun: "#ffe6a8", glow: "#ff9d4a", stars: false },
  { bands: ["#3d5a8a", "#7a89a8", "#d99a5a", "#e8a05a", "#f2b46a"], sun: "#fff4c2", glow: "#ffcc7a", stars: false },
  { bands: ["#241533", "#4a1f4a", "#8a2f4f", "#d9542e", "#f2953d"], sun: "#ffd98a", glow: "#ff8a3d", stars: false },
  { bands: ["#0d0a18", "#16112e", "#241a3d", "#2e2140", "#3a2a42"], sun: "#dcd8ea", glow: "#7f7aa5", stars: true }
];

var weathers = [
  { name: "Clear",    note: "A normal, dusty day.",                    dryRate: 1, drift: -1 },
  { name: "Rain",     note: "Rain! Everything got watered for free.",  dryRate: 0, drift: 1, waters: true },
  { name: "Heatwave", note: "The heat is brutal. Crops dry out fast.", dryRate: 2, drift: -2 },
  { name: "Dust",     note: "Dust storm. The wind strips the soil.",   dryRate: 1, drift: -2 }
];

var colorAnchors = {
  dead: {
    bands: ["#2f160e", "#52210a", "#812913", "#a12e12", "#bb481"],
    sun: "#c05439",
    glow: "#791e11",
    soil: ["#513c2f", "#503526", "#241810", "#1a1008"]
  },
  neutral: {
    bands: ["#2a1b3d", "#6b2f5e", "#c2483f", "#e8763a", "#f2a24e"],
    sun: "#ffe6a8",
    glow: "#ff9d4a",
    soil: ["#6b4530", "#5c3a28", "#472c20", "#301d16"]
  },
  thriving: {
    bands: ["#2c5690", "#8db1c9", "#d0dce2", "#9fc9d9", "#d4e8f0"],
    sun: "#fffbe8",
    glow: "#fff8a8",
    soil: ["#b9805b", "#9995d3d", "#7e563e", "#663f2e"]
  }
};

function getSkyColors(sky){
  return {
    bands: sky.bands,
    sun: sky.sun,
    glow: sky.glow,
    soil: colorAnchors.neutral.soil
  }
}

var gradientMin = -50;
var gradientMid = 50;
var gradientMax = 150;

function hexToRGB(hex){
  hex = hex.substring(1);
  return {
    r : parseInt(hex.substring(0,2),16),
    g : parseInt(hex.substring(2,4),16),
    b : parseInt(hex.substring(4,6),16)
  }
}

function RGBToHex (rgb){
  function h(n) {
    var s = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return s.length === 1 ? "0" + s : s;
  }
  return "#" + h(rgb.r) + h(rgb.g) + h(rgb.b);
}

function lerpColor(start, end, progress) {
  var startRGB = hexToRGB(start);
  var endRGB = hexToRGB(end);
  return RGBToHex({
    r: (startRGB.r + (endRGB.r - startRGB.r) * progress),
    g: (startRGB.g + (endRGB.g - startRGB.g) * progress),
    b: (startRGB.b + (endRGB.b - startRGB.b) * progress)
  })
}

function sampleGradient(sky, slot, idx, health) {
  if (slot == "bands" || slot == "soil"){
    var neutralPalette;
    if (slot == "bands" && sky){
      neutralPalette = getSkyColors(sky)[slot][idx];
    }
    else{
      neutralPalette = colorAnchors.neutral[slot][idx];
    }
    if (health <= gradientMid){
      var progress = (health - gradientMin)/(gradientMid - gradientMin);
      return lerpColor(colorAnchors.dead[slot][idx], neutralPalette, progress);
    }
    else {
      var progress = (health - gradientMax)/(gradientMax - gradientMid);
      return lerpColor(neutralPalette, colorAnchors.thriving[slot][idx],progress);
    }
  }
  
  else {
    if ((slot == "sun" || slot == "glow") && sky){
      neutralPalette = sky[slot];
    }
    else{
      neutralPalette = colorAnchors.neutral[slot];
    }
    if (health <= gradientMid){
      var progress = (health - gradientMin)/(gradientMid - gradientMin);
      return lerpColor(colorAnchors.dead[slot], neutralPalette, progress);
    }
    else {
      var progress = (health - gradientMax)/(gradientMax - gradientMid);
      return lerpColor(neutralPalette, colorAnchors.thriving[slot],progress);
    }
  }
  
}


var difficulties = {
  easy: {
    title: "easy",
    subtitle: "the land is kind, forecast stations are accurate",
    startFood: 15, startWater: 10, startSeeds: 8, startHealth: 50,
    landDrift: 1,
    damageMult: 0.6,
    forecastAccuracy: 0.75,
    supplyConsumption: 1
  },
  normal: {
    title: "normal",
    subtitle: "the land is tired, the intended experience",
    startFood: 12, startWater: 8, startSeeds: 6, startHealth: 42,
    landDrift: 0,
    damageMult: 1,
    forecastAccuracy: 0.5,
    supplyConsumption: 1
  },
  hard: {
    title: "hardcore",
    subtitle: "the land is cruel, forecasts are wildly inaccurate, YOU WILL NOT SURVIVE",
    startFood: 10, startWater: 6, startSeeds: 4, startHealth: 35,
    landDrift: -1,
    damageMult: 1.4,
    forecastAccuracy: 0.3,
    supplyConsumption: 2
  }
};

var currentDifficulty = "normal"

var endings = {
  landDeath: {
    title: "The land is gone.",
    text: "On day {day} the soil finally gave out. Nothing will grow here again, not for you, not for anyone.",
    afterText: "You stay after that, hoping that the soil will come back again, but nothing grows."
  },
  starvation: {
    title:"There is no food left",
    text: "You reached day {day} but hunger got you, you starve to death, the field is still green but you are not.",
    afterText: "After you die of starvation, another farmer finds your land and claims it, but he can not maintain it, the land is left to rot after you."
  },
  drought: {
    title: "The water is gone.",
    text: "You reached day {day} but thirst got you, before you die, you see the last drop drying up from the scorching sun.",
    afterText: "After you die of thirst, your land is destined to die from thirst too."
  },
  survivedScarred: {
    title: "Day 30, The last harvest.",
    text: "You survived, but at what cost, there is nothing left, the soil is depleted, the sun is scorching hot, and you became weak",
    afterText: "After the 30 days you just survived, you must survive the next month too"
  },
  survivedStable: {
    title: "Day 30, The last harvest.",
    text: "You made it, the land is scarred but still recovering",
    afterText: "Your field could survive until spring, but you do not know who will give out first, You, or The field"
  },
  survivedThriving: {
    title: "Day 30, the last harvest.",
    text: "You made it, the land is now better than you found it, it is now thriving",
    afterText: "after alot of work, your field survives to spring, the land is thriving and now makes alot of goods, but there is still another Fall after that spring ends."
  }
}

var difficultyEnding = {
  easy: "\n\nYou did this with the land's help. It was kind to you. You should remember that.",
  normal: "",
  hard: "\n\nYou did this on hardcore, with a dying world and lying forecasts. No one will know. You will."
}

function pickEnding(){
  if (game.health <= 0){
    return "landDeath";
  }
  if (game.food <= 0){
    return "starvation";
  }
  if (game.water <= 0){
    return "drought";
  }
  if (game.day > game.lastDay){
    if (game.health >= 60){
      return "survivedThriving";
    }
    if (game.health >= 25){
      return "survivedStable";
    }
    return "survivedScarred";
  }
  return null;
}

var game;

function newPlots() {
  var list = [];
  for (var i = 0; i < 9; i++) {
    list.push({ crop: null, lastCrop: null, grown: 0, thirsty: 0, ready: false, dead: false, soilBonus: 0 });
  }
  list[0] = { crop: "greens",  lastCrop: null, grown: 2, thirsty: 0, ready: true,  dead: false, soilBonus: 0 };
  list[1] = { crop: "wheat",   lastCrop: null, grown: 3, thirsty: 0, ready: true,  dead: false, soilBonus: 0 };
  list[2] = { crop: "berries", lastCrop: null, grown: 4, thirsty: 0, ready: true,  dead: false, soilBonus: 0 };
  list[3] = { crop: null,      lastCrop: null, grown: 0, thirsty: 0, ready: false, dead: true,  soilBonus: 0 };
  list[4] = { crop: "greens",  lastCrop: null, grown: 1, thirsty: 1, ready: false, dead: false, soilBonus: 0 };
  list[6] = { crop: "berries", lastCrop: null, grown: 4, thirsty: 0, ready: true,  dead: false, soilBonus: 0 };
  list[7] = { crop: "greens",  lastCrop: null, grown: 2, thirsty: 0, ready: true,  dead: false, soilBonus: 0 };
  list[8] = { crop: "berries", lastCrop: null, grown: 3, thirsty: 1, ready: false, dead: false, soilBonus: 0 };
  return list;
}

function getNeighbors (plotIdx) {
  var row = Math.floor(plotIdx / 3);
  var column = plotIdx % 3;
  var result = [];
  if (row > 0) result.push((row - 1) * 3 + column);
  if (row < 2) result.push((row + 1) * 3 + column);
  if (column > 0) result.push((row * 3) + (column - 1));
  if (column < 2) result.push((row * 3) + (column + 1));

  return result
}

function calcSoilBonus(plotIdx) {
  var result = 0;
  var neighbors = getNeighbors(plotIdx);

  for (var neighbor of neighbors) {
    var plot = game.plots[neighbor];
    if (!plot.crop || plot.dead) continue;
    if (plot.crop == "cactus") result += 1;
    if (plot.crop == "corn" || plot.crop == "pumpkin") result -= 1;
  }

  return result;
}

function resetGame() {
  var gamePreset = difficulties[currentDifficulty];

  game = {
    day: 1, lastDay: 30,
    food: gamePreset.startFood, water: gamePreset.startWater, seeds: gamePreset.startSeeds, health: gamePreset.startHealth,
    weather: Math.max(0,Math.min(Math.floor(Math.random()*4-0.0000000001)),3), harvests: 0,
    nextWeather: null,
    forecast: null,
    has: { plow: false, windmill: false, compost: false },
    plots: newPlots(),
    picked: null,
    over: false,
    logs: [],
    difficulty: currentDifficulty
  };
  
  game.nextWeather = getNextWeather();
  game.forecast = forecast(game.nextWeather);
}
resetGame();

function keepBetween(n, low, high) {
  if (n < low) return low;
  if (n > high) return high;
  return n;
}

var flashTimer;
function flash(text) {
  var f = get("flash");
  f.textContent = text;
  f.classList.add("show");
  clearTimeout(flashTimer);
  flashTimer = setTimeout(function () { f.classList.remove("show"); }, 1600);
}

function availableCrops() {
  var out = [];
  for (var key in crops) {
    if (crops[key].unlock <= game.day) out.push(key);
  }
  return out;
}


function RotationDamage(plot,cropKey){
  var base = crops[cropKey].damage;
  if (game.has.plow) base = base * 0.6;
  if (plot.lastCrop === cropKey) base = base * 1.6;
  base = base * difficulties[currentDifficulty].damageMult;
  return Math.round(base);
}

function growthRate(plot, cropKey){
  var base = crops[cropKey].days;
  if (plot.lastCrop === cropKey) base = base + 1;
  return base;
}

function countReady() {
  var n = 0;
  for (var i = 0; i < game.plots.length; i++) {
    if (game.plots[i].ready) n++;
  }
  return n;
}

function pickPlot(i) {
  if (game.over) return;
  game.picked = (game.picked === i) ? null : i;
  draw();
}

function clearPlot(i) {
  game.plots[i] = { crop: null, lastCrop: game.plots[i].lastCrop, grown: 0, thirsty: 0, ready: false, dead: false };
  game.picked = null;
  flash("Cleared the dead plot.");
  addLog(`Cleared dead plot ${i+1}`);
  draw();
  saveGame();
}

function plantCrop(i, key) {
  var c = crops[key];
  if (game.seeds < c.seedCost) { flash("Not enough seeds."); return; }


  game.seeds -= c.seedCost;
  game.plots[i] = { crop: key, lastCrop: game.plots[i].lastCrop, grown: 0, thirsty: 0, ready: false, dead: false };
  game.picked = null;
  var isRepeat = game.plots[i].crop === game.plots[i].lastCrop;
  flash("Planted " + c.label + ".");
  addLog(isRepeat
    ? `Replanted ${c.label} in plot ${i+1}. The soil is tired.`
    : `Planted ${c.label} in plot ${i+1}.`,
    isRepeat ? "warn" : "");
  nextDay(i);
}

function waterPlot(i) {
  if (game.water < 1) { flash("No water left."); return; }
  game.water -= 1;
  game.plots[i].thirsty = 0;
  game.picked = null;
  flash("Watered the plot.");
  addLog(`Watered plot ${i+1}.`)
  nextDay(i);
}

function harvestPlot(i) {
  var p = game.plots[i];
  var c = crops[p.crop];
  var harvestedCrop = p.crop;
  game.food += c.food;
  game.water += c.water;
  game.seeds += c.seedBack;
  game.health = keepBetween(game.health - RotationDamage(p, p.crop), 0, 100);
  game.harvests += 1;
  game.plots[i] = { crop: null, lastCrop: harvestedCrop, grown: 0, thirsty: 0, ready: false, dead: false };
  game.picked = null;
  flash("Harvested " + c.label + "! +" + c.food + " food.");
  addLog(`Harvested ${c.label}! + ${c.food} food.`);
  nextDay(null);
}

function restField() {
  var heal = game.has.compost ? 8 : 4;
  game.health = keepBetween(game.health + heal, 0, 100);
  flash("You let the field rest.");
  addLog("You let the field rest.");
  nextDay(null);
}

function collectWater() {
  var amount = game.has.windmill ? 5 : 3;
  game.water += amount;
  game.health = keepBetween(game.health - 2, 0, 100);
  flash("Got " + amount + " water from the well.");
  addLog(`Got ${amount} water from the well.`)
  nextDay(null);
}

function tradeForSeeds() {
  if (game.food < 3) { flash("You need 3 food to trade."); return; }
  game.food -= 3;
  game.seeds += 2;
  flash("Traded 3 food for 2 seeds.");
  addLog("Traded 3 food for 2 seeds.");
  nextDay(null);
}

function buildTool(key) {
  var t = tools[key];
  if (game.has[key]) return;
  if (game.food < t.costFood || game.seeds < t.costSeeds) {
    flash("Not enough to build the " + t.label + ".");
    return;
  }
  game.food -= t.costFood;
  game.seeds -= t.costSeeds;
  game.has[key] = true;
  flash("Built the " + t.label + "!");
  addLog(`Built the ${t.label}!`);
  draw();
  saveGame();
}

function nextDay(plotWeJustTouched) {

  game.weather = game.nextWeather;

  var w = weathers[game.weather];
  var d = difficulties[currentDifficulty];

  addLog(w.name, w.name === "Rain" ? "good" : w.name === "Heatwave" ? "bad" : "");
  if (w.drift + d.landDrift < 0){
    addLog("The land lost " + Math.abs(w.drift + d.landDrift) + "% health.", "bad");
  }
  else if(w.drift + d.landDrift > 0){
    addLog("The land recovered " + (w.drift + d.landDrift) + "% health.", "good");
  }

  

  game.food = keepBetween(game.food - d.supplyConsumption, 0, 999);
  game.water = keepBetween(game.water - d.supplyConsumption, 0, 999);
  game.health = keepBetween(game.health + w.drift + d.landDrift, 0, 100);

  for (var i = 0; i < game.plots.length; i++) {
    var p = game.plots[i];

    p.soilBonus = keepBetween(p.soilBonus + calcSoilBonus(i),-5,5);

    if (!p.crop || p.dead || p.ready) continue;

    if (i === plotWeJustTouched || w.waters) {
      p.thirsty = 0;
    } else {
      var dry = w.dryRate;
      if (crops[p.crop].tough) dry = Math.ceil(dry / 2);

      if (p.soilBonus > 0) dry = Math.max(0, dry - 1);
      if (p.soilBonus < 0) dry += 1;

      p.thirsty += dry;
    }

    p.grown += 1;

    if (p.thirsty >= 3) {
      p.dead = true;
      addLog("Plot " + (i + 1) + " withered away.", "bad");
    } else if (p.grown >= growthRate(p,p.crop)) {
      p.ready = true;
      addLog(crops[p.crop].label + " in plot " + (i + 1) + " is ready.", "good");
    }
  }

  game.day += 1;

  game.nextWeather = getNextWeather();
  game.forecast = forecast(game.nextWeather);

  draw();
  checkIfOver();
  saveGame();
}

function checkIfOver() {
  var key = pickEnding();
  if (!key) {
    return;
  }

  game.over = true;
  clearSave();

  var ending = endings[key];

  var text = ending.text.replace("{day}",game.day);
  var afterText = ending.afterText + difficultyEnding[game.difficulty];

  var finalDay = Math.min(game.day, game.lastDay);
  var points = (finalDay * 5) + (game.health * 3) + (game.harvests * 10) + game.food;

  get("endTitle").textContent = ending.title;
  get("endText").textContent = text;
  get("endAfterText").textContent = afterText;
  get("endPoints").textContent = "Score: " + points +
    "  (day " + finalDay + ", " + game.health + "% land health, " + game.harvests + " harvests) in " + difficulties[currentDifficulty].title + "mode";
  get("endScreen").classList.remove("hide");
}

function plotInside(p) {
  if (p.dead) return cropArt.dead;
  if (!p.crop) return "";
  var c = crops[p.crop];
  var growthDays = growthRate(p,p.crop)
  var size = p.ready ? 1 : keepBetween(p.grown / growthDays, 0.3, 0.92);
  var picture = (size < 0.45 && !p.ready) ? cropArt.sprout : c.art;
  var faded = (p.thirsty >= 2 && !p.ready) ? "opacity:.5;" : "";
  return '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;' +
         'transform:scale(' + size + ');' + faded + '">' + picture + '</div>';
}

function drawField() {
  var html = "";
  for (var i = 0; i < game.plots.length; i++) {
    var p = game.plots[i];
    var classes = "plot";
    if (p.dead) classes += " dead";
    else if (p.ready) classes += " ready";
    else if (p.crop && p.thirsty >= 2) classes += " warn";
    if (game.picked === i) classes += " picked";
    if (p.soilBonus > 0) classes += " fertile";
    if (p.soilBonus < 0) classes += " depleted";

    var toolTip = plotToolTip(p, i);
    html += `<div class="${classes}" onclick="pickPlot(${i})" title="${toolTip}">${plotInside(p)}</div>`;
  }
  get("field").innerHTML = html;
}

function plotToolTip(p, i) {
  var result = [];

  result.push(`Plot ${i+1}`);

  if (p.dead) {
    result.push("Dead");
    if (p.lastCrop) {
      result.push(`Last grown: ${crops[p.lastCrop].title} , planting it again gives debuffs`);
    }
    result.push("Click to clear");
  }
  else if (!p.crop){
    result.push("Empty");
    if (p.lastCrop) {
      result.push(`Last grown: ${crops[p.lastCrop].title} , planting it again gives debuffs`);
    }
    result.push("Click to plant");
  }
  else {
    result.push(`${crops[p.crop].label} growth: ${p.grown}/${growthRate(p,p.crop)}`);

    if (p.ready) {
      result.push("Click to harvest");
    }
    else {
      result.push(`Water: ${3 - p.thirsty}`);
    }

    if (p.soilBonus > 0) {
      result.push(`Soil is fertile (+ ${p.soilBonus} )`);
    }
    else if (p.soilBonus < 0) {
      result.push(`Soil is depleted ( ${p.soilBonus} )`);
    }
  }

  return result.join("\n");
}

function choiceRow(call, art, label, plus, minus, disabled) {
  return '<button class="choice" ' + (disabled ? "disabled" : "") + ' onclick="' + call + '">' +
           '<span class="art">' + art + '</span>' +
           '<span class="words">' +
             '<span class="label">' + label + '</span>' +
             (plus  ? '<span class="plus">' + plus + '</span>'   : "") +
             (minus ? '<span class="minus">' + minus + '</span>' : "") +
           '</span>' +
         '</button>';
}

function drawChoices() {
  var html = "";

  if (game.picked === null) {
    var ready = countReady();
    if (ready > 0) {
      html += '<div class="groupLabel">' + ready + ' plot' + (ready > 1 ? "s" : "") + ' ready - click one to harvest</div>';
    }

    html += choiceRow("collectWater()", icons.water, "Collect Water",
                      "(+" + (game.has.windmill ? 5 : 3) + " water)", "-2% land health");
    html += choiceRow("restField()", cropArt.sprout, "Rest the Field",
                      "(+" + (game.has.compost ? 8 : 4) + "% land health)", "uses up your day");
    html += choiceRow("tradeForSeeds()", icons.seeds, "Trade for Seeds",
                      "(+2 seeds)", "-3 food");

    html += '<div class="groupLabel">Build (free)</div>';
    for (var key in tools) {
      var t = tools[key];
      var owned = game.has[key];
      html += choiceRow("buildTool('" + key + "')",
                        '<span style="font-size:17px">' + t.pic + "</span>",
                        t.label + (owned ? " ✓" : ""),
                        t.info,
                        owned ? "" : "-" + t.costFood + " food, -" + t.costSeeds + " seeds",
                        owned);
    }
  } else {
    var i = game.picked;
    var p = game.plots[i];

    if (p.dead) {
      html += choiceRow("clearPlot(" + i + ")", cropArt.dead, "Clear Dead Plot",
                        "free, doesn't use your day", "");
    } else if (!p.crop) {
      var list = availableCrops();
      for (var m = 0; m < list.length; m++) {
        var c = crops[list[m]];
        var gain = "(+" + c.food + " food";
        if (c.water) gain += ", +" + c.water + " water";
        gain += ")";
        html += choiceRow("plantCrop(" + i + ",'" + list[m] + "')", c.art, "Plant " + c.label,
                          gain,
                          "-" + c.seedCost + " seed" + (c.seedCost > 1 ? "s" : "") + ", " + c.days + " days");
      }
    } else if (!p.ready) {
      var c2 = crops[p.crop];
      html += '<div class="groupLabel">' + c2.label + " - day " + p.grown + " of " + c2.days + "</div>";
      html += choiceRow("waterPlot(" + i + ")", icons.water, "Water This Plot",
                        "stops it from dying", "-1 water");
    } else {
      var c3 = crops[p.crop];
      var gain2 = "(+" + c3.food + " food";
      if (c3.water) gain2 += ", +" + c3.water + " water";
      if (c3.seedBack) gain2 += ", +" + c3.seedBack + " seeds";
      gain2 += ")";
      html += choiceRow("harvestPlot(" + i + ")", c3.art, "Harvest " + c3.label,
                        gain2, "-" + RotationDamage(p, p.crop) + "% land health");
    }
  }

  get("choices").innerHTML = html;
  var firstBtn = get("choices").querySelector(".choice:not(:disabled)");
  if (firstBtn){
    firstBtn.classList.add("primary");
  }
}

function drawDifficultySelector() {
  var html = "";
  for (var key in difficulties){
    var d = difficulties[key];
    var active = key === currentDifficulty ? "active" : "";
    html += `<button class="difficultyBtn ${active}" data-key="${key}">${d.title}</button>`
  }

  get("difficultyRow").innerHTML = html;
  get("difficultySubtitle").textContent = difficulties[currentDifficulty].subtitle;

  var btns = get("difficultyRow").querySelectorAll(".difficultyBtn");
  for (var btn of btns){
    btn.addEventListener("click", function () {
      currentDifficulty = this.getAttribute("data-key");
      drawDifficultySelector();
    })
  }
}

function drawPrompt() {
  if (game.picked === null) {
    get("prompt").textContent = game.health <= 15 ? "The ground is almost finished..." : "What will you harvest today?";
    get("promptSub").textContent = weathers[game.weather].note;
  } else {
    var p = game.plots[game.picked];
    get("prompt").textContent = "Plot " + (game.picked + 1) + " selected";
    if (p.dead) get("promptSub").textContent = "This one withered away.";
    else if (!p.crop) get("promptSub").textContent = "Empty soil. Pick something to plant.";
    else if (p.ready) get("promptSub").textContent = "Ready to harvest!";
    else get("promptSub").textContent = crops[p.crop].label + " is growing. Dry for " + p.thirsty + " day(s).";
  }
}

function draw() {
  get("food").textContent = game.food;
  get("water").textContent = game.water;
  get("seeds").textContent = game.seeds;
  get("health").textContent = game.health + "%";
  get("health").style.color = game.health <= 25 ? "#d9564a" : "#9fb88a";
  get("daysLeft").textContent = Math.max(0, game.lastDay - game.day + 1);
  get("timeName").textContent = timeNames[(game.day - 1) % 4];
  get("weatherName").textContent = weathers[game.weather].name;
  get("nextWeatherName").textContent = weathers[game.forecast].name + "?";

  var belt = "";
  for (var key in tools) {
    belt += '<span class="' + (game.has[key] ? "have" : "") + '" title="' + toolToolTip(key) + '">' + tools[key].pic + "</span>";
  }
  get("toolbelt").innerHTML = belt;

  drawField();
  drawChoices();
  drawPrompt();
}

function toolToolTip(key) {
  var result = [];

  result.push(tools[key].title);

  if (game.has[key]) {
    result.push("Built");
    result.push(tools[key].info);
  }
  else {
    result.push(tools[key].info);
    result.push(`Cost: ${tools[key].costFood} Food, ${tools[key].costSeeds} Seeds`);

    if (tools[key].costFood > game.food) {
      result.push("Not enought Food")
    }
    if (tools[key].costSeeds > game.seeds) {
      result.push("Not enough Seeds");
    }
    if (tools[key].costFood <= game.food && tools[key].costSeeds <= game.seeds){
      result.push("Click on the choice panel to build");
    }
  }

  return result.join("\n");
}

var canvas = get("scene");
var pen = canvas.getContext("2d");
pen.imageSmoothingEnabled = false;
var W = 320, H = 180;

function randomish(n) {
  var v = Math.sin(n * 127.1) * 43758.5453;
  return v - Math.floor(v);
}

function pixelBall(cx, cy, r, color) {
  pen.fillStyle = color;
  for (var y = -r; y <= r; y++) {
    for (var x = -r; x <= r; x++) {
      if (x * x + y * y <= r * r) pen.fillRect(cx + x, cy + y, 1, 1);
    }
  }
}

var bladeFlip = 0;
var rainShift = 0;

function drawScene() {
  var sky = skies[(game.day - 1) % 4];
  var weather = weathers[game.weather];
  var timeNow = timeNames[(game.day - 1) % 4];

  var health = game.health;
  var stripe = 84 / sky.bands.length;
  for (var i = 0; i < sky.bands.length; i++) {
    pen.fillStyle = sampleGradient(sky,"bands",i,health);
    pen.fillRect(0, i * stripe, W, stripe + 1);
  }

  if (sky.stars) {
    pen.fillStyle = "#fff";
    for (var st = 0; st < 80; st++) {
      if (randomish(st * 11) > 0.35) {
        pen.fillRect(Math.floor(randomish(st * 3.1) * W), Math.floor(randomish(st * 7.7) * 70), 1, 1);
      }
    }
  }

  pixelBall(160, 82, 16, sampleGradient(sky, "glow", null, health));
  pixelBall(160, 82, 12, sampleGradient(sky, "sun", null, health));

  pen.fillStyle = sky.stars ? "#241a3d" : "#8a3355";
  for (var cl = 0; cl < 12; cl++) {
    var cy = 5 + Math.floor(randomish(cl * 2.3) * 48);
    var cx = Math.floor(randomish(cl * 5.1) * W);
    var cw = 16 + Math.floor(randomish(cl * 3.7) * 40);
    pen.fillRect(cx, cy, cw, 2);
  }

  pen.fillStyle = "#3a2440";
  for (var t = 0; t < 26; t++) {
    var tx = Math.floor(randomish(t * 4.4) * W);
    var th = 5 + Math.floor(randomish(t * 8.8) * 20);
    var tw = 3 + Math.floor(randomish(t * 2.2) * 6);
    pen.fillRect(tx, 88 - th, tw, th);
  }

  pen.fillStyle = sampleGradient(null, "soil", 0, health); pen.fillRect(0, 88, W, 26);
  pen.fillStyle = sampleGradient(null, "soil", 1, health); pen.fillRect(0, 114, W, 26);
  pen.fillStyle = sampleGradient(null, "soil", 2, health); pen.fillRect(0, 140, W, 24);
  pen.fillStyle = sampleGradient(null, "soil", 3, health); pen.fillRect(0, 164, W, H - 164);

  pen.fillStyle = "#3d2419";
  for (var k = 0; k < 34; k++) {
    var kx = Math.floor(randomish(k * 6.1) * W);
    var ky = 92 + Math.floor(randomish(k * 9.3) * 78);
    pen.fillRect(kx, ky, 2 + Math.floor(randomish(k) * 5), 1);
  }

  var hx = 248, hy = 72;
  pen.fillStyle = "#3d2822";
  for (var r2 = 0; r2 < 42; r2++) {
    var roofH = 12 - Math.abs(r2 - 21) * 0.5;
    pen.fillRect(hx - 3 + r2, hy - roofH, 1, roofH + 1);
  }
  pen.fillStyle = "#4a3028"; pen.fillRect(hx, hy, 36, 28);
  pen.fillStyle = "#2e1d18";
  pen.fillRect(hx, hy, 36, 2);
  pen.fillRect(hx, hy + 26, 36, 2);
  pen.fillRect(hx, hy, 2, 28);
  pen.fillRect(hx + 34, hy, 2, 28);
  var lampOn = sky.stars || timeNow === "Dusk" || timeNow === "Dawn";
  pen.fillStyle = lampOn ? "#ffbf52" : "#6b5a3a";
  pen.fillRect(hx + 22, hy + 11, 8, 8);
  pen.fillStyle = "#2e1d18";
  pen.fillRect(hx + 6, hy + 15, 8, 13);

  var wx = 222, wy = 30;
  pen.fillStyle = "#2e2130";
  pen.fillRect(wx, wy + 12, 3, 44);
  pen.fillRect(wx - 5, wy + 36, 13, 2);
  pen.fillStyle = "#1f1622";
  if (bladeFlip === 0) {
    pen.fillRect(wx + 1, wy - 10, 2, 24);
    pen.fillRect(wx - 12, wy + 1, 26, 2);
  } else {
    for (var b = -8; b <= 8; b += 2) {
      pen.fillRect(wx + b, wy + 1 + b, 2, 2);
      pen.fillRect(wx + b, wy + 3 - b, 2, 2);
    }
  }

  pen.fillStyle = "#3f5a70"; pen.fillRect(84, 102, 11, 17);
  pen.fillStyle = "#2f4457"; pen.fillRect(84, 102, 11, 3); pen.fillRect(84, 116, 11, 3);

  var farmer = [
    "..HHHH..", ".HHHHHH.", "HHHHHHHH", "...FF...", "..CCCC..",
    ".CCCCCC.", "..CCCC..", "..C..C..", "..L..L..", "..L..L.."
  ];
  var farmerColors = { H: "#6b5232", F: "#c98f5e", C: "#2f3d5c", L: "#241a20" };
  var fx = 84, fy = 122;
  for (var fr = 0; fr < farmer.length; fr++) {
    for (var fc = 0; fc < farmer[fr].length; fc++) {
      var ch = farmer[fr][fc];
      if (ch === "." || !farmerColors[ch]) continue;
      pen.fillStyle = farmerColors[ch];
      pen.fillRect(fx + fc * 2, fy + fr * 2, 2, 2);
    }
  }

  if (weather.name === "Rain") {
    pen.fillStyle = "#9fd0ea";
    for (var d = 0; d < 50; d++) {
      var dx = Math.floor(randomish(d * 5.5) * W);
      var dy = Math.floor((randomish(d * 9.1) * 180 + rainShift * 9) % 180);
      pen.fillRect(dx, dy, 1, 4);
    }
  }

  if (weather.name === "Dust") {
    pen.fillStyle = "rgba(180, 130, 80, 0.15)";
    pen.fillRect(0, 0, W, H);
  }
}

var lastFlip = 0;
function loop(t) {
  if (t - lastFlip > 420) { bladeFlip = bladeFlip ? 0 : 1; lastFlip = t; }
  rainShift += 0.4;
  drawScene();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

function toggleRules() { get("rules").classList.toggle("open"); }
function startGame(){
  clearSave();
  resetGame();
  get("menu").classList.add("hide"); 
  draw();
  addLog("Day 1. The soil is tired.", "warn");
}
function restart() {
  clearSave();
  resetGame();
  get("endScreen").classList.add("hide");
  addLog("Day 1. The soil is tired.", "warn");
  draw();
}

draw();
drawDifficultySelector();

function addLog(text, type){
  game.logs.push({day: game.day, text: text, type: type ? type : ""});
  drawLog();
}

function drawLog(){
  var html = ``
  for (var i = game.logs.length - 1 ; i >= 0; i--){
    html += `
      <div class="log ${game.logs[i].type}">
        <span class="d">${game.logs[i].day}</span> ${game.logs[i].text}
      </div>
    `
  }
  get("logs").innerHTML = html
}

var saveKey = "v1"

function saveGame(){
  if (!game || game.over){
    return;
  }
  else {
    try {
      game.saveTime = Date.now();
      localStorage.setItem(saveKey, JSON.stringify(game));
    }
    catch(e){
      console.warn("cannot save game "+e);
    }
  }
}

function loadSave(){
  try {
    var jsonData = localStorage.getItem(saveKey);
    if (!jsonData){
      return null;
    }
    var parsedData = JSON.parse(jsonData); 

    return parsedData;
  }
  catch(e){
    console.warn("cannot load game "+e);
    return null;
  }
}

function clearSave() {
  localStorage.removeItem(saveKey);
}

function hasSave() {
  return localStorage.getItem(saveKey) ? true : false
}

function continueGame(){
  var data = loadSave();
  if (!data){
    flash("no save found!");
    return;
  }
  game = data;
  currentDifficulty = game.difficulty;
  get("menu").classList.add("hide");
  addLog("Resumed on day " + game.day + ".", "warn");
  draw();
}

if (!hasSave()){
  get("continuebtn").classList.add("hide");
}
else {
  get("continuebtn").classList.remove("hide");
}

function firstEnabledChoice(){
  var btns = document.querySelectorAll("#choices .choice");
  for (var btn of btns){
    if (!btn.disabled){
      return btn;
    }
  }
  return null;
}

function handleKey(e){
  if (game.over){
    return;
  }
  if (!get("menu").classList.contains("hide")){
    return;
  }

  var key = e.key.toLowerCase();

  if (key == "h"){
    toggleHelp();
    e.preventDefault();
    return;
  }

  

  if (key == "escape"){
    if (!get("helpScreen").classList.contains("hide")){
      toggleHelp();
      e.preventDefault();
      return;
    }
    if (game.picked !== null){
      game.picked = null;
      draw();
      e.preventDefault();
    }
    return;
  }

  if (!get("helpScreen").classList.contains("hide")){
    return;
  }

  if (key >= "1" && key <= "9"){
    var idx = parseInt(key)-1;
    if (idx >= 0 && idx < game.plots.length) {
      pickPlot(idx);
      e.preventDefault();
    }
    return;
  }

  if (key === "enter" || key === " ") {
    var btn = firstEnabledChoice();
    if (btn) {
      btn.click();
      e.preventDefault();
    }
    return;
  }

  if (!game.picked){
    if (key == "w"){
      collectWater();
      e.preventDefault();
      return;
    }
    if (key == "r"){
      restField();
      e.preventDefault();
      return;
    }
    if (key == "t"){
      tradeForSeeds();
      e.preventDefault();
      return;
    }
  }
}

function toggleHelp(){
  get("helpScreen").classList.toggle("hide");
}

document.addEventListener("keydown", handleKey);

function getNextWeather(){
  var roll = Math.random();
  if (roll < 0.45) {
    return 0;
  }
  if (roll < 0.65){
    return 1;
  }
  if (roll < 0.85){
    return 2;
  }
  return 3;
}

function forecast(nextWeather) {
  var roll = Math.random();
  var forecastAccuracy = difficulties[currentDifficulty].forecastAccuracy;
  if (roll < forecastAccuracy){
    return nextWeather
  }
  else {
    while(true){
      var guess = Math.max(0,Math.min(Math.floor(Math.random()*4)),3);
      if (guess != nextWeather){
        return guess;
      }
    }
  }
}