<template>
  <div class="VPoller">
    <div
      v-if="statusVisible"
      :style="{animationDuration: `${refreshTime}ms`}"
      class="status"
    />
    <slot :result="result"/>
  </div>
</template>

<script>
export default {
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    refreshTime: {
      type: Number,
      default: 10000,
    },
  },
  data() {
    return {
      statusVisible: false,
      timer: undefined,
      result: undefined,
    };
  },
  mounted() {
    this.updateData();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(this.updateData, this.refreshTime);
      this.statusVisible = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.statusVisible = false;
    },
    async updateData() {
      this.stopTimer();

      const { data } = await this.$http.get(this.endpoint);
      this.result = data;

      this.startTimer();
    },
  },
};
</script>

<style scoped>
.VPoller {
  position: relative;
}

.status {
  animation: grow infinite linear;
  top: 0;
  left: 0;
  position: absolute;
  background-image: linear-gradient(90deg, #17619c00, #17619c);
  height: 1px;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    right: 0;
    top: 0;
    height: 1px;
    width: 1px;
    background-color: #fff;
    box-shadow: 0 0 0 1px #fff8;
  }
}

@keyframes grow {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
