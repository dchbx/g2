module Serializers
  class EventMessageJbuilder
    def initialize(event_message)
      @event_message = event_message
    end
  
    def to_builder(builder)
      builder.set!(:event_name, @event_message.event_name)
      builder.set!(:workflow_id, @event_message.workflow_id)
      if @event_message.event_headers.empty?
        builder.set!(:headers, {})
      else
        builder.set!(:headers) do
          @event_message.event_headers.each do |eh|
            builder.set!(eh.name, eh.value)
          end
        end
      end
      builder
    end

    def self.serialize(event_message, builder = ::Jbuilder.new)
      new_builder = new(event_message)
      new_builder.to_builder(builder)
    end
  end
end