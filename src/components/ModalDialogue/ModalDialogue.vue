<template>
  <transition name="reveal">
    <div
      v-if="content"
      class="ModalDialogue"
      v-shortkey="['esc']"
      @shortkey="handleClose"
    >
      <div class="backdrop" @click="handleClose" />
      <div class="wrapper">
        <header v-if="content.heading">
          <h2 class="title">{{ content.heading }}</h2>
        </header>
        <div class="body">
          <component :is="modalComponent" />
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
  @apply fixed inset-0 z-10 flex justify-center items-center text-lg;
}

.backdrop {
  @apply h-full w-full;
  background-color: #000b;
}

.wrapper {
  @apply absolute rounded-md border-solid border-2 shadow-lg;
  @apply bg-gray-800 border-gray-600 text-gray-400 transition;
}

header {
  @apply p-4 text-xl border-b-2 border-gray-600;
}

.body {
  @apply p-4 overflow-auto;
  width: 60vw;
  min-height: 30vh;
}

.reveal-enter-active,
.reveal-leave-active {
  @apply transition duration-700;
}
.reveal-enter-active {
  & .backdrop {
    @apply duration-500;
  }

  & .wrapper {
    transition: 0.2s 0.1s;
  }
}
.reveal-leave-active {
  & .backdrop {
    transition: 0.3s 0.1s;
  }

  & .wrapper {
    @apply duration-100;
  }
}

.reveal-enter,
.reveal-leave-to {
  & .backdrop {
    @apply opacity-0;
  }

  & .wrapper {
    @apply opacity-0 transform -translate-y-20;
  }
}
</style>
