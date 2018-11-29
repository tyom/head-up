<template functional>
  <dl class="shortcuts">
    <div>
      <dt>j</dt>
      <dd>Next board</dd>
    </div>
    <div>
      <dt>k</dt>
      <dd>Previous board</dd>
    </div>
    <div>
      <dt>s</dt>
      <dd>Toggle sidebar</dd>
    </div>
    <div>
      <dt>e</dt>
      <dd>Toggle edit mode</dd>
    </div>
    <div>
      <dt>a</dt>
      <dd>Insert new board</dd>
    </div>
  </dl>
</template>

<style scoped>
.shortcuts {
  & > div {
    display: flex;
    align-items: center;
    padding: 0.5em 0;
  }

  & > div + div {
    border-top: 1px solid #ddd;
  }

  & dt {
    width: 2em;
    height: 2em;
    line-height: 1.9em;
    text-align: center;
    background-color: #555;
    color: #fff;
    border-radius: 0.2em;
    font-weight: bold;
    margin-right: 1em;
  }
}
</style>
