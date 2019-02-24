var characters = [
    {
        name: "Ken",
        attack: 40,
        hitPoint: 100,
        defenderAttack: 5,
        charSelect: false,
        defender: false,
        defeated: false,
        img: "./assets/images/1.gif",    
    },
    {
        name: "Dhalsim",
        attack: 8,
        hitPoint: 120,
        defenderAttack: 10,
        charSelect: false,
        defender: false,
        defeated: false,
        img: "./assets/images/2.gif",
    },
    {
        name: "Akuma",
        attack: 12,
        hitPoint: 125,
        defenderAttack: 20,
        charSelect: false,
        defender: false,
        defeated: false,
        img: "./assets/images/3.gif",
    },
    {
        name: "Ryu",
        attack: 5,
        hitPoint: 150,
        defenderAttack: 25,
        charSelect: false,
        defender: false,
        defeated: false,
        img: "./assets/images/4.gif",
    },
];

let enemy = [];
let defending = [];

let x = 0;
let charName = "";
let charAttack = "";
let charHitPoint = "";
let charDefAtt = "";
let playerHP = null;
let playerAtt = null;
let defenderHP = null;
let defenderAtt = null;
let attackInitialized = false;
let numberOfDefeated = null;
let gameWon = false;
let gameLose = false;
let iOfPlayer = null;
let iOfDefender = null;

function loadCharInfo (array) {
    charName = $("<p>")
    charName.attr ('class', "charName name");
    charName.html (array.name);

    charImg = $("<img>")
    charImg.attr ('class', "charImg")
    charImg.attr ('src', array.img)
                
    charAttack = $("<p>")
    charAttack.attr ('class', "charAttack");
    charAttack.html (array.attack);

    charHitPoint = $("<div>")
    charHitPoint.attr ('class', "charHitPoint");
    charHitPoint.html (array.hitPoint);

    charDefAtt = $("<div>")
    charDefAtt.attr ('class', "charDefAtt");
    charDefAtt.html (array.defenderAttack);
}

function appendStats (display) {
    display.append(charName);
    display.append(charImg);
    display.append(charHitPoint);
}

function appendStatsImage (display) {
    // display.append(charName);
    display.append(charImg);
    // display.append(charHitPoint);
}

function start () {
    for (x = 0; x < characters.length; x++) {
        let string = "character" + (x + 1);
        let charDiv = $("<div>");
        charDiv.attr ('class', "character player");
        charDiv.attr ('id', string);
        $("#yourCharacter").append(charDiv);
    } 
    loadChar ();
    charSelection ();
}

function loadChar () {
    for (x = 0; x < characters.length; x++) {
        let y = characters[x];
        let string = "#character" + (x + 1);
        loadCharInfo (y);
        var display = $(string);
        appendStats (display);
    }  
}

function loadEnermy () {
    for (x = 0; x < enemy.length; x++) {
        let y = enemy[x];
        let string = "#enemy" + (x + 1);
        loadCharInfo (y);
        var display = $(string);
        appendStats (display);  
        
    }  
}

function charSelection() {
    if (gameLose === false && gameWon === false) {
        $(".player").click(handleClickPlayer);
        $(".enemy").click(handleClickEnermy);
    }
}

function handleClickPlayer(e) {
    let clickedDiv= e.currentTarget; //<div> parent
    let charNameSelected = clickedDiv.children[0].innerText; // <div> child
    if (enemy.length === 0 && gameLose === false && gameWon === false) {
        for (x = 0; x < characters.length; x++) {
            if (charNameSelected === characters[x].name) {
                characters [x].charSelect = true;
                iOfPlayer = x;
            } else {
                let string = "#character" + (x + 1);
                $(string).remove();
            }
        }
        pushEnermyArray ();      
    }   
}

function handleClickEnermy(e) {
    let clickedDiv= e.currentTarget; //<div> parent
    let charNameSelected = clickedDiv.children[0].innerText; // <div> child
    if (gameLose === false && gameWon === false) {
        for (x = 0; x < characters.length; x++) {
            if (characters[x].charSelect === false && charNameSelected === characters[x].name) {
                characters[x].defender = true; 
                iOfDefender = x;
            }        
        } 
        for (x = 0; x < enemy.length; x++) {
            if (defending.length === 0 && enemy[x].defender === true) {
                let string = "#enemy" + (x + 1);
                $(string).remove();
            }
        }
    }
    loadDefender ();
}

