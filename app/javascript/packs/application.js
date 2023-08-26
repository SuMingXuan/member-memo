// Support component names relative to this directory:
import { Turbo } from "@hotwired/turbo-rails"
import jQuery from 'jquery'
import { notification } from 'antd'

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

Turbo.session.drive = true
Window.Turbo = Turbo
console.log('Window.Turbo = Turbo')

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


document.addEventListener("turbo:load", (event) => {
  // 因为 turbo_frame 的存在，在 load 之后需要重新加载框架，否则 react 不会运行
  ReactRailsUJS.mountComponents('#main_frame')
})