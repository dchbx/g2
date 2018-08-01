class EventMessage
  include Mongoid::Document
  include Mongoid::Timestamps

  field :event_name, type: String
  field :workflow_id, type: String
  field :headers, type: Hash

  has_one :event_message_payload, inverse_of: :event_message_payload
  index({:workflow_id => 1})
end