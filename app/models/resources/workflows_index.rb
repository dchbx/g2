module Resources
class WorkflowsIndex
  PER_PAGE_DEFAULT = 20

  include ActiveModel::Model

  attr_accessor :page, :per_page

  attr_reader :workflows, :count, :total
  
  def initialize(opts = {})
    @workflows = []
    @count = 0
    @total = 0
    @page = 1
    @per_page = PER_PAGE_DEFAULT
    super(opts)
    find_records
  end

  def serialize(builder = Jbuilder.new)
    builder.set!(:count, @count)
    builder.set!(:total, @total)
    builder.set!(:per_page, @per_page)
    builder.set!(:page, @page)
    builder.set!(:workflows, @workflows) do |workflow|
      ::Serializers::WorkflowJbuilder.serialize_collection_element(workflow, builder)
    end
    builder.target!
  end

  protected

  def find_records
    base_query = ::Workflow.order_by(created_at: 1)
    @total = base_query.count
    selection_query = base_query.skip(skip_offset).limit(@per_page)
    @workflows = selection_query
    @count = @workflows.count
  end

  def skip_offset
    page_offset = ((@page - 1) < 0) ? 0 : (@page - 1)
    page_offset * per_page
  end
end
end