/* global describe, it */

var assert = require('assert')
var classLists = require('../')

describe('classLists', function () {
  it('keeps 2nd when 1st is truthy', function () {
    assert.equal(
      'a f',
      classLists(
        [true, 'a'],
        [false, 'b'],
        [0, 'c'],
        [null, 'd'],
        [undefined, 'e'],
        [1, 'f']
      )
    )
  })

  it('keeps 2nd if 1st truthy, 3rd if falsy', function () {
    assert.equal(
      'a d',
      classLists(
        [true, 'a', 'b'],
        [false, 'c', 'd']
      )
    )
  })

  it('should be trimmed', function () {
    assert.equal(
      'b',
      classLists('', 'b', [], '')
    )
  })

  it('is empty when args are empty', function () {
    assert.equal('', classLists('', []))
  })

  it('supports mixed values', function () {
    assert.equal('a c', classLists([true, 'a'], 'c'))
    assert.equal('c', classLists([false, 'a'], 'c'))
    assert.equal('c a', classLists('c', [true, 'a']))
    assert.equal('c', classLists('c', [false, 'a']))
  })

  it('ignores invalid values', function () {
    assert.equal('', classLists([true, 1]))
    assert.equal('', classLists([true, true]))
    assert.equal('', classLists([true, undefined]))
    assert.equal('', classLists([true, []]))
    assert.equal('', classLists([true, {}]))
    var fun = function () {}
    assert.equal('', classLists([true, fun]))
  })

  it('ignores lists with 1 option', function () {
    assert.equal('', classLists(['a']))
  })

  it('ignores lists with more than 3 options', function () {
    assert.equal('', classLists(['a', 'b', 'c', true]))
    assert.equal('', classLists(['a', 'b', 'c', false]))
  })

  it('supports css modules', function () {
    var modulesMock = {
      a: 'aa',
      b: 'bb',
      c: 'cc'
    }
    assert.equal('aa cc', classLists(modulesMock, 'a', 'c'))
    assert.equal('bb', classLists(modulesMock, [false, 'a'], [true, 'b'], [false, 'c']))
  })
})
