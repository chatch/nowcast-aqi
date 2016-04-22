# nowcast-aqi
[![](https://img.shields.io/npm/v/nowcast-aqi.svg)](https://www.npmjs.com/package/nowcast-aqi)
[![Build Status](https://travis-ci.org/chatch/nowcast-aqi.svg?branch=master)](https://travis-ci.org/chatch/nowcast-aqi)

[Nowcast AQI](https://en.wikipedia.org/wiki/Nowcast_%28Air_Quality_Index%28) calculator

### Usage
```
let nowcast = require('nowcast-aqi')

// nowcast PM
let last12Hours = [13, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
nowcast.pm(last12Hours)  // '17.413919413919412'

// nowcast ozone
let last8Hours = [0.14, 0.16, 0.15, 0.14, 0.11, 0.12, 0.12, 0.11]
nowcast.ozone(last8Hours)  // '0.14145147795319638'

// nowcast PM Asian (see proposal at http://aqicn.org/faq/2015-03-15/air-quality-nowcast-a-beginners-guide/)
let last3Hours = [89, 77, 10]
nowcast.pmAsian(last3hours)  // '86.91493659521939'

// nowcast custom hours and weight factor
let last5Hours = [66, 50, 62, 100, 98]
nowcast.custom(last5hours)  // '64.58064516129032'
```
