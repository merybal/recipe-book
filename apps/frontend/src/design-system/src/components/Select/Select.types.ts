import { IconName } from "../Icon";

export type OptionType = {
  value: string;
  label: string;
};

export type SelectProps = {
  className?: string;
  disabled?: boolean;
  error?: string;
  helper?: string;
  iconLeft?: IconName;
  id: string;
  inline?: boolean;
  label: string;
  options: OptionType[];
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  showLabel?: boolean;
  value: string;
  onChange?: (event: { target: { value: string } }) => void;
};
