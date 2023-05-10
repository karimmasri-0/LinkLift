import React, { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};
function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <div className="text-2xl absolute top-0 mr-12">{title}</div>
      <div className="mt-12">{children}</div>
    </>
  );
}

export default FormWrapper;
