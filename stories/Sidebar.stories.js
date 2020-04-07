import Sidebar from '../src/components/Sidebar';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

export const sidebar = () => ({
  components: { Sidebar },
  template: `
    <div class="flex h-screen">
      <Sidebar
        :visible="true"
      />
    </div>
  `,
});
