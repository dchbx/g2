import { TestBed, async } from '@angular/core/testing';
import { Address, readAddressJSON } from "./address";

describe('Address', () => {
  it('should load an address with no address_2 specified', async(() => {
    const address_json = "{\"address_1\": \"address 1 value\", \"zip\": \"zip value\"\
		  ,\"state\": \"state value\", \"city\": \"city value\"}";
    const values = readAddressJSON(address_json) as Address;
    expect(values.address_2).toBeNull();
  }));
});
