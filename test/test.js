'use strict'
let assert = require('assert')
let nowcast = require('../nowcast-aqi')

describe('nowcast-aqi', function () {

    describe('#pm()', function () {
        it('should calculate correct nowcast PM with EPA formula example', function () {
            // data here from the EPA nowcast formula example (in recent to oldest order)
            // http://www.epa.gov/airnow/faq/Nowcast-formula.pptx
            let hours = [13, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(17.413919413919412, nowcast.pm(hours))
        })
        it('should calculate nowcast when missing recent hour 3 only', function () {
            let hours = [13, 16, undefined, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(18.473346357800725, nowcast.pm(hours))
        })
        it('should not calculate nowcast when missing recent hour 1 or 2', function () {
            let hours = [undefined, 16, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(undefined, nowcast.pm(hours))
            hours = [13, undefined, 10, 21, 74, 64, 53, 82, 90, 75, 80, 50]
            assert.equal(undefined, nowcast.pm(hours))
        })
        it('should not calculate nowcast if 12 hours not provided', function () {
            assert.equal(undefined, nowcast.pm([]))
            assert.equal(undefined, nowcast.pm([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]))
        })
    })

    describe('#pmAsian()', function () {
        it('should calculate correct nowcast pmAsian', function () {
            // use numbers from the EPA example above
            let hours = [89, 77, 10]
            assert.equal(86.91493659521939, nowcast.pmAsian(hours))
        })
    })

    describe('#ozone()', function () {
        it('should calculate correct nowcast ozone', function () {
            let hours = [0.14, 0.16, 0.15, 0.14, 0.11, 0.12, 0.12, 0.11]
            assert.equal(0.14145147795319638, nowcast.ozone(hours))
        })
    })

    describe('#custom()', function () {
        it('should calculate correct nowcast with custom variables', function () {
            let hours = [66, 50, 62, 100, 98]
            assert.equal(64.58064516129032, nowcast.custom(hours, 5, 0.3))
        })
    })

})