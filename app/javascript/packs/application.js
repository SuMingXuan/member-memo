// Support component names relative to this directory:
import jQuery from 'jquery'
import { notification } from 'antd'


var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);
window.$ = jQuery

window.App = $.extend({}, window.App, {
  message: {
    success: (title, message) => {
      notification.destroy()
      notification.success({
        message: title,
        description: message,
      })
    },
    error: (title, message) => {
      notification.destroy()
      notification.error({
        message: title,
        description: message,
      })
    },
    info: (title, message) => {
      notification.destroy()
      notification.info({
        message: title,
        description: message,
      })
    },
  },
  dig: (func, fallbackValue) => {
    try {
      const value = func()
      return value === null || value === undefined ? fallbackValue : value
    } catch (e) {
      return fallbackValue
    }
  },
})