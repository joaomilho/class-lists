/* global define */

(function () {
  'use strict'

  function classLists () {
    var classes = []
    var module = arguments[0].constructor === Object
      ? arguments[0]
      : null

    var i = 0
    while (i < arguments.length) {
      var arg = arguments[i++]
      if (!arg) continue

      if (typeof arg === 'string') {
        classes.push(module && module[arg] || arg)
      } else if (Array.isArray(arg) && arg.length <= 3) {
        arg[0]
          ? typeof arg[1] === 'string' &&
            classes.push(module && module[arg[1]] || arg[1])
          : typeof arg[2] === 'string' &&
            classes.push(module && module[arg[2]] || arg[2])
      }
    }

    return classes.join(' ')
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = classLists
  } else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'class-lists', consistent with npm package name
    define('class-lists', [], function () {
      return classLists
    })
  } else {
    window.classLists = classLists
  }
}())
