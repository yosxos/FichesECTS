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
   
    },
    {
        routeLink: 'connexion',
        icon: 'fal fa-cog',
        label: 'Paramètres',
    },
    {
        routeLink: 'admin',
        icon: 'fa-lock',
        label: 'admin',
    }
];