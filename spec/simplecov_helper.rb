# frozen_string_literal: true

require 'simplecov'
require 'simplecov-lcov'

module SimpleCovHelper
  module_function

  def start!
    configure_profile
    configure_formatter

    SimpleCov.start 'rails'
  end

  def configure_formatter
    SimpleCov::Formatter::LcovFormatter.config.report_with_single_file = true

    SimpleCov.formatters = SimpleCov::Formatter::MultiFormatter.new([
                                                                      SimpleCov::Formatter::SimpleFormatter,
                                                                      SimpleCov::Formatter::HTMLFormatter,
                                                                      SimpleCov::Formatter::LcovFormatter
                                                                    ])
  end

  def configure_profile
    SimpleCov.configure do
      add_filter 'spec'
    end
  end
end
