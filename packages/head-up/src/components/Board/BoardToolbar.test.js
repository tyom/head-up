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

test('save edits', () => {
  const propsData = {
    board: {
      title: 'Some collection',
      editable: true,
    },
  };
  const wrapper = shallowMount(BoardToolbar, {
    propsData,
    provide: provideMocks,
  });
  const newTitle = 'Changed collection';
  const inputField = wrapper.find('.toolbar-input');
  const saveButton = wrapper.find('.save');

  inputField.setValue(newTitle);
  saveButton.trigger('submit');

  expect(provideMocks.handleEditSave).toHaveBeenCalledWith({
    ...propsData.board,
    title: newTitle,
  });

  expect(provideMocks.handleEditDone).not.toBeCalled();

  wrapper.setProps({ board: { title: newTitle } });
  expect(saveButton.attributes('disabled')).toEqual('disabled');
});

test('done button', () => {
  const propsData = {
    board: {
      title: 'Some collection',
      editable: true,
    },
  };
  const wrapper = shallowMount(BoardToolbar, {
    propsData,
    provide: provideMocks,
  });

  const newTitle = 'Changed collection';
  const inputField = wrapper.find('.toolbar-input');
  const doneButton = wrapper.find('.done');

  doneButton.trigger('click');

  expect(provideMocks.handleEditSave).not.toBeCalled();
  expect(provideMocks.handleEditDone).toBeCalled();

  inputField.setValue(newTitle);
  doneButton.trigger('click');

  expect(provideMocks.handleEditSave).toHaveBeenCalledWith({
    ...propsData.board,
    title: newTitle,
  });
  expect(provideMocks.handleEditDone).toBeCalled();
});
