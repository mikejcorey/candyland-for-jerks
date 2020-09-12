const get_position_code = function (board_position) {
  var position_code;
  if (board_position.length > 1) {
    position_code = board_position[0].toString()
  } else {
    position_code = board_position.toString();
  }
  return position_code;
}

const find_code_index = (array, code) => {
  for (var i=0; i<array.length; i++) {
    if (code[0] == array[i][0]) {
      return i
    }
  }
  return false
}

export const turn = function (player, board, deck) {
  // Find currrent position in board
  let board_index;
  if (!player.current_position) {
    board_index = 0;
  } else {
    board_index = find_code_index(board, player.current_position)
  }

  // Pick next card, move to end of deck
  let card = deck[0];
  deck.push(deck.shift());

  let final_board_position;
  let norm_finder = /[RPYBOG]{1}\d+/;
  let remaining;
  // Check if this is a normal or specialty card
  if (card.length == 1) {
    remaining = 1;
    // Normal card -- find next board spot of this color
  } else if (card.indexOf('double') != -1) {
    // Find second board spot of this color
    remaining = 2;
  } else {
    // Specialty card, exit early
    player.notes.push(card);
    player.current_position = [card];
    return {'player': player, 'deck': deck}
  }

  let board_from_start = board.slice(board_index+1)
  for (let position in board_from_start) {

    var position_code = get_position_code(board_from_start[position]);

    if (position_code == 'win') {
      player.current_position = 'win';
      player.notes.push('Winner!!!');
      return {'player': player, 'deck': deck}
    } else if (position_code.match(norm_finder) && position_code[0] == card.replace('double', '')) {
      remaining--;
      if (remaining == 0) {
        if (board_from_start[position].length > 1) {
          player.current_position = [board_from_start[position][1]];
          player.notes.push(board_from_start[position][2]);
          if (board_from_start[position][2] == 'lose turn') {
            player.lose_turn = true;
          }
        } else {
          player.current_position = board_from_start[position];
          player.notes.push(board_from_start[position]);
        }
        return {'player': player, 'deck': deck}
      }
    }
  }
  return false
}
