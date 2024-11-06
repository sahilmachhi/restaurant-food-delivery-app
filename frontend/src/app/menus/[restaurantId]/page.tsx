"use client";
import MenuPage from "@/components/Menus";
import axios from "axios";
import { use, useEffect, useState } from "react";

interface urlProp {
  params: Promise<{
    restaurantId: string;
  }>;
}

const Menus = (props: urlProp) => {
  const params = use(props.params);
  const restaurantId: string = params.restaurantId;
  const [menus, setMenus] = useState([]);

  const fetchMenus = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menu/get_menus/${restaurantId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const menus = res.data.menus;
        console.log(menus);
        setMenus(menus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return (
    <>
      <MenuPage menus={menus} setMenus={setMenus} />
    </>
  );
};

export default Menus;
