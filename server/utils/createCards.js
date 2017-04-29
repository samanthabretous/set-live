const model = require('../models')

module.exports = (gameId) => {
  model.card.bulkCreate(
    [
      // ------------squiggle solid------------
      { card: 1, number: 1, color: 'red', shade: 'solid', shape: 'squiggle', gameId },
      { card: 2, number: 2, color: 'red', shade: 'solid', shape: 'squiggle', gameId },
      { card: 3, number: 3, color: 'red', shade: 'solid', shape: 'squiggle', gameId },
      { card: 4, number: 1, color: 'green', shade: 'solid', shape: 'squiggle', gameId },
      { card: 5, number: 2, color: 'green', shade: 'solid', shape: 'squiggle', gameId },
      { card: 6, number: 3, color: 'green', shade: 'solid', shape: 'squiggle', gameId },
      { card: 7, number: 1, color: 'purple', shade: 'solid', shape: 'squiggle', gameId },
      { card: 8, number: 2, color: 'purple', shade: 'solid', shape: 'squiggle', gameId },
      { card: 9, number: 3, color: 'purple', shade: 'solid', shape: 'squiggle', gameId },

      // ------------diamond solid------------

       { card: 10, number: 1, color: 'red', shade: 'solid', shape: 'diamond', gameId },
       { card: 11, number: 2, color: 'red', shade: 'solid', shape: 'diamond', gameId },
       { card: 12, number: 3, color: 'red', shade: 'solid', shape: 'diamond', gameId },
       { card: 13, number: 1, color: 'green', shade: 'solid', shape: 'diamond', gameId },
       { card: 14, number: 2, color: 'green', shade: 'solid', shape: 'diamond', gameId },
       { card: 15, number: 3, color: 'green', shade: 'solid', shape: 'diamond', gameId },
       { card: 16, number: 1, color: 'purple', shade: 'solid', shape: 'diamond', gameId },
       { card: 17, number: 2, color: 'purple', shade: 'solid', shape: 'diamond', gameId },
       { card: 18, number: 3, color: 'purple', shade: 'solid', shape: 'diamond', gameId },

      // ------------oval solid------------

       { card: 19, number: 1, color: 'red', shade: 'solid', shape: 'oval', gameId },
       { card: 20, number: 2, color: 'red', shade: 'solid', shape: 'oval', gameId },
       { card: 21, number: 3, color: 'red', shade: 'solid', shape: 'oval', gameId },
       { card: 22, number: 1, color: 'green', shade: 'solid', shape: 'oval', gameId },
       { card: 23, number: 2, color: 'green', shade: 'solid', shape: 'oval', gameId },
       { card: 24, number: 3, color: 'green', shade: 'solid', shape: 'oval', gameId },
       { card: 25, number: 1, color: 'purple', shade: 'solid', shape: 'oval', gameId },
       { card: 26, number: 2, color: 'purple', shade: 'solid', shape: 'oval', gameId },
       { card: 27, number: 3, color: 'purple', shade: 'solid', shape: 'oval', gameId },

      // ------------squiggle striped------------

       { card: 28, number: 1, color: 'red', shade: 'striped', shape: 'squiggle', gameId },
       { card: 29, number: 2, color: 'red', shade: 'striped', shape: 'squiggle', gameId },
       { card: 30, number: 3, color: 'red', shade: 'striped', shape: 'squiggle', gameId },
       { card: 31, number: 1, color: 'green', shade: 'striped', shape: 'squiggle', gameId },
       { card: 32, number: 2, color: 'green', shade: 'striped', shape: 'squiggle', gameId },
       { card: 33, number: 3, color: 'green', shade: 'striped', shape: 'squiggle', gameId },
       { card: 34, number: 1, color: 'purple', shade: 'striped', shape: 'squiggle', gameId },
       { card: 35, number: 2, color: 'purple', shade: 'striped', shape: 'squiggle', gameId },
       { card: 36, number: 3, color: 'purple', shade: 'striped', shape: 'squiggle', gameId },

      // ------------diamond striped------------

       { card: 37, number: 1, color: 'red', shade: 'striped', shape: 'diamond', gameId },
       { card: 38, number: 2, color: 'red', shade: 'striped', shape: 'diamond', gameId },
       { card: 39, number: 3, color: 'red', shade: 'striped', shape: 'diamond', gameId },
       { card: 40, number: 1, color: 'green', shade: 'striped', shape: 'diamond', gameId },
       { card: 41, number: 2, color: 'green', shade: 'striped', shape: 'diamond', gameId },
       { card: 42, number: 3, color: 'green', shade: 'striped', shape: 'diamond', gameId },
       { card: 43, number: 1, color: 'purple', shade: 'striped', shape: 'diamond', gameId },
       { card: 44, number: 2, color: 'purple', shade: 'striped', shape: 'diamond', gameId },
       { card: 45, number: 3, color: 'purple', shade: 'striped', shape: 'diamond', gameId },

      // ------------oval striped------------

       { card: 46, number: 1, color: 'red', shade: 'striped', shape: 'oval', gameId },
       { card: 47, number: 2, color: 'red', shade: 'striped', shape: 'oval', gameId },
       { card: 48, number: 3, color: 'red', shade: 'striped', shape: 'oval', gameId },
       { card: 49, number: 1, color: 'green', shade: 'striped', shape: 'oval', gameId },
       { card: 50, number: 2, color: 'green', shade: 'striped', shape: 'oval', gameId },
       { card: 51, number: 3, color: 'green', shade: 'striped', shape: 'oval', gameId },
       { card: 52, number: 1, color: 'purple', shade: 'striped', shape: 'oval', gameId },
       { card: 53, number: 2, color: 'purple', shade: 'striped', shape: 'oval', gameId },
       { card: 54, number: 3, color: 'purple', shade: 'striped', shape: 'oval', gameId },

      // ------------squiggles outline------------
      { card: 55, number: 1, color: 'red', shade: 'outline', shape: 'squiggle', gameId },
      { card: 56, number: 2, color: 'red', shade: 'outline', shape: 'squiggle', gameId },
      { card: 57, number: 3, color: 'red', shade: 'outline', shape: 'squiggle', gameId },
      { card: 58, number: 1, color: 'red', shade: 'outline', shape: 'squiggle', gameId },
      { card: 59, number: 2, color: 'green', shade: 'outline', shape: 'squiggle', gameId },
      { card: 60, number: 3, color: 'green', shade: 'outline', shape: 'squiggle', gameId },
      { card: 61, number: 1, color: 'purple', shade: 'outline', shape: 'squiggle', gameId },
      { card: 62, number: 2, color: 'purple', shade: 'outline', shape: 'squiggle', gameId },
      { card: 63, number: 3, color: 'purple', shade: 'outline', shape: 'squiggle', gameId },

      // ----------------diamond outline---------------
      { card: 64, number: 1, color: 'red', shade: 'outline', shape: 'diamond', gameId },
      { card: 65, number: 2, color: 'red', shade: 'outline', shape: 'diamond', gameId },
      { card: 66, number: 3, color: 'red', shade: 'outline', shape: 'diamond', gameId },
      { card: 67, number: 1, color: 'red', shade: 'outline', shape: 'diamond', gameId },
      { card: 68, number: 2, color: 'green', shade: 'outline', shape: 'diamond', gameId },
      { card: 69, number: 3, color: 'green', shade: 'outline', shape: 'diamond', gameId },
      { card: 70, number: 1, color: 'purple', shade: 'outline', shape: 'diamond', gameId },
      { card: 71, number: 2, color: 'purple', shade: 'outline', shape: 'diamond', gameId },
      { card: 72, number: 3, color: 'purple', shade: 'outline', shape: 'diamond', gameId },

      // ------------------oval outline---------------
      { card: 73, number: 1, color: 'red', shade: 'outline', shape: 'oval', gameId },
      { card: 74, number: 2, color: 'red', shade: 'outline', shape: 'oval', gameId },
      { card: 75, number: 3, color: 'red', shade: 'outline', shape: 'oval', gameId },
      { card: 76, number: 1, color: 'red', shade: 'outline', shape: 'oval', gameId },
      { card: 77, number: 2, color: 'green', shade: 'outline', shape: 'oval', gameId },
      { card: 78, number: 3, color: 'green', shade: 'outline', shape: 'oval', gameId },
      { card: 79, number: 1, color: 'purple', shade: 'outline', shape: 'oval', gameId },
      { card: 80, number: 2, color: 'purple', shade: 'outline', shape: 'oval', gameId },
      { card: 81, number: 3, color: 'purple', shade: 'outline', shape: 'oval', gameId },
    ], { validate: true });
};
