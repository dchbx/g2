class JsonChildWorkflowExtractor < ChildWorkflowExtractor

  field :access_path, type: Array

  def extract(headers, body)
    loaded_json = JSON.parse(body)
    current_value = loaded_json
    access_path.each do |ap|
      current_value = current_value[ap]
      break if current_value.blank?
    end
    current_value
  end
end