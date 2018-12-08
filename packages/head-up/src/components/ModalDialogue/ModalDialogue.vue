<template>
  <transition name="reveal">
    <div
      v-if="content"
      class="ModalDialogue"
      v-shortkey="['esc']"
      @shortkey="handleClose"
    >
      <div class="backdrop" @click="handleClose"/>
      <div class="container">
        <header v-if="content.heading">
          <h2 class="title">{{ content.heading }}</h2>
        </header>
        <div class="body">
          <component :is="modalComponent"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SettingsScreen from '../SettingsScreen';
import HelpScreen from '../HelpScreen';

export default {
  components: {
    SettingsScreen,
    HelpScreen,
  },
  props: {
    content: {
      type: Object,
      default: null,
    },
  },
  computed: {
    modalComponent() {
      if (!this.content) {
        return;
      }
      switch (this.content.name) {
        case 'help':
          return 'HelpScreen';
        case 'settings':
          return 'SettingsScreen';
        default:
          return '';
      }
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.ModalDialogue {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}

.backdrop {
  background-color: #000b;
  height: 100%;
  width: 100%;
}

.container {
  position: absolute;
  border-radius: 0.3em;
  z-index: 1;
  background-color: #222;
  border: 2px solid #fff4;
  color: #ccc;
}

header {
  padding: 1em;
  background-color: #0002;
  border-bottom: 0.1em solid #fff2;
}

.body {
  padding: 1em;
  width: 60vw;
  min-height: 30vh;
  overflow: auto;
}

.reveal-enter-active,
.reveal-leave-active {
  transition: 1s;
}
.reveal-enter-active {
  & .backdrop {
    transition: 0.5s;
  }

  & .container {
    transition: 0.2s 0.1s;
  }
}
.reveal-leave-active {
  & .backdrop {
    transition: 0.3s 0.1s;
  }

  & .container {
    transition: 0.1s;
  }
}

.reveal-enter,
.reveal-leave-to {
  & .backdrop {
    opacity: 0;
  }

  & .container {
    opacity: 0;
    transform: translateY(-50%);
  }
}
</style>
