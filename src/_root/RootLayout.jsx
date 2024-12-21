import React from "react";
import { Outlet } from "react-router-dom";
import { PiPlantFill } from "react-icons/pi";
const RootLayout = () => {
  return (
    <section className="flex justify-center items-center flex-col  gap-10">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        <PiPlantFill color="#664DE5" size={40} /> Eden
      </h1>

      <Outlet />
    </section>
  );
};

export default RootLayout;
