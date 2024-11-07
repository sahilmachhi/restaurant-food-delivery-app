import axios from "axios";
export const fetchMenus = async (restaurantId: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu/get_menus/${restaurantId}`,
      {
        withCredentials: true,
      }
    );
    return { menus: response.data.menus };
  } catch (error: any) {
    console.error("Error fetching menus from API:", error);
    return { error: error?.message || "An error occurred" }; // Return an object with error
  }
};

export const updateMenu = async (form: any, menuId: string | undefined) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu/edit_menu/${menuId}`,
      form,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { data: response.data };
  } catch (error: any) {
    return { error: error };
  }
};

export const createMenu = async (
  form: any,
  restaurantId: string | undefined
) => {
  try {
    console.log(form);
    const data = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu/add_menu/${restaurantId}`,
      form,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return { data: data.data };
  } catch (error: any) {
    console.log(error);
    return { error: error };
  }
};

export const deleteMenu = async (
  restaurantId: string | undefined,
  menuId: string | undefined
): Promise<{ data: any } | undefined> => {
  try {
    const data = await axios.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu/delete_menu/${restaurantId}/${menuId}`,
      {
        withCredentials: true,
      }
    );

    return { data };
  } catch (error) {
    console.log(error);
  }
};
