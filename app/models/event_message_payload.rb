class EventMessagePayload
  include Mongoid::Document
  include Mongoid::Timestamps

  field :body, type: String

  belongs_to :event_message
end