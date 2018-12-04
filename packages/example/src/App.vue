<template>
  <HeadUp class="head-up">
    <Board id="b1" title="Cell components #1">
      <Cell title="Cell #1" padded>
        <div>First section</div>
        <div>Second section</div>
        <div>Third section</div>
      </Cell>
      <Cell title="Cell #2" padded>
        <div>Only section</div>
      </Cell>
      <Cell/>
    </Board>
    <Board id="b2" title="Cell components #2">
      <Cell padded>
        <div>First section</div>
        <div>Second section</div>
        <div>Third section</div>
      </Cell>
    </Board>
  </HeadUp>
</template>

<style>
body {
  font: 16px 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #1b1b1b;
  margin: 0;
}
</style>
