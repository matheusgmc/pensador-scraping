import { configDefault } from "../../config/config_default";

export const formatUrl = (href?: string) => {
	if (!href) return "";
	return `${configDefault.base_url}${href}`;
};
