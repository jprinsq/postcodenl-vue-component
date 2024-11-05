<script setup lang="ts">
import type { Country } from "../types/countries";

const props = defineProps<{
    isOpen: boolean;
    countries: Country[];
    selectedCountry: Country;
}>();

const emit = defineEmits<{
    "update:isOpen": [value: boolean];
    select: [country: Country];
}>();

const close = () => {
    emit("update:isOpen", false);
};

const select = (country: Country) => emit("select", country);
</script>

<template>
    <Transition enter-from-class="modal-enter-from" enter-to-class="modal-enter-to" leave-from-class="modal-leave-from" leave-to-class="modal-leave-to">
        <div v-if="isOpen" class="country-modal" @click="close">
            <div class="modal-content" @click.stop>
                <h2 class="modal-title">Select Country</h2>

                <div class="countries-grid">
                    <button v-for="country in props.countries" :key="country.name" @click="select(country)" class="country-button">
                        <img :src="country.flag" :alt="`${country.name} flag`" class="country-button-flag" width="32" height="32" />
                        <span class="country-button-name">{{ country.name }}</span>
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>
