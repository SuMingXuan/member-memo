// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.
// var componentRequireContext = require.context("components", true);
// var ReactRailsUJS = require("react_ujs");
// ReactRailsUJS.useContext(componentRequireContext);

// document.addEventListener("turbo:load", (event) => {
//   // 因为 turbo_frame 的存在，在 load 之后需要重新加载框架，否则 react 不会运行
//   ReactRailsUJS.mountComponents('#member')
//   ReactRailsUJS.mountComponents('#member_index')
//   ReactRailsUJS.mountComponents('#main_frame')
// })