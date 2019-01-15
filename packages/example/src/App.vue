<template>
  <HeadUp class="head-up">
    <Board id="socket1" title="Crypto real-time">
      <Cell
        title="HitBTC Trade"
        align="center"
        padded
      >
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
      <Cell
        title="Gemini market data"
        align="center"
        padded
      >
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
      <Cell
        title="Crypto market"
        align="center"
        padded
      >
        <VPoller
          endpoint="https://api.iextrading.com/1.0/stock/market/crypto?filter=companyName,latestPrice,changePercent"
          interval="30s"
        >
          <VList
            slot-scope="{result}"
            :items="result"
            type="tiles"
          >
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
          </VList>
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
    <Board id="b2" title="Recent movies">
      <Cell padded>
        <VPoller
          endpoint="https://api.themoviedb.org/3/discover/movie?api_key=b1f3b9b8476890da324fe569c53dfdbf"
          interval="30m"
        >
          <VList
            slot-scope="{result}"
            type="tiles"
            :items="$get(result, 'results', [])"
          >
            <HCard
              slot-scope="{data}"
              :title="data.title"
              :image="`https://image.tmdb.org/t/p/w342/${data.poster_path}`"
            >
              <template slot="subtitle">
                <HGauge
                  :progress="data.vote_average * 10"
                  :colour-ranges="{red: [0, 40], gold: [40, 70], limegreen: [70, 100]}"
                  :label="data.vote_average"
                  :side-label="`${data.vote_count} votes`"
                />
              </template>
              <p>{{ data.overview | truncate(250) }}</p>
            </HCard>
          </VList>
        </VPoller>
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
