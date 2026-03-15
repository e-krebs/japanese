import { type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  selected?: boolean;
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ selected, children, onClick }: ButtonProps) => {
  return (
    <button
      className={twMerge("rounded-full size-12", selected && "bg-slate-400")}
      disabled={selected}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface ToolbarProps {
  children: ReactNode;
}

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className="fixed bottom-4 p-2 rounded-full flex items-center justify-center gap-1 bg-slate-500">
      {children}
    </div>
  );
};

Toolbar.Button = Button;
