export default function createGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'container row';
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div');
        cell.className = 'col border square';
        cell.dataset.row = i;
        cell.dataset.col = j;
        row.appendChild(cell);
      }
      gridContainer.appendChild(row);
    }

    return gridContainer;
  };