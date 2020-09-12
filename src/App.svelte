<script>
	import {board} from './board.js';
	import {deck, shuffle} from './deck.js';
	import {turn} from './turn.js'

	console.log(board);
	console.log(deck);
	let current_deck = deck;
	let turn_result;
	let player_colors = ['Lavender', 'Orange', 'Blue', 'Yellow'];
	let your_player;

	const make_players = () => {
		var players = {};
		for (let color of ['Lavender', 'Orange', 'Blue', 'Yellow']) {
		  players[color] = {
		    'current_position': undefined,
		    'lose_turn': false,
		    'notes': []
		  };
		}
		return players;
	}

	const play_game = () => {
		your_player = event.currentTarget.value;

		if (your_player) {
			let winning_player;
			let last_position;
			let max_turns = 100;
			let players = make_players();

			current_deck = shuffle(deck);
			while (last_position != 'win' && max_turns != 0) {
				for (let player in players) {
					if (players[player].lose_turn === true) {
						// Skip turn and exit
						players[player].lose_turn = false;
					} else {
						console.log(player);
						turn_result = turn(players[player], board, current_deck);
						console.log(turn_result.player);
						players[player] = turn_result.player;
						current_deck = turn_result.deck;
						last_position = players[player].current_position;
						if (last_position == 'win') {
							winning_player = player;
							break;
						}
					}
				}
				max_turns--;
			}

			// Mark winners and losers
			for (let message_player in players) {
				let outcome = ' lost.'
				if (message_player == winning_player) {
					outcome = ' won!!!'
				}
				if (message_player == your_player) {
					document.getElementById(message_player + '-message').innerHTML = '<strong>You'+ outcome + '</strong>'
				} else {
					document.getElementById(message_player + '-message').innerHTML = 'They'+ outcome
				}
			}
		}
	}

</script>

Choose your player:
{#each player_colors as player}
	<label>
		<input type=radio on:change={play_game} bind:group={your_player} value={player}>
		{player}
		<span id="{player}-message"></span>
	</label>
{/each}
