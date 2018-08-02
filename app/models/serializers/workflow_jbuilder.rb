module Serializers
  class WorkflowJbuilder
    def initialize(workflow)
      @workflow = workflow
    end

    def to_builder(builder)
      builder.set!(:id, @workflow.id.to_s)
      builder.set!(:name, @workflow.name)
      builder.set!(:workflow_ids, @workflow.workflow_ids)
      builder.set!(:event_messages, @workflow.event_messages) do |event_message|
        EventMessageJbuilder.serialize(event_message, builder)
      end
      builder
    end

    def self.serialize(workflow, builder = Jbuilder.new)
      new_builder = new(workflow)
      new_builder.to_builder(builder)
    end

    def self.serialize_collection(workflows, builder = Jbuilder.new)
      builder.array!(workflows) do |workflow|
        builder.set!(:id, workflow.id.to_s)
        builder.set!(:name, workflow.name)
        builder.set!(:workflow_ids, workflow.workflow_ids)
      end
      builder
    end
  end
end