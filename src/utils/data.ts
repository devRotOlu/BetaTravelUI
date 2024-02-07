import React, { FormEvent, ReactNode, SetStateAction } from "react";

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
  inputType: "text" | "number" | "password" | "email" | "checkbox";
  inputValue: string | number;
  inputName: string;
  children?: React.ReactNode;
  inputLabel?: string;
  placeHolder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
};

export type DropDownProps = {
  children?: ReactNode;
  name: string;
  inputId: string;
  value: string;
  placeHolder?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dropDownClass?: string;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputClass?: string;
  isFocused?: boolean;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonClass?: string;
  buttonLabel?: string;
  children?: React.ReactNode;
  buttonType: "button" | "submit" | "reset";
  handleClick?: (event: React.MouseEvent) => void;
}

// export type guestCountType = { adults: number; children: number; infants: number };

export type roomGuestType = {
  adults: number;
  children: number;
  infants: number;
  isIntialRender: boolean;
}[];

export type flightDetailsType = {
  depart: string;
  dest: string;
  departDate: string;
  returnDate: string;
  flightClass: string;
};

export type FlightClassesProps = {
  defaultClass: string;
  setFlightClass: React.Dispatch<React.SetStateAction<flightDetailsType[]>>;
  flightIndex: number;
};

export type PaxButtonsProps = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<roomGuestType>>;
  minCount: number;
  guestType: string;
  roomIndex: number;
};

export type InputWrapperProps = {
  children: ReactNode;
  icon: string;
  label: string;
  styleClass?: string;
};

export type PaxProps = {
  children: ReactNode;
};
export type ChildPaxProps = {
  children: ReactNode;
  label: string;
  ageRange: string;
};
export type RoomBookingProps = {
  roomIndex: number;
};

export type ValuePiece = Date;
export type Value = [ValuePiece, ValuePiece];

export type BookingCalendarProps = {
  setDate: React.Dispatch<SetStateAction<Value>>;
  showDoubleView: boolean;
  value: Value;
  selectRange: boolean;
};

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type prevLocationtype = { cityName: string; displayName: string };

export type PossibleLocationsProps = {
  airPorts: airPortType[];
  previousLocations: prevLocationtype[];
  previousSearches: prevLocationtype[];
  children: ReactNode;
  searchTerm: string;
  handleClick: (display_name: string, cityName: string) => void;
  setLocation: React.Dispatch<SetStateAction<string>>;
};

export type roomType = { roomId: number }[];

type SearchPromptOwnProps<E extends React.ElementType> = {
  searchTerm: string;
  as?: E;
  isLoading: boolean;
  isError: boolean;
};

export type SearchPromptProps<E extends React.ElementType> = SearchPromptOwnProps<E> & Omit<React.ComponentProps<E>, keyof SearchPromptOwnProps<E>>;

type BookingOwnProps<E extends React.ElementType> = {
  as?: E;
};

export type BookingButtonsProps<E extends React.ElementType> = BookingOwnProps<E> & Omit<React.ComponentProps<E>, keyof BookingOwnProps<E>>;

export type BasicFlightFormElementsProps = {
  focusedElements: {
    destination: string;
    departure: string;
    calendar: string;
  };
  flightIndex: number;
};

type WrapperOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
};
export type WrapperProps<E extends React.ElementType> = WrapperOwnProps<E> & Omit<React.ComponentProps<E>, keyof WrapperOwnProps<E>>;

export type SeatBookingDropDownProps = {
  handleFocus: () => void;
  styles: {};
};

export type airPortType = {
  name: string;
  code: string;
  display_name: string;
  city_name: string;
};

export type signupDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type signinDetailsType = {
  email: string;
  password: string;
};

export type PasswordTriggerProps = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<SetStateAction<boolean>>;
};

export type AuthWrapperProps = {
  header: string;
  children: React.ReactNode;
  buttonLabel: string;
  handleFormSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

export type AuthFooterProps = {
  label: string;
  linkText: string;
  link: string;
};

export type NavbarOffCanvasProps = {
  children: [React.ReactNode, React.ReactNode, React.ReactNode];
  linkWidth: Number;
  direction: string;
};

export type LogoutBtnProps = {
  btnClass: string;
};
