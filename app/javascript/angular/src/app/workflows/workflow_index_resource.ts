export interface WorkflowIndexEntry {
  id : string
  name : string
  workflow_ids : Array<string>
}

export interface WorkflowIndexResource {
  workflows: Array<WorkflowIndexEntry>;
  count: number;
  total: number;
  page: number;
  per_page: number;
}