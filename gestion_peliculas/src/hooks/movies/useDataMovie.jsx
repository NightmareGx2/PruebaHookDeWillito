// useDataMovie.js (corregido)
import { useCallback, useEffect, useRef } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useFetchMovies from "./useFetchMovies";

const useDataMovie = (methods) => {
  const { getMovieById, getMovies, loading } = useFetchMovies();
  const { id } = useParams();
  const navigate = useNavigate();
  const isFirstLoad = useRef(true);

  // Destructuración segura
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors } = { errors: {} },
  } = methods || {};

  // Función para manejar peticiones con retry
  const fetchWithRetry = async (fetchUrl, options, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(fetchUrl, {
          ...options,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
          }
        });

        if (response.status === 429) {
          const waitTime = Math.pow(2, i) * 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        return response;
      } catch (error) {
        if (i === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  };

  const saveMovieForm = async (dataForm) => {
    try {
      const response = await fetchWithRetry(url, {
        method: "POST",
        body: JSON.stringify(dataForm),
      });

      if (!response.ok) {
        toast.error("Failed to add movie");
        throw new Error("Failed to add movie");
      }
      
      toast.success("Movie saved successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error sending:", error);
      if (error.message.includes('429')) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else {
        toast.error("Error saving movie");
      }
    } finally {
      if (reset) reset();
      setTimeout(() => getMovies(), 1000);
    }
  };

  const editMovie = async (dataForm) => {
    try {
      const response = await fetchWithRetry(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify(dataForm),
      });

      if (!response.ok) {
        toast.error("Failed to update movie");
        throw new Error("Failed to update movie");
      }
      
      toast.success("Movie updated successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error updating movie:", error);
      if (error.message.includes('429')) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else {
        toast.error("Failed to update movie");
      }
    } finally {
      if (reset) reset();
      setTimeout(() => getMovies(), 1000);
    }
  };

  const handleMovieAction = async (dataForm) => {
    if (loading) {
      toast.error("Please wait, operation in progress");
      return;
    }

    if (id) {
      await editMovie(dataForm);
    } else {
      await saveMovieForm(dataForm);
    }
  };

  const handleUpdateMovie = (movieId) => {
    navigate(`/users/${movieId}`); // Corregido: usar /users en lugar de /movies
  };

  // Cargar película solo la primera vez o cuando cambie el id
  const loadMovie = useCallback(async () => {
    if (!id || loading) return;
    
    const movie = await getMovieById(id);
    if (movie && reset) {
      reset({
        pelicula: movie?.pelicula || "",
        genero: movie?.genero || "",
        estreno: movie?.estreno || "",
        calificacion: movie?.calificacion || "",
      });
    }
  }, [id, getMovieById, reset, loading]);

  useEffect(() => {
    if (id && isFirstLoad.current) {
      loadMovie();
      isFirstLoad.current = false;
    }
    
    // Reset isFirstLoad cuando cambie el id
    if (!id) {
      isFirstLoad.current = true;
    }
  }, [id, loadMovie]);

  return {
    register,
    handleSubmit,
    errors,
    getMovieById,
    handleUpdateMovie,
    loading,
    loadMovie,
    onSubmit: handleMovieAction // AGREGADO: función onSubmit
  };
};

export default useDataMovie;