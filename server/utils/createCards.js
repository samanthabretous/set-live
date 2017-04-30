const model = require('../models')

module.exports = (gameId, cardOrder) => {
  model.card.bulkCreate(
    [
      // ------------squiggle solid------------
      { card: 1, number: 1, color: 'red', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[0] },
      { card: 2, number: 2, color: 'red', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[1] },
      { card: 3, number: 3, color: 'red', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[2] },
      { card: 4, number: 1, color: 'green', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[3] },
      { card: 5, number: 2, color: 'green', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[4] },
      { card: 6, number: 3, color: 'green', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[5] },
      { card: 7, number: 1, color: 'purple', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[6] },
      { card: 8, number: 2, color: 'purple', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[7] },
      { card: 9, number: 3, color: 'purple', shade: 'solid', shape: 'squiggle', gameId, cardOrder: cardOrder[8] },

      // ------------diamond solid------------

       { card: 10, number: 1, color: 'red', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[9] },
       { card: 11, number: 2, color: 'red', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[10] },
       { card: 12, number: 3, color: 'red', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[11] },
       { card: 13, number: 1, color: 'green', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[12] },
       { card: 14, number: 2, color: 'green', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[13] },
       { card: 15, number: 3, color: 'green', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[14] },
       { card: 16, number: 1, color: 'purple', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[15] },
       { card: 17, number: 2, color: 'purple', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[16] },
       { card: 18, number: 3, color: 'purple', shade: 'solid', shape: 'diamond', gameId, cardOrder: cardOrder[17] },

      // ------------oval solid------------

       { card: 19, number: 1, color: 'red', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[18] },
       { card: 20, number: 2, color: 'red', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[19] },
       { card: 21, number: 3, color: 'red', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[20] },
       { card: 22, number: 1, color: 'green', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[21] },
       { card: 23, number: 2, color: 'green', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[22] },
       { card: 24, number: 3, color: 'green', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[23] },
       { card: 25, number: 1, color: 'purple', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[24] },
       { card: 26, number: 2, color: 'purple', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[25] },
       { card: 27, number: 3, color: 'purple', shade: 'solid', shape: 'oval', gameId, cardOrder: cardOrder[26] },

      // ------------squiggle striped------------

       { card: 28, number: 1, color: 'red', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[27] },
       { card: 29, number: 2, color: 'red', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[28] },
       { card: 30, number: 3, color: 'red', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[29] },
       { card: 31, number: 1, color: 'green', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[30] },
       { card: 32, number: 2, color: 'green', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[31] },
       { card: 33, number: 3, color: 'green', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[32] },
       { card: 34, number: 1, color: 'purple', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[33] },
       { card: 35, number: 2, color: 'purple', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[34] },
       { card: 36, number: 3, color: 'purple', shade: 'striped', shape: 'squiggle', gameId, cardOrder: cardOrder[35] },

      // ------------diamond striped------------

       { card: 37, number: 1, color: 'red', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[36] },
       { card: 38, number: 2, color: 'red', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[37] },
       { card: 39, number: 3, color: 'red', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[38] },
       { card: 40, number: 1, color: 'green', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[39] },
       { card: 41, number: 2, color: 'green', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[40] },
       { card: 42, number: 3, color: 'green', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[41] },
       { card: 43, number: 1, color: 'purple', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[42] },
       { card: 44, number: 2, color: 'purple', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[43] },
       { card: 45, number: 3, color: 'purple', shade: 'striped', shape: 'diamond', gameId, cardOrder: cardOrder[44] },

      // ------------oval striped------------

       { card: 46, number: 1, color: 'red', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[45] },
       { card: 47, number: 2, color: 'red', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[46] },
       { card: 48, number: 3, color: 'red', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[47] },
       { card: 49, number: 1, color: 'green', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[48] },
       { card: 50, number: 2, color: 'green', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[49] },
       { card: 51, number: 3, color: 'green', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[50] },
       { card: 52, number: 1, color: 'purple', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[51] },
       { card: 53, number: 2, color: 'purple', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[52] },
       { card: 54, number: 3, color: 'purple', shade: 'striped', shape: 'oval', gameId, cardOrder: cardOrder[53] },

      // ------------squiggles outline------------
      { card: 55, number: 1, color: 'red', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[54] },
      { card: 56, number: 2, color: 'red', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[55] },
      { card: 57, number: 3, color: 'red', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[56] },
      { card: 58, number: 1, color: 'red', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[57] },
      { card: 59, number: 2, color: 'green', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[58] },
      { card: 60, number: 3, color: 'green', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[59] },
      { card: 61, number: 1, color: 'purple', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[60] },
      { card: 62, number: 2, color: 'purple', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[61] },
      { card: 63, number: 3, color: 'purple', shade: 'outline', shape: 'squiggle', gameId, cardOrder: cardOrder[62] },

      // ----------------diamond outline---------------
      { card: 64, number: 1, color: 'red', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[63] },
      { card: 65, number: 2, color: 'red', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[64] },
      { card: 66, number: 3, color: 'red', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[65] },
      { card: 67, number: 1, color: 'red', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[66] },
      { card: 68, number: 2, color: 'green', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[67] },
      { card: 69, number: 3, color: 'green', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[68] },
      { card: 70, number: 1, color: 'purple', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[69] },
      { card: 71, number: 2, color: 'purple', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[70] },
      { card: 72, number: 3, color: 'purple', shade: 'outline', shape: 'diamond', gameId, cardOrder: cardOrder[71] },

      // ------------------oval outline---------------
      { card: 73, number: 1, color: 'red', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[72] },
      { card: 74, number: 2, color: 'red', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[73] },
      { card: 75, number: 3, color: 'red', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[74] },
      { card: 76, number: 1, color: 'red', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[75] },
      { card: 77, number: 2, color: 'green', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[76] },
      { card: 78, number: 3, color: 'green', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[77] },
      { card: 79, number: 1, color: 'purple', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[78] },
      { card: 80, number: 2, color: 'purple', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[79] },
      { card: 81, number: 3, color: 'purple', shade: 'outline', shape: 'oval', gameId, cardOrder: cardOrder[80] },
    ], { validate: true });
};
