import AddressLookupComponent from "./components/AddressLookup.vue";

// Named export
export { AddressLookupComponent as AddressLookup };

// Default export
export default AddressLookupComponent;

// Type exports
export type { Country } from "./types/countries";
export type { AutocompleteMatch, AutocompleteResponse, AddressDetails, AddressDetailsResponse } from "./types/postcode";
