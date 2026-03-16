import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const ButtonGroup = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center justify-center gap-0.5 *:first:rounded-l-[2.5rem] *:first:rounded-r-2xl *:rounded-lg *:last:rounded-r-[2.5rem] *:last:rounded-l-2xl">
    {children}
  </div>
);

interface ButtonProps {
  selected?: boolean;
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const Button = ({ selected, children, onClick, className }: ButtonProps) => (
  <button
    className={twMerge(
      "size-10 flex items-center justify-center rounded-xl transition-[border-radius] duration-150",
      selected
        ? "color-vibrant:bg-rose-200 color-standard:bg-slate-200 text-slate-800 rounded-full!"
        : "color-vibrant:hover:bg-rose-900 color-standard:hover:bg-slate-700 active:color-vibrant:bg-rose-200 active:color-standard:bg-slate-200 active:text-slate-800",
      className,
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
      "size-10 rounded-full flex items-center justify-center p-2 transition-all duration-75 overflow-hidden",
      toggled
        ? "color-vibrant:bg-rose-200 color-standard:bg-slate-200 text-slate-800"
        : "color-vibrant:hover:bg-rose-900 color-standard:hover:bg-slate-700",
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
  color: "standard" | "vibrant";
}

const Toolbar = ({ children, color }: ToolbarProps) => (
  <div
    data-color={color}
    className={twMerge(
      "p-3 rounded-full flex items-center justify-center gap-2 shadow-md shadow-slate-900",
      "data-[color=vibrant]:bg-rose-800 data-[color=standard]:bg-slate-800",
    )}
  >
    {children}
  </div>
);

interface FloatingToolbarProps {
  children: ReactNode;
  position: "top" | "bottom";
}

export const FloatingToolbar = ({ children, position }: FloatingToolbarProps) => (
  <div
    className={twMerge(
      "fixed flex items-center justify-center",
      position === "top" ? "top-4" : "bottom-4",
    )}
  >
    {children}
  </div>
);

FloatingToolbar.Toolbar = Toolbar;
FloatingToolbar.ButtonGroup = ButtonGroup;
FloatingToolbar.Button = Button;
FloatingToolbar.ToggleButton = ToggleButton;
