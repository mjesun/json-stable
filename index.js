'use strict';


const stringify = require('json-stable-stringify');
const nativeStringify = JSON.stringify;

const obj = {
  foo: 42,
  bar: () => {},
  baz: ['qux', false, null],
  0: 'foo'.repeat(1000),
  24.4: true,
  'some-random-$key': 0.423,
  nestedObj: {
    one: 'two',
    three: 'four',
    five: 'six',
  },
};

const canonicalize = (key, value) => {
  if (!(value instanceof Object) || value instanceof Array) {
    return value;
  }

  let keys = Object.keys(value).sort();
  let length = keys.length;
  let object = {};

  for (let i = 0; i < length; i++) {
    object[keys[i]] = value[keys[i]];
  }

  return object;
}



console.time('json-stable-stringify');

for (let i = 0; i < 500000; i++) {
  stringify(obj);
}

console.timeEnd('json-stable-stringify');



console.time('json-stringify');

for (let i = 0; i < 500000; i++) {
  nativeStringify(obj, canonicalize);
}

console.timeEnd('json-stringify');
