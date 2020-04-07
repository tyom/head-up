import Cell from '../src/components/Cell';

export default {
  title: 'Cell',
  component: Cell,
};

const CellWithSections = {
  props: {
    title: String,
    grid: String,
    items: {
      type: Array,
      default: [],
    },
  },
  template: `
    <div class="flex min-h-screen">
      <Cell :title="title" :grid="grid" padded>
        <div v-for="section in items">
          <h1>{{ section }}</h1>
        </div>
      </Cell>
    </div>
  `,
};

export const oneSection = () => ({
  components: { Cell, CellWithSections },
  template: `
    <CellWithSections title="One section" :items="['One']" />
  `,
});

export const twoSections = () => ({
  components: { Cell, CellWithSections },
  template: `
    <CellWithSections title="Two sections" grid="1:1" :items="['One', 'Two']" />
  `,
});

export const threeSections = () => ({
  components: { Cell, CellWithSections },
  template: `
    <CellWithSections title="Three sections" grid="1:1-2" :items="['One', 'Two', 'Three']" />
  `,
});

export const fourSections = () => ({
  components: { Cell, CellWithSections },
  template: `
    <CellWithSections title="Four sections" grid="1:1" :items="['One', 'Two', 'Three', 'Four']" />
  `,
});

export const fiveSections = () => ({
  components: { Cell, CellWithSections },
  template: `
    <CellWithSections title="Four sections" grid="1:1:1-3-3" :items="['One', 'Two', 'Three', 'Four', 'Five']" />
  `,
});

export const sixSections = () => ({
  components: { Cell, CellWithSections },
  template: `
    <CellWithSections title="Four sections" grid="1:1:1-1-2:1" :items="['One', 'Two', 'Three', 'Four', 'Five', 'Six']" />
  `,
});
