<script setup lang="ts">
import AddressLookup from "./components/AddressLookup.vue";
import type { AddressDetails } from "./types/postcode";

const handleAddressSelected = (address: AddressDetails) => {
    console.log(address);
};
</script>

<template>
    <AddressLookup
        :autocomplete-url="'http://localhost:8080/postcode/autocomplete'"
        :address-details-url="'http://localhost:8080/postcode/details'"
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
