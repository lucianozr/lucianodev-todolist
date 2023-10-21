import { useState } from "react";

type InputProps = {
  value: string;
  setValue: (value: string) => void;
};

const InputText = ({ value, setValue }: InputProps) => {
  return (
    <input
      className="border p-2 rounded border-black h-[44px]"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export { InputText };
