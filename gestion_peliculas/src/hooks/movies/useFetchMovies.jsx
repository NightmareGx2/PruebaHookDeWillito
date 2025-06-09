// useFetchMovies.js (renombrado para mayor claridad)
import { useEffect, useState } from "react";
import { url } from "../../utils/apiUrl";
import { toast } from "react-hot-toast";

const useFetchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Función con retry y manejo de rate limiting
  const fetchWithRetry = async (fetchUrl, options = {}, maxRetries = 3) => {
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
          console.log(`Rate limited. Waiting ${waitTime}ms before retry ${i + 1}/${maxRetries}`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        
        if (i === maxRetries - 1) {
          throw error;
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  };

  const getMovies = async () => {
    if (loading) return;
    
    setLoading(true);
    try {
      const response = await fetchWithRetry(url);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      
      if (error.message.includes('429')) {
        toast.error("Too many requests. Please wait a moment and try again.");
      } else if (error.message.includes('CORS')) {
        toast.error("CORS error: Please check server configuration");
      } else {
        toast.error("Error fetching movies");
      }
    } finally {
      setLoading(false);
    }
  };

  const getMovieById = async (id) => {
    if (loading) return null;
    
    setLoading(true);
    try {
      const response = await fetchWithRetry(`${url}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching movie:", error);
      
      if (error.message.includes('429')) {
        toast.error("Rate limit exceeded. Please wait before trying again.");
      } else if (error.message.includes('CORS')) {
        toast.error("CORS error: Cannot fetch movie details");
      } else {
        toast.error("Failed to fetch movie");
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return {
    movies,
    getMovieById,
    getMovies,
    loading
  };
};

export default useFetchMovies;