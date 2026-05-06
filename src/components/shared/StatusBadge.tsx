import { Clock, CheckCircle2, XCircle } from "lucide-react";

const config = {
  pending:  { label: "Pending",  cls: "bg-amber-50 text-amber-700 border-amber-200",   icon: Clock },
  approved: { label: "Approved", cls: "bg-emerald-50 text-emerald-700 border-emerald-200", icon: CheckCircle2 },
  rejected: { label: "Rejected", cls: "bg-rose-50 text-rose-700 border-rose-200",     icon: XCircle },
};

export default function StatusBadge({ status }: { status: string }) {
  const s = config[status as keyof typeof config] ?? config.pending;
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
      text-xs font-semibold border ${s.cls}`}>
      <Icon size={11} />
      {s.label}
    </span>
  );
}