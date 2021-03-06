import axios from "axios";

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/feeds",
  params: { offset: 0, limit: 10 },
  responseType: "json"
});