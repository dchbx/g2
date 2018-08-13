class EventMessageMatcherService
  def initialize
    load_criteria
  end

  def load_criteria
    @exact_criteria = {}
    @pattern_criteria = []
    EventMessageKind.all.each do |emk|
      if emk.exact_match?
        @exact_criteria[emk.name_expression] = emk
      else
        @pattern_criteria << emk
      end
    end
    @pattern_criteria = @pattern_criteria.sort_by(&:matching_precision).reverse
  end

  def match_message(event_name)
    exact_match = @exact_criteria[event_name]
    return exact_match if exact_match
    @pattern_criteria.detect do |pc|
      pc.match?(event_name)
    end
  end
end