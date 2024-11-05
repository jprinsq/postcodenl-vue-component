export interface AutocompleteMatch {
    value: string;
    label: string;
    description: string;
    precision: "Address" | "Locality" | "Street" | "Building";
    context: string;
    highlights: [number, number][];
}

export interface AutocompleteResponse {
    newContext: string | null;
    matches: AutocompleteMatch[];
}

export interface AddressDetails {
    mailLines: string[];
    street: string;
    houseNumber: string;
    houseNumberAddition?: string;
    postalCode: string;
    city: string;
    province?: string;
    country: string;
}

export interface AddressDetailsResponse {
    address: AddressDetails;
}
