import { classed } from '@tw-classed/react';
import { ComponentProps } from 'react';

const StyledLabel = classed(
  'label',
  'block text-sm font-medium text-gray-700',
  {
    variants: {
      srOnly: {
        true: 'sr-only',
        false: '',
      },
    },
    defaultVariants: {
      srOnly: false,
    },
  },
);

export interface LabelProps extends ComponentProps<typeof StyledLabel> {
  htmlFor?: string;
}

export const Label = ({ children, ...props }: LabelProps) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};
