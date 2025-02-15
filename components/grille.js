// Justin Morand et Zachary Deschênes-Tremblay

/**
 * Crée une grille de jeu de battleship.
 * @param {string} titre Nom du joueur.
 * @return {HTMLDivElement} La grille de jeu.
 */
export default function createGrid(titre) {
  const gridContainer = document.createElement('div');

  const title = document.createElement('h2');
  title.className = 'text-center';
  title.textContent = titre;
  gridContainer.appendChild(title);

  // Top row
  const trow = document.createElement('div');
  trow.className = 'row';

  const firstcell = document.createElement('div');
  firstcell.className = 'square';
  trow.appendChild(firstcell);
  for (let j = 1; j < 11; j++) {
    const cell = document.createElement('div');
    cell.className = 'square bg-light text-center';
    cell.textContent = j;
    trow.appendChild(cell);
  }
  gridContainer.appendChild(trow);

  // Grille
  for (let i = 1; i < 11; i++) {
    const row = document.createElement('div');
    row.className = 'row';
    const firstcell = document.createElement('div');
    firstcell.className = 'square bg-light text-center';
    firstcell.textContent = String.fromCharCode(64 + i);
    row.dataset.id = String.fromCharCode(64 + i);
    row.appendChild(firstcell);
    for (let j = 1; j < 11; j++) {
      const cell = document.createElement('div');
      cell.className = 'border square text-center';
      cell.dataset.col = j;
      row.appendChild(cell);
    }
    gridContainer.appendChild(row);
  }

  return gridContainer;
};

/**
 * Place une tuile de bateau sur la grille.
 * @param {HTMLDivElement} grid La grille.
 * @param {HTMLDivElement} row La ligne.
 * @param {HTMLDivElement} col La colone.
 * @param {Number} code Le code du bateau.
 * @param {String} facing La direction du bateau.
 * @param {Boolean} extremity Si la tuile est une extrémité.
 */
export function placeTile(grid, row, col, code, facing, extremity = false) {
  grid.querySelectorAll('*').forEach(actualRow => {
    if (actualRow.dataset.id == row) {
      actualRow.querySelectorAll('*').forEach(cell => {
        if (cell.dataset.col == col) {
          const img = document.createElement("img");
          img.className = "w-100 h-100";

          if (extremity)
            img.src = "../../images/BoatTileExtremity.png";
          else
            img.src = "../../images/BoatTile.png";

          if (facing == "right")
            img.style.transform = "rotate(270deg)";
          else if (facing == "left")
            img.style.transform = "rotate(90deg)";
          else if (facing == "down")
            img.style.transform = "rotate(180deg)";
          else if (facing == "up")
            img.style.transform = "rotate(0deg)";

          cell.dataset.code = code;
          cell.appendChild(img);
        }
      })
    }
  })
}

/**
 * Colore une case de la grille.
 * @param {HTMLDivElement} grid La grille.
 * @param {HTMLDivElement} row La ligne.
 * @param {HTMLDivElement} col La colone.
 * @return {Number} Le code de la case.
 */
export function envoieMissile(grid, row, col) {
  let result = 0;
  grid.querySelectorAll('*').forEach(actualRow => {
    if (actualRow.dataset.id == row) {
      actualRow.querySelectorAll('*').forEach(cell => {
        if (cell.dataset.col == col) {
          if (cell.querySelector('img')) {
            cell.className = "square bg-danger border border-danger"
            result = cell.dataset.code;
            cell.dataset.code = 0;
            return;
          }
          else {
            cell.className = "square bg-dark"
            return;
          }
        }
      })
    }
  })

  return result;
}
