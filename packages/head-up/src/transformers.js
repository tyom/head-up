import { get } from 'lodash';

function getOption(slot, prop) {
  return get(slot, `componentOptions${prop ? '.' + prop : ''}`);
}

function getChildComponents(children = []) {
  return children.filter(x => x.tag);
}

export function serializeSlot(slot) {
  const boards = getChildComponents(slot).filter(
    x => getOption(x, 'tag') === 'Board',
  );

  return boards.map(slot => ({
    title: getOption(slot, 'propsData.title'),
    editable: false,
    cells: getChildComponents(getOption(slot, 'children')).map(cell => ({
      title: getOption(cell, 'propsData.title'),
    })),
  }));
}
