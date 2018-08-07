module Api
  class WorkflowsController < ApplicationController
    def index
      @workflows = Resources::WorkflowsIndex.new(page: params[:page].to_i)
      render json: @workflows.serialize, status: 200
    end

    def show
      @workflow = Workflow.find(params[:id])
      render json: ::Serializers::WorkflowJbuilder.serialize(@workflow).target!, status: 200
    end
  end
end
