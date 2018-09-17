
const assert = require('assert');
const AbTestSelecting = require('../ab_test_selecting.js');


describe('test for AbTestSelecting', function() {

  it('50/50', function () {
    const abTestSelecting = new AbTestSelecting({
      page_something: {
        variations: [{
          name: "first",
          ratio: 50, // required
          visited: 0, // required
        }, {
          name: "two",
          ratio: 50, // required
          visited: 0, // required
        }]
      }
    });

    var page;
    for (var i = 0; i < 100; i++) {
      page = abTestSelecting.choice('page_something');
    }
    assert.ok(page.variations[0].visited === page.variations[1].visited && page.variations[0].visited === 50, 'not equal and not equal 50');
  });


  it('25/60/15', function () {
    const abTestSelecting = new AbTestSelecting({
      page_something: {
        variations: [{
          name: "first",
          ratio: 25, // required
          visited: 0, // required
        }, {
          name: "two",
          ratio: 60, // required
          visited: 0, // required
        },  {
          name: "three",
          ratio: 15, // required
          visited: 0, // required
        }]
      }
    });

    var page;
    for (var i = 0; i < 274; i++) {
      page = abTestSelecting.choice('page_something');
    }
    console.log(page);
    let [ v1, v2, v3 ]= page.variations;
    v1 = v1.visited;
    v2 = v2.visited;
    v3 = v3.visited;

    assert.ok(v1+v2+v3 === 274, 'incorrect total');
    assert.ok(v1 >= 67 && v1 <= 71, 'wrong value v1');
    assert.ok(v2 >= 163 && v2 <= 165, 'wrong value v2');
    assert.ok(v3 >= 41 && v3 <= 44, 'wrong value v3');
  });


  it('not found', function () {
    const abTestSelecting = new AbTestSelecting({
      page_something: {
        variations: [{
          name: "first",
          ratio: 50, // required
          visited: 0, // required
        }, {
          name: "two",
          ratio: 50, // required
          visited: 0, // required
        }]
      }
    });

    assert.ok(abTestSelecting.choice('not_found') instanceof Error, 'not instance Error');
  });

});


