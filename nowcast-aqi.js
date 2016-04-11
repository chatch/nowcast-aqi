'use strict'

// See nowcast formula details here:
//   https://www3.epa.gov/airnow/ani/pm25_aqi_reporting_nowcast_overview.pdf
//
// Calculates Nowcast given 12 hourly concentrations.

const NUM_HOURS = 12
const WEIGHT_FACTOR_MIN = 0.5

// Calculate the nowcast value
//  cByHour: Hourly concentrations
function nowcast(cByHour) {
    if (cByHour.length != NUM_HOURS)
        return

    if (!cByHour[0] || !cByHour[1])
        return

    let wFactor = weightFactor(cByHour)

    let sumHourlyByWeightFactor = cByHour.reduce(function (prev, curr, idx) {
        if (!curr) return prev
        return prev + (curr * Math.pow(wFactor, idx))
    })

    let sumWeightFactor = cByHour.reduce(function (prev, curr, idx) {
        if (!curr) return prev
        if (idx == 1)
            prev = Math.pow(wFactor, idx - 1)
        return prev + Math.pow(wFactor, idx)
    })

    let nowCast = sumHourlyByWeightFactor / sumWeightFactor
    return nowCast.toFixed(1)
}

// Calculate the weight factor ('w' in the nowcast formula)
// Calculate the weight factor ('w' in the nowcast formula)
//  cByHour: list of PM concentrations by hour
function weightFactor(cByHour) {
    let min = Math.min(Math, cByHour)
    let max = Math.max(Math, cByHour)
    let rateOfChange = 1 - (min / max)
    return rateOfChange > WEIGHT_FACTOR_MIN ? rateOfChange : WEIGHT_FACTOR_MIN
}

module.exports.nowcast = nowcast