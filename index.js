
const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      let newCollection = (collection instanceof Array) ? collection : Object.values(collection)
      for (let i = 0; i < newCollection.length; i++) {
        callback(newCollection[i])
      }
      return collection
    },

    map: function(collection, callback) {
      let newCollection = (collection instanceof Array) ? collection : Object.values(collection)
      return newCollection.map(callback)
    },

    reduce: function(c = [], callback = () => {}, acc) {
			let collection = c.slice(0)
			if (!acc) {
				acc = collection[0]
				collection = collection.slice(1)
			}
			let leng = collection.length;
			for (let i = 0; i < leng; i++) {
				acc = callback(acc, collection[i], collection)
			}
			return acc;
		},

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)
      for (let indx = 0; indx < collection.length; indx++)
        if (predicate(collection[indx])) return collection[indx]
      return undefined
    },

    filter: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)
      const newArr = []
      for (let indx = 0; indx < collection.length; indx++)
        if (predicate(collection[indx])) newArr.push(collection[indx])
      return newArr
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length
    },

    first: function(array, n) {
      if (!n) {
        return array[0]
      } else {
        return array.slice(0, n)
      }
    },

    last: function(array, n) {
      return (n) ? array.slice(array.length-n, array.length) : array[array.length-1]
    },

    compact: function(array) {
      const badArr = new Set([false, null, 0, "", undefined, NaN])
      return array.filter(elmnt => !badArr.has(elmnt))
    },

    sortBy: function(array, callback) {
      const newArr = [...array]
      return newArr.sort(function(a, b) {
        return callback(a) - callback(b)
      })
    },

    unpack: function(receiver, arr) {
      for (let valu of arr)
        receiver.push(valu)
    },

    flatten: function(array, shallow, flat = []) {
      if (!Array.isArray(array)) return flat.push(array)
      if (shallow) {
        for (let valu of array) {
          Array.isArray(valu) ? this.unpack(flat, valu) : flat.push(valu)
        }
      }
      else {
        for (let valu of array) {
          this.flatten(valu, false, flat)
        }
      }
      return flat
    },

    uniqSorted: function(array, iteratee) {
    const sorted = [array[0]]
      for (let indx = 1; indx < array.length; indx++) {
        if (sorted[indx-1] !== array[indx])
          sorted.push(array[indx])
      }
      return sorted
    },

    uniq: function(array, isSorted = false, callback=false) {
      if (isSorted) {
        return fi.uniqSorted(array, callback)
      }
      else if (!callback) {
        return Array.from(new Set(array))
      }
      else {
        const modifiedVals = new Set()
        const uniqVals = new Set()
        for (let val of array) {
          const modVal = callback(val)
          if (!modifiedVals.has(modVal)) {
            modifiedVals.add(modVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      let keys = []
      Object.keys(obj).map((obj) => keys.push(obj))   
      return keys
    },
  
    values: function(obj) {
      let values = []
      Object.values(obj).map((obj) => values.push(obj))
      return values
    },

    functions: function(obj) {
      const functionNames = []
      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },

  }
})()

fi.libraryMethod()