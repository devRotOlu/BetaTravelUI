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
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dropDownClass?: string;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  inputClass?: string;
  isFocused?: boolean;
  readonly?: boolean;
  disabled?: boolean;
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

export type RoomGuestAction = {
  type: "initialize" | "add" | "remove" | "increaseGuests" | "decreaseGuests";
  roomIndex: number;
  guestType?: string;
  prevGuestCount?: number;
  guestMinCount?: number;
};

export type flightDetailsKeyType = "depart" | "dest" | "departDate";

export type locationType = {
  location: string;
  country: string;
  city: string;
  AirportCode: string;
};

export type flightDetailsType = {
  depart: locationType;
  dest: locationType;
  departDate: Date;
  returnDate: Date;
  flightClassIndex: number;
};

export type ClassListProps = {
  defaultClass: string;
  setFlightClass: React.Dispatch<React.SetStateAction<flightDetailsType[]>>;
  flightIndex: number;
};

export type PaxButtonsProps = {
  count: number;
  setCount: React.Dispatch<RoomGuestAction>;
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

export type Value = [Date, Date];

export type BookingCalendarProps = {
  setDate: (date1: Date, date2?: Date) => void;
  showDoubleView: boolean;
  selectRange: boolean;
};

export type bookingLegsType = {
  fromId: string;
  toId: string;
  date: string;
}[];

export type flightBookingParamsType = {
  leg?: bookingLegsType;
  adults: string;
  departDate?: string;
  returnDate?: string;
  fromId?: string;
  toId?: string;
  children?: string;
  cabinClass: string;
  currency_code: "NGN";
};

export type searchResultType = "oneWayFlight" | "roundTripFlight" | "multiCityFlight";
export type resultAirportType = {
  city: string;
  cityName: string;
  code: string;
  countryName: string;
  name: string;
};

export type flightTablePropType = {
  children: React.ReactNode;
  cellHeight: string;
  flightNamesCount: number;
};

export type carriersDataType = { name: string; logo: string }[];

type flightDataType = {
  segments: {
    arrivalAirport: resultAirportType;
    departureAirport: resultAirportType;
    departureTime: string;
    arrivalTime: string;
    legs: { arrivalAirport: resultAirportType; arrivalTime: string; carriersData: carriersDataType; flightInfo: { flightNumber: number }; departureAirport: resultAirportType; departureTime: string; totalTime: number; cabinClass: string }[];
    totalTime: number;
    travellerCheckedLuggage: {
      luggageAllowance: {
        maxPiece: number;
      };
    }[];
  }[];
  priceBreakdown: { total: { units: number } };
  token: string;
};

export type flightSearchDataType = flightDataType[];

export type flightListPropType = {
  flightData: flightSearchDataType;
  flightNames: string[];
};

export type flightCardPropType = flightDataType;

export type flightColumnsPropType = { flightData: flightSearchDataType; cellHeight: string; flightNames: string[]; flightLogos: string[] };
export type searchFlightDetailsType = {
  departDate: Date;
  departLocation: string;
  depart_code: string;
  destLocation: string;
  dest_code: string;
  adults: number;
  children: number;
  infants: number;
  returnDate?: Date;
  flightClass: string;
};

export type flightSearchDetailsProps = {
  departDate: string;
  departLocation: string;
  depart_code: string;
  destLocation: string;
  dest_code: string;
  adults: number;
  children: number;
  infants: number;
  returnDate?: string;
  flightClass: string;
};

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type prevLocationtype = { city: string; country: string; AirportCode: string };

export type PossibleLocationsProps = {
  airPorts: airPortType[];
  previousLocations: prevLocationtype[];
  previousSearches: prevLocationtype[];
  children: ReactNode;
  searchTerm: string;
  handleClick: (iata: string) => void;
  setLocation: (prop: flightDetailsKeyType, propValue: locationType) => void;
  locationType: flightDetailsKeyType;
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
  AirportCode: string;
  AirportName: string;
  city: string;
  country: string;
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

export type NavigationProps = {
  handleNavbar: () => void;
};

export type SearchResultNotificationProps = {
  departure: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengerCount: number;
  flightClass: string;
};

export type ReactPortalProps = {
  wrapperId: string;
  children: React.ReactNode;
};

export class Queue {
  items: { [key: number]: any } = {};
  front = 0;
  rear = 0;
  enqueue(value: any) {
    if (!this.rear) {
      this.front++;
      this.rear++;
    } else {
      this.rear++;
    }
    this.items[this.rear] = value;
  }
  dequeue() {
    if (!this.front || this.rear < this.front) {
      return null;
    }
    this.front++;
    const value = this.items[this.front - 1];
    delete this.items[this.front - 1];
    return value;
  }
  isEmpty() {
    return this.rear < this.front;
  }
}
