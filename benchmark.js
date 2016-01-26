var classLists = require('./')
var assert = require('assert')
var benchmark = require('benchmark')

var fixtures = [
  {
    description: 'strings',
    args: ['one', 'two', 'three'],
    expected: 'one two three'
  },
  {
    description: 'lists',
    args: [[true, 'one'], [true, 'two'], [false, 'three']],
    expected: 'one two'
  },
  {
    description: 'strings, lists',
    args: ['one', 'two', [true, 'four'], [false, 'three']],
    expected: 'one two four'
  },
  {
    description: 'mix',
    args: ['one', [true, 'two'], [false, 'three'], ['four', 'four'], [true, 'five'], []],
    expected: 'one two four five'
  },
  {
    description: 'triples',
    args: [[true, 'one', 'two'], [false, 'three', 'four']],
    expected: 'one four'
  },
  {
    description: 'modules',
    args: [{one: 'oneone', two: 'twotwo'}, [true, 'one'], [false, 'two']],
    expected: 'oneone'
  }

]

fixtures.forEach((f) => {
  assert.equal(f.expected, classLists.apply(null, f.args))

  var suite = new benchmark.Suite()

  suite.add(`classLists#${f.description}`, () => {
    classLists.apply(null, f.args)
  })

  suite.on('cycle', (event) => {
    console.log('*', String(event.target))
  })

  suite.on('error', (event) => {
    throw event.target.error
  })

  suite.run()
})
