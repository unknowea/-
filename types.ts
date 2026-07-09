
export type Language = 'Amharic' | 'Geez' | 'Tigrinya' | 'English' | 'AfaanOromo';

export interface Category {
  id: string;
  title: Record<Language, string>;
  icon?: string;
}

export interface ContentItem {
  id: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl?: string;
  language: Language;
}

export interface AppState {
  language: Language;
  fontSize: number;
  darkMode: boolean;
}
