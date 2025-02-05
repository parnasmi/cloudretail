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
  text?: string;
}

export const Label = ({ children, text, ...props }: LabelProps) => {
  return (
    <StyledLabel {...props}>
      {text && !props.srOnly && <span className="mb-1 block">{text}</span>}
      {children}
    </StyledLabel>
  );
};
