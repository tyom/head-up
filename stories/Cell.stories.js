import Cell from '../src/components/Cell';

export default {
  title: 'Cell',
  component: Cell,
};

export const twoSlots = () => ({
  components: { Cell },
  template: `
    <div class="flex min-h-screen">
      <Cell title="HitBTC Trade" padded>
        <div>
          <h1>Hello</h1>
        </div>
        <div>
          <h1>World</h1>
        </div>
      </Cell>
    </div>
  `,
});
