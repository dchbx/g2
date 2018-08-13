class EventHeader
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :event_message, inverse_of: :event_headers

  field :name, type: String
  field :value
end