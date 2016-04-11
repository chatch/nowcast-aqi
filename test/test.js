'use strict'
let assert = require('assert')
let nowcastAQI = require('../nowcast-aqi')

let nowcast = nowcastAQI.nowcast

describe('nowcast-aqi', function () {
    describe('#nowcast()', function () {
        // data here from the EPA nowcast formula example
        // http://www.epa.gov/airnow/faq/Nowcast-formula.pptx
        it('should calculate correct nowcast with EPA formula example', function () {
            // from most recent to oldest
            let hours = [13, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(17.4, nowcast(hours))
        })
        it('should not calculate nowcast when missing recent hour 1 or 2', function () {
            // from most recent to oldest
            let hours = [undefined, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(undefined, nowcast(hours))
            hours = [13, undefined, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(undefined, nowcast(hours))
        })
        it('should calculate nowcast when missing recent hour 3 only', function () {
            // from most recent to oldest
            let hours = [13, 16, undefined, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(18.5, nowcast(hours))
        })
    })
})