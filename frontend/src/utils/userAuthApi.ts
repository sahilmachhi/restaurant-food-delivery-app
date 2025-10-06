import axios from "axios";

export const loginAPI = async (formData: {
  username?: string;
  email?: string;
  password: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_NEXT_SERVER_URL}/user/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resData = response.data;
    console.log(resData)
    console.log(resData.tokens)
    if (resData.success) {
      const { accessToken, refreshToken } = resData.tokens;

      // Save tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // ✅ Keep your same response shape
      return {
        data: {
          user: resData.data,
          tokens: { accessToken, refreshToken },
          message: resData.message,
        },
        error: null,
      };
    } else {
      return {
        data: null,
        error: { message: resData.message || "Login failed" },
      };
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || "Something went wrong",
        details: error.message,
      },
    };
  }
};
