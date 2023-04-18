interface TabNavigationProps {
  active: number;
  setActive: (value: number) => void;
}

export const TabNavigation = ({ active, setActive }: TabNavigationProps) => {
  return (
    <div
      className="w-fit rounded-lg bg-white my-4 flex items-center
      divide-x h-fit font-medium"
    >
      <span
        className={`px-4 py-2 cursor-pointer ${active === 1 ? 'bg-indigo-100' : "hover:bg-indigo-50"}
          min-w-[120px] rounded-l-lg text-center transition-all hover:bg-indigo-200`}
        onClick={() => setActive(1)}
      >
        A fazer
      </span>
      <span
        className={`px-4 py-2 cursor-pointer ${active === 2 ? 'bg-indigo-100' : "hover:bg-indigo-50"}
        min-w-[120px] text-center transition-all`}
        onClick={() => setActive(2)}
      >
        Realizadas
      </span>
      <span
        className={`px-4 py-2 cursor-pointer ${active === 3 ? 'bg-indigo-100' : "hover:bg-indigo-50"}
          min-w-[120px] rounded-r-lg text-center transition-all`}
        onClick={() => setActive(3)}
      >
        Canceladas
      </span>
    </div>
  );
};
