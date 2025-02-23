const colors = {
        'Acertule': '#B09880',
        'Andrille': '#745E43',
        'Arlecaille': '#F6712F',
        'Bakewa': '#F39A05',
        'Bakewa_forme_toxique': '#56A363',
        'Banlieuzard': '#AE5EA8',
        'Bicertule': '#000000',
        'Big Boy': '#313131',
        'Brintombre': '#685242',
        'Cachabime': '#725BB7',
        'Cachamousse': '#FF7FED',
        'Capture': '#D2301F',
        'Carapatte': '#3EC65D',
        'Cavernous': '#183640',
        'Cerepereau': '#E8A1C0',
        'Cervelet': '#9E9E9E',
        'Cherubliss': '#FFF6B0',
        'Chiselith': '#EAEAEA',
        'Cirqua': '#F6712F',
        'Cobrasier': '#D71717',
        'Cochoux': '#90CD79',
        'Colibrat': '#BDB4A8',
        'Colibrute': '#BDB4A8',
        'Dampoule': '#FFD073',
        'Drainda': '#4E4E4E',
        'Draindam': '#4E4E4E',
        'Eclaireuil': '#DCC06F',
        'Eclasette': '#E4C879',
        'Eros': '#F5F3EC',
        'Fat Boy': '#A8A8A8',
        'Fuitamer': '#3EC65D',
        'Fuunuki': '#9B846B',
        'Gaskid': '#B39870',
        'Goinfrex': '#4163B5',
        'Grandouille': '#FFD073',
        'Graville': '#8D7353',
        'Gravitonn': '#828282',
        'Grippolin': '#ADEEB3',
        'Grizznuit': '#183640',
        'Horlotte': '#828282',
        'Inazuka': '#FFD17B',
        'Levitan': '#C7C7C7',
        'Lil': '#3D2344',
        'Lilia': '#3D2344',
        'Little Boy': '#ED3C3C',
        'Lumineuil': '#DCC06F',
        'Martelot': '#ACD3E4',
        'Mentalpin': '#E585AF',
        'Migalerie': '#887E70',
        'Motisma': '#3D3D3D',
        'Moussin': '#A6A6A6',
        'Mushido': '#494949',
        'Ortipus': '#56A181',
        'Oursombre': '#183640',
        'Pandouille': '#FFD073',
        'Pangona': '#ADEEB3',
        'Panhache': '#FFFFFF',
        'Pestolin': '#ADEEB3',
        'Pistorvet': '#EB2222',
        'Plantipus': '#55A985',
        'Poigeon': '#611A80',
        'Poulpic': '#BB96EB',
        'Poupesprit': '#DBC7AB',
        'Poutoux': '#464442',
        'Pythocanon': '#D42323',
        'Quinpitaine': '#87BAEF',
        'Rature': '#9B9B9B',
        'Rocorico': '#A6A6A6',
        'Romalier': '#90CD79',
        'Ronflex': '#4163B5',
        'Sambrise': '#94E672',
        'Samushi': '#E1151D',
        'Scaragon': '#4C23C9',
        'Scelloptillon': '#343031',
        'Scultaros': '#F5F3EC',
        'Sporinja': '#85674E',
        'Ticoni': '#B6483E',
        'Toupoux': '#AC8558',
        'Toxinoble': '#607A60',
        'Trombre': '#685242',
        'Tuftul': '#887E70',
        'Vacilys': '#3D2344',
        'Valvadius': '#E8E8E8',
        'Vegalier': '#90CD79',
        'Verminox': '#607A60',
        'Vivipus': '#55A985',
        'Voodoudou': '#DBC7AB',
        'Yeto': '#88B8EF',
        'Yukio': '#88B8EF'
      }
      
let keys = Object.keys(colors);
let randomKey = keys[Math.floor(Math.random() * keys.length)];
let correctColor = colors[randomKey];

document.getElementById("word").innerText = `Trouvez la couleur pour : ${randomKey}`;

let scores = { 1: 0, 2: 0 };
let rounds = 0;
const maxRounds = 5;

function enableInputs(enable) {
    document.getElementById("colorPicker1").disabled = !enable;
    document.getElementById("colorPicker2").disabled = !enable;
    document.getElementById("validateButton").disabled = !enable;
}

function checkColor() {
    let userColor1 = document.getElementById("colorPicker1").value;
    let userColor2 = document.getElementById("colorPicker2").value;

    let score1 = getColorDifference(userColor1, correctColor);
    let score2 = getColorDifference(userColor2, correctColor);

    scores[1] += score1;
    scores[2] += score2;

    document.getElementById("result1").innerText = `Score: ${scores[1]}`;
    document.getElementById("result2").innerText = `Score: ${scores[2]}`;

    // Afficher la pop-up avec la bonne couleur et le pixel art
    document.getElementById("colorDisplay").style.backgroundColor = correctColor;
    document.getElementById("pixelArt").src = "Pokemon/"+randomKey.toLowerCase()+".png"; // Assurez-vous que les images sont nommées comme les clés en minuscules
    document.getElementById("popup").style.display = "flex";

    // Désactiver les inputs et le bouton jusqu'au tour suivant
    enableInputs(false);
}

function getColorDifference(color1, color2) {
    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    
    // Calculate the squared difference between each color channel
    const diff = Math.sqrt(
        Math.pow(c1.r - c2.r, 2) +
        Math.pow(c1.g - c2.g, 2) +
        Math.pow(c1.b - c2.b, 2)
    );
    
    // Define a threshold after which the score is 0
    const threshold = 180; // Adjust this value for severity

    if (diff > threshold) {
        return 0;
    }

    // Map the color difference to a score between 0 and 100
    // Apply a more precise scaling to give a sharp penalty for large differences
    const score = Math.max(0, 100 - Math.floor((diff / 1.8)));  // A tighter scaling factor

    return score;
}


function hexToRgb(hex) {
    let bigint = parseInt(hex.substring(1), 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function nextRound() {
    document.getElementById("popup").style.display = "none";

    rounds++;
    if (rounds >= maxRounds) {
        determineWinner();
    } else {
        newRound();
    }
}

function newRound() {
    randomKey = keys[Math.floor(Math.random() * keys.length)];
    correctColor = colors[randomKey];
    document.getElementById("word").innerText = `Trouvez la couleur pour : ${randomKey}`;

    // Réactiver les inputs pour la nouvelle manche
    enableInputs(true);
}

function determineWinner() {
    let winnerText;
    if (scores[1] > scores[2]) {
        winnerText = "Le Joueur 1 gagne ! 🎉";
    } else if (scores[2] > scores[1]) {
        winnerText = "Le Joueur 2 gagne ! 🎉";
    } else {
        winnerText = "Égalité ! 🤝";
    }
    document.getElementById("winner").innerText = winnerText;
}