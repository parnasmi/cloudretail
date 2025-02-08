import { classed } from '@tw-classed/react';
import { ComponentProps } from 'react';

const StyledLabel = classed('label', 'block text-sm font-medium text-gray-700');

export interface LabelProps extends ComponentProps<typeof StyledLabel> {
  text?: string;
  srOnly?: boolean;
}

export const Label = ({ children, text, srOnly, ...props }: LabelProps) => {
  return (
    <StyledLabel {...props}>
      {text && (
        <span className={`mb-1 block ${srOnly ? 'sr-only' : ''}`}>{text}</span>
      )}
      {children}
    </StyledLabel>
  );
};
