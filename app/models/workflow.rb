class Workflow
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :workflow_ids, type: Array, default: []

  index({:workflow_ids => 1})

  def self.existing_workflow(workflow_id)
    Workflow.where(workflow_ids: workflow_id).first
  end

  def self.build_workflow(workflow_id, name)
    Workflow.create!(workflow_ids: [workflow_id], name: name)
  end

  def self.find_or_build_workflow(workflow_id, name)
    found_workflow = existing_workflow(workflow_id)
    return found_workflow if found_workflow
    build_workflow(workflow_id, name)
  end

  def merge!(other_ids)
    self.update_attributes!(workflow_ids: (self.workflow_ids + other_ids))
    Workflow.where({workflow_ids: {"$in" => other_ids}, _id: {"$ne" => self._id}}).delete
  end

  def event_messages
    EventMessage.where(workflow_id: {"$in" => workflow_ids})
  end
end