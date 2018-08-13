require "rails_helper"

describe EventMessageKind, "given a wildcarded name to match" do
  let(:name_expression) { "*.application.glue.#" }

  subject { described_class.new(name_expression: name_expression) }

  it "matches info.application.glue.employer_event_reducer.gluedb" do
    expect(subject.match?("info.application.glue.employer_event_reducer.gluedb")).to be_truthy
  end
end