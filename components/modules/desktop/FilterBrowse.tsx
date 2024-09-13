"use client";

import CustomCheckBox from "@/components/ui/CustomCheckBox";
import CustomMegaMenuItem from "@/components/ui/CustomMegaMenuItem";
import CustomSwitchAvailable from "@/components/ui/CustomSwitchAvailable";
import CustomSwitchLocation from "@/components/ui/CustomSwitchLocation";

const FilterBrowse = () => {
  return (
    <div className="items-center mb-4 mt-2">
      <div className="items-center flex">
        <CustomSwitchLocation mobile={false} />
        <CustomCheckBox mobile={false} />
        <CustomSwitchAvailable mobile={false} />
        <CustomMegaMenuItem />
      </div>
    </div>
  );
};

export default FilterBrowse;
