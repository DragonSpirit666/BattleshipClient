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
    for (let i = 1; i < 11; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      const firstcell = document.createElement('div');
      firstcell.className = 'm-1 square bg-light text-center';
      firstcell.textContent = String.fromCharCode(64 + i);
      row.dataset.id = String.fromCharCode(64 + i);
      row.appendChild(firstcell);
      for (let j = 1; j < 11; j++) {
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
          if (cell.dataset.col >= start && cell.dataset.col <= end)
            cell.className = "m-1 square bg-dark" 
        })
    }
  })
}

export function colorVerticalLine(grid, col, start, end) {
  grid.querySelectorAll('*').forEach(actualRow => {
      if (actualRow.dataset.id >= start && actualRow.dataset.id <= end) {
        actualRow.querySelectorAll('*').forEach(cell => { 
          if (cell.dataset.col == col)
            cell.className = "m-1 square bg-dark" 
        })
    }
  })
}

export function placeX(grid, row, col) {
  grid.querySelectorAll('*').forEach(actualRow => {
      if (actualRow.dataset.id == row) {
        actualRow.querySelectorAll('*').forEach(cell => { 
          if (cell.dataset.col == col) {
            if (cell.className.includes('bg-dark'))
              cell.className = "m-1 square bg-danger"
            else
              cell.textContent = 'X'
          }
        })
      }
  })
}