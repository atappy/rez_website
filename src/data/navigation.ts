export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return 'items' in entry;
}

export const navigation: NavEntry[] = [
  { label: 'Actualités', href: '/' },
  {
    label: 'Présentations',
    items: [
      { label: 'La Troupe', href: '/presentations/troupe' },
      { label: 'Ses membres', href: '/presentations/membres' },
    ],
  },
  {
    label: 'Productions',
    items: [
      { label: "Dissection d'une chute de neige", href: '/productions/dissection' },
      { label: 'XI', href: '/productions/xi' },
      { label: 'Les Physiciens', href: '/productions/physiciens' },
    ],
  },
    { label: 'Contact', href: '/contact' },
];
