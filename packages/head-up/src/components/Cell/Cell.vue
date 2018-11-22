<template>
  <div
    :class="cellClass"
    class="Cell"
    @click="handleCellClick"
  >
    <header v-if="isEditable || title" class="header">
      <h2 class="title">
        {{ title }}
      </h2>
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
      <transition name="fade">
        <CellSettings v-if="editMode && showSettings"/>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
  },
  data() {
    return {
      showSettings: false,
    };
  },
  computed: {
    ...mapState(['editMode']),
    isEditable() {
      return this.$parent.editable && this.editMode;
    },
    cellClass() {
      return {
        _editMode: this.editMode,
        _active: this.editMode && this.isActiveCell(this._uid),
      };
    },
    bodyClass() {
      const content = this.$slots.default ? this.$slots.default : this.content;
      return {
        [`u-grid-${content.length}-x`]: true,
        padded: this.padded,
      };
    },
  },
  inject: ['isActiveCell'],
  methods: {
    handleCellClick() {
      if (!this.isEditable) {
        return;
      }
      this.$parent.$emit('toggle-cell', this._uid);
    },
    handleSettingsClick() {
      this.showSettings = !this.showSettings;
      this.$parent.$emit('select-cell', this._uid);
    },
  },
};
</script>

<style scoped>
._editMode:hover {
  border-color: #000a;
}

.Cell {
  border: 1px solid #0005;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  user-select: none;

  &:hover {
    transition: 0.1s;
  }

  &._active {
    transition: none;
    border-color: #17619c;
    background-color: #0001;

    & .header {
      color: #fff;
    }
  }
}

.header {
  font-size: 0.55em;
  color: #fff6;
  text-transform: uppercase;
  background-color: #0003;
  padding: 0.6em 1em;
  line-height: 1;
  justify-content: center;
  display: flex;
  align-items: center;
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

.header-button {
  border: 0;
  padding: 0.5em 1em;
  background: none;
  color: #fff;
  margin: -0.6em -1.3em -0.6em auto;
  opacity: 0.7;
  outline: 0;

  &:hover {
    opacity: 1;
  }

  &._toggled {
    opacity: 1;
    background-color: #20416d;
  }

  &:active {
    background-color: #193254;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
