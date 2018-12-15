<template>
  <div class="VSocket">
    <slot :result="result" v-if="result"/>
  </div>
</template>

<script>
import { throttle } from 'lodash';

export default {
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    throttle: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      result: null,
    };
  },
  created() {
    const socket = new WebSocket(this.endpoint);

    socket.onopen = () => {
      this.$emit('open', socket);
    };

    socket.onmessage = throttle(msg => {
      this.result = JSON.parse(msg.data);
    }, this.throttle);
  },
};
</script>

<style scoped>
.VSocket {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
