import Sheet from "@mui/joy/Sheet";
import Radio from "@mui/joy/Radio";
import { currentOption } from "../atoms/Exam";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { color, styled } from "@mui/system";

export default function Option({ value, styles, isSolved, setIsSelected }) {
  const [selectedOption, setSelectedOption] = useRecoilState(currentOption);
  const isChecked = selectedOption == value ? true : false;

  return (
    <Sheet
      key={value}
      sx={{
        p: 2,
        borderRadius: "md",
        boxShadow: "sm",
      }}
      onClick={(e) => {
        if (!isSolved) {
          setIsSelected(true);
          setSelectedOption(value);
        }
      }}
    >
      <Radio
        label={value}
        overlay
        disabled={true}
        disableIcon
        value={value}
        checked={isChecked}
        slotProps={styles}
      />
    </Sheet>
  );
}
