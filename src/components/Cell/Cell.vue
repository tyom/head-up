<template>
  <div class="Cell">
    <header v-if="isEditable || title" class="header">
      <h2 class="title">{{ title }}</h2>
      <button
        v-if="isEditable"
        :class="{ _toggled: showSettings }"
        class="header-button"
        @click.stop="handleSettingsClick"
      >
        <v-icon name="ellipsis-h" />
      </button>
    </header>
    <div class="body-wrapper">
      <div :class="bodyClass" class="body" :style="bodyStyle">
        <slot v-if="$slots.default" />
        <template v-else>
          <component
            v-for="(item, idx) in content"
            :is="item.type"
            :key="idx"
            v-bind="item.props"
            class="body-item"
          />
        </template>
      </div>
      <transition name="revealSettings">
        <CellSettings v-if="isEditable && showSettings" />
      </transition>
    </div>
  </div>
</template>

<script>
import merge from 'lodash/merge';
import store from '../../store';
import { createGridTemplate } from '../../utils';
import CellSettings from './CellSettings';

export default {
  name: 'Cell',
  components: {
    CellSettings,
  },
  props: {
    grid: String,
    title: {
      type: String,
      default: '',
    },
    content: {
      type: Array,
      default: () => [],
    },
    padded: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (!this.$slots.default) {
      return;
    }
    const { areas } = createGridTemplate(this.grid);
    this.$slots.default.forEach((vnode, idx) => {
      vnode.data = merge(vnode.data, {
        style: {
          gridArea: areas[idx],
        },
      });
    });
  },
  data() {
    return {
      showSettings: false,
    };
  },
  computed: {
    isEditable() {
      return this.editable && store.state.editMode;
    },
    bodyStyle() {
      return {
        gridTemplateAreas: createGridTemplate(this.grid).template,
      };
    },
    bodyClass() {
      return {
        padded: this.padded,
      };
    },
  },
  methods: {
    handleSettingsClick() {
      this.showSettings = !this.showSettings;
    },
  },
};
</script>

<style scoped>
.Cell {
  @apply flex flex-col flex-grow transition duration-300 select-none p-px antialiased;
  background-color: #6277a244;

  &:hover {
    @apply duration-100;
  }
}

.header {
  @apply py-2 px-4 relative flex justify-center items-center;
  @apply uppercase leading-none font-bold;
  color: #fff8;
  font-size: 0.7rem;
}

.title {
  text-shadow: -1px -1px #0001;
}

.header-button {
  @apply absolute top-0 right-0 bottom-0 outline-none z-10 px-4;

  &.focus-visible {
    @apply shadow-outline;
  }

  &._toggled {
    @apply bg-gray-900 text-white;
  }

  &:hover {
    @apply text-white;
  }

  &:active {
    @apply bg-gray-800 transition-none text-white;
  }

  & .fa-icon {
    margin: -0.2em 0;
  }
}

.body-wrapper {
  @apply flex flex-grow relative items-stretch;
}

.body {
  @apply grid gap-px text-gray-400 flex-grow;
}

.body > * {
  @apply bg-gray-900;
}

.padded > * {
  @apply p-2;
}

.revealSettings-enter-active,
.revealSettings-leave-active {
  @apply transition duration-300;
}
.revealSettings-enter,
.revealSettings-leave-to {
  @apply opacity-0;
}
</style>
