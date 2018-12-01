<template>
  <div class="SwitchToggle">
    <div :class="{_toggled: toggled}" class="toggle-indicator">
      <div class="toggle-head"/>
      <input
        v-model="toggled"
        :id="inputId"
        :name="name"
        type="checkbox"
      >
    </div>
    <label
      v-if="label"
      :for="inputId"
      v-text="label"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: null,
    },
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      toggled: this.value,
    };
  },
  computed: {
    inputId() {
      return `switch-toggle-${this._uid}`;
    },
  },
  watch: {
    toggled(newVal) {
      this.$emit('input', newVal);
    },
  },
};
</script>

<style scoped>
:root {
  --toggle-width: 2em;
  --toggle-height: 1em;
}

.SwitchToggle {
  display: flex;
  align-items: center;
  line-height: 1;
}

.toggle-indicator {
  position: relative;
  background-color: #bbb;
  border: 2px solid #0004;
  box-shadow: inset 1px 1px rgba(#000, 0.1);
  padding: 1px;
  border-radius: var(--toggle-height);
  width: var(--toggle-width);
  margin-right: 0.5em;
  transition: 0.2s;
}

.toggle-head {
  transition: 0.2s;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid rgba(#000, 0.2);
  box-shadow: 1px 1px rgba(#000, 0.06), inset -1px -1px 1px rgba(#000, 0.1);
  background-clip: padding-box;
  height: var(--toggle-height);
  width: var(--toggle-height);
}

._toggled {
  &.toggle-indicator {
    background-color: #95de85;
  }

  & .toggle-head {
    background-color: #fff;
    transform: translateX(calc(100% - 6px));
  }
}

input {
  font-size: 1em;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
}
</style>
