"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-icons/bs */ \"react-icons/bs\");\n/* harmony import */ var react_icons_bs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_icons_bs__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst Home = ()=>{\n    const [isHovered, setIsHovered] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [isActive, setIsActive] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchData = async ()=>{\n            const res = await fetch(\"/api/hello\");\n            const data = await res.json();\n            setData(data);\n        };\n        fetchData();\n    }, []);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        style: {\n            display: \"flex\",\n            flexDirection: \"column\",\n            alignItems: \"center\",\n            justifyContent: \"center\",\n            height: \"100vh\",\n            backgroundColor: \"#000\",\n            color: \"#fff\"\n        },\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                style: {\n                    fontSize: \"3rem\",\n                    marginBottom: \"1rem\"\n                },\n                children: \"Soundcheck!\"\n            }, void 0, false, {\n                fileName: \"/Users/joshualevy/Desktop/soundcheck/pages/index.js\",\n                lineNumber: 30,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                style: {\n                    backgroundColor: \"#1DB954\",\n                    padding: \"0.5rem 1rem\",\n                    borderRadius: \"1rem\",\n                    display: \"flex\",\n                    alignItems: \"center\",\n                    gap: \"0.5rem\",\n                    border: \"none\",\n                    marginTop: \"0.1rem\",\n                    cursor: \"pointer\",\n                    opacity: isHovered ? 0.9 : 1,\n                    transition: \"all 0.1s ease-in-out\",\n                    transform: isActive ? \"scale(0.99)\" : \"scale(1)\"\n                },\n                onMouseEnter: ()=>setIsHovered(true),\n                onMouseLeave: ()=>setIsHovered(false),\n                onMouseDown: ()=>setIsActive(true),\n                onMouseUp: ()=>setIsActive(false),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_icons_bs__WEBPACK_IMPORTED_MODULE_2__.BsSpotify, {\n                        fontSize: \"1.2rem\"\n                    }, void 0, false, {\n                        fileName: \"/Users/joshualevy/Desktop/soundcheck/pages/index.js\",\n                        lineNumber: 58,\n                        columnNumber: 9\n                    }, undefined),\n                    \"CONNECT WITH SPOTIFY\"\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/joshualevy/Desktop/soundcheck/pages/index.js\",\n                lineNumber: 38,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: data?.name\n            }, void 0, false, {\n                fileName: \"/Users/joshualevy/Desktop/soundcheck/pages/index.js\",\n                lineNumber: 62,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/joshualevy/Desktop/soundcheck/pages/index.js\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE0QztBQUNEO0FBRTNDLE1BQU1HLE9BQU8sSUFBTTtJQUNqQixNQUFNLENBQUNDLFdBQVdDLGFBQWEsR0FBR0wsK0NBQVFBLENBQUMsS0FBSztJQUNoRCxNQUFNLENBQUNNLFVBQVVDLFlBQVksR0FBR1AsK0NBQVFBLENBQUMsS0FBSztJQUM5QyxNQUFNLENBQUNRLE1BQU1DLFFBQVEsR0FBR1QsK0NBQVFBLENBQUMsSUFBSTtJQUVyQ0MsZ0RBQVNBLENBQUMsSUFBTTtRQUNkLE1BQU1TLFlBQVksVUFBWTtZQUM1QixNQUFNQyxNQUFNLE1BQU1DLE1BQU07WUFDeEIsTUFBTUosT0FBTyxNQUFNRyxJQUFJRSxJQUFJO1lBQzNCSixRQUFRRDtRQUNWO1FBQ0FFO0lBQ0YsR0FBRyxFQUFFO0lBRUwscUJBQ0UsOERBQUNJO1FBQ0NDLE9BQU87WUFDTEMsU0FBUztZQUNUQyxlQUFlO1lBQ2ZDLFlBQVk7WUFDWkMsZ0JBQWdCO1lBQ2hCQyxRQUFRO1lBQ1JDLGlCQUFpQjtZQUNqQkMsT0FBTztRQUNUOzswQkFFQSw4REFBQ0M7Z0JBQ0NSLE9BQU87b0JBQ0xTLFVBQVU7b0JBQ1ZDLGNBQWM7Z0JBQ2hCOzBCQUNEOzs7Ozs7MEJBR0QsOERBQUNDO2dCQUNDWCxPQUFPO29CQUNMTSxpQkFBaUI7b0JBQ2pCTSxTQUFTO29CQUNUQyxjQUFjO29CQUNkWixTQUFTO29CQUNURSxZQUFZO29CQUNaVyxLQUFLO29CQUNMQyxRQUFRO29CQUNSQyxXQUFXO29CQUNYQyxRQUFRO29CQUNSQyxTQUFTN0IsWUFBWSxNQUFNLENBQUM7b0JBQzVCOEIsWUFBWTtvQkFDWkMsV0FBVzdCLFdBQVcsZ0JBQWdCLFVBQVU7Z0JBQ2xEO2dCQUNBOEIsY0FBYyxJQUFNL0IsYUFBYSxJQUFJO2dCQUNyQ2dDLGNBQWMsSUFBTWhDLGFBQWEsS0FBSztnQkFDdENpQyxhQUFhLElBQU0vQixZQUFZLElBQUk7Z0JBQ25DZ0MsV0FBVyxJQUFNaEMsWUFBWSxLQUFLOztrQ0FFbEMsOERBQUNMLHFEQUFTQTt3QkFBQ3NCLFVBQVM7Ozs7OztvQkFBVzs7Ozs7OzswQkFJakMsOERBQUNEOzBCQUFJZixNQUFNZ0M7Ozs7Ozs7Ozs7OztBQUdqQjtBQUVBLGlFQUFlckMsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NvdW5kY2hlY2svLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJzU3BvdGlmeSB9IGZyb20gXCJyZWFjdC1pY29ucy9ic1wiO1xuXG5jb25zdCBIb21lID0gKCkgPT4ge1xuICBjb25zdCBbaXNIb3ZlcmVkLCBzZXRJc0hvdmVyZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNBY3RpdmUsIHNldElzQWN0aXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RhdGEsIHNldERhdGFdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBmZXRjaERhdGEgPSBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvaGVsbG9cIik7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIHNldERhdGEoZGF0YSk7XG4gICAgfTtcbiAgICBmZXRjaERhdGEoKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxuICAgICAgICBoZWlnaHQ6IFwiMTAwdmhcIixcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMwMDBcIixcbiAgICAgICAgY29sb3I6IFwiI2ZmZlwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8aDFcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBmb250U2l6ZTogXCIzcmVtXCIsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjFyZW1cIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgU291bmRjaGVjayFcbiAgICAgIDwvaDE+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcIiMxREI5NTRcIixcbiAgICAgICAgICBwYWRkaW5nOiBcIjAuNXJlbSAxcmVtXCIsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjFyZW1cIixcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGdhcDogXCIwLjVyZW1cIixcbiAgICAgICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgICAgIG1hcmdpblRvcDogXCIwLjFyZW1cIixcbiAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgIG9wYWNpdHk6IGlzSG92ZXJlZCA/IDAuOSA6IDEsXG4gICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMC4xcyBlYXNlLWluLW91dFwiLFxuICAgICAgICAgIHRyYW5zZm9ybTogaXNBY3RpdmUgPyBcInNjYWxlKDAuOTkpXCIgOiBcInNjYWxlKDEpXCIsXG4gICAgICAgIH19XG4gICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0SXNIb3ZlcmVkKHRydWUpfVxuICAgICAgICBvbk1vdXNlTGVhdmU9eygpID0+IHNldElzSG92ZXJlZChmYWxzZSl9XG4gICAgICAgIG9uTW91c2VEb3duPXsoKSA9PiBzZXRJc0FjdGl2ZSh0cnVlKX1cbiAgICAgICAgb25Nb3VzZVVwPXsoKSA9PiBzZXRJc0FjdGl2ZShmYWxzZSl9XG4gICAgICA+XG4gICAgICAgIDxCc1Nwb3RpZnkgZm9udFNpemU9XCIxLjJyZW1cIiAvPlxuICAgICAgICBDT05ORUNUIFdJVEggU1BPVElGWVxuICAgICAgPC9idXR0b24+XG5cbiAgICAgIDxoMT57ZGF0YT8ubmFtZX08L2gxPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSG9tZTtcbiJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIkJzU3BvdGlmeSIsIkhvbWUiLCJpc0hvdmVyZWQiLCJzZXRJc0hvdmVyZWQiLCJpc0FjdGl2ZSIsInNldElzQWN0aXZlIiwiZGF0YSIsInNldERhdGEiLCJmZXRjaERhdGEiLCJyZXMiLCJmZXRjaCIsImpzb24iLCJkaXYiLCJzdHlsZSIsImRpc3BsYXkiLCJmbGV4RGlyZWN0aW9uIiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwiaGVpZ2h0IiwiYmFja2dyb3VuZENvbG9yIiwiY29sb3IiLCJoMSIsImZvbnRTaXplIiwibWFyZ2luQm90dG9tIiwiYnV0dG9uIiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsImdhcCIsImJvcmRlciIsIm1hcmdpblRvcCIsImN1cnNvciIsIm9wYWNpdHkiLCJ0cmFuc2l0aW9uIiwidHJhbnNmb3JtIiwib25Nb3VzZUVudGVyIiwib25Nb3VzZUxlYXZlIiwib25Nb3VzZURvd24iLCJvbk1vdXNlVXAiLCJuYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-icons/bs":
/*!*********************************!*\
  !*** external "react-icons/bs" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("react-icons/bs");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();