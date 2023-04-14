import { useTodos } from "../contexts/TodosContext";

export const Options = () => {
  return (
    <div>
      <h1 className="font-medium text-2xl my-4">Opções</h1>
      <div className="rounded bg-white shadow text-gray-600 px-3">
        <div className="py-4 flex flex-col">
          <p className="text-gray-500">Tela de opções.</p>
        </div>
      </div>
    </div>
  );
};
