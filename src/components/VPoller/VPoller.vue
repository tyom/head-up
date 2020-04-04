<template>
  <div class="VPoller">
    <div
      v-if="statusVisible"
      class="status"
      :style="{ backgroundSize: `${intervalPercent}% 100%` }"
    >
      <div class="status-head" :style="statusHeadStyles" />
    </div>
    <slot :result="result" />
  </div>
</template>

<script>
import parseDuration from 'parse-duration';

export default {
  props: {
    endpoint: {
      type: String,
      required: true,
    },
    query: {
      type: Object,
      default: () => {},
    },
    requests: {
      type: Array,
      default: () => [],
    },
    interval: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      statusVisible: false,
      timer: undefined,
      result: undefined,
      intervalMs: parseDuration(this.interval),
    };
  },
  computed: {
    statusHeadStyles() {
      return {
        width: `${this.intervalPercent}%`,
        animationDuration: `${this.intervalMs}ms, ${this.intervalMs /
          this.intervalSeconds}ms`,
        animationTimingFunction: `steps(${this.intervalSeconds}, end), ease`,
      };
    },
    intervalSeconds() {
      return this.intervalMs / 1000;
    },
    intervalPercent() {
      return 100 / this.intervalSeconds;
    },
  },
  mounted() {
    this.update();
    this.startTimer();
  },
  beforeDestroy() {
    this.stopTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(this.update, this.intervalMs);
      this.statusVisible = true;
    },
    stopTimer() {
      clearInterval(this.timer);
      this.statusVisible = false;
    },
    getData(url, query) {
      return this.$http
        .get(url, {
          params: query,
        })
        .then(x => x.data);
    },
    populateRequests(requests) {
      return requests.map(request => {
        const url = this.endpoint.replace(/\/$/, '');
        const path = request.path || '';

        if (typeof request === 'string') {
          return this.getData(url + request, this.query);
        }
        return this.getData(url + path, {
          ...this.query,
          ...request.query,
        });
      });
    },
    async update() {
      const requests = this.populateRequests(this.requests);

      try {
        if (requests.length) {
          this.result = await Promise.all(requests);
        } else {
          this.result = await this.getData(this.endpoint, this.query);
        }
      } catch (err) {
        console.error(err.message);
      }
    },
  },
};
</script>

<style scoped>
.VPoller {
  position: relative;
}

.status {
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  background-image: linear-gradient(
    90deg,
    transparent 2%,
    rgba(#259fff, 0.4) 2%,
    rgba(#259fff, 0.4) 100%
  );
  height: 1px;
  z-index: 1;
}

.status-head {
  animation: tick infinite linear, fade infinite backwards;
  min-width: 1px;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background-color: #fff;
}

._paused .status {
  visibility: hidden;
}

@keyframes tick {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
