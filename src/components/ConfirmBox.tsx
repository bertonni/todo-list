import { Variants, motion } from "framer-motion";

interface ConfirmBoxProps {
  title?: string;
  buttonText?: string[];
  action: (value: boolean) => void;
  close: () => void;
}

const variants: Variants = {
  hidden: { scale: 0, opacity: 0, transition: { duration: 0.2 } },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
};

export const ConfirmBox = ({
  title = "Você tem certeza?",
  buttonText = ["Não", "Sim"],
  action,
  close,
}: ConfirmBoxProps) => {
  const handleClick = (value: boolean) => {
    action(value);
    close();
  };
  return (
    <div
      className="bg-black/40 inset-0 fixed h-screen w-full z-40
      flex justify-center items-center px-4"
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white rounded-lg h-fit px-5 py-5 pr-2 pb-2 flex flex-col"
      >
        {/* header */}
        <div>
          <h1 className="font-semibold text-2xl text-gray-600">{title}</h1>
        </div>
        {/* body */}
        <div className="my-4">
          <h2 className="max-w-sm lg:max-w-md text-gray-500">
            Você está prestes a remover uma tarefa. Esta ação não pode ser
            desfeita. Deseja continuar?
          </h2>
        </div>
        {/* buttons */}
        <div className="flex items-center gap-2 justify-end">
          <button
            className="rounded-full px-6 font-medium text-indigo-500
              hover:bg-indigo-50 transition-all h-10"
            onClick={() => handleClick(false)}
          >
            {buttonText[0]}
          </button>
          <button
            className="rounded-full px-6 font-medium bg-indigo-500
          text-white h-10 hover:brightness-110"
            onClick={() => handleClick(true)}
          >
            {buttonText[1]}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
