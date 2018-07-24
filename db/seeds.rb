# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

EventMessageKind.create!(
  name_expression: "*.events.#"
)

EventMessageKind.create!(
  name_expression: "*.application.gluedb.#"
)

EventMessageKind.create!(
  name_expression: "info.application.gluedb.policies.enrollment_action_determined",
  merges_workflows: true,
  child_workflow_extractor: JsonChildWorkflowExtractor.new(
    access_path: ["event_workflow_ids"]
  )
)