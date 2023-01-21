import { Check } from "phosphor-react";

interface NewHabitForm {

}


export const NewHabitForm = ({ }: NewHabitForm) => {

    return(
      <form className="w-full flex flex-col mt-6">
        <label htmlFor="title" className="font-semibold leading-tight">
          Qual seu comprometimento?
        </label>
        <input
          type="text"
          id="title"
          placeholder="ex.: Execícios,dormir bem, etc..."
          autoFocus
          className="p-4 rounded-lg mt-3 bg-zinc-800 text-zinc-300 placeholder:text-zinc-500"
        />

        <label htmlFor="" className="font-semibold leading-tight mt-4">
          Qual a recorrência?
        </label>
        <button className="mt-6 rounded-lg p-4 gap-3 flex items-center font-semibold bg-green-700 justify-center transition-colors hover:bg-green-600">
          <Check size={20} weight="bold" />
          Confirmar
        </button>

      </form>
    );
}
