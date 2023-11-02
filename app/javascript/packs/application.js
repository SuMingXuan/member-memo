// Support component names relative to this directory:
import "@hotwired/turbo-rails"
import jQuery from 'jquery'
import { notification } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

Turbo.session.drive = true
// Turbo.session.drive = false
Window.Turbo = Turbo

Turbo.start()

// window.Rails = require('@rails/ujs')
// Rails.start()

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

document.addEventListener("turbo:frame-load", (event) => {
  // Turbo.visit 的时候需要用到
  ReactRailsUJS.mountComponents('#main_frame')
})

document.addEventListener("turbo:load", (event) => {
  // 浏览器默认行为需要用到
  ReactRailsUJS.mountComponents('#main_frame')
})

ReactRailsUJS.handleEvent('turbo:frame-load', ReactRailsUJS.handleMount)
ReactRailsUJS.handleEvent('turbo:frame-render', ReactRailsUJS.handleUnmount)

window.MobilePlatform = window.innerWidth < 1024

window.csrf_token = document.querySelector('meta[name=csrf-token]').getAttribute('content');
