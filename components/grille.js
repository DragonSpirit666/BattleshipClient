export default function createGrid() {
    const gridContainer = document.createElement('div');
    // gridContainer.className = 'row';

    // Top row
    const trow = document.createElement('div');
    trow.className = 'row';

    const firstcell = document.createElement('div');
    firstcell.className = 'm-1 square';
    trow.appendChild(firstcell);
    for (let j = 1; j < 11; j++) {
      const cell = document.createElement('div');
      cell.className = 'm-1 square bg-light text-center';
      cell.textContent = j;
      trow.appendChild(cell);
    }
    gridContainer.appendChild(trow);

    // Grille
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      const firstcell = document.createElement('div');
      firstcell.className = 'm-1 square bg-light text-center';
      firstcell.textContent = String.fromCharCode(65 + i);
      row.dataset.id = i;
      row.appendChild(firstcell);
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.className = 'm-1 border square text-center';
        cell.dataset.row = i;
        cell.dataset.col = j;
        row.appendChild(cell);
      }
      gridContainer.appendChild(row);
    }

    return gridContainer;
  };

export function colorHorizontalLine(grid, row, start, end) {
  grid.querySelectorAll('*').forEach(actualRow => {
      if (actualRow.dataset.id == row) {
        actualRow.querySelectorAll('*').forEach(cell => { 
          cell.className = "m-1 square bg-dark" 
        })
    }
  })
}

export function placeX(grid, row, col) {
  grid.querySelectorAll('*').forEach(actualRow => {
      if (actualRow.dataset.id == row) {
        actualRow.querySelectorAll('*').forEach(cell => { 
          if (cell.dataset.col == col) cell.textContent = 'X'
        })
      }
  })
}