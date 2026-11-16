export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  {
    id: '1',
    value: 12000,
    suffix: '+',
    label: 'AI Professionals Trained'
  },
  {
    id: '2',
    value: 500,
    suffix: '+',
    label: 'Businesses Transformed'
  },
  {
    id: '3',
    value: 150,
    suffix: '+',
    label: 'AI Agents Deployed'
  },
  {
    id: '4',
    value: 35,
    suffix: '',
    label: 'Countries Reached'
  }
];
