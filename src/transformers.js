import get from 'lodash/get';

function getOption(slot, prop, defaultValue) {
  return get(slot, `componentOptions${prop ? '.' + prop : ''}`, defaultValue);
}

function getChildComponents(children = []) {
  return children.filter((x) => x.tag);
}

export function serializeSlot(slot) {
  const boards = getChildComponents(slot).filter(
    (x) => getOption(x, 'tag') === 'Board',
  );

  return boards.map((slot) => ({
    id: getOption(slot, 'propsData.id'),
    title: getOption(slot, 'propsData.title'),
    editable: false,
    grid: getOption(slot, 'propsData.grid'),
    cells: getChildComponents(getOption(slot, 'children'), []).map((cell) => ({
      title: getOption(cell, 'propsData.title'),
      children: getOption(cell, 'children', []).map((x) => ({
        type: getOption(x, 'tag'),
      })),
    })),
  }));
}
