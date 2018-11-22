<template>
  <div class="BoardToolbar">
    <form class="toolbar-container" @submit.prevent="handleSubmit">
      <div class="toolbar-item _info">
        <input
          v-if="$parent.editable"
          v-model="boardTitle"
          type="text"
          class="toolbar-input"
          placeholder="Board title"
        >
        <span v-else class="toolbar-title"> {{ title }} (read-only) </span>
      </div>
      <div class="toolbar-item _actions"><button>Done</button></div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      boardTitle: this.title,
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('done', {
        title: this.boardTitle,
      });
    },
  },
};
</script>

<style scoped>
.BoardToolbar {
  background-color: #20416d77;
  height: 3.5rem;
  display: flex;
  align-items: stretch;
  position: relative;
}

.toolbar-container {
  flex: 1;
  display: flex;
  align-items: stretch;
}

.toolbar-item {
  display: flex;
  align-items: center;
  padding: 0.6rem 0.5em;
}

.toolbar-title {
  font-size: 1rem;
  padding: 0.5rem;
}

.toolbar-input {
  background: #fff1;
  color: #fff;
  border-radius: 0.3rem;
  padding: 0.5rem;
  min-width: 10em;
  width: 100%;
  border: 0;
  font-size: 1rem;
  text-align: inherit;
  outline: 0;
  transition: 0.2s;

  &:hover {
    background-color: #fff2;
  }

  &:focus {
    color: #000;
    background-color: #fff6;
    box-shadow: inset 0 0 2px 1px #0004;
  }

  &::placeholder {
    color: #fff4;
  }

  @media (min-width: 50em) {
    max-width: 50%;
  }
}

.toolbar-item._info {
  flex: 1;
}

.toolbar-item._actions {
  margin-left: auto;

  & button {
    border-radius: 0.3rem;
    padding: 0.6rem 1em;
    font-size: 0.9rem;
    line-height: 1;
    background: #0005;
    border: 1px solid #fff3;
    color: #fff;
    outline: 0;

    &:hover {
      border-color: #fff5;
    }

    &:focus {
      border-color: #fff8;
    }

    &:active {
      background: #000;
    }
  }
}
</style>
