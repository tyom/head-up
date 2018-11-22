<template>
  <transition name="reveal">
    <div v-if="show" class="ModalDialogue">
      <div class="backdrop" @click="$emit('close')"/>
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
    show: {
      type: Boolean,
      default: false,
    },
    heading: {
      type: String,
      default: '',
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
  background-color: #fff;
  color: #444;
  padding: 1em;
}

header {
  padding-bottom: 1em;
  margin-bottom: 1em;
  border-bottom: 0.1em solid #ccc;
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
