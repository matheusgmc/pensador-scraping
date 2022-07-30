import axios from "axios";
import { configDefault } from "../config/config_default";
const FetchPensador = axios.create({
	baseURL: configDefault.base_url,
});

export default FetchPensador;
