<script setup lang="ts">
import { ref, onMounted } from "vue";
import "../assets/AutocompleteAddress.min.cjs";
import type { Country } from "../types/countries";
import type { AddressDetails, AddressDetailsResponse, AutocompleteMatch } from "../types/postcode";
import { countries } from "../types/countries";
import CountryModal from "./CountryModal.vue";

interface PostcodeNlInstance {
    setCountry: (country: string) => void;
    getDetails: (context: string, callback: (result: AddressDetailsResponse) => void) => void;
}

interface PostcodeNlStatic {
    AutocompleteAddress: new (
        element: HTMLInputElement,
        options: {
            context: string;
            language: string;
            buildingListMode: "paged" | "short";
            autocompleteUrl: string;
            addressDetailsUrl: string;
            minLength?: number;
            delay?: number;
            autoFocus?: boolean;
            autoSelectSingleAddress?: boolean;
            autoResize?: boolean;
            cssPrefix?: string;
            tags?: {
                "unvalidated-housenumber": string;
                "unvalidated-housenumber-addition": string;
            };
        }
    ) => PostcodeNlInstance;
}

declare const PostcodeNl: PostcodeNlStatic;

const props = withDefaults(
    defineProps<{
        autocompleteUrl: string;
        addressDetailsUrl: string;
        language?: string;
        minLength?: number;
        delay?: number;
        autoFocus?: boolean;
        autoSelectSingleAddress?: boolean;
        autoResize?: boolean;
        cssPrefix?: string;
        buildingListMode?: "paged" | "short";
        tags?: {
            "unvalidated-housenumber": string;
            "unvalidated-housenumber-addition": string;
        };
    }>(),
    {
        language: "en-GB",
        minLength: 1,
        delay: 300,
        autoFocus: true,
        autoSelectSingleAddress: true,
        autoResize: true,
        cssPrefix: "postcodenl-autocomplete-",
        buildingListMode: "paged",
        tags: () => ({
            "unvalidated-housenumber": "(unknown house number)",
            "unvalidated-housenumber-addition": "(unknown house number addition)",
        }),
    }
);

const emit = defineEmits<{
    "address-selected": [address: AddressDetails];
    "country-changed": [country: Country];
}>();

const getInitialCountry = (): Country => {
    const savedCountry = sessionStorage.getItem("selectedCountry");
    if (savedCountry) {
        const country = countries.find((c) => c.iso3 === savedCountry);
        if (country) return country;
    }
    return countries[0];
};

const selectedCountry = ref<Country>(getInitialCountry());
const isModalOpen = ref(false);
const autocomplete = ref<PostcodeNlInstance | null>(null);

const toggle = () => (isModalOpen.value = !isModalOpen.value);
const close = () => (isModalOpen.value = false);

const selectCountry = (country: Country) => {
    selectedCountry.value = country;
    sessionStorage.setItem("selectedCountry", country.iso3);
    if (autocomplete.value) {
        autocomplete.value.setCountry(country.iso3.toLowerCase());
    }
    emit("country-changed", country);
    close();
};

interface AutocompleteSelectEvent extends CustomEvent {
    detail: AutocompleteMatch;
}

onMounted(() => {
    const inputElement = document.querySelector<HTMLInputElement>(".input-autocomplete");
    if (!inputElement) return;

    autocomplete.value = new PostcodeNl.AutocompleteAddress(inputElement, {
        context: selectedCountry.value.iso3.toLowerCase(),
        language: props.language,
        buildingListMode: props.buildingListMode,
        autocompleteUrl: props.autocompleteUrl,
        addressDetailsUrl: props.addressDetailsUrl,
        minLength: props.minLength,
        delay: props.delay,
        autoFocus: props.autoFocus,
        autoSelectSingleAddress: props.autoSelectSingleAddress,
        autoResize: props.autoResize,
        cssPrefix: props.cssPrefix,
        tags: props.tags,
    });

    inputElement.addEventListener("autocomplete-select", ((e: AutocompleteSelectEvent) => {
        if (e.detail.precision === "Address") {
            autocomplete.value?.getDetails(e.detail.context, function (result: AddressDetailsResponse) {
                inputElement.blur();
                inputElement.style.backgroundColor = "#ccffcc";
                inputElement.style.borderColor = "#99ff99";
                emit("address-selected", result.address);
            });
        }
    }) as EventListener);
});
</script>

<template>
    <div class="address-lookup-container">
        <div class="relative flex items-center">
            <button @click="toggle" class="country-selector-button" type="button">
                <img :src="selectedCountry.flag" :alt="`${selectedCountry.name} flag`" class="country-flag" width="24" height="24" />
            </button>
            <input type="text" :placeholder="selectedCountry.placeholder" class="input-autocomplete address-input" />
        </div>
    </div>

    <CountryModal v-model:is-open="isModalOpen" :countries="countries" :selected-country="selectedCountry" @select="selectCountry" />
</template>

<style>
@import "../assets/autocomplete-address.css";
@import "../styles/address-lookup.css";
</style>
