module Api
class WorkflowsController < ApplicationController
  def index
    @workflows = Workflow.all.limit(20)
    render json: ::Serializers::WorkflowJbuilder.serialize_collection(@workflows).target!, status: 200
  end

  def show
    @workflow = Workflow.find(params[:id])
    render json: ::Serializers::WorkflowJbuilder.serialize(@workflow).target!, status: 200
  end
end
end