import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const ButtonGroup = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center gap-0.5 *:first:rounded-l-[2.5rem] *:last:rounded-r-[2.5rem]">
    {children}
  </div>
);

interface ButtonProps {
  selected?: boolean;
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ selected, children, onClick }: ButtonProps) => (
  <button
    className={twMerge(
      "size-10 transition-all duration-75",
      selected ? "bg-rose-200 text-slate-800 rounded-full!" : "bg-rose-900 rounded-xl",
    )}
    disabled={selected}
    onClick={onClick}
  >
    {children}
  </button>
);

interface ToggleButtonProps {
  title: string;
  children: ReactNode;
  toggled: boolean;
  onToggle: () => void;
  className?: string;
}

const ToggleButton = ({ title, toggled, children, onToggle, className }: ToggleButtonProps) => (
  <button
    className={twMerge(
      "size-10 flex items-center justify-center p-2 transition-all duration-75 overflow-hidden",
      toggled ? "rounded-xl bg-rose-200 text-slate-800" : "rounded-full bg-rose-900",
      className,
    )}
    onClick={onToggle}
    title={title}
  >
    {children}
  </button>
);

interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar = ({ children }: ToolbarProps) => (
  <div className="fixed bottom-4 p-3 rounded-full flex items-center justify-center gap-2 bg-rose-800 shadow-md shadow-slate-900">
    {children}
  </div>
);

Toolbar.ButtonGroup = ButtonGroup;
Toolbar.Button = Button;
Toolbar.ToggleButton = ToggleButton;
