import { useFormContext } from "react-hook-form";
import { Button } from "./ui/button";
import { Description } from "@radix-ui/react-dialog";

const MenuCard = ({ menu, setHidden }: { menu: any; setHidden: any }) => {
  const { reset } = useFormContext();

  const editMenuHandler = () => {
    setHidden(false);
    reset({
      name: menu.name || "",
      description: menu.description || "",
      price: menu.price || "",
      imageUrl: null,
    });
  };
  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {menu.name}
        </h5>
        <div className="flex justify-around items-center gap-3">
          <Button className="bg-green-400 hover:bg-green-700">View</Button>

          <Button onClick={() => editMenuHandler()}>Edit</Button>

          <Button
            variant={"destructive"}
            // onClick={() => DeleteRestaurant(restaurant._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuCard;
