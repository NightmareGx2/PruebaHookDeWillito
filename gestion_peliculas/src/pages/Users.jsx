import { Link, useParams, useNavigate } from "react-router-dom";
import Titulo from "../components/Titulo";
import InputText from "../components/InputText";
import SelectInput from "../components/SelectInput";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import useDataMovie from "../hooks/movies/useDataMovie"; // Corregido
import { optionSelect } from "../utils/apiUrl";

const Users = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const methods = useForm();
  const {
    register,
    handleSubmit,
    errors,
    onSubmit // Corregido: usar onSubmit del hook
  } = useDataMovie(methods); // Corregido: solo pasar methods

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/home"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-auto text-center hover:bg-green-200 transition-colors"
      >
        Volver al Dashboard
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)} // Corregido: usar handleSubmit del react-hook-form con onSubmit del hook
        className="border-b border-gray-900/10 pb-12 bg-white shadow-md rounded-lg flex flex-col p-4"
      >
        <Titulo titulo={id ? "Editar Película" : "Agregar Película"} />
        <p className="mt-1 text-sm text-gray-600">
          {id
            ? "Modifica los datos de la película."
            : "Completa el formulario para agregar una nueva película."}
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <InputText
            type="number"
            name="estreno"
            label="Estreno"
            placeholder="Ej: 2020"
            register={register}
            error={errors.estreno?.message}
          />

          <SelectInput
            name="genero"
            label="Género"
            options={optionSelect}
            register={register}
            error={errors.genero?.message}
          />

          <InputText
            type="text"
            name="pelicula"
            label="Película"
            placeholder="Ej: Avengers"
            register={register}
            error={errors.pelicula?.message}
          />

          <InputText
            type="number"
            name="calificacion"
            label="Calificación"
            placeholder="0 - 10"
            register={register}
            error={errors.calificacion?.message}
          />
        </div>

        <Button type="submit" text="Guardar Película" />
      </form>
    </div>
  );
};

export default Users;