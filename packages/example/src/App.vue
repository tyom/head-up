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
          interval="1m"
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
    <Board id="b1" title="Weather">
      <Cell title="London" padded>
        <VPoller
          endpoint="https://api.openweathermap.org/data/2.5/weather"
          :query="{appid: opendWeatherAppApiKey, q: 'London', units: 'metric'}"
          interval="5m"
        >
          <template slot-scope="{result}">
            <HValue
              label="Current temperature"
              :value="$get(result, 'main.temp')"
            />
            <HValue
              label="Humidity"
              :value="$get(result, 'main.humidity')"
            />
          </template>
        </VPoller>
      </Cell>
    </Board>
    <Board id="b2" title="Recent movies">
      <Cell padded>
        <VPoller
          endpoint="https://api.themoviedb.org/3/discover/movie"
          :query="{api_key: tmdbApiKey}"
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
                  :colour-ranges="{
                    red: [0, 30],
                    tomato: [30, 50],
                    gold: [50, 70],
                    limegreen: [70, 100]
                  }"
                  :label="data.vote_average"
                  :side-label="`${$formatNumber(data.vote_count)} votes`"
                />
              </template>
              <p>{{ data.overview | truncate(250) }}</p>
              <p>Released: {{ new Date(data.release_date).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }) }}</p>
            </HCard>
          </VList>
        </VPoller>
      </Cell>
    </Board>
  </HeadUp>
</template>

<script>
export default {
  data() {
    return {
      tmdbApiKey: process.env.VUE_APP_TMDB_API_KEY,
      opendWeatherAppApiKey: process.env.VUE_APP_OPENWEATHERAPP_API_KEY,
    };
  },
};
</script>

<style>
body {
  font: 16px 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #1b1b1b;
  margin: 0;
}
</style>
