# nowcast-aqi
[![Build Status](https://travis-ci.org/chatch/nowcast-aqi.svg?branch=master)](https://travis-ci.org/chatch/nowcast-aqi)

[Nowcast AQI](https://en.wikipedia.org/wiki/Nowcast_%28Air_Quality_Index%28) calculator

### Usage
```
let nowcast = require('nowcast-aqi').nowcast
// concentrations from the last 12 hours
let last12Hours = [13, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
nowcast(last12Hours)  // '17.4'
```
