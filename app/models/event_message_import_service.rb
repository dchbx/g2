class EventMessageImportService
  def initialize(emm)
    @event_message_matcher = emm
  end

  def import_message(event_name, props, payload)
    headers = props.headers || {}
    workflow_id = extract_workflow_id(headers)
    matched_message_type = @event_message_matcher.match_message(event_name)
    if matched_message_type
      flat_headers = flatten_headers(props)
      em_payload = EventMessagePayload.create!(
         body: payload     
      )
      new_message = EventMessage.create!({
         event_name: event_name,
         workflow_id: workflow_id,
         headers: flat_headers,
         event_message_payload: em_payload
       })
      workflow = Workflow.find_or_build_workflow(workflow_id, event_name)
      if matched_message_type.merges_workflows
         workflow.merge!(matched_message_type.extract_child_workflow_ids(flat_headers,payload))
      end
    end
  end

  protected

  def flatten_properties(props)
    headers = props.headers.to_hash || {}
    props_hash = props.to_hash.dup.stringify_keys
    props_hash.delete("headers")
    headers.merge(props_hash)
  end

  def extract_workflow_id(headers)
    if headers.has_key?("workflow_id")
      headers["workflow_id"]
    elsif headers.has_key?(:workflow_id)
      headers[:workflow_id]
    else
      nil
    end
  end
end