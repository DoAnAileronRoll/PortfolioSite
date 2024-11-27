import React, { ReactNode } from "react";

interface AlertProps {
  children: ReactNode;
  onClick: () => void;
}

const Alert = ({ children, onClick  }: AlertProps) => {
  return (
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      {children}
      <button
        onClick={onClick}
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Alert;
