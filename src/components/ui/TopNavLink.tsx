import React from 'react';
import { NavLink } from 'react-router-dom';

interface TopNavLinkProps {
  label: string;
  to: string;
}

const TopNavLink: React.FC<TopNavLinkProps> = ({ label, to }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `px-4 py-6 text-sm font-bold transition-all relative ${
          isActive 
            ? 'text-slate-900 border-b-2 border-indigo-600' 
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        }`
      }
    >
      {label}
    </NavLink>
  );
};

export default TopNavLink;
