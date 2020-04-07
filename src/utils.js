import range from 'lodash/range';
import uniq from 'lodash/uniq';
import flattenDeep from 'lodash/flattenDeep';

export function createGridTemplate(shorthand = '') {
  const areaChars = Array.from('abcdefghijklmnopqrstuvwxyz').reverse();
  const gridDef = shorthand
    .split('-')
    .map((x) => (Number(x) ? Number(x) : x.split(':').map(Number)));
  const sum = (acc, cur) => acc + cur;
  const colNum = Math.max(
    ...gridDef.map((x) => (Array.isArray(x) ? x.reduce(sum, 0) : x)),
  );

  function processGrid(rows = []) {
    return rows.map((x) => {
      if (Array.isArray(x)) {
        return x.map((x) => {
          if (x > 1) {
            const spannedChar = areaChars.pop();
            return range(x)
              .map(() => spannedChar)
              .join(' ');
          }
          return areaChars.pop();
        });
      }
      const spannedChar = areaChars.pop();
      return range(colNum).map(() => spannedChar);
    });
  }

  const grid = processGrid(gridDef);

  return {
    areas: uniq(flattenDeep(grid.map((x) => x.map((y) => y.split(' '))))),
    template: grid.map((row) => `'${row.join(' ')}'`).join(' '),
  };
}
