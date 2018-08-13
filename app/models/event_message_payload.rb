class EventMessagePayload
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :event_message

  index({:event_message_id => 1})
end