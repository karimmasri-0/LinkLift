import React from "react";

function FromikStep({ children, title }) {
  return (
    <>
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="my-4">{children}</div>
    </>
  );
}

export default FromikStep;
