import { X } from "react-feather";
import { motion, Variants } from "framer-motion";
import { useTodos } from "../contexts/TodosContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface AddTaskModalProps {
  close: () => void;
}

const variants: Variants = {
  hidden: { opacity: 0, scale: 0, transition: { duration: 0.2 } },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const schema = yup.object({
  title: yup.string().required("Field required"),
  description: yup.string().nullable(),
  status: yup.string().oneOf(["Done", "To do", "Canceled"]).required(),
  deadline: yup.date().typeError("Please, select a date").required(),
  createdAt: yup.string().required()
});
type FormData = yup.InferType<typeof schema>;

export const AddTaskModal = ({ close }: AddTaskModalProps) => {
  const { addTodo } = useTodos();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      status: "To do",
      createdAt: new Date().toLocaleDateString()
    }
  });

  const onSubmit = (data: FormData) => {
    addTodo(data);
    close();
  }

  return (
    <div
      className="bg-black/40 fixed h-screen w-full inset-0 px-4 flex
      justify-center items-center z-10"
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="bg-white rounded z-20 w-full max-w-sm"
      >
        <div
          className="flex items-center justify-between text-gray-600
          border-b border-gray-200 rounded-t h-12 bg-gray-100 font-medium
          text-lg pl-5"
        >
          <h1>Create Task</h1>
          <button className="p-2 rounded-full" onClick={close}>
            <X size={28} />
          </button>
        </div>
        <div className="h-fit px-5 py-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 pt-2 pb-2"
          >
            <div className="flex flex-col">
              <label htmlFor="title" className="font-medium text-gray-600">
                Title
              </label>
              <input
                id="title"
                className="h-10 rounded border px-3 focus:outline-1 text-gray-500"
                {...register("title")}
              />
              <p className="h-1 text-xs text-pink-500 text-right">{errors.title?.message}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="font-medium text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                className="rounded border px-3 py-2 focus:outline-1 text-gray-500 resize-none"
                {...register("description")}
              />
              <p className="h-1 text-xs text-pink-500 text-right">{errors.description?.message}</p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="deadline" className="font-medium text-gray-600">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                className="h-10 rounded border px-3 focus:outline-1 text-gray-500"
                {...register("deadline")}
              />
              <p className="h-1 text-xs text-pink-500 text-right">{errors.deadline?.message}</p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                className="rounded-full px-4 py-2 font-medium text-gray-500
                hover:bg-gray-50"
                onClick={close}
              >
                Close
              </button>
              <button
                type="submit"
                className="rounded-full px-6 py-2 font-medium bg-sky-600
                text-white hover:brightness-105"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
