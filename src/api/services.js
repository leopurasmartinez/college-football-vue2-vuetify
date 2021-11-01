import axios from "axios";

export default {
  teams() {
    return axios.get(`${process.env.VUE_APP_BASE_URL}teams`)
  },
}