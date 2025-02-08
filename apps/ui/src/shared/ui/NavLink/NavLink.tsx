import { NavLink as RouterNavLink, NavLinkProps } from 'react-router';
import { classed } from '@tw-classed/react';

const StyledNavLink = classed(
  RouterNavLink,
  'inline-block px-4 py-2 text-gray-600 transition-colors duration-200 hover:text-indigo-600',
  {
    variants: {
      active: {
        true: 'font-semibold text-indigo-600',
        false: 'text-gray-600',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const NavLink: React.FC<NavLinkProps> = ({ children, ...props }) => {
  return (
    <StyledNavLink
      {...props}
      className={({ isActive }) =>
        `${props.className || ''} ${isActive ? 'font-semibold text-indigo-600' : ''}`
      }
    >
      {children}
    </StyledNavLink>
  );
};
