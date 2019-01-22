# Head-up dashboard system

[![CircleCI](https://circleci.com/gh/tyom/head-up.svg?style=svg)](https://circleci.com/gh/tyom/head-up)

Head-up is a Vue plugin which allows to declaratively create multiple boards (containers) containing
cells (sections) laid out within each board. Each cell can have any content and each child of Cell component
will become a sub-section, which further allows to divide the board into additional sections.

## Usage

See the [example app](./packages/example) for usage.

## Exposing data

Various components take advantage of Vue's [scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots). This allows us to share data from a component with its parent.

For example, `VList` takes `items` array prop which contains a list of movies with titles, ratings, images etc. `Vlist` loops through this array and applies the data of each item to inner component that is passed through default scope. It then exposes each list item in destructured `{item}` slot scope.

The following code:

```vue
<VList :items="[
  { title: 'Bumblebee', rating: 6.5 },
  { title: 'Aquaman', rating: 6.9 },
]">
  <div class="movie" slot-scope={item}>
    <h2>{{ item.title }}</h2>
    <p>Rating: {{ item.rating }}</p>
  </div>
</VList>
```

Will produce:

```html
<div class="VList">
  <ul>
    <li>
      <div class="movie">
        <h2>Bumblebee</h2>
        <p>Rating: 6.5</p>
      </div>
    </li>
    <li>
      <div class="movie">
        <h2>Aquaman</h2>
        <p>Rating: 6.9</p>
      </div>
    </li>
  </ul>
</div>
```

The same techniqus is used in other components that may want to expose internal data
to parent. Such as results of a request to an external API.

## Making requests

### `VPoller` component

This component makes requests with interval (polling). It requires `endpoint` and
`interval` props to be set. `interval` is a human-readable string and can be
set as `30m` or `30 mins` or `30 minutes` etc. It's parsed using [parse-duration](https://www.npmjs.com/package/parse-duration) package.

The component also allows making multiple requests at once, which
then become available in destructured slot prop `{result}` as array in the same
order they are defined. This could be useful if you wish to combine results of
several requests into one component.

#### Simple request

```vue
<VPoller
  endpoint="https://api.themoviedb.org/3/discover/movie"
  :query="{api_key: tmdbApiKey}"
  interval="30m"
/>
```

This makes request to the specified endpoint with the query `?api_key=<tmdbApiKey>` which is set on component instance (data method). It will
keep making requests every 30 mins indefinitely. The result are exposed in `result` slot scope.

```vue
<template slot-scope="slot">
  <pre>{{ slot.result }}</pre>
</template>
```

or simply destructure it:

```vue
<template slot-scope="{result}">
  <pre>{{ result }}</pre>
</template>
```

#### Multiple requests

The `requests` share the `endpoint` (prefix) and `query` (suffix).

```vue
<VPoller
  endpoint="https://api.themoviedb.org/3/discover"
  :requests="['/movie', '/tv']"
  :query="{api_key: tmdbApiKey}"
  interval="30m"
/>
```

This will use the `endpoint` prop to prefix each request in `requests` and add
`query` to each request.

To make multiple requests with different queries:

```vue
<VPoller
  endpoint="https://api.themoviedb.org/3/discover"
  :requests="[
    {
      path: '/movie',
      query: {sort_by: 'vote_average.desc'}
    }, {
      path: '/tv',
      query: {include_adult: 'true'}
    }
  ]"
  :query="{api_key: tmdbApiKey}"
  interval="30m"
/>
```

This will do the same but merge the `query` prop with individual request's `path`. 

### `VSocket` component

This component is used to make WebSocket connections. Message data is exposed to
parent component via `{result}` slot prop.

It also has `@open` event which can be used to send requests.

```vue
<VSocket
  endpoint="wss://api.hitbtc.com/api/2/ws"
  @open="$event.send(JSON.stringify({
    method: 'subscribeTicker',
    params: { symbol: 'BTCUSD' },
  }))"
>
  <pre slot-scope="{result}">
    {{ result.params.last }}
  </pre>
</VSocket>
```
