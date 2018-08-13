module Subscribers
  class EventMessageSubscriber
    include Acapi::Notifiers

    def self.worker_specification
      Acapi::Amqp::WorkerSpecification.new(
        :queue_name => "event_message_subscriber",
        :kind => :topic,
        :routing_key => ["*.events.#", "*.application.gluedb.#","*.application.glue.#"]
      )
    end

    def event_message_import_service
      @event_message_import_service ||= EventMessageImportService.new(EventMessageMatcherService.new)
    end

    def work_with_params(body, delivery_info, properties)
      event_name = delivery_info.routing_key
      event_message_import_service.import_message(event_name, properties, body)
      :ack
    end
  end
end