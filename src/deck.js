export let deck = [];
const colors = 'RPYBOG';

export const shuffle = function (input_deck) {
  // Fischer-Yates method: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
  for (let i = input_deck.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = input_deck[i]
    input_deck[i] = input_deck[j]
    input_deck[j] = temp
  }
  return input_deck;
};

for (let color of colors) {
  for (var n=0; n<9; n++) {
    deck.push(color);
  }
  deck.push('double' + color);
  deck.push('double' + color);
}
for (let spec of ['Plumpy', 'Mr. Mint', 'Jolly', 'Nana Nutt', 'Princess Lolly', 'Queen Frostine']) {
  deck.push(spec);
}
