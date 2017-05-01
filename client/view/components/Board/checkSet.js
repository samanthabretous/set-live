/**
@return true or false
*/
const checkSet = (choosenCards) => {
  // should check each categories and compare them.
  // the objects are stored in an array
  const keys = Object.keys(choosenCards[0]).slice(1);
  const categories = keys.filter(k => k === 'number' || k === 'color' || k === 'shade' || k === 'shape');
  const matches = categories.reduce((start, element) => {
    // when all the properties are the same
    if (choosenCards[0][element] === choosenCards[1][element] &&
        choosenCards[1][element] === choosenCards[2][element]) {
      start += 1;
    } else if (choosenCards[0][element] !== choosenCards[1][element] &&
      choosenCards[1][element] !== choosenCards[2][element] &&
      choosenCards[0][element] !== choosenCards[2][element]) {
      start += 1;
    }
    return start;
  }, 0);
  return matches === 4;
  // should return true or false
};

export default checkSet;
