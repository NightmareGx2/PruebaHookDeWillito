import { Link } from "react-router-dom";
import Titulo from "../components/Titulo";
import Button from "../components/Button";
import useFetchMovies from "../hooks/movies/useFetchMovies"; // Corregido
import useMovieActions from "../hooks/movies/useMovieActions"; // Corregido
import { optionSelect } from "../utils/apiUrl";

const Home = () => {
  const { movies, getMovies } = useFetchMovies(); // Corregido: movies en lugar de users
  const { deleteMovie } = useMovieActions(getMovies); // Corregido

  const handleUpdateMovie = (movieId) => {
    // Navegar directamente usando window.location o usar navigate del hook
    window.location.href = `/users/${movieId}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/users"
        className="text-2xl font-bold text-gray-900 mb-4 bg-green-100 p-2 rounded w-full text-center hover:bg-green-200 transition-colors block mb-6"
      >
        Agregar Película
      </Link>

      <Titulo titulo="Películas Registradas" />
      <p className="mt-1 text-sm text-gray-600 mb-4">
        Lista de películas registradas.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-left text-sm">
            <tr>
              <th className="px-4 py-2 border-b">ID</th>
              <th className="px-4 py-2 border-b">Estreno</th>
              <th className="px-4 py-2 border-b">Género</th>
              <th className="px-4 py-2 border-b">Película</th>
              <th className="px-4 py-2 border-b">Calificación</th>
              <th className="px-4 py-2 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {movies?.map((movie) => ( // Corregido: movies en lugar de users, movie en lugar de user
              <tr
                key={movie.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{movie.id}</td>
                <td className="px-4 py-2">{movie.estreno}</td>
                <td className="px-4 py-2">
                  {optionSelect.find((opt) => opt.value === movie.genero)?.label || "sin asignar"}
                </td>
                <td className="px-4 py-2">{movie.pelicula}</td>
                <td className="px-4 py-2">{movie.calificacion}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button
                    text="Editar"
                    onClick={() => handleUpdateMovie(movie.id)}
                  />
                  <Button
                    text="Eliminar"
                    onClick={() => deleteMovie(movie.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;