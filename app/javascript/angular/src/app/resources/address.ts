import { Maybe } from "../../lib/maybe";

export interface Address {
  address_type: string;
  address_1: string;
  address_2: Maybe<string>;
  city: string;
  state: string;
  zip: string;
}

// Allows us to type-safely cast things that left off the
// optional address_2 property when an address comes as JSON.
export function readAddressJSON(json: string) : Address {
  var json_obj = JSON.parse(json);
  return(<Address> {address_2: null, ...json_obj});
}
