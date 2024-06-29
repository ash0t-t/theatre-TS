import { FilterTypes, IEvent } from "./types";
import axios from "axios";

const URL = "http://localhost:3004/events";

export const getAllEvents = async (
  type: FilterTypes = FilterTypes.all
): Promise<IEvent[]> => {
  const response = await axios.get(
    URL + (type != FilterTypes.all ? "?type=" + type : "")
  );
  return response.data;
};

export const addEvent = async (data): Promise<IEvent> => {
  const response = await axios.post(URL, data);
  return response.data;
};
