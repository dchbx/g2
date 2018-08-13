export interface WorkflowIndexEntry {
  id : string
  name : string
  workflow_ids : Array<string>
}

export interface WorkflowIndexResource {
  workflows: Array<WorkflowIndexEntry>;
  total_pages : number;
  per_page : number;
  page : number;
  count : number;
  total : number;
}