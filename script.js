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

var game;

function newPlots() {
  var list = [];
  for (var i = 0; i < 9; i++) {
    list.push({ crop: null, grown: 0, thirsty: 0, ready: false, dead: false });
  }
  list[0] = { crop: "greens",  grown: 2, thirsty: 0, ready: true,  dead: false };
  list[1] = { crop: "wheat",   grown: 3, thirsty: 0, ready: true,  dead: false };
  list[2] = { crop: "berries", grown: 4, thirsty: 0, ready: true,  dead: false };
  list[3] = { crop: null,      grown: 0, thirsty: 0, ready: false, dead: true  };
  list[4] = { crop: "greens",  grown: 1, thirsty: 1, ready: false, dead: false };
  list[6] = { crop: "berries", grown: 4, thirsty: 0, ready: true,  dead: false };
  list[7] = { crop: "greens",  grown: 2, thirsty: 0, ready: true,  dead: false };
  list[8] = { crop: "berries", grown: 3, thirsty: 1, ready: false, dead: false };
  return list;
}

function resetGame() {
  game = {
    day: 1, lastDay: 30,
    food: 12, water: 8, seeds: 6, health: 42,
    weather: 0, harvests: 0,
    has: { plow: false, windmill: false, compost: false },
    plots: newPlots(),
    picked: null,
    over: false
  };
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

function harvestDamage(cropKey) {
  var base = crops[cropKey].damage;
  if (game.has.plow) base = base * 0.6;
  return Math.round(base);
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
  game.plots[i] = { crop: null, grown: 0, thirsty: 0, ready: false, dead: false };
  game.picked = null;
  flash("Cleared the dead plot.");
  draw();
}

function plantCrop(i, key) {
  var c = crops[key];
  if (game.seeds < c.seedCost) { flash("Not enough seeds."); return; }
  game.seeds -= c.seedCost;
  game.plots[i] = { crop: key, grown: 0, thirsty: 0, ready: false, dead: false };
  game.picked = null;
  flash("Planted " + c.label + ".");
  nextDay(i);
}

function waterPlot(i) {
  if (game.water < 1) { flash("No water left."); return; }
  game.water -= 1;
  game.plots[i].thirsty = 0;
  game.picked = null;
  flash("Watered the plot.");
  nextDay(i);
}

function harvestPlot(i) {
  var p = game.plots[i];
  var c = crops[p.crop];
  game.food += c.food;
  game.water += c.water;
  game.seeds += c.seedBack;
  game.health = keepBetween(game.health - harvestDamage(p.crop), 0, 100);
  game.harvests += 1;
  game.plots[i] = { crop: null, grown: 0, thirsty: 0, ready: false, dead: false };
  game.picked = null;
  flash("Harvested " + c.label + "! +" + c.food + " food.");
  nextDay(null);
}

function restField() {
  var heal = game.has.compost ? 8 : 4;
  game.health = keepBetween(game.health + heal, 0, 100);
  flash("You let the field rest.");
  nextDay(null);
}

function collectWater() {
  var amount = game.has.windmill ? 5 : 3;
  game.water += amount;
  game.health = keepBetween(game.health - 2, 0, 100);
  flash("Got " + amount + " water from the well.");
  nextDay(null);
}

function tradeForSeeds() {
  if (game.food < 3) { flash("You need 3 food to trade."); return; }
  game.food -= 3;
  game.seeds += 2;
  flash("Traded 3 food for 2 seeds.");
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
  draw();
}

function nextDay(plotWeJustTouched) {
  var w = weathers[game.weather];

  game.food = keepBetween(game.food - 1, 0, 999);
  game.water = keepBetween(game.water - 1, 0, 999);
  game.health = keepBetween(game.health + w.drift, 0, 100);

  for (var i = 0; i < game.plots.length; i++) {
    var p = game.plots[i];
    if (!p.crop || p.dead || p.ready) continue;

    if (i === plotWeJustTouched || w.waters) {
      p.thirsty = 0;
    } else {
      var dry = w.dryRate;
      if (crops[p.crop].tough) dry = Math.ceil(dry / 2);
      p.thirsty += dry;
    }

    p.grown += 1;

    if (p.thirsty >= 3) p.dead = true;
    else if (p.grown >= crops[p.crop].days) p.ready = true;
  }

  game.day += 1;

  var roll = Math.random();
  if (roll < 0.45) game.weather = 0;
  else if (roll < 0.65) game.weather = 1;
  else if (roll < 0.85) game.weather = 2;
  else game.weather = 3;

  draw();
  checkIfOver();
}

function checkIfOver() {
  var title = "", text = "";

  if (game.health <= 0) {
    title = "The land is gone.";
    text = "On day " + game.day + " the soil finally gave out. Nothing will grow here again.";
  } else if (game.food <= 0) {
    title = "There is no food left.";
    text = "You made it to day " + game.day + ", but hunger got there first.";
  } else if (game.water <= 0) {
    title = "The water is gone.";
    text = "Day " + game.day + ". The last drop dried up under that hot sun.";
  } else if (game.day > game.lastDay) {
    title = "Day 30 - The Last Harvest.";
    if (game.health >= 50) text = "You made it, and you left the land better than you found it.";
    else if (game.health >= 20) text = "You made it, barely. The land is scarred but still alive.";
    else text = "You survived, but there is almost nothing left. Was it worth it?";
  } else {
    return;
  }

  game.over = true;
  var finalDay = Math.min(game.day, game.lastDay);
  var points = (finalDay * 5) + (game.health * 3) + (game.harvests * 10) + game.food;
  get("endTitle").textContent = title;
  get("endText").textContent = text;
  get("endPoints").textContent = "Score: " + points +
    "  (day " + finalDay + ", " + game.health + "% land, " + game.harvests + " harvests)";
  get("endScreen").classList.remove("hide");
}

function plotInside(p) {
  if (p.dead) return cropArt.dead;
  if (!p.crop) return "";
  var c = crops[p.crop];
  var size = p.ready ? 1 : keepBetween(p.grown / c.days, 0.3, 0.92);
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
    html += '<div class="' + classes + '" onclick="pickPlot(' + i + ')">' + plotInside(p) + '</div>';
  }
  get("field").innerHTML = html;
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
                        gain2, "-" + harvestDamage(p.crop) + "% land health");
    }
  }

  get("choices").innerHTML = html;
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

  var belt = "";
  for (var key in tools) {
    belt += '<span class="' + (game.has[key] ? "have" : "") + '" title="' + tools[key].label + '">' + tools[key].pic + "</span>";
  }
  get("toolbelt").innerHTML = belt;

  drawField();
  drawChoices();
  drawPrompt();
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

  var stripe = 84 / sky.bands.length;
  for (var i = 0; i < sky.bands.length; i++) {
    pen.fillStyle = sky.bands[i];
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

  pixelBall(160, 82, 16, sky.glow);
  pixelBall(160, 82, 12, sky.sun);

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

  pen.fillStyle = "#6b4530"; pen.fillRect(0, 88, W, 26);
  pen.fillStyle = "#5c3a28"; pen.fillRect(0, 114, W, 26);
  pen.fillStyle = "#472c20"; pen.fillRect(0, 140, W, 24);
  pen.fillStyle = "#301d16"; pen.fillRect(0, 164, W, H - 164);

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
    pen.fillStyle = "rgba(180,130,80,0.16)";
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
function startGame() { get("menu").classList.add("hide"); }
function restart() {
  resetGame();
  get("endScreen").classList.add("hide");
  draw();
}

draw();
