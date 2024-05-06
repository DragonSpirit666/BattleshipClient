// Justin Morand et Zachary Deschênes-Tremblay
import { bateauFromCode } from "../service/Battleship";

/**
 * Crée l'historique des mouvements.
 * @return {HTMLDivElement} L'historique des mouvements.
 */
export default function createHistorique() {
  const historiqueDiv = document.createElement('div');
  historiqueDiv.classList.add('p-4');

  const title = document.createElement('h2');
  title.textContent = 'Historique des mouvements';
  title.classList.add('text-xl', 'font-bold', 'mb-4');

  const list = document.createElement('ul');
  list.classList.add('list-group');

  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  listItem.textContent = "Début de la partie";
  list.appendChild(listItem);

  historiqueDiv.appendChild(title);
  historiqueDiv.appendChild(list);

  return historiqueDiv;
}

/**
 * Met à jour l'historique des mouvements.
 * @param {HTMLDivElement} historiqueDiv L'historique des mouvements.
 * @param {String} joueur Le nom du joueur.
 * @param {String} coordonnee La coordonnée du tir.
 * @param {Number} code Le code de la case en question.
 */
export function updateHistorique(historiqueDiv, joueur, coordonnee, code) {
  const list = historiqueDiv.querySelector('ul');

  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');

  if (code === 1) {
    listItem.textContent = `${joueur} a touché en ${coordonnee}`;
    listItem.classList.add('text-danger', 'fw-bold');
  } else if (code === 200) {
    listItem.textContent = `FIN DE LA PARTIE : ${joueur} a gagné !`;
    listItem.classList.add('fw-bold');
  } else if (code > 1) {
    listItem.textContent = `${joueur} a coulé ${bateauFromCode(code)}`;
    listItem.classList.add('bg-danger', 'text-white', 'fw-bold');
  } else {
    listItem.textContent = `${joueur} a tiré en ${coordonnee}`;
  }

  list.appendChild(listItem);
  if (list.children.length > 5) {
    list.removeChild(list.children[0]);
  }
}
