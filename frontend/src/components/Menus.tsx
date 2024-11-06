"use client";
import { useState } from "react";
import AddMenuSection from "./AddMenuSection";
import MenuCard from "./MenuCard";
import { FormProvider, useForm } from "react-hook-form";

const MenuPage = ({ menus, setMenus }: { menus: any; setMenus: any }) => {
  const [isHidden, setHidden] = useState(true);
  const methods = useForm();
  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <FormProvider {...methods}>
          <div>
            {menus ? (
              menus.map((menu: any, index: number) => (
                <MenuCard menu={menu} key={index} setHidden={setHidden} />
              ))
            ) : (
              <h1>no menus found please add new one</h1>
            )}
          </div>
          <div>
            <AddMenuSection isHidden={isHidden} setHidden={setHidden} />
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default MenuPage;
