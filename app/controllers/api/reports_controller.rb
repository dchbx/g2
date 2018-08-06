module Api
  class ReportsController < ApplicationController
    def coverage_selected_disposition
      @report = Reports::CoverageSelectedDisposition.new
      render json: @report.serialize, status: 200
    end
  end
end