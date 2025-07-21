"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/longest-streak";
exports.ids = ["vendor-chunks/longest-streak"];
exports.modules = {

/***/ "(rsc)/./node_modules/longest-streak/index.js":
/*!**********************************************!*\
  !*** ./node_modules/longest-streak/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   longestStreak: () => (/* binding */ longestStreak)\n/* harmony export */ });\n/**\n * Get the count of the longest repeating streak of `substring` in `value`.\n *\n * @param {string} value\n *   Content to search in.\n * @param {string} substring\n *   Substring to look for, typically one character.\n * @returns {number}\n *   Count of most frequent adjacent `substring`s in `value`.\n */\nfunction longestStreak(value, substring) {\n  const source = String(value);\n  let index = source.indexOf(substring);\n  let expected = index;\n  let count = 0;\n  let max = 0;\n  if (typeof substring !== 'string') {\n    throw new TypeError('Expected substring');\n  }\n  while (index !== -1) {\n    if (index === expected) {\n      if (++count > max) {\n        max = count;\n      }\n    } else {\n      count = 1;\n    }\n    expected = index + substring.length;\n    index = source.indexOf(substring, expected);\n  }\n  return max;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbG9uZ2VzdC1zdHJlYWsvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0EsYUFBYUEsQ0FBQ0MsS0FBSyxFQUFFQyxTQUFTLEVBQUU7RUFDOUMsTUFBTUMsTUFBTSxHQUFHQyxNQUFNLENBQUNILEtBQUssQ0FBQztFQUM1QixJQUFJSSxLQUFLLEdBQUdGLE1BQU0sQ0FBQ0csT0FBTyxDQUFDSixTQUFTLENBQUM7RUFDckMsSUFBSUssUUFBUSxHQUFHRixLQUFLO0VBQ3BCLElBQUlHLEtBQUssR0FBRyxDQUFDO0VBQ2IsSUFBSUMsR0FBRyxHQUFHLENBQUM7RUFFWCxJQUFJLE9BQU9QLFNBQVMsS0FBSyxRQUFRLEVBQUU7SUFDakMsTUFBTSxJQUFJUSxTQUFTLENBQUMsb0JBQW9CLENBQUM7RUFDM0M7RUFFQSxPQUFPTCxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDbkIsSUFBSUEsS0FBSyxLQUFLRSxRQUFRLEVBQUU7TUFDdEIsSUFBSSxFQUFFQyxLQUFLLEdBQUdDLEdBQUcsRUFBRTtRQUNqQkEsR0FBRyxHQUFHRCxLQUFLO01BQ2I7SUFDRixDQUFDLE1BQU07TUFDTEEsS0FBSyxHQUFHLENBQUM7SUFDWDtJQUVBRCxRQUFRLEdBQUdGLEtBQUssR0FBR0gsU0FBUyxDQUFDUyxNQUFNO0lBQ25DTixLQUFLLEdBQUdGLE1BQU0sQ0FBQ0csT0FBTyxDQUFDSixTQUFTLEVBQUVLLFFBQVEsQ0FBQztFQUM3QztFQUVBLE9BQU9FLEdBQUc7QUFDWiIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxYeEdvb1xccGVyc29uYWwtc2l0ZVxcbm9kZV9tb2R1bGVzXFxsb25nZXN0LXN0cmVha1xcaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBHZXQgdGhlIGNvdW50IG9mIHRoZSBsb25nZXN0IHJlcGVhdGluZyBzdHJlYWsgb2YgYHN1YnN0cmluZ2AgaW4gYHZhbHVlYC5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqICAgQ29udGVudCB0byBzZWFyY2ggaW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gc3Vic3RyaW5nXG4gKiAgIFN1YnN0cmluZyB0byBsb29rIGZvciwgdHlwaWNhbGx5IG9uZSBjaGFyYWN0ZXIuXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogICBDb3VudCBvZiBtb3N0IGZyZXF1ZW50IGFkamFjZW50IGBzdWJzdHJpbmdgcyBpbiBgdmFsdWVgLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9uZ2VzdFN0cmVhayh2YWx1ZSwgc3Vic3RyaW5nKSB7XG4gIGNvbnN0IHNvdXJjZSA9IFN0cmluZyh2YWx1ZSlcbiAgbGV0IGluZGV4ID0gc291cmNlLmluZGV4T2Yoc3Vic3RyaW5nKVxuICBsZXQgZXhwZWN0ZWQgPSBpbmRleFxuICBsZXQgY291bnQgPSAwXG4gIGxldCBtYXggPSAwXG5cbiAgaWYgKHR5cGVvZiBzdWJzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgc3Vic3RyaW5nJylcbiAgfVxuXG4gIHdoaWxlIChpbmRleCAhPT0gLTEpIHtcbiAgICBpZiAoaW5kZXggPT09IGV4cGVjdGVkKSB7XG4gICAgICBpZiAoKytjb3VudCA+IG1heCkge1xuICAgICAgICBtYXggPSBjb3VudFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3VudCA9IDFcbiAgICB9XG5cbiAgICBleHBlY3RlZCA9IGluZGV4ICsgc3Vic3RyaW5nLmxlbmd0aFxuICAgIGluZGV4ID0gc291cmNlLmluZGV4T2Yoc3Vic3RyaW5nLCBleHBlY3RlZClcbiAgfVxuXG4gIHJldHVybiBtYXhcbn1cbiJdLCJuYW1lcyI6WyJsb25nZXN0U3RyZWFrIiwidmFsdWUiLCJzdWJzdHJpbmciLCJzb3VyY2UiLCJTdHJpbmciLCJpbmRleCIsImluZGV4T2YiLCJleHBlY3RlZCIsImNvdW50IiwibWF4IiwiVHlwZUVycm9yIiwibGVuZ3RoIl0sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/longest-streak/index.js\n");

/***/ })

};
;