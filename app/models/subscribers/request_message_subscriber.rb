module Subscribers
  class RequestMessageSubscriber
    include Acapi::Notifiers

    def self.worker_specification
      Acapi::Amqp::WorkerSpecification.new(
        :queue_name => "request_message_subscriber",
        :kind => :topic,
        :message_category => :request,
        :routing_key => ["resource.#"]
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