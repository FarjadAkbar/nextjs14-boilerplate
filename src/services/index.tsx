import qs from "query-string";
import {API_ENDPOINT} from "../config";

interface IDefaultHeadersProps {
  medium: string;
  "Content-Type": string;
  Authorization?: string;
}

const defaultHeaders: IDefaultHeadersProps = {
  medium: "platform-web",
  "Content-Type": "application/json",
};

type ObjectWithKeys<T> = { [key: string]: T };

export function omit<T>(obj: ObjectWithKeys<T>, keysToOmit: string[]): ObjectWithKeys<T> {
  return Object.keys(obj).reduce((acc: ObjectWithKeys<T>, key: string) => {
    if (!keysToOmit.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

  

export function setAuthenticationHeader(token: string): void {
  defaultHeaders.Authorization = `Bearer ${token}`;
}

export function getAuthenticationToken(): string | undefined {
  return defaultHeaders?.Authorization;
}

export function removeAuthenticationHeader(): void {
  delete defaultHeaders.Authorization;
}
interface IAPArgs {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: any;
  queryParams?: Record<string, any>;
  noAuth?: boolean;
  formData?: boolean;
  baseDomain?: string;
  parseJSON?: boolean;
}

async function service(args: IAPArgs): Promise<any> {
  const {
    url,
    method = "GET",
    body = {},
    headers = {},
    queryParams = null,
    formData = false,
    baseDomain,
    parseJSON = true,
    ...extraProps
  } = args;

  const props = {
    body,
    method,
    headers: { ...defaultHeaders, ...headers },
    ...extraProps,
  };

  if (method === "GET") {
    props.body = null;
  }

  if (!formData && method !== "GET") {
    props.body = JSON.stringify(body);
  }

  if (extraProps.noAuth) {
    delete props.headers.Authorization;
  }
  if (formData) {
    props.headers = omit(props.headers, ["Content-Type"]);
  }

  let fetchUrl = `${baseDomain || API_ENDPOINT}${url}`;
  if (queryParams) {
    fetchUrl = `${fetchUrl}?${qs.stringify(queryParams, {
      arrayFormat: "bracket",
    })}`;
  }
  const data = await fetch(fetchUrl, props);

  if (data.status >= 400) {
    const error = await data.json();
    throw error;
  }

  const isBodyPresent = async () => {
    try {
      return await data?.json();
    } catch (e) {
      return data;
    }
  };

  return await isBodyPresent();
}
export default service;