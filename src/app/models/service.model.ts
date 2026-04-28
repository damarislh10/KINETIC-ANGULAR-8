export interface Capability {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  image?: string;
  category: string;
  categoryKey: string;
  title: string;
  shortDescription: string;
  description: string;
  badge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroTitleSuffix?: string;
  imageVariant: 'cyan' | 'navy' | 'violet' | 'teal' | 'orange' | 'green' | string;
  capabilities: Capability[];
  _panelId?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface Principle {
  id: string;
  title: string;
  description: string;
  tone: 'orange' | 'blue' | 'pink' | 'purple' | string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface AppData {
  services: Service[];
  testimonials: Testimonial[];
  principles: Principle[];
  team: TeamMember[];
}
