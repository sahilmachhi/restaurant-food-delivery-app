"use client";
import { useState } from "react";
import AddMenuSection from "./AddMenuSection";
import MenuCard from "./MenuCard";
import { FormProvider, useForm } from "react-hook-form";
import { createMenu, updateMenu } from "@/utils/menuApi";

const MenuPage = ({
  menus,
  restaurantId,
  getMenus,
}: {
  menus: any;
  restaurantId: string;
  getMenus: any;
}) => {
  const [isHidden, setHidden] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const methods = useForm();
  const handleFormSubmit = async (form: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (form.imageUrl) {
      console.log("image is provided");
      formData.append("imageFile", form.imageUrl[0]);
    }
    if (form.id) {
      console.log("formid provided");
      const { data, error } = await updateMenu(formData, form.id);
      if (error) {
        console.log(error);
      }
      getMenus();
      setHidden(true);
      setLoading(false);
    } else {
      console.log("formid is not provided");
      const { data, error } = await createMenu(formData, restaurantId);
      if (error) {
        console.log(error);
      }
      getMenus();
      setHidden(true);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center gap-8">
        <FormProvider {...methods}>
          <div>
            {menus.length > 0 ? (
              menus.map((menu: any, index: number) => (
                <MenuCard
                  menu={menu}
                  key={index}
                  setHidden={setHidden}
                  restaurantId={restaurantId}
                  getMenus={getMenus}
                />
              ))
            ) : (
              <h1>no menus found please add new one</h1>
            )}
          </div>
          <div>
            <AddMenuSection
              isHidden={isHidden}
              setHidden={setHidden}
              handleFormSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        </FormProvider>
      </div>
    </>
  );
};

export default MenuPage;
