import { type LucideIcon } from "lucide-react";

interface FABProps {
  icon: LucideIcon;
  onClick: () => void;
}

export const FAB = ({ icon: Icon, onClick }: FABProps) => (
  <button
    className="size-14 flex items-center justify-center rounded-xl bg-rose-200 text-rose-800 shadow-md shadow-slate-900"
    onClick={onClick}
  >
    <Icon className="size-6" />
  </button>
);
