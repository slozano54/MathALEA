import { tridictionnaire, filtreDictionnaire, filtreDictionnaireValeurCle, filtreDictionnaireValeurTableauCle }  from "./outils.js" ;
import {dictionnaireDesExercicesAleatoires} from "./dictionnaireDesExercicesAleatoires.js"
import {dictionnaireC3} from "./dictionnaireC3.js" 
import {dictionnaireDNB} from "./dictionnaireDNB.js"

// On concatène les différentes listes d'exercices
export let dictionnaireDesExercices = {...dictionnaireDesExercicesAleatoires,...dictionnaireDNB, ...dictionnaireC3};
let liste_des_exercices_disponibles = tridictionnaire(dictionnaireDesExercices);

function liste_html_des_exercices_d_un_theme(theme){
  let liste = '';
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    liste +=
      `<span class="id_exercice">${id}</span> - <a class="lien_id_exercice" numero="${id}">${dictionnaire[id].titre}</a></br>\n`;
  }
  return liste;
}
function liste_html_des_exercices_DNB_annee(annee){
  let liste = '';
  let dictionnaire = filtreDictionnaireValeurCle(dictionnaireDNB,"annee",annee);
  for (let id in dictionnaire) {
    liste +=
      `<a style="line-height:2.5" class="lien_id_exercice" numero="${id}">${dictionnaire[id]["lieu"]} - Ex ${dictionnaire[id]["numeroExercice"]}</a> ${liste_html_des_tags(dictionnaire[id])} </br>\n`;
  }
  return liste;
}

function liste_html_des_exercices_DNB_theme(theme){
  let liste = '';
  let dictionnaire = filtreDictionnaireValeurTableauCle(dictionnaireDNB,"tags",theme);
  let tableauDesExercices = []
  for (let id in dictionnaire){
      tableauDesExercices.push(id)
  }
  // On créé un tableau "copie" du dictionnaire pour pouvoir le trier dans l'inverse de l'ordre alphabétique et faire ainsi apparaitre les exercices les plus récents
  tableauDesExercices = tableauDesExercices.sort().reverse()
  for (let id of tableauDesExercices) {
    liste +=
      `<a style="line-height:2.5" class="lien_id_exercice" numero="${id}">${dictionnaire[id]["annee"]} - ${dictionnaire[id]["lieu"]} - Ex ${dictionnaire[id]["numeroExercice"]}</a> ${liste_html_des_tags(dictionnaire[id])} </br>\n`;
  }
  return liste;
}

function liste_html_des_exercices_d_un_niveau(liste_de_themes){ // liste_de_themes = [['6N1','6N1 - Numérations et fractions niveau 1'] , [' ',' '] ]
  let liste = '';
  for (let theme of liste_de_themes){
    liste += `<h3>${theme[1]}</h3>`;
    liste += liste_html_des_exercices_d_un_theme(theme[0]);
  }
  return liste;
}


function get_liste_html_des_exercices_DNB(){ 
  let liste = '<div class="accordion">';
  for (let annee of ["2020","2019","2018","2017","2016","2015","2014","2013"]){
    liste += `<div class="title"><i class="dropdown icon"></i> ${annee}</div><div class="content">`;
    liste += liste_html_des_exercices_DNB_annee(annee);
    liste += `</div>`
  }
  liste += `</div>`
  return liste;
}

function get_liste_html_des_exercices_DNB_theme(){ 
  let liste = '<div class="accordion">';
  for (let theme of ["Pythagore","Thalès","Trigonométrie","Géométrie plane","Transformations",
  "Géométrie dans l'espace",
  "Aires et périmètres",
  "Volumes",
  "Durées",
  "Grandeurs composées",
  "Agrandissement-réduction",
  "Calculs numériques",
   "Puissances",
   "Fractions",
   "Pourcentages",
   "Proportionnalité",
  "Calcul littéral",
   "Equations",
  "Fonctions",
  "Statistiques",
  "Probabilités",
  "Arithmétique",
  "Algorithmique-programmation",
  "Tableur"
]){

    liste += `<div class="title"><i class="dropdown icon"></i> ${theme}</div><div class="content">`;
    liste += liste_html_des_exercices_DNB_theme(theme);
    liste += `</div>`
  }
  liste += `</div>`
  return liste;
}

function liste_html_des_tags(objet){
    let result = ''
    if (objet["tags"]!==undefined){
        for (let tag of objet["tags"]){
            result += `<div class="ui mini blue label">${tag}</div>`
        }
    }
    return result
}


