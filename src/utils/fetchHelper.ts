import { HOST_ADDRESS } from "../config";
import { ClientApiResponse, ClientResponse, ClientResponseError } from "../types";

type Method = 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'GET';

interface ResponseProblem {
    message: string;
    problems?: string[];
}

const showProblem = (response: Response, res: ResponseProblem): ClientResponseError => {
    console.warn(res.message);
    if (response.status === 400) return { message: res.message, status: false, problems: res.problems };
    return { message: res.message, status: false };
};

export const fetchTool = async (path: string, method: Method = 'GET', body: any = undefined): Promise<ClientResponse> => {
    try {
        const headers = ['POST', 'PATCH', 'PUT'].includes(method) ? { 'Content-Type': 'application/json' } : undefined;

        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
            method,
            headers: headers,
            body: body && JSON.stringify(body),
            credentials: 'include',
        });
        const res = await response.json();
        if (response.ok) return { ...res, status: true };
        return showProblem(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};

export async function fetchApiTool<T>(path: string): Promise<ClientApiResponse<T>> {
    try {
        const response = await fetch(`${HOST_ADDRESS}/${path}`, {
            credentials: 'include',
        });
        const res = await response.json();
        if (response.ok) return { results: res, status: true };
        return showProblem(response, res);
    } catch (e) {
        return { message: 'Wystąpił błąd. Spróbuj jeszcze raz.', status: false };
    }
};