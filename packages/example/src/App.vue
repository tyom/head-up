<template>
  <HeadUp class="head-up">
    <Board id="socket1" title="Crypto real-time">
      <Cell title="HitBTC Trade" padded>
        <VSocket
          endpoint="wss://api.hitbtc.com/api/2/ws"
          :throttle="100"
          @open="$event.send(JSON.stringify({
            method: 'subscribeTicker',
            params: { symbol: 'BTCUSD' },
          }))"
        >
          <HValue
            slot-scope="{result}"
            :label="$get(result, 'params.symbol')"
            :value="$get(result, 'params.last')"
            :format-number="{
              style: 'currency',
              currency: 'USD',
            }"
          />
        </VSocket>
        <VSocket
          endpoint="wss://api.hitbtc.com/api/2/ws"
          @open="$event.send(JSON.stringify({
            method: 'subscribeTicker',
            params: { symbol: 'ETHUSD' },
          }))"
        >
          <HValue
            slot-scope="{result}"
            :label="$get(result, 'params.symbol')"
            :value="$get(result, 'params.last')"
            :format-number="{
              style: 'currency',
              currency: 'USD',
            }"
          />
        </VSocket>
      </Cell>
      <Cell title="Gemini market data" padded>
        <VSocket endpoint="wss://api.gemini.com/v1/marketdata/btcusd">
          <HValue
            slot-scope="{result}"
            label="BTC USD"
            :value="$get(result, 'events[0].price')"
            :format-number="{
              style: 'currency',
              currency: 'USD',
            }"
            :increase="$get(result, 'events[0].delta') > 0"
            :decrease="$get(result, 'events[0].delta') < 0"
          />
        </VSocket>
      </Cell>
    </Board>
    <Board id="poller1" title="Crypto poll">
      <Cell title="Crypto market">
        <VPoller endpoint="https://api.iextrading.com/1.0/stock/market/crypto?filter=companyName,latestPrice,changePercent">
          <VTiles slot-scope="{result}" :items="result">
            <HValue
              slot-scope="{data}"
              :label="data.companyName"
              :value="data.latestPrice"
              :format-number="{
                style: 'currency',
                currency: 'USD',
              }"
              :increase="data.changePercent > 0"
              :decrease="data.changePercent < 0"
            />
          </VTiles>
        </VPoller>
      </Cell>
    </Board>
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
