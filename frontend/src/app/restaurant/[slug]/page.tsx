import RestaurantDetail from "@/components/RestaurantDetail";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const restaurantId = (await params).slug;
  console.log(restaurantId);

  return (
    <>
      <RestaurantDetail restaurantId={restaurantId} />
    </>
  );
};

export default page;
