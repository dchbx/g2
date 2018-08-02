class EventMessageKind
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name_expression, type: String
  field :merges_workflows, type: Boolean, default: false

  embeds_one :child_workflow_extractor

  def exact_match?
    return false if name_expression.include?("*")
    return false if name_expression.include?("#")
    true
  end

  def matching_precision
    @matching_precision ||= name_expression.split(".").length
  end

  def extract_child_workflow_ids(headers, body)
    child_workflow_extractor.extract(headers, body)
  end

  def match?(event_name)
    return false if event_name.blank?
    if exact_match?
      return (event_name == name_expression)
    end
    event_list = event_name.split(".")
    match_list = name_expression.split(".")
    return false if (event_list.length < match_list.length)
    match_result = :match
    event_list.each_with_index do |event_part, idx|
      case match_part(event_part, match_list[idx])
      when :match_complete
        match_result = :match
        break
      when :fail
        match_result = :fail
        break
      else
        match_result = :match
      end
    end
    match_result == :match
  end

  protected

  def match_part(value, expression)
    return :fail if expression.blank?
    return :match_complete if (expression == "#")
    return :continue if (expression == "*")
    value == expression
  end
end