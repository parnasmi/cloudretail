import { classed } from '@tw-classed/react';
import { ComponentProps } from 'react';

const StyledInput = classed(
  'input',
  'relative block w-full border-0 p-1.5 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-indigo-600 focus:ring-inset',
  {
    variants: {
      rounded: {
        none: '',
        top: 'rounded-t-md',
        bottom: 'rounded-b-md',
        all: 'rounded-md',
      },
    },
    defaultVariants: {
      rounded: 'all',
    },
  },
);

export interface InputProps extends ComponentProps<typeof StyledInput> {
  label?: string;
}

export const Input = ({ label, id, ...props }: InputProps) => {
  return <StyledInput id={id} aria-label={label} {...props} />;
};
