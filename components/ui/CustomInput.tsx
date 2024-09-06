import { NumberFormatBase, useNumericFormat } from "react-number-format";

const persianNumeral = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const e2p = (num: string): string => {
  return num.replace(/\d/g, (d: string) => persianNumeral[Number(d)]);
};

const sp = (number: number): string => {
  const separatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = separatedNumber?.join("/") || "";
  return e2p(joinedNumber);
};

const CustomInput = (props: any) => {
  const { format, removeFormatting, isCharacterSame, ...rest } =
    useNumericFormat(props);

  const _format = (val: any) => {
    if (!format) return val;
    const _val = format(val);
    if (!_val) return val;

    const numericVal = parseFloat(_val.replace(/[^0-9]/g, ""));
    return sp(numericVal) || val;
  };

  const _removeFormatting = (val: any) => {
    if (!removeFormatting) return val;
    const _val = val.replace(new RegExp(persianNumeral.join("|"), "g"), ($1 : any) =>
      persianNumeral.indexOf($1)
    );

    return removeFormatting(_val);
  };

  const _isCharacterSame = (compareMeta: any) => {
    if (!isCharacterSame) return false;
    const isCharSame = isCharacterSame(compareMeta);
    const {
      formattedValue,
      currentValue,
      formattedValueIndex,
      currentValueIndex,
    } = compareMeta;
    const curChar = currentValue[currentValueIndex];
    const newChar = formattedValue[formattedValueIndex];
    const curPersianChar = persianNumeral[Number(curChar)] ?? curChar;
    const newPersianChar = persianNumeral[Number(newChar)] ?? newChar;

    return isCharSame || curPersianChar === newPersianChar;
  };

  return (
    <div>
      <NumberFormatBase
        format={_format}
        removeFormatting={_removeFormatting}
        isCharacterSame={_isCharacterSame}
        {...rest}
      />
    </div>
  );
};

export default CustomInput;
