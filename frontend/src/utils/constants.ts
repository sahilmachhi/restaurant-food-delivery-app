// address interface
export interface Address {
  name: string;
  address: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    pincode: number;
    district: string;
    state: string;
    country: string;
  };
  _id: string;
}

export const newAddressVal = {
  name: "",
  address: {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
    district: "",
    state: "",
    country: "",
  },
};

// inputvalue
export const inputVal = [
  {
    name: "name",
    placeholder: "tag name",
  },
  {
    name: "address.name",
    placeholder: "name as per address",
  },
  {
    name: "address.addressLine1",
    placeholder: "address line 1",
  },
  {
    name: "address.addressLine2",
    placeholder: "address line 2",
  },
  {
    name: "address.city",
    placeholder: "city",
  },
  {
    name: "address.district",
    placeholder: "district",
  },
  {
    name: "address.state",
    placeholder: "state",
  },
  {
    name: "address.country",
    placeholder: "country",
  },
  {
    name: "address.pincode",
    placeholder: "pincode",
  },
];

export const cuisineList = [
  "American",
  "BBQ",
  "Breakfast",
  "Burgers",
  "Cafe",
  "Chinese",
  "Desserts",
  "French",
  "Greek",
  "Healthy",
  "Indian",
  "Italian",
  "Japanese",
  "Mexican",
  "Noodles",
  "Organic",
  "Pasta",
  "Pizza",
  "Salads",
  "Seafood",
  "Spanish",
  "Steak",
  "Sushi",
  "Tacos",
  "Tapas",
  "Vegan",
];
