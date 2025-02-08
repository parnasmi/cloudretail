import { classed } from '@tw-classed/react';
import { ComponentProps } from 'react';

const StyledForm = classed('form', 'mt-8 space-y-6');

export interface FormProps extends ComponentProps<typeof StyledForm> {}

export const Form = ({ children, ...props }: FormProps) => {
  return <StyledForm {...props}>{children}</StyledForm>;
};
