import RestaurantManagePage from "@/components/RestaurantManagePage";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  return (
    <>
      <RestaurantManagePage slug={slug} />
    </>
  );
};

export default page;
