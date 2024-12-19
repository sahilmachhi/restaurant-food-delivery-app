import axios from "axios";

export const loginAPI = async (formData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/login`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data.data };
  } catch (error) {
    return { error };
  }
};
