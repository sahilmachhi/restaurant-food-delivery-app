import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export const Provider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        {/* navbar  */}
        <Header />

        {/* body */}
        <div className="container mx-auto flex-1 py-10  flex flex-col items-center relative">
          {children}
        </div>

        {/* footer  */}
        <Footer />
      </main>
    </>
  );
};
