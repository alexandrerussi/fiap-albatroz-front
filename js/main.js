"use strict";

import Timer from "./Timer.js";

new Timer(
    document.querySelector(".timer")
);

const tbody = document.querySelector('tbody');

import rankingJson from "../data/ranking.json" assert {type: 'json'};

export let ranking = rankingJson;

document.querySelector('form').addEventListener('submit', function (e) {
    // cancelar o evento 
    e.preventDefault();

    //recuperar os campos
    const campos = [
        document.querySelector('#nome'),
        document.querySelector('#qtd'),
        document.querySelector('#wpp')
    ];

    let jogador = { nome: campos[0].value, qtd: campos[1].value, wpp: campos[2].value };
    ranking.push(jogador);

    //limpar os dados digitados
    this.reset();

    atualizarRanking();
});

let data;
atualizarRanking()

function atualizarRanking() {

    ranking = ranking.sort((a, b) => b.qtd - a.qtd);

    data = JSON.stringify(ranking);

    limparTabela();
    saveToFile();

    console.log(ranking);

    for (let i = 0; i < ranking.length; i++) {

        // criar uma TR para escrever no tbody
        const tr = document.createElement('tr');

        for (const [key, value] of Object.entries(ranking[i])) {

            if (key == "wpp") {
                continue;
            }

            // console.log(`${key}: ${value}`);

            // criar a td 
            const td = document.createElement('td');

            td.textContent = value;

            //vincule a td na tr
            tr.appendChild(td);
        }

        // vincular a tr criada no tbody
        tbody.appendChild(tr);
    }
}

function limparTabela() {
    tbody.innerHTML = "";
}

function saveToFile() {
    var jsonObjectAsString = data;
  
    var blob = new Blob([jsonObjectAsString], {
      //type: 'application/json'
      type: 'octet/stream'
    });
    console.log(blob);
  
    var anchor = document.createElement('a')
    anchor.download = "ranking.json";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.innerHTML = "download"
    anchor.click();
  
    console.log(anchor);  
  
  }