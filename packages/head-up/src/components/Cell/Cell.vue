<template>
  <div class="Cell">
    <header v-if="isEditable || title" class="header">
      <h2 class="title">{{ title }}</h2>
      <button
        v-if="isEditable"
        :class="{_toggled: showSettings}"
        class="header-button"
        @click.stop="handleSettingsClick"
      >
        <v-icon name="ellipsis-h"/>
      </button>
    </header>
    <div class="container">
      <div :class="bodyClass" class="body">
        <slot v-if="$slots.default"/>
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
        <CellSettings v-if="isEditable && showSettings"/>
      </transition>
    </div>
  </div>
</template>

<script>
import CellSettings from './CellSettings';

export default {
  name: 'Cell',
  components: {
    CellSettings,
  },
  props: {
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
  data() {
    return {
      showSettings: false,
    };
  },
  computed: {
    isEditable() {
      return this.editable && this.isEditing();
    },
    bodyClass() {
      const content = this.$slots.default ? this.$slots.default : this.content;
      return {
        [`u-grid-${content.length}-x`]: !!content.length,
        padded: this.padded,
      };
    },
  },
  inject: ['isEditing'],
  methods: {
    handleSettingsClick() {
      this.showSettings = !this.showSettings;
    },
  },
};
</script>

<style scoped>
.Cell {
  border: 1px solid #0005;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  user-select: none;

  &:hover {
    transition: 0.1s;
  }
}

.header {
  font-size: 0.55em;
  color: #fff6;
  position: relative;
  text-transform: uppercase;
  background-color: #0003;
  padding: 0.7em 1em;
  line-height: 1;
  justify-content: center;
  display: flex;
  align-items: center;
}

.header-button {
  border: 0;
  padding: 0.5em 1em;
  background: none;
  color: #fff;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  outline: 0;

  &:hover {
    opacity: 1;
  }

  &:focus-visible {
    background-color: rgba(#20416d, 0.7);
    box-shadow: 0 0 0 1px #fff;
  }

  &._toggled {
    opacity: 1;
    background-color: #20416d;
  }

  &:active {
    opacity: 1;
    transition: none;
    background-color: #20416d;
  }
}

.title {
  font-size: inherit;
}

.container {
  position: relative;
  flex: 1;
  display: flex;
}

.body {
  grid-gap: 1px;
  background-color: rgba(#000, 0.2);
  flex: 1;
  justify-content: stretch;
  align-items: stretch;
}

.body > * {
  background-color: rgba(#fff, 0.03);
}

.padded > * {
  padding: 0.5em;
}

.revealSettings-enter-active,
.revealSettings-leave-active {
  transition: 0.3s;
}
.revealSettings-enter,
.revealSettings-leave-to {
  opacity: 0;
}
</style>
