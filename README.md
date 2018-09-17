# ab_test_selecting

Select an option from the list, particularly a/b test.
Use only Math.random is wrong because the function is nondeterministic

You can see distribution and you may be modify him

## Getting Started

### Installing

```
 npm install ab_test_selecting@latest -S
```

### Examples

```javascript
  const AbTestSelecting = require('ab_test_selecting.js');
  const abTestSelecting = new AbTestSelecting({
    page_something: {
      variations: [{
        name: "first",
        ratio: 25, // required
        visited: 0, // required, maybe not zero
      }, {
        name: "two",
        ratio: 60, // required
        visited: 0, // required, maybe not zero
      },  {
        name: "three",
        ratio: 15, // required
        visited: 0, // required, maybe not zero
      }]
    }
  });

  var page;
  for (var i = 0; i < 274; i++) {
    page = abTestSelecting.choice('page_something');
  }
  // {
  //  variations: [
  //   { name: 'first', ratio: 25, visited: 67 },
  //   { name: 'two', ratio: 60, visited: 163 },
  //   { name: 'three', ratio: 15, visited: 44 }
  //  ]
  // }
  console.log(page);

  // write page.variations in database
```


## Running the tests

```
 npm run test
```

