import { EventMessage } from "./event_message"

export class Workflow {
  name : string
  workflow_ids : Array<string>
  event_messages: Array<EventMessage>
}