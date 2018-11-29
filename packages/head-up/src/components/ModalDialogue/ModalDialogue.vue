<template>
  <transition name="reveal">
    <div
      class="ModalDialogue"
      v-shortkey="['esc']"
      @shortkey="handleClose"
    >
      <div class="backdrop" @click="handleClose"/>
      <div class="container">
        <header v-if="heading">
          <h2 class="title">{{ heading }}</h2>
        </header>
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    heading: {
      type: String,
      default: '',
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
}

.backdrop {
  background-color: #000b;
  height: 100%;
  width: 100%;
}

.container {
  position: absolute;
  border-radius: 0.3em;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  max-width: 60vw;
  max-height: 60vh;
  margin: auto;
  z-index: 1;
  background-color: #222;
  border: 2px solid #fff4;
  color: #ccc;
  padding: 1em;
}

header {
  padding: 1em;
  margin: -1em -1em 1em;
  background-color: #0002;
  border-bottom: 0.1em solid #fff2;
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
