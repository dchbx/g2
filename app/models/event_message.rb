class EventMessage
  include Mongoid::Document
  include Mongoid::Timestamps

  field :event_name, type: String
  field :workflow_id, type: String
  
  embeds_many :event_headers

  has_one :event_message_payload, inverse_of: :event_message_payload
  index({:workflow_id => 1})
  index({"event_headers.name" => 1})
  index({"event_headers.value" => 1})
  index({"event_headers.name" => 1, "event_headers.value" => 1})
end