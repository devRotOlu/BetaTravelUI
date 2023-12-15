import React, { ReactNode } from "react";

export const flightTabLinks = [
  {
    link: "round-trip",
    linkName: "ROUND TRIP",
  },
  {
    link: "one-way",
    linkName: "ONE WAY",
  },
  {
    link: "multi-city",
    linkName: "MULTI CITY",
  },
];

export const homeTabLinks = [
  {
    icon: "material-symbols-light:flight",
    link: "flight",
    linkName: "FLIGHTS",
  },
  {
    icon: "material-symbols-light:home",
    link: "hotels",
    linkName: "HOTELS",
  },
  {
    icon: "clarity:car-solid",
    link: "cars",
    linkName: "CARS",
  },
  {
    icon: "basil:bag-solid",
    link: "bookings",
    linkName: "MANAGE BOOKINGS",
  },
];

export type TabProps = {
  children: React.ReactNode[];
} & Omit<React.ComponentProps<"ul">, "children">;

export type ListProps = {
  children: React.ReactNode;
};

export type FormInputProps = {
  inputClass?: string;
  inputType: "text" | "number" | "password" | "email";
  inputValue: string | number;
  inputName: string;
  children?: React.ReactNode;
  inputLabel?: string;
  placeHolder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type FormDatalistProps = {
  children: ReactNode;
  list: string;
  name: string;
  id: string;
  value: string;
  placeHolder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonClass?: string;
  buttonLabel: string;
  children?: React.ReactNode;
  buttonType: "button" | "submit" | "reset";
}

export type DataListWrapperProps = {
  children: ReactNode;
  icon: string;
  label: string;
  styleClass?: string;
};
