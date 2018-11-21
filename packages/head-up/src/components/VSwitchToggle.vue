<template>
  <div class="SwitchToggle">
    <div :class="{_toggled: toggled}" class="toggle-indicator">
      <div class="toggle-head"/>
      <input
        :id="inputId"
        :checked="toggled"
        type="checkbox"
        @input="toggle"
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
      default: '',
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
    }
  },
  computed: {
    inputId() {
      return `switch-toggle-${this._uid}`
    },
  },
  methods: {
    toggle(evt) {
      this.toggled = evt.target.checked
      this.$emit('input', this.toggled)
    },
  },
}
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
  border: 1px solid #0005;
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
