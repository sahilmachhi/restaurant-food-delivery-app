import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const PostRequest = (url: string) => {
  return useMutation({
    mutationFn: async (formData) => {
      return await axios.post(url, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    },
  });
};
