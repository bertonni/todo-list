interface ConfirmBoxProps {
  title?: string;
  buttonText?: string[];
  action: (value: boolean) => void;
  close: () => void;
}

export const ConfirmBox = ({
  title = "Você tem certeza?",
  buttonText = ["Não", "Sim"],
  action,
  close
}: ConfirmBoxProps) => {

  const handleClick = () => {
    close();
  }
  return (
    <div
      className="bg-black/40 inset-0 absolute h-screen w-full z-40
      flex justify-center"
    >
      <div className="bg-white rounded flex flex-col">
        {/* header */}
        <div>
          <h1 className="fond-medium text-gray-600">{title}</h1>
        </div>
        {/* body */}
        <div></div>
        {/* buttons */}
        <div className="flex items-center gap-2 justify-end">
          <button className="rounded-full px-6 font-medium bg-indigo-500
          text-white py-2" onClick={handleClick}>{buttonText[1]}</button>
        </div>
      </div>
    </div>
  );
};
