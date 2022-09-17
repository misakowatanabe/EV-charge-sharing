import { ENDPOINT } from "../Config";

type DataProps = {
  userUid?: string;
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
    if (res.status === 200) {
      return true;
    }
    return false;
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

export async function callApiGetUserNp(query: string) {
  try {
    const res = await fetch(`${ENDPOINT}/catch-user-np/${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
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
    } else if (res.status === 200) {
      return `${query} was found!`;
    }
    return `Error occured, please try again`;
  } catch (error) {
    return `Error occured, please try again`;
  }
}

export async function callApiDeleteChat(data: DataProps) {
  try {
    const res = await fetch(`${ENDPOINT}/deleteChat`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export async function callApiDeleteCollection(
  chatPartners: { chatPartners: string[] },
  userUid: string,
  userNP: string
) {
  try {
    const res = await fetch(`${ENDPOINT}/deleteAccount/${userUid}/${userNP}`, {
      method: "DELETE",
      body: JSON.stringify(chatPartners),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    return res;
  } catch (error) {
    return error;
  }
}
