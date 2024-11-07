"use client";
import MenuPage from "@/components/Menus";
import { fetchMenus } from "@/utils/menuApi";

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

  const getMenus = async () => {
    console.log("get menu called");
    const { error, menus } = await fetchMenus(restaurantId);

    if (error) {
      console.error("Error fetching menus:", error);
    } else if (menus) {
      setMenus(menus);
    }
  };
  useEffect(() => {
    if (restaurantId) {
      getMenus();
    }
  }, []);

  return (
    <>
      <MenuPage menus={menus} restaurantId={restaurantId} getMenus={getMenus} />
    </>
  );
};

export default Menus;
