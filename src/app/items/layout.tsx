import { Suspense } from "react";

export default function ItemsLayout({
  list,
  children,
}: Readonly<{ list: React.ReactNode; children: React.ReactNode }>) {
  return (
    <div className="h-screen flex bg-surface-container">
      <div className="flex">
        <div className="bg-surface-container flex-1">{list}</div>
        <div className="bg-surface-container flex-1">{children}</div>
      </div>
    </div>
  );
}
