import _axios from "../plugins/axios";
import { User } from "./eventListSlice";
import { number } from "yup";

type ResponseKind = "success" | "failure";

type NetworkResponse<T> = {
  kind: ResponseKind;
  body?: T;
};

export const fetchUsers = async (): Promise<NetworkResponse<User[]>> => {
  const response = await _axios.get("users");
  console.log(response.data._embedded.users);

  if (response.data._embedded) {
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

export const fetchUser = async (
  eventId: number
): Promise<NetworkResponse<User>> => {
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

export const createUser = async (
  body: User
): Promise<NetworkResponse<User>> => {
  const response = await _axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    body
  );

  if (response.data) {
    console.log("Created User is ", response.data);
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

export const deleteUser = async (
  eventId: number
): Promise<NetworkResponse<User>> => {
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
