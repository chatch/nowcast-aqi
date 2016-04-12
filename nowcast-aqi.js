'use strict'
//
// See nowcast formula details here:
//   https://www3.epa.gov/airnow/ani/pm25_aqi_reporting_nowcast_overview.pdf
//   https://en.wikipedia.org/wiki/Nowcast_%28Air_Quality_Index%29
//
let util = require('util')

const NUM_HOURS_PM = 12
const NUM_HOURS_PM_ASIA = 3
const NUM_HOURS_OZONE = 8
const WEIGHT_FACTOR_MIN_PM = 0.5
const WEIGHT_FACTOR_MIN_PM_ASIA = 0.1

// Calculate the nowcast value for PM
//  cByHour: Hourly concentrations for the previous 12 hours (order: recent to oldest)
function nowcastPM(cByHour) {
    return nowcast(cByHour, NUM_HOURS_PM, WEIGHT_FACTOR_MIN_PM)
}

// Calculate the 'asian nowcast' value for PM as proposed by aqicn:
//  http://aqicn.org/faq/2015-03-15/air-quality-nowcast-a-beginners-guide/
//  cByHour: Hourly concentrations for the previous 8 hours
function nowcastPMAsian(cByHour) {
    return nowcast(cByHour, NUM_HOURS_PM_ASIA, WEIGHT_FACTOR_MIN_PM_ASIA)
}

// Calculate the nowcast value for Ozone
//  cByHour: Hourly concentrations for the previous 8 hours
function nowcastOzone(cByHour) {
    return nowcast(cByHour, NUM_HOURS_OZONE)
}

// Calculate the nowcast value given formula variables:
//  cByHour: Hourly concentrations for the previous numHours hours (order: recent to oldest)
//  numHours: num of hours to calculate for
//  weightFactorMin (optional): weight factor raised to this min if calculated less then this
function nowcast(cByHour, numHours, weightFactorMin) {
    if (cByHour.length != numHours)
        return

    if (util.isUndefined(cByHour[0]) || util.isUndefined(cByHour[1]))
        return

    let wFactor = weightFactor(cByHour, weightFactorMin)

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
    return nowCast
}

// Calculate the weight factor ('w' in the nowcast formula)
//  cByHour: list of concentrations by hour
//  weightFactorMin (optional): weight factor raised to this min if calculated less then this
function weightFactor(cByHour, weightFactorMin) {
    let hours = filterUndefined(cByHour)
    let min = Math.min.apply(Math, hours)
    let max = Math.max.apply(Math, hours)
    let range = max - min
    let rateOfChange = range / max
    let factor = 1 - rateOfChange;
    if (weightFactorMin && factor <= weightFactorMin)
        factor = weightFactorMin
    return factor
}

function filterUndefined(list) {
    return list.filter(function (listVal) {
        return !(util.isNullOrUndefined(listVal))
    })
}

module.exports = {
    'pm': nowcastPM,
    'pmAsian': nowcastPMAsian,
    'ozone': nowcastOzone,
    'custom': nowcast
}