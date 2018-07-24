class EventMessage
  include Mongoid::Document
  include Mongoid::Timestamps

  field :event_name, type: String
  field :workflow_id, type: String
  field :headers, type: Hash

  belongs_to :event_message_payload
end