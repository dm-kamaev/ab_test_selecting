'use strict';

module.exports = class AbTestSelecting {

  /**
   * constructor
   * @param  {object} hashAbTests
   * {
   *   page_something: {
   *     variations: [{
   *       name: "first",
   *       ratio: 50, // required
   *       visited: 0, // required
   *     }, {
   *       name: "two",
   *       ratio: 50, // required
   *       visited: 0, // required
   *     }]
   *   }
   */
  constructor(hashAbTests) {
    this._hashTest = hashAbTests;
  }

  /**
   * choice
   * @param  {string} key: must be in  hashAbTests
   * @return {object | error}
   * {
   *  variant: {
   *   name: "first",
   *   ratio: 50,
   *   visited: 0,
   *  },
   *  page: {
   *    variations: [{
   *       name: "first",
   *       ratio: 50, // required
   *       visited: 0, // required
   *     }, {
   *       name: "two",
   *       ratio: 50, // required
   *       visited: 0, // required
   *     }]
   *  }
   */
  choice(key) {
    const page = this._hashTest[key];
    if (!page) {
      return new Error(`Not exist key ${key} in hash pages`);
    }
    /**
     * variations
     * @type {Object[]} { ratio: number, visited: number }
     */
    const variations = this._hashTest[key].variations;

     let totalVisited = 0;
     variations.forEach(variant => totalVisited += variant.visited || 0);

     let res = false;
     const calcPercent = CalcPercent(totalVisited);
     for (var i = 0, l = variations.length; i < l; i++) {
       const variation = variations[i];
       const percent = calcPercent(variation.visited);
       if (percent < variation.ratio) {
         variation.visited++;
         res = variation;
         break;
       }
     }

     if (!res) {
       const variation = variations[Math.floor(Math.random() * variations.length)];
       variation.visited++;
       res = variation;
     }

     return { variant: res, page };
   }

};


/**
 * CalcPercent:
 * @param {Number} total:
 */
function CalcPercent(total) {
  /**
   * @param  {Number} val:
   * @return {NUmber}
   */
  return function (val) {
    const percent = ((val / total) * 100).toFixed(0);
    return parseInt(percent, 10);
  };
}



