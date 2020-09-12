export let board = [];

const square_order = 'RPYBOG';
const last_square = 'R22';
let n = 1;
let square;

while (n <=22) {
  for (let color of square_order) {
    square = color + n.toString();

    // Things that replace squares with complex logic
    if (square == 'O1') {
      board.push(['O1', 'P10', 'Rainbow Trail']);
    } else if (square == 'P6') {
      board.push(['P6', 'P8', 'Gumdrop Pass']);
    } else if (['Y8', 'B14', 'R20'].indexOf(square) != -1) {
      board.push([square, square, 'lose turn']);
    } else {
      board.push([square]);
    }

    // Things that are inserted AFTER a certain square
    const specialty_squares = {
      'P2': 'Plumpy',
      'B3': 'Mr. Mint',
      'B7': 'Jolly',
      'O12': 'Nana Nutt',
      'R16': 'Princess Lolly',
      'P17': 'Queen Frostine'
    }

    if (square in specialty_squares) {
      board.push([specialty_squares[square]]);
    } else if (square == [last_square]) {
      board.push(['win']);
      break;
    }
  }
  n++;
}
