export interface Option {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: number;
  type: 'single' | 'multiple';
  title: string;
  description?: string;
  options: Option[];
  dimension: string;
  required: boolean;
} 