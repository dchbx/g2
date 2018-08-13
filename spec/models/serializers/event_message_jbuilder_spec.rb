require "rails_helper"

describe Serializers::EventMessageJbuilder, "serializing an event_message" do
  let(:event_name) { "some event name"}
  let(:workflow_id) { "some workflow id" }
  let(:headers) do
    {
      "frank" => "some value",
      :steve => "some other value",
      5 => 2
    }
  end

  let(:event_headers) do
    eh = []
    headers.each_pair do |k,v|
      eh << EventHeader.new(
        name: k.to_s,
        value: v
      )
    end
    eh
  end

  let(:event_message) do
     instance_double(
       ::EventMessage,
       event_name: event_name,
       workflow_id: workflow_id,
       event_headers: event_headers
     )
  end

  subject { described_class.serialize(event_message).target! }

  it "serializes the event name" do
    data = JSON.parse(subject)
    expect(data["event_name"]).to eq event_name
  end

  it "serializes the workflow_id" do
    data = JSON.parse(subject)
    expect(data["workflow_id"]).to eq workflow_id
  end

  it "serializes the headers" do
    data = JSON.parse(subject)
    expect(data["headers"]).to eq headers.stringify_keys
  end
end