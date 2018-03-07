import { Maybe } from "../../lib/maybe";

export interface Address {
  address_type: string;
  address_1: string;
  address_2?: Maybe<string>;
  city: string;
  state: string;
  zip: string;
}
