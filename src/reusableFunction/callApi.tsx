import { ENDPOINT } from "../Config";

type DataProps = {
  userNP: string | undefined;
  matchedNP?: string | undefined;
  messageId?: string;
  message?: string;
  createdAt?: number;
  status?: string;
};

async function callApiPost(data: DataProps, query: string) {
  try {
    const res = await fetch(`${ENDPOINT}/${query}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const resJson = await res.json();
    if (resJson.message === 500) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export function callApiCreate(data: DataProps) {
  return callApiPost(data, "create");
}

export function callApiOpenChat(data: DataProps) {
  return callApiPost(data, "openNewChat");
}

export async function callApiGet(query: string) {
  try {
    const res = await fetch(`${ENDPOINT}/search/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    if (res.status === 204) {
      return `${query} does not exist...`;
    } else if (res.status === 500) {
      return `Error occured, please try again`;
    }
    return `${query} was found!`;
  } catch (error) {
    return `Error occured, please try again`;
  }
}
