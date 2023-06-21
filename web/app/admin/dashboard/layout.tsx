import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full bg-slate-100 h-screen">{children}</div>;
};

export default layout;
