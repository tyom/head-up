<template>
  <HeadUp class="head-up">
    <Board id="socket1" title="Crypto real-time">
      <Cell title="HitBTC Trade" padded>
        <VSocket
          endpoint="wss://api.hitbtc.com/api/2/ws"
          :throttle="100"
          @open="
            $event.send(
              JSON.stringify({
                method: 'subscribeTicker',
                params: { symbol: 'BTCUSD' },
              }),
            )
          "
        >
          <HValue
            slot-scope="{ result }"
            :label="$get(result, 'params.symbol')"
            :value="$get(result, 'params.last')"
          >
            <template slot="value" slot-scope="{ value }">
              {{ value | currency }}
            </template>
          </HValue>
        </VSocket>
        <VSocket
          endpoint="wss://api.hitbtc.com/api/2/ws"
          @open="
            $event.send(
              JSON.stringify({
                method: 'subscribeTicker',
                params: { symbol: 'ETHUSD' },
              }),
            )
          "
        >
          <HValue
            slot-scope="{ result }"
            :label="$get(result, 'params.symbol')"
            :value="$get(result, 'params.last')"
          >
            <template slot="value" slot-scope="{ value }">
              {{ value | currency }}
            </template>
          </HValue>
        </VSocket>
      </Cell>
      <Cell title="Gemini market data" padded>
        <VSocket endpoint="wss://api.gemini.com/v1/marketdata/btcusd">
          <HValue
            slot-scope="{ result }"
            label="BTC USD"
            :value="$get(result, 'events[0].price')"
          >
            <ValueChangeIcon
              slot="pre-value"
              :change-value="$get(result, 'events[0].delta')"
            />
            <template slot="value" slot-scope="{ value }">
              {{ value | currency }}
            </template>
          </HValue>
        </VSocket>
      </Cell>
    </Board>
    <Board id="poller1" title="Crypto poll">
      <Cell title="Crypto market" padded>
        <VPoller
          endpoint="https://api.iextrading.com/1.0/stock/market/crypto"
          :query="{ filter: 'companyName,latestPrice,changePercent' }"
          interval="1m"
        >
          <VList slot-scope="{ result }" :items="result" type="tiles">
            <HValue
              slot-scope="{ item }"
              :label="item.companyName"
              :value="item.latestPrice"
            >
              <ValueChangeIcon
                slot="pre-value"
                :change-value="item.changePercent"
              />
              <template slot="value" slot-scope="{ value }">
                {{ value | currency }}
              </template>
            </HValue>
          </VList>
        </VPoller>
      </Cell>
    </Board>
    <Board id="b1" title="Weather">
      <Cell title="London" padded>
        <VPoller
          endpoint="https://api.openweathermap.org/data/2.5/weather"
          :query="{
            appid: opendWeatherAppApiKey,
            q: 'London',
            units: 'metric',
          }"
          interval="5m"
        >
          <template slot-scope="{ result }">
            <HValue
              label="Current temperature"
              :value="$get(result, 'main.temp')"
            >
              <template slot="value" slot-scope="{ value }">
                {{ value }}°C
              </template>
            </HValue>
            <HValue
              label="Humidity"
              :value="$get(result, 'main.humidity')"
              :tween-fixed="0"
            >
              <template slot="value" slot-scope="{ value }">
                {{ value }}%
              </template>
            </HValue>
          </template>
        </VPoller>
      </Cell>
    </Board>
    <Board id="b2" title="Recent movies">
      <Cell padded>
        <VPoller
          endpoint="https://api.themoviedb.org/3/discover/movie"
          :query="{ api_key: tmdbApiKey }"
          interval="30m"
        >
          <VList
            slot-scope="{ result }"
            type="tiles"
            :items="$get(result, 'results', [])"
          >
            <HCard
              slot-scope="{ item }"
              :title="item.title"
              :image="`https://image.tmdb.org/t/p/w342/${item.poster_path}`"
            >
              <HGauge
                slot="subtitle"
                :progress="item.vote_average * 10"
                :value="item.vote_average"
                :colour-ranges="{
                  red: [0, 30],
                  tomato: [30, 50],
                  gold: [50, 70],
                  limegreen: [70, 100],
                }"
              >
                <template slot="label">
                  {{ item.vote_count.toLocaleString() }}
                  {{ item.vote_count | pluralize('vote') }}
                </template>
              </HGauge>
              <p>{{ item.overview | truncate(250) }}</p>
              <p :style="{ opacity: 0.7 }">
                Released:
                {{
                  new Date(item.release_date).toLocaleString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                }}
              </p>
            </HCard>
          </VList>
        </VPoller>
      </Cell>
    </Board>
  </HeadUp>
</template>

<script>
export default {
  components: {
    ValueChangeIcon: () => import('./ValueChangeIcon'),
  },
  data() {
    return {
      tmdbApiKey: process.env.VUE_APP_TMDB_API_KEY,
      opendWeatherAppApiKey: process.env.VUE_APP_OPENWEATHERAPP_API_KEY,
    };
  },
  created() {
    document.title = 'Head-up Dashboard';
  },
};
</script>

<style>
html {
  font: 16px 'Avenir', Helvetica, Arial, sans-serif;
  background-color: #222;
}

body {
  margin: 0;
}
</style>
