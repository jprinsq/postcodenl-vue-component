# PostcodeEU Address Lookup Component

A Vue 3 component for address lookup and validation using PostcodeEU API.

## Installation

```bash
npm install postcodenl-address-lookup@latest
```

## Usage

You can import the component in two ways:

```typescript
// Named import
import { AddressLookup } from "postcodenl-address-lookup";

// OR default import
import AddressLookup from "postcodenl-address-lookup";

// Don't forget to import the styles
import "postcodenl-address-lookup/style.css";
```

Full example:

```vue
<script setup lang="ts">
import { AddressLookup } from "postcodenl-address-lookup";
import type { AddressDetails } from "postcodenl-address-lookup";
import "postcodenl-address-lookup/style.css";

const handleAddressSelected = (address: AddressDetails) => {
    console.log(address);
};
</script>

<template>
    <AddressLookup
        :autocomplete-url="'http://your-api/autocomplete'"
        :address-details-url="'http://your-api/details'"
        language="nl-NL"
        :min-length="2"
        :delay="400"
        :auto-focus="true"
        :auto-select-single-address="true"
        :auto-resize="true"
        css-prefix="postcodenl-autocomplete-"
        building-list-mode="paged"
        :tags="{
            'unvalidated-housenumber': '(onbekend huisnummer)',
            'unvalidated-housenumber-addition': '(onbekende toevoeging)',
        }"
        @address-selected="handleAddressSelected"
    />
</template>
```

## Props

| Prop                      | Type                        | Default                      | Description                                 |
| ------------------------- | --------------------------- | ---------------------------- | ------------------------------------------- |
| `autocompleteUrl`         | `string`                    | Required                     | The URL of the autocomplete endpoint        |
| `addressDetailsUrl`       | `string`                    | Required                     | The URL of the address details endpoint     |
| `language`                | `string`                    | `"en-GB"`                    | The language of the address lookup          |
| `minLength`               | `number`                    | `1`                          | Minimum length before autocomplete triggers |
| `delay`                   | `number`                    | `300`                        | Delay between keystrokes and search         |
| `autoFocus`               | `boolean`                   | `true`                       | Auto-focus the input on mount               |
| `autoSelectSingleAddress` | `boolean`                   | `true`                       | Auto-select when only one result            |
| `autoResize`              | `boolean`                   | `true`                       | Auto-resize input to fit results            |
| `cssPrefix`               | `string`                    | `"postcodenl-autocomplete-"` | CSS class prefix                            |
| `buildingListMode`        | `"paged" \| "short"`        | `"paged"`                    | Building list display mode                  |
| `tags`                    | `{ [key: string]: string }` | See below                    | Custom tags for display                     |

### Default Tags

```typescript
{
    'unvalidated-housenumber': '(unknown house number)',
    'unvalidated-housenumber-addition': '(unknown house number addition)'
}
```

## Events

| Event              | Payload Type     | Description                         |
| ------------------ | ---------------- | ----------------------------------- |
| `address-selected` | `AddressDetails` | Emitted when an address is selected |
| `country-changed`  | `Country`        | Emitted when the country is changed |

## Types

The package exports the following TypeScript types:

```typescript
import type { AddressDetails, AutocompleteMatch, AutocompleteResponse, AddressDetailsResponse, Country } from "postcodenl-address-lookup";
```

### AddressDetails

```typescript
interface AddressDetails {
    mailLines: string[];
    street: string;
    houseNumber: string;
    houseNumberAddition?: string;
    postalCode: string;
    city: string;
    province?: string;
    country: string;
}
```

### Country

```typescript
interface Country {
    flag: string;
    placeholder: string;
    name: string;
    iso3: string;
}
```
