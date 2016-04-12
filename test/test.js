'use strict'
let assert = require('assert')
let nowcast = require('../nowcast-aqi')

describe('nowcast-aqi', function () {
    describe('#pm()', function () {
        it('should calculate correct nowcast with EPA formula example', function () {
            // data here from the EPA nowcast formula example (in recent to oldest order)
            // http://www.epa.gov/airnow/faq/Nowcast-formula.pptx
            let hours = [13, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(17.413919413919412, nowcast.pm(hours))
        })
        it('should not calculate nowcast when missing recent hour 1 or 2', function () {
            let hours = [undefined, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(undefined, nowcast.pm(hours))
            hours = [13, undefined, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(undefined, nowcast.pm(hours))
        })
        it('should calculate nowcast when missing recent hour 3 only', function () {
            let hours = [13, 16, undefined, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(18.473346357800725, nowcast.pm(hours))
        })
    })
})