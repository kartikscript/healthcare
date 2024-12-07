import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./form/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface FormValues {
  [key: string]: any; // Replace `any` with specific types for stricter typing
}

interface CustomProps {
  control: Control<FormValues>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode; // Adjust field type if necessary
}

const RenderField = ({ props, field }: { props: CustomProps; field: any }) => {
  const { fieldType, iconSrc, iconAlt, dateFormat, showTimeSelect, renderSkeleton, children } =
    props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex border-2 border-gray-800 text-sm rounded-lg bg-gray-900">
          {iconSrc && (
            <Image src={iconSrc} alt={iconAlt || "icon"} width={20} height={20} className="ml-2" />
          )}
          <FormControl>
            <Input {...field} className="border-0" />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            international
            value={field.value}
            onChange={field.onChange}
            countryCallingCodeEditable
            className="border-2 border-gray-800 p-2 text-black rounded-lg bg-gray-900"
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex items-center gap-3 text-sm p-2 text-white bg-gray-900 border-2 border-gray-800 rounded-lg">
          <Calendar className="size-5" />
          <FormControl>
            <DatePicker
              className="bg-transparent"
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="px-2 py-5 border-gray-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 text-white border-gray-800">{children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea className="h-24 bg-gray-900 border-2 border-gray-800 remove-scrollbar" {...field} disabled={props.disabled} />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
            <label className="text-sm text-gray-300" htmlFor={props.name}>
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
