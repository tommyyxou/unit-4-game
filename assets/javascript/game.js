var characters = [
    {
        name: "1",
        attack: 100,
        counterAttack: 100,
        charSelect: false,
        defender: false,
        img: "./assets/images/1.png"
    },
    {
        name: "2",
        attack: 100,
        counterAttack: 100,
        charSelect: false,
        defender: false,
        img: "./assets/images/2.png"
    },
    {
        name: "3",
        attack: 100,
        counterAttack: 100,
        charSelect: false,
        defender: false,
        img: "./assets/images/3.png"
    },
    {
        name: "4",
        attack: 100,
        counterAttack: 100,
        charSelect: false,
        defender: false,
        img: "./assets/images/4.png"
    },
];

let enermy = [];
let defending = [];
console.log (defending)

let x = 0;
let charName = "";
let charAttack = "";
let charCounterAttack = "";



function loadCharInfo (array) {
    charName = $("<div>")
    charName.attr ('class', "charName");
    charName.html (array.name);
    //console.log (charName);

    charImg = $("<img>")
    charImg.attr ('class', "charImg")
    charImg.attr ('src', array.img)
    //console.log (charImg);
                
    charAttack = $("<div>")
    charAttack.attr ('class', "charAttack");
    charAttack.html (array.attack);
    //console.log (charAttack);

    charCounterAttack = $("<div>")
    charCounterAttack.attr ('class', "charCounterAttack");
    charCounterAttack.html (array.counterAttack);
    //console.log (charCounterAttack);

}

function appendStats (display) {
    display.append(charName);
    display.append(charImg);
    display.append(charAttack);
    //display.append(charCounterAttack);
}

function loadChar () {
    
    for (x = 0; x < characters.length; x++) {
        let y = characters[x]
        switch (x) {
        
            case 0:
                loadCharInfo (y);
                var display = $("#character1");
                //console.log (display);
                appendStats (display);
                break;

            case 1:
                loadCharInfo (y);
                var display = $("#character2");
                //console.log (display);
                appendStats (display);
                break;
            
            case 2:
                loadCharInfo (y);
                var display = $("#character3");
                //console.log (display);
                appendStats (display);
                break;

            case 3:
                loadCharInfo (y);
                var display = $("#character4");
                //console.log (display);
                appendStats (display);
                break;
        }
    }  
}

function loadEnermy () {
    
    for (x = 0; x < characters.length; x++) {
        let y = enermy[x]
        switch (x) {
        
            case 0:
                loadCharInfo (y);
                var display = $("#enermy1");
                //console.log (display);
                appendStats (display);
                break;

            case 1:
                loadCharInfo (y);
                var display = $("#enermy2");
                //console.log (display);
                appendStats (display);
                break;
            
            case 2:
                loadCharInfo (y);
                var display = $("#enermy3");
                //console.log (display);
                appendStats (display);
                break;
        }
    }  
}

function charSelection() {
    $(".player").click(handleClickPlayer);
    $(".enermy").click(handleClickEnermy);
}
function handleClickPlayer(e) {
    let clickedDiv= e.currentTarget; //<div> parent
    let charNameSelected = clickedDiv.children[0].innerText; // <div> child
    //console.log (charNameSelected);
    if (enermy.length === 0) {
        switch (charNameSelected) {
            case "1":
                characters[0].charSelect = true;
                //console.log (characters[0].charSelect);
                break;

            case "2":
                characters[1].charSelect = true;
                //console.log (characters[1].charSelect);
                break;
            
            case "3":
                characters[2].charSelect = true;
                //console.log (characters[2].charSelect);
                break;

            case "4":
                characters[3].charSelect = true;
                //console.log (characters[3].charSelect);
                break;
        }
        pushEnermyArray ();
    } 
}

function handleClickEnermy(e) {
    let clickedDiv= e.currentTarget; //<div> parent
    let charNameSelected = clickedDiv.children[0].innerText; // <div> child
    //console.log (charNameSelected);
    for (x = 0; x < characters.length; x++) {
        if (characters[x].charSelect === false) {
            switch (charNameSelected) {
                case "1":
                    characters[0].defender = true;
                    console.log ("1 is defender:", characters[0].defender);
                    break;

                case "2":
                    characters[1].defender = true;
                    console.log ("2 is defender:", characters[1].defender);
                    break;
                
                case "3":
                    characters[2].defender = true;
                    console.log ("3 is defender:", characters[2].defender);
                    break;

                case "4":
                    characters[3].defender = true;
                    console.log ("4 is defender:", characters[3].defender);
                    break;
            }
        }
    } 

    loadDefender ();

}

function pushEnermyArray () {
    for (x = 0; x < characters.length; x++) {
        if (characters[x].charSelect === false) {
            enermy.push (characters[x]);
            //console.log (enermy);
        }
    }
    loadEnermy ();
}

function loadDefender () {
    for (x = 0; x < characters.length; x++) {
        if (characters[x].defender === true) {
            defending.push (characters[x]);
            let y = defending[0]
            loadCharInfo (y);
            var display = $("#defender");
            appendStats (display);
        }
    }
}

