module Reports
  class CoverageSelectedDisposition
    EVENT_NAME = "info.events.hbx_enrollment.coverage_selected"

    DUPLICATE_EVENT = "info.application.gluedb.enrollment_event_batch_handler.event_already_processed"
    DECISION_MADE_EVENT = "info.application.gluedb.policies.enrollment_action_determined"

    attr_reader :total, :already_processed, :action_determined, :stalled

    def initialize
      @total = 0
      @already_processed = 0
      @action_determined = 0
      @stalled = 0
      perform_counts
    end

    def serialize(builder = Jbuilder.new)
      builder.set!(:total, @total)
      builder.set!(:already_processed, @already_processed)
      builder.set!(:action_determined, @action_determined)
      builder.set!(:stalled, @stalled)
      builder.target!
    end

    protected

    def categorize(record)
      workflow = Workflow.where(:workflow_ids => record.workflow_id).first
      e_names = workflow.event_messages.pluck(:event_name)
      if e_names.include?(DECISION_MADE_EVENT)
        @action_determined = @action_determined + 1
      elsif e_names.include?(DUPLICATE_EVENT)
        @already_processed = @already_processed + 1
      else
        @stalled = @stalled + 1
      end
    end

    def perform_counts
      @total = EventMessage.where(:event_name => EVENT_NAME).count
      EventMessage.where(:event_name => EVENT_NAME).each do |em|
        categorize(em)
      end
    end
  end
end