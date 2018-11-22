<template>
  <HeadUp class="head-up">
    <Board title="Cell components">
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
  </HeadUp>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font: 16px 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
