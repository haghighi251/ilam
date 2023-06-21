"use client";
import { Skeleton } from "@mui/material";

const NewProvinceLoading = () => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-sm justify-center items-center mt-3 md:mt-5 ">
      <Skeleton
        variant="rectangular"
        width={210}
        height={60}
      />
      <Skeleton
        variant="rounded"
        width={210}
        height={60}
      />
    </div>
  );
};

export default NewProvinceLoading;
