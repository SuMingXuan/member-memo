// Support component names relative to this directory:
import jQuery from 'jquery'
import { notification } from 'antd'
import { Turbo } from "@hotwired/turbo-rails"
Turbo.session.drive = true
Turbo.start()

window.Rails = require('@rails/ujs')
Rails.start()

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
        placement: 'top'
      })
    },
    error: (title, message) => {
      notification.destroy()
      notification.error({
        message: title,
        description: message,
        placement: 'top'
      })
    },
    info: (title, message) => {
      notification.destroy()
      notification.info({
        message: title,
        description: message,
        placement: 'top'
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
