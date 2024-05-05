// Justin Morand et Zachary Deschênes-Tremblay
import formulaire from './form.js';

/**
 * Crée la page de fin de partie.
 * @param {string} nomGagnant Nom du joueur gagnant.
 * @param {string} nomPerdant Nom du joueur perdant.
 * @param {number} scoreGagnant Score du joueur gagnant.
 * @param {number} scorePerdant Score du joueur perdant.
 * @return {HTMLDivElement} La page de fin de partie.
 */
export default function createPageFin(nomGagnant, nomPerdant, scoreGagnant, scorePerdant, donneeFormulaire) {
  const page = document.createElement('div');
  page.className = 'text-center';

  const title = document.createElement('h1');
  title.textContent = 'Fin de la partie';

  const message = document.createElement('p');
  message.textContent = `${nomGagnant} a gagné avec un score de ${scoreGagnant} à ${scorePerdant} contre ${nomPerdant}`;

  const button = document.createElement('button');
  button.className = 'btn btn-primary';
  button.textContent = 'Retour';
  button.addEventListener('click', () => {
    document.body.innerHTML = '';
    document.body.appendChild(formulaire(donneeFormulaire));
  });

  page.appendChild(title);
  page.appendChild(message);
  page.appendChild(button);

  return page;
}
