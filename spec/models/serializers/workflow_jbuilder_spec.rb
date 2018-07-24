require "rails_helper"

describe Serializers::WorkflowJbuilder, "serializing a workflow" do
  let(:name) { "some workflow name"}
  let(:workflow_ids) { ["workflow_id_1", "workflow_id_2"] }
  let(:workflow) do
     instance_double(
       ::Workflow,
       name: name,
       workflow_ids: workflow_ids,
       event_messages: []
     )
  end

  subject { described_class.serialize(workflow).target! }

  it "serializes the name" do
    data = JSON.parse(subject)
    expect(data["name"]).to eq name
  end

  it "serializes the workflow_ids" do
    data = JSON.parse(subject)
    expect(data["workflow_ids"]).to eq workflow_ids
  end

  it "serializes the event messages" do
    data = JSON.parse(subject)
    expect(data["event_messages"]).to eq []
  end
end

describe Serializers::WorkflowJbuilder, "serializing a list of workflows" do
  let(:name) { "some workflow name"}
  let(:workflow_ids) { ["workflow_id_1", "workflow_id_2"] }
  let(:workflow) do
     instance_double(
       ::Workflow,
       name: name,
       workflow_ids: workflow_ids,
       event_messages: []
     )
  end

  subject { described_class.serialize_collection([workflow]).target! }

  it "serialized the correct number of elements" do
    data = JSON.parse(subject)
    expect(data.length).to eq 1
  end

  it "serializes the name" do
    data = JSON.parse(subject)
    expect(data.first["name"]).to eq name
  end

  it "serializes the workflow_ids" do
    data = JSON.parse(subject)
    expect(data.first["workflow_ids"]).to eq workflow_ids
  end

  it "serializes the event messages" do
    data = JSON.parse(subject)
    expect(data.first["event_messages"]).to eq []
  end
end