function pushEnermyArray () {
    if (enemy.length === 0); {
        for (x = 0; x < characters.length; x++) {
            if (characters[x].charSelect === false) {
                enemy.push (characters[x]);
            }
        }
    }
    loadEnermy ();
}

function loadDefender () {
    if (defending.length === 0) {
        for (x = 0; x < characters.length; x++) {
            if (characters[x].defender === true && characters[x].defeated === false) {
                defending.push (characters[x]);
                let y = defending[0];
                loadCharInfo (y);
                var display = $("#defender");
                appendStatsImage (display);
                console.log (defending);
                $("#defenderHealth").val(100);
                $("#defenderName").html(defending[0].name)
            }
        }
    } 
    initializePlayerStats ();
    initializeDefenderStats ();
}

function initializePlayerStats () {
    if (attackInitialized === false) {
        for (x = 0; x < characters.length; x++) {
            if (characters[x].charSelect === true) {
                playerHP = characters[x].hitPoint;
                console.log ("player HP:", playerHP);
                playerAtt = characters[x].attack; 
                console.log ("player Att:", playerAtt);
                $("#playerName").html(characters[x].name);
            }
            if (characters[x].defender === true) {
                defenderHP = characters[x].hitPoint;
                console.log ("defender HP:", defenderHP);
                defenderAtt = characters[x].defenderAttack; 
                console.log ("defender Att:", defenderAtt);
            }
        }
        attackInitialized = true;
    }    
}

function initializeDefenderStats () {
    for (x = 0; x < characters.length; x++) {
            
        if (characters[x].defender === true) {
            defenderHP = characters[x].hitPoint;
            console.log ("defender HP:", defenderHP);
            defenderAtt = characters[x].defenderAttack; 
            console.log ("defender Att:", defenderAtt);
        }  
    }    
}

function attackDefender () {
    if (gameLose === false && gameWon === false) {
        if (defending.length === 0) {
            $("#playerAttMsg").text("choose an enemy");
            $("#defenderAttMsg").text("");
        } else {
            defenderHP = defenderHP - playerAtt;
            let DefHPpercent = (defenderHP / defending[0].hitPoint) * 100 ;
            $("#defenderHealth").val(DefHPpercent);
            var defHP = $("#defender .charHitPoint").html();
            console.log (defHP);
            $("#defender .charHitPoint").html(defenderHP);
            $("#defenderAttMsg").html(defending[0].name + " attacked you for " + defenderAtt + " damage."); 
            defenderHPCheck ();
        }
    }
}

function defeated (defenderName) {
    for (x = 0; x < characters.length; x++) {
        if (defenderName === characters[x].name) {
            characters[x].defeated = true;
        }        
    } 
}

function defenderHPCheck () {
    if (defenderHP <= 0) {
        let defenderName = defending[0].name
        defeated (defenderName);
        defending = [];
        $("#defender").remove();
        $("#defenderDiv").append("<div id='defender'></div>")
        winningCondition ();
    } else {
        playerHP = playerHP - defenderAtt;

        let plaHPpercent = (playerHP / characters[iOfPlayer].hitPoint) * 100 ;
        $("#playerHealth").val(plaHPpercent);
        $(".charHitPoint:first").html(playerHP);
        $("#playerAttMsg").html("You attacked " + defending[0].name + " for " + playerAtt + " damage.");
        playerAtt = playerAtt + 8;
        playerHPCheck ();
    }
}

function playerHPCheck () {
    if (playerHP <= 0 && gameWon === false) {
        $("#playerAttMsg").html("You Lose!!");
        $("#defenderAttMsg").html("");
        $("#resetButton").html("<button onClick='window.location.reload()'>Reset Game</button>") 
        gameLose = true;
    }
}

function winningCondition () {

    if (numberOfDefeated < 3){
        for (x = 0; x < characters.length; x++) {
            if (characters[x].defeated === true) {
                numberOfDefeated++;
            }
        }
    } else { 
        $("#playerAttMsg").html("You Won!!");
        $("#defenderAttMsg").html("");
        $("#resetButton").html("<button onClick='window.location.reload()'>Reset Game</button>");
        gameWon = true;
    }
}


