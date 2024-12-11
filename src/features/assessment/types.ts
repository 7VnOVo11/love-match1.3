export interface Option {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: number;
  type: 'single';
  title: string;
  description: string;
  dimension: string;
  required: boolean;
  options: Option[];
} 