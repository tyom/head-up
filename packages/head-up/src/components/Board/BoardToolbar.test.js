import { shallowMount } from '@vue/test-utils';
import BoardToolbar from './BoardToolbar';

const provideMocks = {
  handleEditDone: jest.fn(),
  handleEditSave: jest.fn(),
};

beforeEach(() => {
  jest.resetAllMocks();
});

test('render default', () => {
  const wrapper = shallowMount(BoardToolbar, {
    provide: provideMocks,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render with board data', () => {
  const wrapper = shallowMount(BoardToolbar, {
    propsData: {
      board: {
        title: 'Some collection',
      },
    },
    provide: provideMocks,
  });
  expect(wrapper).toMatchSnapshot();
});

test('render as editable', () => {
  const wrapper = shallowMount(BoardToolbar, {
    propsData: {
      board: {
        title: 'Some collection',
        editable: true,
      },
    },
    provide: provideMocks,
  });
  const inputField = wrapper.find('.toolbar-input');
  const saveButton = wrapper.find('.save');

  expect(wrapper).toMatchSnapshot();
  expect(inputField.element.value).toEqual('Some collection');
  expect(saveButton.attributes('disabled')).toEqual('disabled');

  inputField.setValue('Changed collection');
  expect(saveButton.attributes('disabled')).toBeUndefined();
});

describe('finish edits', () => {
  let wrapper;
  let inputField;

  const propsData = {
    board: {
      title: 'Some collection',
      editable: true,
    },
  };
  const newTitle = 'Changed collection';

  beforeEach(() => {
    wrapper = shallowMount(BoardToolbar, {
      propsData,
      provide: provideMocks,
    });
    inputField = wrapper.find('.toolbar-input');
  });

  test('save button', () => {
    const saveButton = wrapper.find('.save');

    expect(saveButton.element.disabled).toBe(true);
    inputField.setValue(newTitle);
    expect(saveButton.element.disabled).toBe(false);

    saveButton.trigger('submit');
    expect(provideMocks.handleEditSave).toHaveBeenCalledWith({
      ...propsData.board,
      title: newTitle,
    });
  });

  test('done button', () => {
    const doneButton = wrapper.find('.done');

    inputField.setValue(newTitle);
    doneButton.trigger('click');

    expect(provideMocks.handleEditDone).toHaveBeenCalledWith({
      ...propsData.board,
      title: newTitle,
    });
  });
});
