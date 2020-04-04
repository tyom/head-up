import { shallowMount } from '@vue/test-utils';
import BoardToolbar from '../BoardToolbar';

beforeEach(() => {
  jest.resetAllMocks();
});

test('render default', () => {
  const wrapper = shallowMount(BoardToolbar);
  expect(wrapper).toMatchSnapshot();
});

test('render with board data', () => {
  const wrapper = shallowMount(BoardToolbar, {
    propsData: {
      board: {
        title: 'Some collection',
      },
    },
  });
  expect(wrapper).toMatchSnapshot();
});

test('render as editable', async () => {
  const wrapper = shallowMount(BoardToolbar, {
    propsData: {
      board: {
        title: 'Some collection',
        editable: true,
      },
    },
  });
  const inputField = wrapper.find('.toolbar-input');
  const saveButton = wrapper.find('.save');

  expect(wrapper).toMatchSnapshot();
  expect(inputField.element.value).toEqual('Some collection');
  expect(saveButton.attributes('disabled')).toEqual('disabled');

  inputField.setValue('Changed collection');
  await wrapper.vm.$nextTick();
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
    });
    inputField = wrapper.find('.toolbar-input');
  });

  test('save button', async () => {
    const saveButton = wrapper.find('.save');

    expect(saveButton.element.disabled).toBe(true);
    inputField.setValue(newTitle);
    await wrapper.vm.$nextTick();
    expect(saveButton.element.disabled).toBe(false);

    saveButton.trigger('submit');
    expect(wrapper.emitted('save')[0][0]).toEqual({
      ...propsData.board,
      title: newTitle,
    });
  });

  test('done button', () => {
    const doneButton = wrapper.find('.done');

    inputField.setValue(newTitle);
    doneButton.trigger('click');

    expect(wrapper.emitted('done')[0][0]).toEqual({
      ...propsData.board,
      title: newTitle,
    });
  });
});
