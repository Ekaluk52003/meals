import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://ricy-env.eba-mgkejafd.ap-southeast-1.elasticbeanstalk.com/api"
    : "http://localhost:3001/api";

export default axios.create({
  baseURL,
});
