import { INavbarData } from "./helper";

export const navbarData: INavbarData[] = [
    {
        routeLink: 'dashboard',
        icon: 'fal fa-file-search',
        label: 'Fiches ECTS'
    },
    {
        routeLink: 'addFiche',
        icon: 'fal fa-files-medical',
        label: 'Ajout Fiche',
    },
    {
        routeLink: 'annee',
        icon: 'fal fa-poll-people',
        label: 'Année',
        items: [
            {
                routeLink: 'annee/preing1',
                label: 'PréIng1',
                icon: 'fal fa-poll-people',
            },
            {
                routeLink: 'annee/preing2',
                label: 'PréIng2'
            },
            {
                routeLink: 'annee/ing1',
                label: 'Ing1'
            },
            {
                routeLink: 'annee/ing2',
                label: 'Ing2'
            },
            {
                routeLink: 'annee/ing3',
                label: 'Ing3'
            }
        ]
    },
    {
        routeLink: 'parametres',
        icon: 'fal fa-cog',
        label: 'Paramètres',
    },
];