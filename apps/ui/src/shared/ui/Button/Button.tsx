import { classed } from '@tw-classed/react';

export const Button = classed('button', 'rounded-md p-4', {
  variants: {
    color: {
      blue: 'bg-blue-500 p-10 font-bold text-white',
      primary: 'bg-indigo-500 text-white',
    },
  },
  defaultVariants: {
    color: 'blue',
  },
});
