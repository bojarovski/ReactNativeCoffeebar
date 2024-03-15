import _axios from "../../plugins/axios";
import { Coffee } from "../models/coffeeListSlice";

type ResponseKind = "success" | "failure";

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export const fetchCoffees = async (): Promise<NetworkResponse<Coffee[]>> => {
  const response = await _axios.get("coffees");

  if (response.data) {
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");

    return {
      kind: "failure",
    };
  }
};

export const fetchCoffee = async (
  eventId: number
): Promise<NetworkResponse<Coffee>> => {
  const response = await _axios.get(`coffees/${eventId}`);

  if (response.data) {
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");

    return {
      kind: "failure",
    };
  }
};

export const createCoffee = async (
  body: Coffee
): Promise<NetworkResponse<Coffee>> => {
  console.log(body);
  const response = await _axios.post("coffees", body);
  if (response.data) {
    console.log("Created Coffee is ", response.data);
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");
    return {
      kind: "failure",
    };
  }
};

export const deleteCoffee = async (
  eventId: number
): Promise<NetworkResponse<Coffee>> => {
  const response = await _axios.get(
    `https://jsonplaceholder.typicode.com/posts/${eventId}`
  );

  if (response.data) {
    return {
      kind: "success",
      body: response.data,
    };
  } else {
    console.log("false");

    return {
      kind: "failure",
    };
  }
};
