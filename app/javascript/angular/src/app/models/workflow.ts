import { EventMessage } from "./event_message"

export interface Workflow {
  id: string
  name : string
  workflow_ids : Array<string>
  event_messages : Array<EventMessage>
}