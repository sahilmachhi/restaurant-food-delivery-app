import axios from "axios";

export const loginAPI = async (formData: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/api/Login`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    return { data: response.data.data.data };
  } catch (error) {
    return { error };
  }
};
