import nlFlag from "../assets/flags/nl.svg";
import beFlag from "../assets/flags/be.svg";
import deFlag from "../assets/flags/de.svg";
import dkFlag from "../assets/flags/dk.svg";
import frFlag from "../assets/flags/fr.svg";
import luFlag from "../assets/flags/lu.svg";
import noFlag from "../assets/flags/no.svg";
import esFlag from "../assets/flags/es.svg";
import chFlag from "../assets/flags/ch.svg";
import gbFlag from "../assets/flags/gb.svg";
import atFlag from "../assets/flags/at.svg";

export type Country = {
    flag: string;
    placeholder: string;
    name: string;
    iso3: string;
};

export const countries: Country[] = [
    {
        flag: nlFlag,
        placeholder: "Vul je adres in...",
        name: "Netherlands",
        iso3: "NLD",
    },
    {
        flag: beFlag,
        placeholder: "Geef uw adres in...",
        name: "Belgium",
        iso3: "BEL",
    },
    {
        flag: deFlag,
        placeholder: "Geben Sie Ihre Adresse ein...",
        name: "Germany",
        iso3: "DEU",
    },
    {
        flag: dkFlag,
        placeholder: "Indtast din adresse...",
        name: "Denmark",
        iso3: "DNK",
    },
    {
        flag: frFlag,
        placeholder: "Entrez votre adresse...",
        name: "France",
        iso3: "FRA",
    },
    {
        flag: luFlag,
        placeholder: "Geben Sie Ihre Adresse ein...",
        name: "Luxembourg",
        iso3: "LUX",
    },
    {
        flag: noFlag,
        placeholder: "Skriv inn adressen din...",
        name: "Norway",
        iso3: "NOR",
    },
    {
        flag: esFlag,
        placeholder: "Escribe tu dirección...",
        name: "Spain",
        iso3: "ESP",
    },
    {
        flag: chFlag,
        placeholder: "Geben Sie Ihre Adresse ein...",
        name: "Switzerland",
        iso3: "CHE",
    },
    {
        flag: gbFlag,
        placeholder: "Enter your address...",
        name: "United Kingdom",
        iso3: "GBR",
    },
    {
        flag: atFlag,
        placeholder: "Geben Sie Ihre Adresse ein...",
        name: "Austria",
        iso3: "AUT",
    },
];