export function menuDesExercicesDisponibles(){

// Détermine le nombre d'exercices par niveaux
    let nombre_d_exercices_disponibles_c3 = 0;
    let nombre_d_exercices_disponibles_6 = 0;
    let nombre_d_exercices_disponibles_5 = 0;
    let nombre_d_exercices_disponibles_4 = 0;
    let nombre_d_exercices_disponibles_3 = 0;
    let nombre_d_exercices_disponibles_2 = 0;
    let nombre_d_exercices_disponibles_1 = 0;
    let nombre_d_exercices_disponibles_T = 0;
    let nombre_d_exercices_disponibles_CM = 0;
    let nombre_d_exercices_disponibles_prof = 0;
    let nombre_d_exercices_disponibles_PE = 0;
    let nombre_d_exercices_disponibles_beta = 0;
    for (let id in liste_des_exercices_disponibles) {
      if (id[0] == "c" && id[1] == "3") {
        nombre_d_exercices_disponibles_c3 += 1;
      }
      if (id[0] == 6) {
        nombre_d_exercices_disponibles_6 += 1;
      }
      if (id[0] == 5) {
        nombre_d_exercices_disponibles_5 += 1;
      }
      if (id[0] == 4) {
        nombre_d_exercices_disponibles_4 += 1;
      }
      if (id[0] == 3) {
        nombre_d_exercices_disponibles_3 += 1;
      }
      if (id[0] == 2) {
        nombre_d_exercices_disponibles_2 += 1;
      }
      if (id[0] == 1) {
        nombre_d_exercices_disponibles_1 += 1;
      }
      if (id[0] == "T") {
        nombre_d_exercices_disponibles_T += 1;
      }
      if (id[0] == "C") {
        nombre_d_exercices_disponibles_CM += 1;
      }
      if (id[0] == "P" && id[1] == "0") {
        nombre_d_exercices_disponibles_prof += 1;
      }
      if (id[0] == "P" && id[1] == "E") {
        nombre_d_exercices_disponibles_PE += 1;
      }
      if (id[0] == "b" && id[1] == "e") {
        nombre_d_exercices_disponibles_beta += 1;
      }
    }

    //
    let liste_html_des_exercices_c3 =[];
    let liste_html_des_exercices_6 = [];
    let liste_html_des_exercices_5 = [];
    let liste_html_des_exercices_4 = [];
    let liste_html_des_exercices_3 = [];
    let liste_html_des_exercices_DNB = [];
    let liste_html_des_exercices_DNB_theme = [];
    let liste_html_des_exercices_2 = [];
    let liste_html_des_exercices_1 = [];
    let liste_html_des_exercices_T = [];
    let liste_html_des_exercices_CM = [];
    let liste_html_des_exercices_prof = [];
    let liste_html_des_exercices_PE = [];
    let liste_html_des_exercices_beta = [];

    // Affiche de la liste des exercices disponibles
    let liste_html_des_exercices ='<h3 class="ui block header">Exercices disponibles</h3>\n\n';

    liste_html_des_exercices_DNB = get_liste_html_des_exercices_DNB()
    liste_html_des_exercices_DNB_theme = get_liste_html_des_exercices_DNB_theme()

    liste_html_des_exercices_c3 = liste_html_des_exercices_d_un_niveau([
      ['c3C1','c3C1 - Calculs niveau 1'],['c3C2','c3C2 - Calculs niveau 2'],['c3C3','c3C3 - Calculs niveau 3'],
      ['c3N1','c3N1 - Numération Niveau 1'],['c3N2','c3N2 - Numération Niveau 2'],['c3N3','c3N3 - Numération Niveau 3']])
    
    liste_html_des_exercices_6 = liste_html_des_exercices_d_un_niveau([
      ['6C1','6C1 - Calculs niveau 1'],['6C2','6C2 - Calculs niveau 2'],['6C3','6C3 - Calculs niveau 3'],
      ['6D1','6D1 - Les durées'],
      ['6G1','6G1 - Géométrie niveau 1'],['6G2','6G2 - Géométrie niveau 2'],['6G3','6G3 - Géométrie niveau 3'],['6G4','6G4 - Géométrie niveau 4'],
      ['6M1','6M1 - Grandeurs et mesures niveau 1'],['6M2','6M2 - Grandeurs et mesures niveau 2'],['6M3', '6M3 - Volumes'],
      ['6N1','6N1 - Numération et fractions niveau 1'],['6N2','6N2 - Numération et fractions niveau 2'],['6N3','6N3 - Numération et fractions niveau 3'],['6N4','6N4 - Numération et fractions niveau 4'],
      ['6P1','6P1 - Proportionnalité'],['6S1','6S1 - Statistiques'],
      ['6Algo1','6A - Algorithmique']
    ])
      liste_html_des_exercices_5 = liste_html_des_exercices_d_un_niveau([
        ['5A1','5A1 - Arithmetique'],['5C1','5C1 - Calculs'],
        ['5G1','5G1 - Symétries'],['5G2','5G2 - Triangles'],['5G3','5G3 - Angles'],['5G4','5G4 - Parallélogrammes'],['5G5','5G5 - Espace'],
        ['5L1','5L1 - Calcul littéral'],
        ['5M1','5M1 - Périmètres et aires'],['5M2','5M2 - Volumes'],['5M3','5M3 - Durées'],
        ['5N1','5N1 - Numération et fractions niveau 1'],['5N2','5N2 - Calculs avec les fractions'],
        ['5P1','5P1 - Proportionnalité'],['5R1','5R1 - Relatifs niveau 1'],['5R2','5R2 - Relatifs niveau 2'],
        ['5S1','5S1 - Statistiques'],['5S2','5S2 - Probabilités']
      ])
      liste_html_des_exercices_4 = liste_html_des_exercices_d_un_niveau([
        ['4C1','4C1 - Relatifs'],['4C2','4C2 - Fractions'],['4C3','4C3 - Puissances'],
        ['4F1','4F1 - Notion de fonction'],
        ['4G1','4G1 - Translation et rotation'],['4G2','4G2 - Théorème de Pythagore'],['4G3','4G3 - Théorème de Thalès'],['4G4',"4G4 - Cosinus d'un angle"],['4G5',"4G5 - Espace"],
        ['4L1','4L1 - Calcul littéral'],['4L2','4L2 - Équation'],['4P1','4P1 - Proportionnalité'],['4S1','4S1 - Statistiques'],['4S2','4S2 - Probabilités'],
        ['4Algo1','4A1 - Algorithmique']]);
      liste_html_des_exercices_3 = liste_html_des_exercices_d_un_niveau([
        ['3A1','3A1 - Arithmetique'],
        ['3F1','3F1 - Généralités sur les fonctions'],['3F2','3F2 - Fonctions affines et linéaires'],
        ['3G1','3G1 - Homothétie et rotation'],['3G2','3G2 - Théorème de Thalès'],['3G3','3G3 - Trigonométrie'],['3G4',"3G4 - Espace"],
        ['3L1','3L1 - Calcul littéral'],['3P1','3P1 - Proportionnalité'],['3S1','3S1 - Statistiques'],['3S2','3S2 - Probabilités'],
        ['3Algo1','3Algo1 - Algorithmique premier niveau']
      ])
 /*    liste_html_des_exercices_1 = liste_html_des_exercices_d_un_niveau([
        ['1E1','1E1 -  Équations'],
        ['1N1','1N1 -  Nombres et calculs'],
        ['1F1','1F1 -  Fonctions'],
      ])
        liste_html_des_exercices_2 = liste_html_des_exercices_d_un_niveau([
          ['2G1','2G1 -  Géométrie'],
          ['2N1','2N1 -  Nombres et calculs'],
          ['1L1','1L1 -  Calcul littéral'],
        ])
  */    
    for (let id in liste_des_exercices_disponibles) {
      let exercice_tmp = id;
      
      if (id[0] == '1') {
        liste_html_des_exercices_1 +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == '2') {
        liste_html_des_exercices_2 +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }   
      if (id[0] == 'T') {
        liste_html_des_exercices_T +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "P" && id[1] == "E") {
        liste_html_des_exercices_PE +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "C") {
        liste_html_des_exercices_CM +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "P" && id[1] == "0") {
        liste_html_des_exercices_prof +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
      if (id[0] == "b" && id[1] == "e") {
        liste_html_des_exercices_beta +=
          '<span class="id_exercice">' +
          id +
          '</span> - <a class="lien_id_exercice" numero="' +
          id +
          '">' +
          dictionnaireDesExercices[exercice_tmp].titre +
          "</a></br>\n";
      }
    }

    // Change l'ordre des exercices suivant l'URL
    if (window.location.href.indexOf("beta") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Beta (${nombre_d_exercices_disponibles_beta})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_beta;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("cm.html") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_CM;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CM1 / CM2(${nombre_d_exercices_disponibles_c3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_c3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_6;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_5;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_4;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_2;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Première (${nombre_d_exercices_disponibles_1})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_1;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Terminale (${nombre_d_exercices_disponibles_T})</div><div class="content">`;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CRPE (${nombre_d_exercices_disponibles_PE})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_PE;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    } else if (window.location.href.indexOf("outils") > 0) {
      liste_html_des_exercices += `<div class="ui accordion"><div class="active title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="active content">`;
      liste_html_des_exercices += liste_html_des_exercices_prof;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `</div>`;
    }
    else {
      liste_html_des_exercices += `<div class="ui accordion"><div class="title"><i class="dropdown icon"></i>CM1 / CM2 (${nombre_d_exercices_disponibles_c3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_c3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Sixième (${nombre_d_exercices_disponibles_6})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_6;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Cinquième (${nombre_d_exercices_disponibles_5})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_5;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Quatrième (${nombre_d_exercices_disponibles_4})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_4;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Troisième (${nombre_d_exercices_disponibles_3})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_3;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Exercices de brevet (classés par année)</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_DNB;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Exercices de brevet (classés par thème)</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_DNB_theme;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Seconde (${nombre_d_exercices_disponibles_2})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_2;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Première (${nombre_d_exercices_disponibles_1})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_1;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Terminale (${nombre_d_exercices_disponibles_T})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_T;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>CRPE (${nombre_d_exercices_disponibles_PE})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_PE;
      liste_html_des_exercices += `</div>`;
      liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Calcul mental (${nombre_d_exercices_disponibles_CM})</div><div class="content">`;
      liste_html_des_exercices += liste_html_des_exercices_CM;
      liste_html_des_exercices += `</div>`;
      // Ajoute les outils prof sur mathalealatex
      if (window.location.href.indexOf("mathalealatex.html") > 0) {
        liste_html_des_exercices += `<div class="title"><i class="dropdown icon"></i>Outils pour le professeur (${nombre_d_exercices_disponibles_prof})</div><div class="content">`;
        liste_html_des_exercices += liste_html_des_exercices_prof;
        liste_html_des_exercices += `</div>`;
      }
      liste_html_des_exercices += `</div>`;
    }

    $("#liste_des_exercices").html(liste_html_des_exercices);
    renderMathInElement(document.body, {
      delimiters: [
        { left: "\\[", right: "\\]", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: true,
      errorColor: "#CC0000",
      strict: "warn",
      trust: false,
      });

    // Gère le clic sur un exercice de la liste
    $(".lien_id_exercice").click(function () {
      let numero = $(this).attr("numero");
      if ($("#choix_des_exercices").val() == "") {
        $("#choix_des_exercices").val($("#choix_des_exercices").val() + numero);
      } else {
        $("#choix_des_exercices").val(
          $("#choix_des_exercices").val() + "," + numero
        );
      }
      // liste_des_exercices = $("#choix_des_exercices")
      //   .val()
      //   .replace(/\s/g, "")
      //   .replace(";", ",")
      //   .split(",");

      // Créé un évènement de changement de la valeur du champ pour déclencher la mise à jour
      let event = new Event('change');
      document.getElementById('choix_des_exercices').dispatchEvent(event);
      
      // Actualise KaTeX pour les titres d'exercices utilisant LaTeX
      renderMathInElement(document.body, {
        delimiters: [
          { left: "\\[", right: "\\]", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: true,
        errorColor: "#CC0000",
        strict: "warn",
        trust: false,
      });
    });
}


export function menuTheme(theme) {
  let codeHTML = '<h2 class="ui horizontal divider header">Exercices en ligne à données aléatoires</h2>'
  codeHTML += '\n<div class="ui middle aligned animated selection divided list">'
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  codeHTML += '\n</div>'
  return codeHTML
  
}


function listeTheme(theme) {
  let codeHTML = ''
  let dictionnaire = filtreDictionnaire(liste_des_exercices_disponibles,theme);
  for (let id in dictionnaire) {
    codeHTML +=
      `<a class="item" href="/exercice.html?ex=${id}" target="_blank">
      <img class="ui avatar image" src="/images/dice.png"> <div class="header content">${id} - ${dictionnaire[id].titre} </div>
    </a>`
  }
  return codeHTML
  
<<<<<<< HEAD
}

let dictionnaireDNB = {
    "dnb_2013_04_pondichery_1": {
        "annee": "2013",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_04_pondichery_1.png",
        "pngcor": "/tex/png/dnb_2013_04_pondichery_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_04_pondichery_1.tex",
        "urlcor": "/tex/dnb_2013_04_pondichery_1_cor.tex"
    },
    "dnb_2013_04_pondichery_2": {
        "annee": "2013",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_04_pondichery_2.png",
        "pngcor": "/tex/png/dnb_2013_04_pondichery_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_04_pondichery_2.tex",
        "urlcor": "/tex/dnb_2013_04_pondichery_2_cor.tex"
    },
    "dnb_2013_04_pondichery_3": {
        "annee": "2013",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_04_pondichery_3.png",
        "pngcor": "/tex/png/dnb_2013_04_pondichery_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_04_pondichery_3.tex",
        "urlcor": "/tex/dnb_2013_04_pondichery_3_cor.tex"
    },
    "dnb_2013_04_pondichery_4": {
        "annee": "2013",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_04_pondichery_4.png",
        "pngcor": "/tex/png/dnb_2013_04_pondichery_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_04_pondichery_4.tex",
        "urlcor": "/tex/dnb_2013_04_pondichery_4_cor.tex"
    },
    "dnb_2013_04_pondichery_5": {
        "annee": "2013",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_04_pondichery_5.png",
        "pngcor": "/tex/png/dnb_2013_04_pondichery_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_04_pondichery_5.tex",
        "urlcor": "/tex/dnb_2013_04_pondichery_5_cor.tex"
    },
    "dnb_2013_06_ameriquenord_1": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_06_ameriquenord_1.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_1.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_1_cor.tex"
    },
    "dnb_2013_06_ameriquenord_2": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_06_ameriquenord_2.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_2.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_2_cor.tex"
    },
    "dnb_2013_06_ameriquenord_3": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_06_ameriquenord_3.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_3.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_3_cor.tex"
    },
    "dnb_2013_06_ameriquenord_4": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_06_ameriquenord_4.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_4.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_4_cor.tex"
    },
    "dnb_2013_06_ameriquenord_5": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_06_ameriquenord_5.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_5.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_5_cor.tex"
    },
    "dnb_2013_06_ameriquenord_6": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_06_ameriquenord_6.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_6.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_6_cor.tex"
    },
    "dnb_2013_06_ameriquenord_7": {
        "annee": "2013",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2013_06_ameriquenord_7.png",
        "pngcor": "/tex/png/dnb_2013_06_ameriquenord_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_ameriquenord_7.tex",
        "urlcor": "/tex/dnb_2013_06_ameriquenord_7_cor.tex"
    },
    "dnb_2013_06_asie_1": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_06_asie_1.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_1.tex",
        "urlcor": "/tex/dnb_2013_06_asie_1_cor.tex"
    },
    "dnb_2013_06_asie_2": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_06_asie_2.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_2.tex",
        "urlcor": "/tex/dnb_2013_06_asie_2_cor.tex"
    },
    "dnb_2013_06_asie_3": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_06_asie_3.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_3.tex",
        "urlcor": "/tex/dnb_2013_06_asie_3_cor.tex"
    },
    "dnb_2013_06_asie_4": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_06_asie_4.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_4.tex",
        "urlcor": "/tex/dnb_2013_06_asie_4_cor.tex"
    },
    "dnb_2013_06_asie_5": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_06_asie_5.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_5.tex",
        "urlcor": "/tex/dnb_2013_06_asie_5_cor.tex"
    },
    "dnb_2013_06_asie_6": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_06_asie_6.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_6.tex",
        "urlcor": "/tex/dnb_2013_06_asie_6_cor.tex"
    },
    "dnb_2013_06_asie_7": {
        "annee": "2013",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2013_06_asie_7.png",
        "pngcor": "/tex/png/dnb_2013_06_asie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_asie_7.tex",
        "urlcor": "/tex/dnb_2013_06_asie_7_cor.tex"
    },
    "dnb_2013_06_etrangers_1": {
        "annee": "2013",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_06_etrangers_1.png",
        "pngcor": "/tex/png/dnb_2013_06_etrangers_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_etrangers_1.tex",
        "urlcor": "/tex/dnb_2013_06_etrangers_1_cor.tex"
    },
    "dnb_2013_06_etrangers_2": {
        "annee": "2013",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_06_etrangers_2.png",
        "pngcor": "/tex/png/dnb_2013_06_etrangers_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_etrangers_2.tex",
        "urlcor": "/tex/dnb_2013_06_etrangers_2_cor.tex"
    },
    "dnb_2013_06_etrangers_3": {
        "annee": "2013",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_06_etrangers_3.png",
        "pngcor": "/tex/png/dnb_2013_06_etrangers_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_etrangers_3.tex",
        "urlcor": "/tex/dnb_2013_06_etrangers_3_cor.tex"
    },
    "dnb_2013_06_etrangers_4": {
        "annee": "2013",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_06_etrangers_4.png",
        "pngcor": "/tex/png/dnb_2013_06_etrangers_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_etrangers_4.tex",
        "urlcor": "/tex/dnb_2013_06_etrangers_4_cor.tex"
    },
    "dnb_2013_06_etrangers_5": {
        "annee": "2013",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_06_etrangers_5.png",
        "pngcor": "/tex/png/dnb_2013_06_etrangers_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_etrangers_5.tex",
        "urlcor": "/tex/dnb_2013_06_etrangers_5_cor.tex"
    },
    "dnb_2013_06_etrangers_6": {
        "annee": "2013",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_06_etrangers_6.png",
        "pngcor": "/tex/png/dnb_2013_06_etrangers_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_etrangers_6.tex",
        "urlcor": "/tex/dnb_2013_06_etrangers_6_cor.tex"
    },
    "dnb_2013_06_metropole_1": {
        "annee": "2013",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_06_metropole_1.png",
        "pngcor": "/tex/png/dnb_2013_06_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_metropole_1.tex",
        "urlcor": "/tex/dnb_2013_06_metropole_1_cor.tex"
    },
    "dnb_2013_06_metropole_2": {
        "annee": "2013",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_06_metropole_2.png",
        "pngcor": "/tex/png/dnb_2013_06_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_metropole_2.tex",
        "urlcor": "/tex/dnb_2013_06_metropole_2_cor.tex"
    },
    "dnb_2013_06_metropole_3": {
        "annee": "2013",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_06_metropole_3.png",
        "pngcor": "/tex/png/dnb_2013_06_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_metropole_3.tex",
        "urlcor": "/tex/dnb_2013_06_metropole_3_cor.tex"
    },
    "dnb_2013_06_metropole_4": {
        "annee": "2013",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_06_metropole_4.png",
        "pngcor": "/tex/png/dnb_2013_06_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_metropole_4.tex",
        "urlcor": "/tex/dnb_2013_06_metropole_4_cor.tex"
    },
    "dnb_2013_06_metropole_5": {
        "annee": "2013",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_06_metropole_5.png",
        "pngcor": "/tex/png/dnb_2013_06_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_metropole_5.tex",
        "urlcor": "/tex/dnb_2013_06_metropole_5_cor.tex"
    },
    "dnb_2013_06_metropole_6": {
        "annee": "2013",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_06_metropole_6.png",
        "pngcor": "/tex/png/dnb_2013_06_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_metropole_6.tex",
        "urlcor": "/tex/dnb_2013_06_metropole_6_cor.tex"
    },
    "dnb_2013_06_polynesie_1": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_06_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_1.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_1_cor.tex"
    },
    "dnb_2013_06_polynesie_2": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_06_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_2.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_2_cor.tex"
    },
    "dnb_2013_06_polynesie_3": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_06_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_3.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_3_cor.tex"
    },
    "dnb_2013_06_polynesie_4": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_06_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_4.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_4_cor.tex"
    },
    "dnb_2013_06_polynesie_5": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_06_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_5.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_5_cor.tex"
    },
    "dnb_2013_06_polynesie_6": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_06_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_6.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_6_cor.tex"
    },
    "dnb_2013_06_polynesie_7": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2013_06_polynesie_7.png",
        "pngcor": "/tex/png/dnb_2013_06_polynesie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_06_polynesie_7.tex",
        "urlcor": "/tex/dnb_2013_06_polynesie_7_cor.tex"
    },
    "dnb_2013_09_polynesie_1": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_09_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2013_09_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_09_polynesie_1.tex",
        "urlcor": "/tex/dnb_2013_09_polynesie_1_cor.tex"
    },
    "dnb_2013_09_polynesie_2": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_09_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2013_09_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_09_polynesie_2.tex",
        "urlcor": "/tex/dnb_2013_09_polynesie_2_cor.tex"
    },
    "dnb_2013_09_polynesie_3": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_09_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2013_09_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_09_polynesie_3.tex",
        "urlcor": "/tex/dnb_2013_09_polynesie_3_cor.tex"
    },
    "dnb_2013_09_polynesie_4": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_09_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2013_09_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_09_polynesie_4.tex",
        "urlcor": "/tex/dnb_2013_09_polynesie_4_cor.tex"
    },
    "dnb_2013_09_polynesie_5": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_09_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2013_09_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_09_polynesie_5.tex",
        "urlcor": "/tex/dnb_2013_09_polynesie_5_cor.tex"
    },
    "dnb_2013_09_polynesie_6": {
        "annee": "2013",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_09_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2013_09_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_09_polynesie_6.tex",
        "urlcor": "/tex/dnb_2013_09_polynesie_6_cor.tex"
    },
    "dnb_2013_11_ameriquesud_1": {
        "annee": "2013",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_11_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2013_11_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_11_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2013_11_ameriquesud_1_cor.tex"
    },
    "dnb_2013_11_ameriquesud_2": {
        "annee": "2013",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_11_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2013_11_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_11_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2013_11_ameriquesud_2_cor.tex"
    },
    "dnb_2013_11_ameriquesud_3": {
        "annee": "2013",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_11_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2013_11_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_11_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2013_11_ameriquesud_3_cor.tex"
    },
    "dnb_2013_11_ameriquesud_4": {
        "annee": "2013",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_11_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2013_11_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_11_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2013_11_ameriquesud_4_cor.tex"
    },
    "dnb_2013_11_ameriquesud_5": {
        "annee": "2013",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_11_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2013_11_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_11_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2013_11_ameriquesud_5_cor.tex"
    },
    "dnb_2013_12_caledonie_1": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2013_12_caledonie_1.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_1.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_1_cor.tex"
    },
    "dnb_2013_12_caledonie_2": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2013_12_caledonie_2.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_2.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_2_cor.tex"
    },
    "dnb_2013_12_caledonie_3": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2013_12_caledonie_3.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_3.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_3_cor.tex"
    },
    "dnb_2013_12_caledonie_4": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2013_12_caledonie_4.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_4.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_4_cor.tex"
    },
    "dnb_2013_12_caledonie_5": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2013_12_caledonie_5.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_5.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_5_cor.tex"
    },
    "dnb_2013_12_caledonie_6": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2013_12_caledonie_6.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_6.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_6_cor.tex"
    },
    "dnb_2013_12_caledonie_7": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2013_12_caledonie_7.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_7.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_7_cor.tex"
    },
    "dnb_2013_12_caledonie_8": {
        "annee": "2013",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "8",
        "png": "/tex/png/dnb_2013_12_caledonie_8.png",
        "pngcor": "/tex/png/dnb_2013_12_caledonie_8_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2013_12_caledonie_8.tex",
        "urlcor": "/tex/dnb_2013_12_caledonie_8_cor.tex"
    },
    "dnb_2014_04_pondichery_1": {
        "annee": "2014",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_04_pondichery_1.png",
        "pngcor": "/tex/png/dnb_2014_04_pondichery_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_04_pondichery_1.tex",
        "urlcor": "/tex/dnb_2014_04_pondichery_1_cor.tex",
        "tags":["Arithmétique"]
    },
    "dnb_2014_04_pondichery_2": {
        "annee": "2014",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_04_pondichery_2.png",
        "pngcor": "/tex/png/dnb_2014_04_pondichery_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_04_pondichery_2.tex",
        "urlcor": "/tex/dnb_2014_04_pondichery_2_cor.tex",
        "tags":["QCM,Calculs numériques,Calcul littéral,Probabilités,Fonctions,Aires et périmètres,Hors-programme"]
    },
    "dnb_2014_04_pondichery_3": {
        "annee": "2014",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_04_pondichery_3.png",
        "pngcor": "/tex/png/dnb_2014_04_pondichery_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_04_pondichery_3.tex",
        "urlcor": "/tex/dnb_2014_04_pondichery_3_cor.tex",
        "tags":["Vrai-faux,Calcul littéral,Prise d'initiative"]
    },
    "dnb_2014_04_pondichery_4": {
        "annee": "2014",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_04_pondichery_4.png",
        "pngcor": "/tex/png/dnb_2014_04_pondichery_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_04_pondichery_4.tex",
        "urlcor": "/tex/dnb_2014_04_pondichery_4_cor.tex",
        "tags":["Géométrie plane,Pythagore,Thalès"]
    },
    "dnb_2014_04_pondichery_5": {
        "annee": "2014",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_04_pondichery_5.png",
        "pngcor": "/tex/png/dnb_2014_04_pondichery_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_04_pondichery_5.tex",
        "urlcor": "/tex/dnb_2014_04_pondichery_5_cor.tex",
        "tags":["Géométrie dans l'espace,Volumes,Agrandissement-reduction,Lecture-graphique"]
    },
    "dnb_2014_04_pondichery_6": {
        "annee": "2014",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_04_pondichery_6.png",
        "pngcor": "/tex/png/dnb_2014_04_pondichery_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_04_pondichery_6.tex",
        "urlcor": "/tex/dnb_2014_04_pondichery_6_cor.tex",
        "tags":["Prise d'initiative,Tableur,Statistiques,Pourcentages"]
    },
    "dnb_2014_06_ameriquenord_1": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_06_ameriquenord_1.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_1.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_1_cor.tex",
        "tags":["QCM,Arithmétique,Calculs numériques,Inéquations,Hors-programme,Racine carrée,Calcul littéral"]
    },
    "dnb_2014_06_ameriquenord_2": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_06_ameriquenord_2.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_2.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_2_cor.tex",
        "tags":["Géométrie dans l'espace,Volumes"]
    },
    "dnb_2014_06_ameriquenord_3": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_06_ameriquenord_3.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_3.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_3_cor.tex",
        "tags":["Proportionnalité,Grandeurs composées,Vitesse,Volumes,Pourcentages"]
    },
    "dnb_2014_06_ameriquenord_4": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_06_ameriquenord_4.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_4.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_4_cor.tex",
        "tags":["Tableur,Calculs numériques"]
    },
    "dnb_2014_06_ameriquenord_5": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_06_ameriquenord_5.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_5.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_5_cor.tex",
        "tags":["Géométrie plane,Pythagore,Recherche d'informations"]
    },
    "dnb_2014_06_ameriquenord_6": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_06_ameriquenord_6.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_6.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_6_cor.tex",
        "tags":["Probabilités,Prise d'initiative,Recherche d'informations"]
    },
    "dnb_2014_06_ameriquenord_7": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2014_06_ameriquenord_7.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_7.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_7_cor.tex",
        "tags":["Prise d'initiative,Recherche d'informations,Proportionnalité,Grandeurs composées,Vitesse,Lecture graphique"]
    },
    "dnb_2014_06_ameriquenord_8": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "8",
        "png": "/tex/png/dnb_2014_06_ameriquenord_8.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_8_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_8.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_8_cor.tex",
        "tags":["Aire et périmètres,Volumes,Grandeurs composées,Débit"]
    },
    "dnb_2014_06_ameriquenord_9": {
        "annee": "2014",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "9",
        "png": "/tex/png/dnb_2014_06_ameriquenord_9.png",
        "pngcor": "/tex/png/dnb_2014_06_ameriquenord_9_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_ameriquenord_9.tex",
        "urlcor": "/tex/dnb_2014_06_ameriquenord_9_cor.tex",
        "tags":["Recherche d'informations,Prise d'initiative, Trigonométrie"]
    },
    "dnb_2014_06_asie_1": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_06_asie_1.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_1.tex",
        "urlcor": "/tex/dnb_2014_06_asie_1_cor.tex",
        "tags":["Calculs numériques,Puissances"]
    },
    "dnb_2014_06_asie_2": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_06_asie_2.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_2.tex",
        "urlcor": "/tex/dnb_2014_06_asie_2_cor.tex",
        "tags":["Calculs numériques,Fonctions,Lecture graphique"]
    },
    "dnb_2014_06_asie_3": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_06_asie_3.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_3.tex",
        "urlcor": "/tex/dnb_2014_06_asie_3_cor.tex",
        "tags":["Agrandissement-reduction,Géométrie plane"]
    },
    "dnb_2014_06_asie_4": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_06_asie_4.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_4.tex",
        "urlcor": "/tex/dnb_2014_06_asie_4_cor.tex",
        "tags":["Vrai-faux,Pourcentages,Arithmétique,Hors-programme,Calcul littéral"]
    },
    "dnb_2014_06_asie_5": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_06_asie_5.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_5.tex",
        "urlcor": "/tex/dnb_2014_06_asie_5_cor.tex",
        "tags":["Géométrie plane,Parallélogramme,Triangle inscrit dans un demi cercle,Hors-programme,Parallélisme"]
    },
    "dnb_2014_06_asie_6": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_06_asie_6.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_6.tex",
        "urlcor": "/tex/dnb_2014_06_asie_6_cor.tex",
        "tags":["Calculs numérique,Recherche d'informations, Pourcentages,Inégalités"]
    },
    "dnb_2014_06_asie_7": {
        "annee": "2014",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2014_06_asie_7.png",
        "pngcor": "/tex/png/dnb_2014_06_asie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_asie_7.tex",
        "urlcor": "/tex/dnb_2014_06_asie_7_cor.tex",
        "tags":["Prise d'initiative,Recherche d'informations,Trigonométrie,Pythagore"]
    },
    "dnb_2014_06_etrangers_1": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_06_etrangers_1.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_1.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_1_cor.tex",
        "tags":["Tableur,Arithmétique,Hors-programme,Proportionnalité"]
    },
    "dnb_2014_06_etrangers_2": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_06_etrangers_2.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_2.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_2_cor.tex",
        "tags":["Prise d'initiative,Recherche d'informations,Pythagore"]
    },
    "dnb_2014_06_etrangers_3": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_06_etrangers_3.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_3.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_3_cor.tex",
        "tags":["Vrai-faux,Triangle inscrit dans un cercle,Hors-programme,Géométrie plane,Médiatrice,Triangles,Quadrilétères particuliers"]
    },
    "dnb_2014_06_etrangers_4": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_06_etrangers_4.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_4.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_4_cor.tex",
        "tags":["Géométrie dans l'espace,Pyramide,Agrandissement-réduction,Échelle,Volumes,Grandeurs composées,Prise d'initiative,Recherche d'informations"]
    },
    "dnb_2014_06_etrangers_5": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_06_etrangers_5.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_5.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_5_cor.tex",
        "tags":["Calcul littéral,Calculs numériques"]
    },
    "dnb_2014_06_etrangers_6": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_06_etrangers_6.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_6.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_6_cor.tex",
        "tags":["Proportionnalité,Grandeurs composées,Vitesse,Recherche d'informations,Prise d'initiative"]
    },
    "dnb_2014_06_etrangers_7": {
        "annee": "2014",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2014_06_etrangers_7.png",
        "pngcor": "/tex/png/dnb_2014_06_etrangers_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_etrangers_7.tex",
        "urlcor": "/tex/dnb_2014_06_etrangers_7_cor.tex",
        "tags":["Fonctions,Calculs numériques"]
    },
    "dnb_2014_06_polynesie_1": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_06_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_1.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_1_cor.tex",
        "tags":["Probabilités"]
    },
    "dnb_2014_06_polynesie_2": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_06_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_2.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_2_cor.tex",
        "tags":["Géométrie plane,Pythagore,Thalès"]
    },
    "dnb_2014_06_polynesie_3": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_06_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_3.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_3_cor.tex",
        "tags":["Fonctions,Calculs numériques,Tableur"]
    },
    "dnb_2014_06_polynesie_4": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_06_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_4.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_4_cor.tex",
        "tags":["Arithmétique,Puissances,Caulculs numériques,Racine carrée,Hors-programme"]
    },
    "dnb_2014_06_polynesie_5": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_06_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_5.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_5_cor.tex",
        "tags":["Tableur,Calculs numériques"]
    },
    "dnb_2014_06_polynesie_6": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_06_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_6.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_6_cor.tex",
        "tags":["Prise d'initiative,Recherche d'informations,Volumes,Aires et périmètres,Proportionnalité"]
    },
    "dnb_2014_06_polynesie_7": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2014_06_polynesie_7.png",
        "pngcor": "/tex/png/dnb_2014_06_polynesie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_06_polynesie_7.tex",
        "urlcor": "/tex/dnb_2014_06_polynesie_7_cor.tex",
        "tags":["Géométrie plane,Triangles,Prise d'initiative"]
    },
    "dnb_2014_09_metropole_1": {
        "annee": "2014",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_09_metropole_1.png",
        "pngcor": "/tex/png/dnb_2014_09_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_metropole_1.tex",
        "urlcor": "/tex/dnb_2014_09_metropole_1_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_metropole_2": {
        "annee": "2014",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_09_metropole_2.png",
        "pngcor": "/tex/png/dnb_2014_09_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_metropole_2.tex",
        "urlcor": "/tex/dnb_2014_09_metropole_2_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_metropole_3": {
        "annee": "2014",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_09_metropole_3.png",
        "pngcor": "/tex/png/dnb_2014_09_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_metropole_3.tex",
        "urlcor": "/tex/dnb_2014_09_metropole_3_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_metropole_4": {
        "annee": "2014",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_09_metropole_4.png",
        "pngcor": "/tex/png/dnb_2014_09_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_metropole_4.tex",
        "urlcor": "/tex/dnb_2014_09_metropole_4_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_metropole_5": {
        "annee": "2014",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_09_metropole_5.png",
        "pngcor": "/tex/png/dnb_2014_09_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_metropole_5.tex",
        "urlcor": "/tex/dnb_2014_09_metropole_5_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_metropole_6": {
        "annee": "2014",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_09_metropole_6.png",
        "pngcor": "/tex/png/dnb_2014_09_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_metropole_6.tex",
        "urlcor": "/tex/dnb_2014_09_metropole_6_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_1": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_09_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_1.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_1_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_2": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_09_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_2.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_2_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_3": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_09_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_3.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_3_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_4": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_09_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_4.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_4_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_5": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_09_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_5.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_5_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_6": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_09_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_6.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_6_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_09_polynesie_7": {
        "annee": "2014",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2014_09_polynesie_7.png",
        "pngcor": "/tex/png/dnb_2014_09_polynesie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_09_polynesie_7.tex",
        "urlcor": "/tex/dnb_2014_09_polynesie_7_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_11_ameriquesud_1": {
        "annee": "2014",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_11_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2014_11_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_11_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2014_11_ameriquesud_1_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_11_ameriquesud_2": {
        "annee": "2014",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_11_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2014_11_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_11_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2014_11_ameriquesud_2_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_11_ameriquesud_3": {
        "annee": "2014",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_11_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2014_11_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_11_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2014_11_ameriquesud_3_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_11_ameriquesud_4": {
        "annee": "2014",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_11_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2014_11_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_11_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2014_11_ameriquesud_4_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_11_ameriquesud_5": {
        "annee": "2014",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_11_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2014_11_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_11_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2014_11_ameriquesud_5_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_11_ameriquesud_6": {
        "annee": "2014",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_11_ameriquesud_6.png",
        "pngcor": "/tex/png/dnb_2014_11_ameriquesud_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_11_ameriquesud_6.tex",
        "urlcor": "/tex/dnb_2014_11_ameriquesud_6_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_1": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2014_12_caledonie_1.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_1.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_1_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_2": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2014_12_caledonie_2.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_2.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_2_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_3": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2014_12_caledonie_3.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_3.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_3_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_4": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2014_12_caledonie_4.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_4.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_4_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_5": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2014_12_caledonie_5.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_5.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_5_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_6": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2014_12_caledonie_6.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_6.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_6_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_7": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2014_12_caledonie_7.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_7.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_7_cor.tex",
        "tags":["incoming"]
    },
    "dnb_2014_12_caledonie_8": {
        "annee": "2014",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "8",
        "png": "/tex/png/dnb_2014_12_caledonie_8.png",
        "pngcor": "/tex/png/dnb_2014_12_caledonie_8_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2014_12_caledonie_8.tex",
        "urlcor": "/tex/dnb_2014_12_caledonie_8_cor.tex",
        "tags":["incoming"]
    },

    // Fichiers mystère !!!
    // "dnb_2015_03_caledonie_1": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "1",
    //     "png": "/tex/png/dnb_2015_03_caledonie_1.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_1_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_1.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_1_cor.tex"
    // },
    // "dnb_2015_03_caledonie_2": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "2",
    //     "png": "/tex/png/dnb_2015_03_caledonie_2.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_2_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_2.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_2_cor.tex"
    // },
    // "dnb_2015_03_caledonie_3": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "3",
    //     "png": "/tex/png/dnb_2015_03_caledonie_3.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_3_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_3.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_3_cor.tex"
    // },
    // "dnb_2015_03_caledonie_4": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "4",
    //     "png": "/tex/png/dnb_2015_03_caledonie_4.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_4_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_4.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_4_cor.tex"
    // },
    // "dnb_2015_03_caledonie_5": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "5",
    //     "png": "/tex/png/dnb_2015_03_caledonie_5.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_5_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_5.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_5_cor.tex"
    // },
    // "dnb_2015_03_caledonie_6": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "6",
    //     "png": "/tex/png/dnb_2015_03_caledonie_6.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_6_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_6.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_6_cor.tex"
    // },
    // "dnb_2015_03_caledonie_7": {
    //     "annee": "2015",
    //     "lieu": "Nouvelle Calédonie",
    //     "mois": "Mars",
    //     "numeroExercice": "7",
    //     "png": "/tex/png/dnb_2015_03_caledonie_7.png",
    //     "pngcor": "/tex/png/dnb_2015_03_caledonie_7_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_03_caledonie_7.tex",
    //     "urlcor": "/tex/dnb_2015_03_caledonie_7_cor.tex"
    // },
    "dnb_2015_04_pondichery_1": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_04_pondichery_1.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_1.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_1_cor.tex",
        "tags":["QCM","Calcul littéral","Equations","Fonctions","Agrandissement-réduction","Tableur"]
    },
    "dnb_2015_04_pondichery_2": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_04_pondichery_2.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_2.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_2_cor.tex",
        "tags":["Arithmétique"]
    },
    "dnb_2015_04_pondichery_3": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_04_pondichery_3.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_3.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_3_cor.tex",
        "tags":["Exercice à prise d'initiative","Calculs numériques","Pourcentages"]
    },
    "dnb_2015_04_pondichery_4": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_04_pondichery_4.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_4.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_4_cor.tex",
        "tags":["Volumes","Agrandissement-réduction"]
    },
    "dnb_2015_04_pondichery_5": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_04_pondichery_5.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_5.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_5_cor.tex",
        "tags":["Probabilité"]
    },
    "dnb_2015_04_pondichery_6": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_04_pondichery_6.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_6.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_6_cor.tex",
        "tags":["Pythagore","Trigonométrie","Aires et périmètres"]
    },
    "dnb_2015_04_pondichery_7": {
        "annee": "2015",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_04_pondichery_7.png",
        "pngcor": "/tex/png/dnb_2015_04_pondichery_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_04_pondichery_7.tex",
        "urlcor": "/tex/dnb_2015_04_pondichery_7_cor.tex",
        "tags":["Prise d'initiative","Aires et périmètres","Calcul littéral"]
    },
    "dnb_2015_06_ameriquenord_1": {
        "annee": "2015",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_06_ameriquenord_1.png",
        "pngcor": "/tex/png/dnb_2015_06_ameriquenord_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_ameriquenord_1.tex",
        "urlcor": "/tex/dnb_2015_06_ameriquenord_1_cor.tex",
        "tags":["Puissances","Calcul littéral","Pourcentages","Agrandissement-réduction"]
    },
    "dnb_2015_06_ameriquenord_2": {
        "annee": "2015",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_06_ameriquenord_2.png",
        "pngcor": "/tex/png/dnb_2015_06_ameriquenord_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_ameriquenord_2.tex",
        "urlcor": "/tex/dnb_2015_06_ameriquenord_2_cor.tex",
        "tags":["Fonctions","Proportionalité"]
    },
    "dnb_2015_06_ameriquenord_3": {
        "annee": "2015",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_06_ameriquenord_3.png",
        "pngcor": "/tex/png/dnb_2015_06_ameriquenord_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_ameriquenord_3.tex",
        "urlcor": "/tex/dnb_2015_06_ameriquenord_3_cor.tex",
        "tags":["Statistiques","Probabilité"]
    },
    "dnb_2015_06_ameriquenord_4": {
        "annee": "2015",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_06_ameriquenord_4.png",
        "pngcor": "/tex/png/dnb_2015_06_ameriquenord_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_ameriquenord_4.tex",
        "urlcor": "/tex/dnb_2015_06_ameriquenord_4_cor.tex",
        "tags":["Calcul littéral"]
    },
    "dnb_2015_06_ameriquenord_5": {
        "annee": "2015",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_06_ameriquenord_5.png",
        "pngcor": "/tex/png/dnb_2015_06_ameriquenord_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_ameriquenord_5.tex",
        "urlcor": "/tex/dnb_2015_06_ameriquenord_5_cor.tex",
        "tags":["Thalès"]
    },
    "dnb_2015_06_ameriquenord_6": {
        "annee": "2015",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_06_ameriquenord_6.png",
        "pngcor": "/tex/png/dnb_2015_06_ameriquenord_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_ameriquenord_6.tex",
        "urlcor": "/tex/dnb_2015_06_ameriquenord_6_cor.tex",
        "tags":["Statistiques","Durées"]
    },
    "dnb_2015_06_asie_1": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_06_asie_1.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_1.tex",
        "urlcor": "/tex/dnb_2015_06_asie_1_cor.tex",
        "tags":["QCM","Puissances","Calcul littéral","Calculs numériques"]
    },
    "dnb_2015_06_asie_2": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_06_asie_2.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_2.tex",
        "urlcor": "/tex/dnb_2015_06_asie_2_cor.tex",
        "tags":["Pythagore","Proportionnalité"]
    },
    "dnb_2015_06_asie_3": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_06_asie_3.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_3.tex",
        "urlcor": "/tex/dnb_2015_06_asie_3_cor.tex",
        "tags":["Probabilité"]
    },
    "dnb_2015_06_asie_4": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_06_asie_4.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_4.tex",
        "urlcor": "/tex/dnb_2015_06_asie_4_cor.tex",
        "tags":["Prise d'initiative","Arithmétique"]
    },
    "dnb_2015_06_asie_5": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_06_asie_5.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_5.tex",
        "urlcor": "/tex/dnb_2015_06_asie_5_cor.tex",
        "tags":["Trigonométrie","Proportionnalité"]
    },
    "dnb_2015_06_asie_6": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_06_asie_6.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_6.tex",
        "urlcor": "/tex/dnb_2015_06_asie_6_cor.tex",
        "tags":["Fonctions","Tableur","Equations"]
    },
    "dnb_2015_06_asie_7": {
        "annee": "2015",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_06_asie_7.png",
        "pngcor": "/tex/png/dnb_2015_06_asie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_asie_7.tex",
        "urlcor": "/tex/dnb_2015_06_asie_7_cor.tex",
        "tags":["Volumes"]
    },
    // Groupement 1
    //  "dnb_2015_06_etrangers_1": {
    //     "annee": "2015",
    //     "lieu": "Centres étrangers",
    //     "mois": "Juin",
    //     "numeroExercice": "1",
    //     "png": "/tex/png/dnb_2015_06_etrangers_1.png",
    //     "pngcor": "/tex/png/dnb_2015_06_etrangers_1_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_06_etrangers_1.tex",
    //     "urlcor": "/tex/dnb_2015_06_etrangers_1_cor.tex",
    //     "tags":["Probabilité"]
    // },
    // "dnb_2015_06_etrangers_2": {
    //     "annee": "2015",
    //     "lieu": "Centres étrangers",
    //     "mois": "Juin",
    //     "numeroExercice": "2",
    //     "png": "/tex/png/dnb_2015_06_etrangers_2.png",
    //     "pngcor": "/tex/png/dnb_2015_06_etrangers_2_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_06_etrangers_2.tex",
    //     "urlcor": "/tex/dnb_2015_06_etrangers_2_cor.tex",
    //     "tags":["Proportionnalité"]
    // },
    // "dnb_2015_06_etrangers_3": {
    //     "annee": "2015",
    //     "lieu": "Centres étrangers",
    //     "mois": "Juin",
    //     "numeroExercice": "3",
    //     "png": "/tex/png/dnb_2015_06_etrangers_3.png",
    //     "pngcor": "/tex/png/dnb_2015_06_etrangers_3_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_06_etrangers_3.tex",
    //     "urlcor": "/tex/dnb_2015_06_etrangers_3_cor.tex",
    //     "tags":["Aires et périmètres","Géométrie plane","Pythagore"]
    // },
    // "dnb_2015_06_etrangers_4": {
    //     "annee": "2015",
    //     "lieu": "Centres étrangers",
    //     "mois": "Juin",
    //     "numeroExercice": "4",
    //     "png": "/tex/png/dnb_2015_06_etrangers_4.png",
    //     "pngcor": "/tex/png/dnb_2015_06_etrangers_4_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_06_etrangers_4.tex",
    //     "urlcor": "/tex/dnb_2015_06_etrangers_4_cor.tex",
    //     "tags":["Calcul littéral","Equations","Tableur"]
    // },
    // "dnb_2015_06_etrangers_5": {
    //     "annee": "2015",
    //     "lieu": "Centres étrangers",
    //     "mois": "Juin",
    //     "numeroExercice": "5",
    //     "png": "/tex/png/dnb_2015_06_etrangers_5.png",
    //     "pngcor": "/tex/png/dnb_2015_06_etrangers_5_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_06_etrangers_5.tex",
    //     "urlcor": "/tex/dnb_2015_06_etrangers_5_cor.tex",
    //     "tags":["Fonctions","Proportionnalité","Equations"]
    // },
    // "dnb_2015_06_etrangers_6": {
    //     "annee": "2015",
    //     "lieu": "Centres étrangers",
    //     "mois": "Juin",
    //     "numeroExercice": "6",
    //     "png": "/tex/png/dnb_2015_06_etrangers_6.png",
    //     "pngcor": "/tex/png/dnb_2015_06_etrangers_6_cor.png",
    //     "type_exercice": "dnb",
    //     "url": "/tex/dnb_2015_06_etrangers_6.tex",
    //     "urlcor": "/tex/dnb_2015_06_etrangers_6_cor.tex",
    //     "tags":["Volumes","Grandeurs composées"]
    // },


    // Maroc
     "dnb_2015_06_etrangers_1": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_06_etrangers_1.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_1.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_1_cor.tex",
        "tags":["Statistiques"]
    },
    "dnb_2015_06_etrangers_2": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_06_etrangers_2.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_2.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_2_cor.tex",
        "tags":["QCM","Equations","Puissances","Calculs numériques"]
    },
    "dnb_2015_06_etrangers_3": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_06_etrangers_3.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_3.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_3_cor.tex",
        "tags":["Probabilités"]
    },
    "dnb_2015_06_etrangers_4": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_06_etrangers_4.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_4.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_4_cor.tex",
        "tags":["Trigonométrie","Tableur","Statistiques"]
    },
    "dnb_2015_06_etrangers_5": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_06_etrangers_5.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_5.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_5_cor.tex",
        "tags":["Vrai-Faux","Pourcentages","Fonctions","Thalès"]
    },
    "dnb_2015_06_etrangers_6": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_06_etrangers_6.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_6.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_6_cor.tex",
        "tags":["Calcul littéral","Equations"]
    },
    "dnb_2015_06_etrangers_7": {
        "annee": "2015",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_06_etrangers_7.png",
        "pngcor": "/tex/png/dnb_2015_06_etrangers_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_etrangers_7.tex",
        "urlcor": "/tex/dnb_2015_06_etrangers_7_cor.tex",
        "tags":["Volumes","Aires et périmètres","Grandeurs composées"]
    },

    "dnb_2015_06_metropole_1": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_06_metropole_1.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_1.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_1_cor.tex",
        "tags":["Statistiques","Tableur","Pourcentages"]
    },
    "dnb_2015_06_metropole_2": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_06_metropole_2.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_2.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_2_cor.tex",
        "tags":["Calcul littéral"]
    },
    "dnb_2015_06_metropole_3": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_06_metropole_3.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_3.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_3_cor.tex",
        "tags":["Pythagore","Thalès"]
    },
    "dnb_2015_06_metropole_4": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_06_metropole_4.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_4.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_4_cor.tex",
        "tags":["Fonctions","Probabilité","Puissances","Arithmétique","Equation"]
    },
    "dnb_2015_06_metropole_5": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_06_metropole_5.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_5.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_5_cor.tex",
        "tags":["Prise d'initiative","Aires et périmètres","Calculs numériques","Proportionnalité"]
    },
    "dnb_2015_06_metropole_6": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_06_metropole_6.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_6.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_6_cor.tex",
        "tags":["Proportionnalité","Fonctions"]
    },
    "dnb_2015_06_metropole_7": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_06_metropole_7.png",
        "pngcor": "/tex/png/dnb_2015_06_metropole_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_metropole_7.tex",
        "urlcor": "/tex/dnb_2015_06_metropole_7_cor.tex",
        "tags":["Trigonométrie","Ratio"]
    },
    "dnb_2015_06_polynesie_1": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_06_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_1.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_1_cor.tex",
        "tags":["Probabilités"]
    },
    "dnb_2015_06_polynesie_2": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_06_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_2.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_2_cor.tex",
        "tags":["Fonctions"]
    },
    "dnb_2015_06_polynesie_3": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_06_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_3.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_3_cor.tex",
        "tags":["Pythagore","Trigonométrie","Thalès"]
    },
    "dnb_2015_06_polynesie_4": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_06_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_4.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_4_cor.tex",
        "tags":["Pourcentages","Puissances","Calcul littéral"]
    },
    "dnb_2015_06_polynesie_5": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_06_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_5.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_5_cor.tex",
        "tags":["Proportionnalité"]
        
    },
    "dnb_2015_06_polynesie_6": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_06_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_6.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_6_cor.tex",
        "tags":["Calcul littéral","Tableur","Equations"]
    },
    "dnb_2015_06_polynesie_7": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_06_polynesie_7.png",
        "pngcor": "/tex/png/dnb_2015_06_polynesie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_06_polynesie_7.tex",
        "urlcor": "/tex/dnb_2015_06_polynesie_7_cor.tex",
        "tags":["Prise d'initiative","Proportionnalité","Aires et périmètres"]
    },
    "dnb_2015_09_metropole_1": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_09_metropole_1.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_1.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_1_cor.tex",
        "tags":["Fonctions","Tableur","Equation"]
    },
    "dnb_2015_09_metropole_2": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_09_metropole_2.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_2.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_2_cor.tex",
        "tags":["Pythagore","Thalès","Aires et périmètres"]
    },
    "dnb_2015_09_metropole_3": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_09_metropole_3.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_3.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_3_cor.tex",
        "tags":["Prise d'initiative","Proportionnalité","Grandeurs composées","Durée"]
    },
    "dnb_2015_09_metropole_4": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_09_metropole_4.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_4.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_4_cor.tex",
        "tags":["Equations"]
    },
    "dnb_2015_09_metropole_5": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_09_metropole_5.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_5.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_5_cor.tex",
        "tags":["Calcul littéral"]
    },
    "dnb_2015_09_metropole_6": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_09_metropole_6.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_6.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_6_cor.tex",
        "tags":["Durées","Pourcentages","Probabilités","Statistiques"]
    },
    "dnb_2015_09_metropole_7": {
        "annee": "2015",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_09_metropole_7.png",
        "pngcor": "/tex/png/dnb_2015_09_metropole_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_metropole_7.tex",
        "urlcor": "/tex/dnb_2015_09_metropole_7_cor.tex",
        "tags":["Durées","Pourcentages","Probabilités","Statistiques"],
        "tags":["Prise d'initiative","Pythagore","Trigonométrie"]
    },
    "dnb_2015_09_polynesie_1": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_09_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_1.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_1_cor.tex",
        "tags":["Calcul littéral","Equations"]
    },
    "dnb_2015_09_polynesie_2": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_09_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_2.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_2_cor.tex",
        "tags":["Vrai-Faux","Trigonométrie","Equations","Pourcentages","Probabilités"]
    },
    "dnb_2015_09_polynesie_3": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_09_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_3.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_3_cor.tex",
        "tags":["Fonctions","Calculs numériques"]
    },
    "dnb_2015_09_polynesie_4": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_09_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_4.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_4_cor.tex",
        "tags":["Système d'équations","Hors-programme"]
    },
    "dnb_2015_09_polynesie_5": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_09_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_5.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_5_cor.tex",
        "tags":["Aires et périmètres","Proportionnalité","Volumes"]
    },
    "dnb_2015_09_polynesie_6": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_09_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_6.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_6_cor.tex",
        "tags":["Pythagore","Thalès"]
    },
    "dnb_2015_09_polynesie_7": {
        "annee": "2015",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_09_polynesie_7.png",
        "pngcor": "/tex/png/dnb_2015_09_polynesie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_09_polynesie_7.tex",
        "urlcor": "/tex/dnb_2015_09_polynesie_7_cor.tex",
        "tags":["Proportionnalité","Grandeurs composées","Tableur","Calculs numériques"]
    },
    "dnb_2015_12_ameriquesud_1": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_12_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_1_cor.tex",
        "tags":["QCM","Calculs numériques","Arithmétique","Système d'équations","Hors-programme"]
    },
    "dnb_2015_12_ameriquesud_2": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_12_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_2_cor.tex",
        "tags":["Fonctions","Tableur"]
    },
    "dnb_2015_12_ameriquesud_3": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_12_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_3_cor.tex",
        "tags":["Probabilités"]
    },
    "dnb_2015_12_ameriquesud_4": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_12_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_4_cor.tex",
        "tags":["Pythagore","Thalès","Trigonométrie"]
    },
    "dnb_2015_12_ameriquesud_5": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_12_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_5_cor.tex",
        "tags":["Vrai-Faux","Calcul littéral","Proportionnalité"]
    },
    "dnb_2015_12_ameriquesud_6": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_12_ameriquesud_6.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_6.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_6_cor.tex",
        "tags":["Prise d'initiative","Volumes","Pourcentages","Proportionnalité"]
    },
    "dnb_2015_12_ameriquesud_7": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_12_ameriquesud_7.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_7.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_7_cor.tex",
        "tags":["Volumes","Agrandissement-réduction","Pythagore"]
    },
    "dnb_2015_12_ameriquesud_8": {
        "annee": "2015",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "8",
        "png": "/tex/png/dnb_2015_12_ameriquesud_8.png",
        "pngcor": "/tex/png/dnb_2015_12_ameriquesud_8_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_ameriquesud_8.tex",
        "urlcor": "/tex/dnb_2015_12_ameriquesud_8_cor.tex",
        "tags":["Prise d'initiative","Equations"]
    },
    "dnb_2015_12_caledonie_1": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2015_12_caledonie_1.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_1.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_1_cor.tex",
        "tags":["QCM","Aires et périmètres","Probabilité","Volumes","Equations"]
    },
    "dnb_2015_12_caledonie_2": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2015_12_caledonie_2.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_2.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_2_cor.tex",
        "tags":["Trigonométrie"]
    },
    "dnb_2015_12_caledonie_3": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2015_12_caledonie_3.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_3.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_3_cor.tex",
        "tags":["Pourcentages"]
    },
    "dnb_2015_12_caledonie_4": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2015_12_caledonie_4.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_4.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_4_cor.tex",
        "tags":["Prise d'initiative","Pythagore"]
    },
    "dnb_2015_12_caledonie_5": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2015_12_caledonie_5.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_5.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_5_cor.tex",
        "tags":["Probabilités"]
    },
    "dnb_2015_12_caledonie_6": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2015_12_caledonie_6.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_6.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_6_cor.tex",
        "tags":["Géométrie plane","Aires et périmètres"]
    },
    "dnb_2015_12_caledonie_7": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2015_12_caledonie_7.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_7.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_7_cor.tex",
        "tags":["Système d'équations","Hors programme"]
    },
    "dnb_2015_12_caledonie_8": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "8",
        "png": "/tex/png/dnb_2015_12_caledonie_8.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_8_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_8.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_8_cor.tex",
        "tags":["Fonctions"]
    },
    "dnb_2015_12_caledonie_9": {
        "annee": "2015",
        "lieu": "Nouvelle Calédonie",
        "mois": "Décembre",
        "numeroExercice": "9",
        "png": "/tex/png/dnb_2015_12_caledonie_9.png",
        "pngcor": "/tex/png/dnb_2015_12_caledonie_9_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2015_12_caledonie_9.tex",
        "urlcor": "/tex/dnb_2015_12_caledonie_9_cor.tex",
        "tags":["Thalès"]
    },
    "dnb_2016_04_pondichery_1": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_04_pondichery_1.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_1.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_1_cor.tex"
    },
    "dnb_2016_04_pondichery_2": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_04_pondichery_2.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_2.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_2_cor.tex"
    },
    "dnb_2016_04_pondichery_3": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_04_pondichery_3.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_3.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_3_cor.tex"
    },
    "dnb_2016_04_pondichery_4": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_04_pondichery_4.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_4.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_4_cor.tex"
    },
    "dnb_2016_04_pondichery_5": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_04_pondichery_5.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_5.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_5_cor.tex"
    },
    "dnb_2016_04_pondichery_6": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_04_pondichery_6.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_6.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_6_cor.tex"
    },
    "dnb_2016_04_pondichery_7": {
        "annee": "2016",
        "lieu": "Pondichéry",
        "mois": "Avril",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2016_04_pondichery_7.png",
        "pngcor": "/tex/png/dnb_2016_04_pondichery_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_04_pondichery_7.tex",
        "urlcor": "/tex/dnb_2016_04_pondichery_7_cor.tex"
    },
    "dnb_2016_06_ameriquenord_1": {
        "annee": "2016",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_06_ameriquenord_1.png",
        "pngcor": "/tex/png/dnb_2016_06_ameriquenord_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_ameriquenord_1.tex",
        "urlcor": "/tex/dnb_2016_06_ameriquenord_1_cor.tex"
    },
    "dnb_2016_06_ameriquenord_2": {
        "annee": "2016",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_06_ameriquenord_2.png",
        "pngcor": "/tex/png/dnb_2016_06_ameriquenord_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_ameriquenord_2.tex",
        "urlcor": "/tex/dnb_2016_06_ameriquenord_2_cor.tex"
    },
    "dnb_2016_06_ameriquenord_3": {
        "annee": "2016",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_06_ameriquenord_3.png",
        "pngcor": "/tex/png/dnb_2016_06_ameriquenord_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_ameriquenord_3.tex",
        "urlcor": "/tex/dnb_2016_06_ameriquenord_3_cor.tex"
    },
    "dnb_2016_06_ameriquenord_4": {
        "annee": "2016",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_06_ameriquenord_4.png",
        "pngcor": "/tex/png/dnb_2016_06_ameriquenord_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_ameriquenord_4.tex",
        "urlcor": "/tex/dnb_2016_06_ameriquenord_4_cor.tex"
    },
    "dnb_2016_06_ameriquenord_5": {
        "annee": "2016",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_06_ameriquenord_5.png",
        "pngcor": "/tex/png/dnb_2016_06_ameriquenord_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_ameriquenord_5.tex",
        "urlcor": "/tex/dnb_2016_06_ameriquenord_5_cor.tex"
    },
    "dnb_2016_06_ameriquenord_6": {
        "annee": "2016",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_06_ameriquenord_6.png",
        "pngcor": "/tex/png/dnb_2016_06_ameriquenord_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_ameriquenord_6.tex",
        "urlcor": "/tex/dnb_2016_06_ameriquenord_6_cor.tex"
    },
    "dnb_2016_06_antillesguyanne_1": {
        "annee": "2016",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_06_antillesguyanne_1.png",
        "pngcor": "/tex/png/dnb_2016_06_antillesguyanne_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_antillesguyanne_1.tex",
        "urlcor": "/tex/dnb_2016_06_antillesguyanne_1_cor.tex"
    },
    "dnb_2016_06_antillesguyanne_2": {
        "annee": "2016",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_06_antillesguyanne_2.png",
        "pngcor": "/tex/png/dnb_2016_06_antillesguyanne_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_antillesguyanne_2.tex",
        "urlcor": "/tex/dnb_2016_06_antillesguyanne_2_cor.tex"
    },
    "dnb_2016_06_antillesguyanne_3": {
        "annee": "2016",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_06_antillesguyanne_3.png",
        "pngcor": "/tex/png/dnb_2016_06_antillesguyanne_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_antillesguyanne_3.tex",
        "urlcor": "/tex/dnb_2016_06_antillesguyanne_3_cor.tex"
    },
    "dnb_2016_06_antillesguyanne_4": {
        "annee": "2016",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_06_antillesguyanne_4.png",
        "pngcor": "/tex/png/dnb_2016_06_antillesguyanne_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_antillesguyanne_4.tex",
        "urlcor": "/tex/dnb_2016_06_antillesguyanne_4_cor.tex"
    },
    "dnb_2016_06_antillesguyanne_5": {
        "annee": "2016",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_06_antillesguyanne_5.png",
        "pngcor": "/tex/png/dnb_2016_06_antillesguyanne_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_antillesguyanne_5.tex",
        "urlcor": "/tex/dnb_2016_06_antillesguyanne_5_cor.tex"
    },
    "dnb_2016_06_antillesguyanne_6": {
        "annee": "2016",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_06_antillesguyanne_6.png",
        "pngcor": "/tex/png/dnb_2016_06_antillesguyanne_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_antillesguyanne_6.tex",
        "urlcor": "/tex/dnb_2016_06_antillesguyanne_6_cor.tex"
    },
    "dnb_2016_06_asie_1": {
        "annee": "2016",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_06_asie_1.png",
        "pngcor": "/tex/png/dnb_2016_06_asie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_asie_1.tex",
        "urlcor": "/tex/dnb_2016_06_asie_1_cor.tex"
    },
    "dnb_2016_06_asie_2": {
        "annee": "2016",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_06_asie_2.png",
        "pngcor": "/tex/png/dnb_2016_06_asie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_asie_2.tex",
        "urlcor": "/tex/dnb_2016_06_asie_2_cor.tex"
    },
    "dnb_2016_06_asie_3": {
        "annee": "2016",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_06_asie_3.png",
        "pngcor": "/tex/png/dnb_2016_06_asie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_asie_3.tex",
        "urlcor": "/tex/dnb_2016_06_asie_3_cor.tex"
    },
    "dnb_2016_06_asie_4": {
        "annee": "2016",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_06_asie_4.png",
        "pngcor": "/tex/png/dnb_2016_06_asie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_asie_4.tex",
        "urlcor": "/tex/dnb_2016_06_asie_4_cor.tex"
    },
    "dnb_2016_06_asie_5": {
        "annee": "2016",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_06_asie_5.png",
        "pngcor": "/tex/png/dnb_2016_06_asie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_asie_5.tex",
        "urlcor": "/tex/dnb_2016_06_asie_5_cor.tex"
    },
    "dnb_2016_06_asie_6": {
        "annee": "2016",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_06_asie_6.png",
        "pngcor": "/tex/png/dnb_2016_06_asie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_asie_6.tex",
        "urlcor": "/tex/dnb_2016_06_asie_6_cor.tex"
    },
    "dnb_2016_06_etrangers_1": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_06_etrangers_1.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_1.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_1_cor.tex"
    },
    "dnb_2016_06_etrangers_2": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_06_etrangers_2.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_2.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_2_cor.tex"
    },
    "dnb_2016_06_etrangers_3": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_06_etrangers_3.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_3.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_3_cor.tex"
    },
    "dnb_2016_06_etrangers_4": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_06_etrangers_4.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_4.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_4_cor.tex"
    },
    "dnb_2016_06_etrangers_5": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_06_etrangers_5.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_5.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_5_cor.tex"
    },
    "dnb_2016_06_etrangers_6": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_06_etrangers_6.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_6.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_6_cor.tex"
    },
    "dnb_2016_06_etrangers_7": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2016_06_etrangers_7.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_7.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_7_cor.tex"
    },
    "dnb_2016_06_etrangers_8": {
        "annee": "2016",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "8",
        "png": "/tex/png/dnb_2016_06_etrangers_8.png",
        "pngcor": "/tex/png/dnb_2016_06_etrangers_8_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_etrangers_8.tex",
        "urlcor": "/tex/dnb_2016_06_etrangers_8_cor.tex"
    },
    "dnb_2016_06_polynesie_1": {
        "annee": "2016",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_06_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2016_06_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_polynesie_1.tex",
        "urlcor": "/tex/dnb_2016_06_polynesie_1_cor.tex"
    },
    "dnb_2016_06_polynesie_2": {
        "annee": "2016",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_06_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2016_06_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_polynesie_2.tex",
        "urlcor": "/tex/dnb_2016_06_polynesie_2_cor.tex"
    },
    "dnb_2016_06_polynesie_3": {
        "annee": "2016",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_06_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2016_06_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_polynesie_3.tex",
        "urlcor": "/tex/dnb_2016_06_polynesie_3_cor.tex"
    },
    "dnb_2016_06_polynesie_4": {
        "annee": "2016",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_06_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2016_06_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_polynesie_4.tex",
        "urlcor": "/tex/dnb_2016_06_polynesie_4_cor.tex"
    },
    "dnb_2016_06_polynesie_5": {
        "annee": "2016",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_06_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2016_06_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_polynesie_5.tex",
        "urlcor": "/tex/dnb_2016_06_polynesie_5_cor.tex"
    },
    "dnb_2016_06_polynesie_6": {
        "annee": "2016",
        "lieu": "Polynésie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_06_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2016_06_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_06_polynesie_6.tex",
        "urlcor": "/tex/dnb_2016_06_polynesie_6_cor.tex"
    },
    "dnb_2016_09_metropole_1": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_09_metropole_1.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_1.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_1_cor.tex"
    },
    "dnb_2016_09_metropole_2": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_09_metropole_2.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_2.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_2_cor.tex"
    },
    "dnb_2016_09_metropole_3": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_09_metropole_3.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_3.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_3_cor.tex"
    },
    "dnb_2016_09_metropole_4": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_09_metropole_4.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_4.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_4_cor.tex"
    },
    "dnb_2016_09_metropole_5": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_09_metropole_5.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_5.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_5_cor.tex"
    },
    "dnb_2016_09_metropole_6": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_09_metropole_6.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_6.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_6_cor.tex"
    },
    "dnb_2016_09_metropole_7": {
        "annee": "2016",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2016_09_metropole_7.png",
        "pngcor": "/tex/png/dnb_2016_09_metropole_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_09_metropole_7.tex",
        "urlcor": "/tex/dnb_2016_09_metropole_7_cor.tex"
    },
    "dnb_2016_12_ameriquesud_1": {
        "annee": "2016",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2016_12_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2016_12_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_12_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2016_12_ameriquesud_1_cor.tex"
    },
    "dnb_2016_12_ameriquesud_2": {
        "annee": "2016",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2016_12_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2016_12_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_12_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2016_12_ameriquesud_2_cor.tex"
    },
    "dnb_2016_12_ameriquesud_3": {
        "annee": "2016",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2016_12_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2016_12_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_12_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2016_12_ameriquesud_3_cor.tex"
    },
    "dnb_2016_12_ameriquesud_4": {
        "annee": "2016",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2016_12_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2016_12_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_12_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2016_12_ameriquesud_4_cor.tex"
    },
    "dnb_2016_12_ameriquesud_5": {
        "annee": "2016",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2016_12_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2016_12_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_12_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2016_12_ameriquesud_5_cor.tex"
    },
    "dnb_2016_12_ameriquesud_6": {
        "annee": "2016",
        "lieu": "Amérique du sud",
        "mois": "Décembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2016_12_ameriquesud_6.png",
        "pngcor": "/tex/png/dnb_2016_12_ameriquesud_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2016_12_ameriquesud_6.tex",
        "urlcor": "/tex/dnb_2016_12_ameriquesud_6_cor.tex"
    },
    "dnb_2017_06_asie_1": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_06_asie_1.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_1.tex",
        "urlcor": "/tex/dnb_2017_06_asie_1_cor.tex",
	"tags":["Tableur", "Fonctions"]
    },
    "dnb_2017_06_asie_2": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_06_asie_2.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_2.tex",
        "urlcor": "/tex/dnb_2017_06_asie_2_cor.tex",
	"tags":["Statistiques", "Fractions", "Proportionnalité"]
    },
    "dnb_2017_06_asie_3": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_06_asie_3.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_3.tex",
        "urlcor": "/tex/dnb_2017_06_asie_3_cor.tex",
	"tags":["Pythagore", "Thalès", "Trigonométrie"]
    },
    "dnb_2017_06_asie_4": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_06_asie_4.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_4.tex",
        "urlcor": "/tex/dnb_2017_06_asie_4_cor.tex",
	"tags":["Scratch"]
    },
    "dnb_2017_06_asie_5": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_06_asie_5.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_5.tex",
        "urlcor": "/tex/dnb_2017_06_asie_5_cor.tex",
	"tags":["Volumes", "Proportionnalité"]
    },
    "dnb_2017_06_asie_6": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_06_asie_6.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_6.tex",
        "urlcor": "/tex/dnb_2017_06_asie_6_cor.tex",
	"tags":["Calcul littéral"]
    },
    "dnb_2017_06_asie_7": {
        "annee": "2017",
        "lieu": "Asie",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2017_06_asie_7.png",
        "pngcor": "/tex/png/dnb_2017_06_asie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_asie_7.tex",
        "urlcor": "/tex/dnb_2017_06_asie_7_cor.tex",
	"tags":["Statistiques"]
    },
    "dnb_2017_06_etrangers_1": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_06_etrangers_1.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_1.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_1_cor.tex",
	"tags":["Pythagore", "Trigonométrie", "Fractions", "Proportionnalité"]
    },
    "dnb_2017_06_etrangers_2": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_06_etrangers_2.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_2.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_2_cor.tex",
	"tags":["Fractions", "Equations", "Fonctions"]
    },
    "dnb_2017_06_etrangers_3": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_06_etrangers_3.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_3.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_3_cor.tex",
	"tags":["Volumes"]
    },
    "dnb_2017_06_etrangers_4": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_06_etrangers_4.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_4.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_4_cor.tex",
	"tags":["Statistiques", "Probabilités"]
    },
    "dnb_2017_06_etrangers_5": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_06_etrangers_5.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_5.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_5_cor.tex",
	"tags":["Volumes", "Proportionnalité"]
    },
    "dnb_2017_06_etrangers_6": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_06_etrangers_6.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_6.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_6_cor.tex",
	"tags":["Pythagore", "Trigonométrie", "Scratch"]
    },
    "dnb_2017_06_etrangers_7": {
        "annee": "2017",
        "lieu": "Centres étrangers",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2017_06_etrangers_7.png",
        "pngcor": "/tex/png/dnb_2017_06_etrangers_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_etrangers_7.tex",
        "urlcor": "/tex/dnb_2017_06_etrangers_7_cor.tex",
	"tags":["Aires", "Proportionnalité"]
    },
    "dnb_2017_06_metropole_1": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_06_metropole_1.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_1.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_1_cor.tex",
	"tags":["Probabilités"]
    },
    "dnb_2017_06_metropole_2": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_06_metropole_2.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_2.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_2_cor.tex",
	"tags":["Scratch"]
    },
    "dnb_2017_06_metropole_3": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_06_metropole_3.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_3.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_3_cor.tex",
	"tags":["Proportionnalité", "Fonctions"]
    },
    "dnb_2017_06_metropole_4": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_06_metropole_4.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_4.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_4_cor.tex",
	"tags":["Proportionnalité", "Trigonométrie", "Pythagore"]
    },
    "dnb_2017_06_metropole_5": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_06_metropole_5.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_5.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_5_cor.tex",
	"tags":["Calcul littéral", "Fonctions"]
    },
    "dnb_2017_06_metropole_6": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_06_metropole_6.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_6.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_6_cor.tex",
	"tags":["Statistiques"]
    },
    "dnb_2017_06_metropole_7": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2017_06_metropole_7.png",
        "pngcor": "/tex/png/dnb_2017_06_metropole_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_06_metropole_7.tex",
        "urlcor": "/tex/dnb_2017_06_metropole_7_cor.tex",
        "tags":["Volumes", "Proportionnalité"]
    },
    "dnb_2017_09_metropole_1": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_09_metropole_1.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_1.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_1_cor.tex",
	"tags":["Probabilités"]
    },
    "dnb_2017_09_metropole_2": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_09_metropole_2.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_2.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_2_cor.tex",
	"tags":["Pythagore", "Thalès"]
    },
    "dnb_2017_09_metropole_3": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_09_metropole_3.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_3.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_3_cor.tex",
	"tags":["Scratch"]
    },
    "dnb_2017_09_metropole_4": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_09_metropole_4.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_4.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_4_cor.tex",
	"tags":["Aires", "Proportionnalité", "Pythagore"]
    },
    "dnb_2017_09_metropole_5": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_09_metropole_5.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_5.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_5_cor.tex",
	"tags":["Calcul littéral", "Fractions"]
    },
    "dnb_2017_09_metropole_6": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_09_metropole_6.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_6.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_6_cor.tex",
	"tags":["Volumes", "Proportionnalité"]
    },
    "dnb_2017_09_metropole_7": {
        "annee": "2017",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2017_09_metropole_7.png",
        "pngcor": "/tex/png/dnb_2017_09_metropole_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_metropole_7.tex",
        "urlcor": "/tex/dnb_2017_09_metropole_7_cor.tex",
	"tags":["Proportionnalité", "Fonctions"]
    },
    "dnb_2017_09_polynesie_1": {
        "annee": "2017",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_09_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2017_09_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_polynesie_1.tex",
        "urlcor": "/tex/dnb_2017_09_polynesie_1_cor.tex",
	"tags":[]
    },
    "dnb_2017_09_polynesie_2": {
        "annee": "2017",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_09_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2017_09_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_polynesie_2.tex",
        "urlcor": "/tex/dnb_2017_09_polynesie_2_cor.tex",
	"tags":[]
    },
    "dnb_2017_09_polynesie_3": {
        "annee": "2017",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_09_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2017_09_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_polynesie_3.tex",
        "urlcor": "/tex/dnb_2017_09_polynesie_3_cor.tex",
	"tags":[]
    },
    "dnb_2017_09_polynesie_4": {
        "annee": "2017",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_09_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2017_09_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_polynesie_4.tex",
        "urlcor": "/tex/dnb_2017_09_polynesie_4_cor.tex",
	"tags":[]
    },
    "dnb_2017_09_polynesie_5": {
        "annee": "2017",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_09_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2017_09_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_polynesie_5.tex",
        "urlcor": "/tex/dnb_2017_09_polynesie_5_cor.tex",
	"tags":[]
    },
    "dnb_2017_09_polynesie_6": {
        "annee": "2017",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_09_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2017_09_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_09_polynesie_6.tex",
        "urlcor": "/tex/dnb_2017_09_polynesie_6_cor.tex",
	"tags":[]
    },
    "dnb_2017_11_ameriquesud_1": {
        "annee": "2017",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_11_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2017_11_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_11_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2017_11_ameriquesud_1_cor.tex",
	"tags":[]
    },
    "dnb_2017_11_ameriquesud_2": {
        "annee": "2017",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_11_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2017_11_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_11_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2017_11_ameriquesud_2_cor.tex",
	"tags":[]
    },
    "dnb_2017_11_ameriquesud_3": {
        "annee": "2017",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_11_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2017_11_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_11_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2017_11_ameriquesud_3_cor.tex",
	"tags":[]
    },
    "dnb_2017_11_ameriquesud_4": {
        "annee": "2017",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_11_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2017_11_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_11_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2017_11_ameriquesud_4_cor.tex",
	"tags":[]
    },
    "dnb_2017_11_ameriquesud_5": {
        "annee": "2017",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_11_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2017_11_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_11_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2017_11_ameriquesud_5_cor.tex",
	"tags":[]
    },
    "dnb_2017_11_ameriquesud_6": {
        "annee": "2017",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_11_ameriquesud_6.png",
        "pngcor": "/tex/png/dnb_2017_11_ameriquesud_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_11_ameriquesud_6.tex",
        "urlcor": "/tex/dnb_2017_11_ameriquesud_6_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_1": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_1.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_1.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_1_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_2": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_2.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_2.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_2_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_3": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_3.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_3.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_3_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_4": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_4.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_4.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_4_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_5": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_5.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_5.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_5_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_6": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_6.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_6.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_6_cor.tex",
	"tags":[]
    },
    "dnb_2017_12_wallisfutuna_7": {
        "annee": "2017",
        "lieu": "Wallis et Futuna",
        "mois": "Décembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2017_12_wallisfutuna_7.png",
        "pngcor": "/tex/png/dnb_2017_12_wallisfutuna_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2017_12_wallisfutuna_7.tex",
        "urlcor": "/tex/dnb_2017_12_wallisfutuna_7_cor.tex",
	"tags":[]
    },
    "dnb_2018_05_pondichery_1": {
        "annee": "2018",
        "lieu": "Pondichéry",
        "mois": "Mai",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2018_05_pondichery_1.png",
        "pngcor": "/tex/png/dnb_2018_05_pondichery_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_05_pondichery_1.tex",
        "urlcor": "/tex/dnb_2018_05_pondichery_1_cor.tex"
    },
    "dnb_2018_05_pondichery_2": {
        "annee": "2018",
        "lieu": "Pondichéry",
        "mois": "Mai",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2018_05_pondichery_2.png",
        "pngcor": "/tex/png/dnb_2018_05_pondichery_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_05_pondichery_2.tex",
        "urlcor": "/tex/dnb_2018_05_pondichery_2_cor.tex"
    },
    "dnb_2018_05_pondichery_3": {
        "annee": "2018",
        "lieu": "Pondichéry",
        "mois": "Mai",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2018_05_pondichery_3.png",
        "pngcor": "/tex/png/dnb_2018_05_pondichery_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_05_pondichery_3.tex",
        "urlcor": "/tex/dnb_2018_05_pondichery_3_cor.tex"
    },
    "dnb_2018_05_pondichery_4": {
        "annee": "2018",
        "lieu": "Pondichéry",
        "mois": "Mai",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2018_05_pondichery_4.png",
        "pngcor": "/tex/png/dnb_2018_05_pondichery_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_05_pondichery_4.tex",
        "urlcor": "/tex/dnb_2018_05_pondichery_4_cor.tex"
    },
    "dnb_2018_05_pondichery_5": {
        "annee": "2018",
        "lieu": "Pondichéry",
        "mois": "Mai",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2018_05_pondichery_5.png",
        "pngcor": "/tex/png/dnb_2018_05_pondichery_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_05_pondichery_5.tex",
        "urlcor": "/tex/dnb_2018_05_pondichery_5_cor.tex"
    },
    "dnb_2018_05_pondichery_6": {
        "annee": "2018",
        "lieu": "Pondichéry",
        "mois": "Mai",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2018_05_pondichery_6.png",
        "pngcor": "/tex/png/dnb_2018_05_pondichery_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_05_pondichery_6.tex",
        "urlcor": "/tex/dnb_2018_05_pondichery_6_cor.tex"
    },
    "dnb_2018_06_ameriquenord_1": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2018_06_ameriquenord_1.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_1.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_1_cor.tex"
    },
    "dnb_2018_06_ameriquenord_2": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2018_06_ameriquenord_2.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_2.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_2_cor.tex"
    },
    "dnb_2018_06_ameriquenord_3": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2018_06_ameriquenord_3.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_3.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_3_cor.tex"
    },
    "dnb_2018_06_ameriquenord_4": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2018_06_ameriquenord_4.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_4.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_4_cor.tex"
    },
    "dnb_2018_06_ameriquenord_5": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2018_06_ameriquenord_5.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_5.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_5_cor.tex"
    },
    "dnb_2018_06_ameriquenord_6": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2018_06_ameriquenord_6.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_6.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_6_cor.tex"
    },
    "dnb_2018_06_ameriquenord_7": {
        "annee": "2018",
        "lieu": "Amérique du Nord",
        "mois": "Juin",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2018_06_ameriquenord_7.png",
        "pngcor": "/tex/png/dnb_2018_06_ameriquenord_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_06_ameriquenord_7.tex",
        "urlcor": "/tex/dnb_2018_06_ameriquenord_7_cor.tex"
    },
    "dnb_2018_09_metropole_1": {
        "annee": "2018",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2018_09_metropole_1.png",
        "pngcor": "/tex/png/dnb_2018_09_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_metropole_1.tex",
        "urlcor": "/tex/dnb_2018_09_metropole_1_cor.tex"
    },
    "dnb_2018_09_metropole_2": {
        "annee": "2018",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2018_09_metropole_2.png",
        "pngcor": "/tex/png/dnb_2018_09_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_metropole_2.tex",
        "urlcor": "/tex/dnb_2018_09_metropole_2_cor.tex"
    },
    "dnb_2018_09_metropole_3": {
        "annee": "2018",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2018_09_metropole_3.png",
        "pngcor": "/tex/png/dnb_2018_09_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_metropole_3.tex",
        "urlcor": "/tex/dnb_2018_09_metropole_3_cor.tex"
    },
    "dnb_2018_09_metropole_4": {
        "annee": "2018",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2018_09_metropole_4.png",
        "pngcor": "/tex/png/dnb_2018_09_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_metropole_4.tex",
        "urlcor": "/tex/dnb_2018_09_metropole_4_cor.tex"
    },
    "dnb_2018_09_metropole_5": {
        "annee": "2018",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2018_09_metropole_5.png",
        "pngcor": "/tex/png/dnb_2018_09_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_metropole_5.tex",
        "urlcor": "/tex/dnb_2018_09_metropole_5_cor.tex"
    },
    "dnb_2018_09_metropole_6": {
        "annee": "2018",
        "lieu": "Métropole",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2018_09_metropole_6.png",
        "pngcor": "/tex/png/dnb_2018_09_metropole_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_metropole_6.tex",
        "urlcor": "/tex/dnb_2018_09_metropole_6_cor.tex"
    },
    "dnb_2018_09_polynesie_1": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2018_09_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_1.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_1_cor.tex"
    },
    "dnb_2018_09_polynesie_2": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2018_09_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_2.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_2_cor.tex"
    },
    "dnb_2018_09_polynesie_3": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2018_09_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_3.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_3_cor.tex"
    },
    "dnb_2018_09_polynesie_4": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2018_09_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_4.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_4_cor.tex"
    },
    "dnb_2018_09_polynesie_5": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2018_09_polynesie_5.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_5.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_5_cor.tex"
    },
    "dnb_2018_09_polynesie_6": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2018_09_polynesie_6.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_6.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_6_cor.tex"
    },
    "dnb_2018_09_polynesie_7": {
        "annee": "2018",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "7",
        "png": "/tex/png/dnb_2018_09_polynesie_7.png",
        "pngcor": "/tex/png/dnb_2018_09_polynesie_7_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_09_polynesie_7.tex",
        "urlcor": "/tex/dnb_2018_09_polynesie_7_cor.tex"
    },
    "dnb_2018_11_ameriquesud_1": {
        "annee": "2018",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2018_11_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2018_11_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_11_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2018_11_ameriquesud_1_cor.tex"
    },
    "dnb_2018_11_ameriquesud_2": {
        "annee": "2018",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2018_11_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2018_11_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_11_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2018_11_ameriquesud_2_cor.tex"
    },
    "dnb_2018_11_ameriquesud_3": {
        "annee": "2018",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2018_11_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2018_11_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_11_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2018_11_ameriquesud_3_cor.tex"
    },
    "dnb_2018_11_ameriquesud_4": {
        "annee": "2018",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2018_11_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2018_11_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_11_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2018_11_ameriquesud_4_cor.tex"
    },
    "dnb_2018_11_ameriquesud_5": {
        "annee": "2018",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2018_11_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2018_11_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_11_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2018_11_ameriquesud_5_cor.tex"
    },
    "dnb_2018_11_ameriquesud_6": {
        "annee": "2018",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2018_11_ameriquesud_6.png",
        "pngcor": "/tex/png/dnb_2018_11_ameriquesud_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2018_11_ameriquesud_6.tex",
        "urlcor": "/tex/dnb_2018_11_ameriquesud_6_cor.tex"
    },
    "dnb_2019_06_antillesguyanne_1": {
        "annee": "2019",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2019_06_antillesguyanne_1.png",
        "pngcor": "/tex/png/dnb_2019_06_antillesguyanne_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_06_antillesguyanne_1.tex",
        "urlcor": "/tex/dnb_2019_06_antillesguyanne_1_cor.tex"
    },
    "dnb_2019_06_antillesguyanne_2": {
        "annee": "2019",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2019_06_antillesguyanne_2.png",
        "pngcor": "/tex/png/dnb_2019_06_antillesguyanne_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_06_antillesguyanne_2.tex",
        "urlcor": "/tex/dnb_2019_06_antillesguyanne_2_cor.tex"
    },
    "dnb_2019_06_antillesguyanne_3": {
        "annee": "2019",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2019_06_antillesguyanne_3.png",
        "pngcor": "/tex/png/dnb_2019_06_antillesguyanne_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_06_antillesguyanne_3.tex",
        "urlcor": "/tex/dnb_2019_06_antillesguyanne_3_cor.tex"
    },
    "dnb_2019_06_antillesguyanne_4": {
        "annee": "2019",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2019_06_antillesguyanne_4.png",
        "pngcor": "/tex/png/dnb_2019_06_antillesguyanne_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_06_antillesguyanne_4.tex",
        "urlcor": "/tex/dnb_2019_06_antillesguyanne_4_cor.tex"
    },
    "dnb_2019_06_antillesguyanne_5": {
        "annee": "2019",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2019_06_antillesguyanne_5.png",
        "pngcor": "/tex/png/dnb_2019_06_antillesguyanne_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_06_antillesguyanne_5.tex",
        "urlcor": "/tex/dnb_2019_06_antillesguyanne_5_cor.tex"
    },
    "dnb_2019_06_antillesguyanne_6": {
        "annee": "2019",
        "lieu": "Antilles - Guyanne",
        "mois": "Juin",
        "numeroExercice": "6",
        "png": "/tex/png/dnb_2019_06_antillesguyanne_6.png",
        "pngcor": "/tex/png/dnb_2019_06_antillesguyanne_6_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_06_antillesguyanne_6.tex",
        "urlcor": "/tex/dnb_2019_06_antillesguyanne_6_cor.tex"
    },
    "dnb_2019_07_metropole_1": {
        "annee": "2019",
        "lieu": "Métropole",
        "mois": "Juillet",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2019_07_metropole_1.png",
        "pngcor": "/tex/png/dnb_2019_07_metropole_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_07_metropole_1.tex",
        "urlcor": "/tex/dnb_2019_07_metropole_1_cor.tex"
    },
    "dnb_2019_07_metropole_2": {
        "annee": "2019",
        "lieu": "Métropole",
        "mois": "Juillet",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2019_07_metropole_2.png",
        "pngcor": "/tex/png/dnb_2019_07_metropole_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_07_metropole_2.tex",
        "urlcor": "/tex/dnb_2019_07_metropole_2_cor.tex"
    },
    "dnb_2019_07_metropole_3": {
        "annee": "2019",
        "lieu": "Métropole",
        "mois": "Juillet",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2019_07_metropole_3.png",
        "pngcor": "/tex/png/dnb_2019_07_metropole_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_07_metropole_3.tex",
        "urlcor": "/tex/dnb_2019_07_metropole_3_cor.tex"
    },
    "dnb_2019_07_metropole_4": {
        "annee": "2019",
        "lieu": "Métropole",
        "mois": "Juillet",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2019_07_metropole_4.png",
        "pngcor": "/tex/png/dnb_2019_07_metropole_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_07_metropole_4.tex",
        "urlcor": "/tex/dnb_2019_07_metropole_4_cor.tex"
    },
    "dnb_2019_07_metropole_5": {
        "annee": "2019",
        "lieu": "Métropole",
        "mois": "Juillet",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2019_07_metropole_5.png",
        "pngcor": "/tex/png/dnb_2019_07_metropole_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_07_metropole_5.tex",
        "urlcor": "/tex/dnb_2019_07_metropole_5_cor.tex"
    },
    "dnb_2019_11_ameriquesud_1": {
        "annee": "2019",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2019_11_ameriquesud_1.png",
        "pngcor": "/tex/png/dnb_2019_11_ameriquesud_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_11_ameriquesud_1.tex",
        "urlcor": "/tex/dnb_2019_11_ameriquesud_1_cor.tex"
    },
    "dnb_2019_11_ameriquesud_2": {
        "annee": "2019",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2019_11_ameriquesud_2.png",
        "pngcor": "/tex/png/dnb_2019_11_ameriquesud_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_11_ameriquesud_2.tex",
        "urlcor": "/tex/dnb_2019_11_ameriquesud_2_cor.tex"
    },
    "dnb_2019_11_ameriquesud_3": {
        "annee": "2019",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2019_11_ameriquesud_3.png",
        "pngcor": "/tex/png/dnb_2019_11_ameriquesud_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_11_ameriquesud_3.tex",
        "urlcor": "/tex/dnb_2019_11_ameriquesud_3_cor.tex"
    },
    "dnb_2019_11_ameriquesud_4": {
        "annee": "2019",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2019_11_ameriquesud_4.png",
        "pngcor": "/tex/png/dnb_2019_11_ameriquesud_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_11_ameriquesud_4.tex",
        "urlcor": "/tex/dnb_2019_11_ameriquesud_4_cor.tex"
    },
    "dnb_2019_11_ameriquesud_5": {
        "annee": "2019",
        "lieu": "Amérique du sud",
        "mois": "Novembre",
        "numeroExercice": "5",
        "png": "/tex/png/dnb_2019_11_ameriquesud_5.png",
        "pngcor": "/tex/png/dnb_2019_11_ameriquesud_5_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2019_11_ameriquesud_5.tex",
        "urlcor": "/tex/dnb_2019_11_ameriquesud_5_cor.tex"
    },
    "dnb_2020_09_antillesguyanne_1": {
        "annee": "2020",
        "lieu": "Antilles - Guyanne",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2020_09_antillesguyanne_1.png",
        "pngcor": "/tex/png/dnb_2020_09_antillesguyanne_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_antillesguyanne_1.tex",
        "urlcor": "/tex/dnb_2020_09_antillesguyanne_1_cor.tex",
        "tags":["Pythagore","Thalès","Trigonométrie"]
    },
    "dnb_2020_09_antillesguyanne_2": {
        "annee": "2020",
        "lieu": "Antilles - Guyanne",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2020_09_antillesguyanne_2.png",
        "pngcor": "/tex/png/dnb_2020_09_antillesguyanne_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_antillesguyanne_2.tex",
        "urlcor": "/tex/dnb_2020_09_antillesguyanne_2_cor.tex",
        "tags":["Agrandissement-réduction","Calcul littéral","Puissances","Fractions"]
    },
    "dnb_2020_09_antillesguyanne_3": {
        "annee": "2020",
        "lieu": "Antilles - Guyanne",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2020_09_antillesguyanne_3.png",
        "pngcor": "/tex/png/dnb_2020_09_antillesguyanne_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_antillesguyanne_3.tex",
        "urlcor": "/tex/dnb_2020_09_antillesguyanne_3_cor.tex",
        "tags":["Transformations","Arithmétique"]
    },
    "dnb_2020_09_antillesguyanne_4": {
        "annee": "2020",
        "lieu": "Antilles - Guyanne",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2020_09_antillesguyanne_4.png",
        "pngcor": "/tex/png/dnb_2020_09_antillesguyanne_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_antillesguyanne_4.tex",
        "urlcor": "/tex/dnb_2020_09_antillesguyanne_4_cor.tex",
        "tags":["Statistiques","Pourcentage","Tableur"]
    },
    "dnb_2020_09_polynesie_1": {
        "annee": "2020",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "1",
        "png": "/tex/png/dnb_2020_09_polynesie_1.png",
        "pngcor": "/tex/png/dnb_2020_09_polynesie_1_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_polynesie_1.tex",
        "urlcor": "/tex/dnb_2020_09_polynesie_1_cor.tex",
        "tags":["Calcul littéral","Thalès","Statistiques","Pourcentages","Arithmétique"]
    },
    "dnb_2020_09_polynesie_2": {
        "annee": "2020",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "2",
        "png": "/tex/png/dnb_2020_09_polynesie_2.png",
        "pngcor": "/tex/png/dnb_2020_09_polynesie_2_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_polynesie_2.tex",
        "urlcor": "/tex/dnb_2020_09_polynesie_2_cor.tex",
        "tags":["Scratch"]
    },
    "dnb_2020_09_polynesie_3": {
        "annee": "2020",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "3",
        "png": "/tex/png/dnb_2020_09_polynesie_3.png",
        "pngcor": "/tex/png/dnb_2020_09_polynesie_3_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_polynesie_3.tex",
        "urlcor": "/tex/dnb_2020_09_polynesie_3_cor.tex",
        "tags":["Transformations","Pythagore","Aires","Agrandissement-réduction"]
    },
    "dnb_2020_09_polynesie_4": {
        "annee": "2020",
        "lieu": "Polynésie",
        "mois": "Septembre",
        "numeroExercice": "4",
        "png": "/tex/png/dnb_2020_09_polynesie_4.png",
        "pngcor": "/tex/png/dnb_2020_09_polynesie_4_cor.png",
        "type_exercice": "dnb",
        "url": "/tex/dnb_2020_09_polynesie_4.tex",
        "urlcor": "/tex/dnb_2020_09_polynesie_4_cor.tex",
        "tags":["Probabilités"]
    }
}

dictionnaireDesExercices = {...dictionnaireDNB, ...dictionnaireDesExercices};
=======
}
>>>>>>> 97e639dd80aad69031f9ce1d22041e0ddd90ffe2
