import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useMovieActions = (getMovies) => {
  const fetchWithRetry = async (fetchUrl, options, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(fetchUrl, {
          ...options,
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
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

  const deleteMovie = async (id) => {
    try {
      const response = await fetchWithRetry(`${url}/${id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      
      toast.success("Movie deleted successfully");
      setTimeout(() => getMovies(), 1000);
    } catch (error) {
      console.error("Error deleting movie:", error);
      if (error.message.includes('429')) {
        toast.error("Rate limit exceeded. Please try again later.");
      } else {
        toast.error("Failed to delete movie");
      }
    }
  };

  return {
    deleteMovie,
  };
};

export default useMovieActions;

