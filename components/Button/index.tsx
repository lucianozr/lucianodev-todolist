interface IButton {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<IButton> = ({ children, onClick }) => {
  return (
    <button
      className="border-none h-[44px] flex items-center gap-2 p-2 rounded bg-black text-white sm:text-xl text-sm"
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export { Button };
