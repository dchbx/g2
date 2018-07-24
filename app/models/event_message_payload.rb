class EventMessagePayload
  include Mongoid::Document
  include Mongoid::Timestamps

  has_one :event_message, inverse_of: :event_message_payload

  field :body, type: String
end