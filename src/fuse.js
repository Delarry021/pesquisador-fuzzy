import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js'; //biblioteca do metodo fuzzy
import { musicas } from './musicas.js'

//opções de configuração da biblioteca
const fuse_config = {
  includeScore: true,
  shouldSort: true,
  location: 0,
  minMatchCharLength: 3,
  threshold: 0.6,
  distance: 100,
  fieldNormWeight: 0,
  keys: ["nome"],
};

const fuse = new Fuse(musicas, fuse_config);
let palavras_chave

const botao = document.querySelector("#botao")
const lista = document.createElement('ul')

botao.addEventListener("click", exibirFuse);

export function exibirFuse() {
  palavras_chave = document.querySelector("input").value //atribui o valor do input a variavel
  lista.innerHTML = null //limpa a lista a cada nova consulta
  const resultado = fuse.search(palavras_chave); //metodo de busca em acao

  //loop que insere cada item em uma lista do html
  for (let i = 0; i < (resultado.length); i++) {
    let elemento_lista = document.createElement("li");
    elemento_lista.innerHTML = `<p>${resultado[i].item.nome} - <span id="score">${resultado[i].score}</span></p>`;
    lista.appendChild(elemento_lista);
  }

  //exibe
  document.querySelector("#resultados").appendChild(lista)
}
