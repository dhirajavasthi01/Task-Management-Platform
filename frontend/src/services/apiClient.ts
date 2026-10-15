const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ValidationIssue {
  loc?: (string | number)[];
  msg?: string;
}

const extractErrorMessage = (body: unknown, fallback: string): string => {
  if (body && typeof body === "object" && "detail" in body) {
    const { detail } = body as { detail: unknown };
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      return (detail as ValidationIssue[])
        .map((issue) => [issue.loc?.slice(1).join("."), issue.msg].filter(Boolean).join(": "))
        .join(", ");
    }
  }
  return fallback;
};

const request = async <T>(path: string, init: RequestInit = {}): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", Accept: "application/json", ...init.headers },
    });
  } catch {
    throw new ApiError("Unable to reach the server. Make sure the backend is running.", 0);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      extractErrorMessage(body, `Request failed with status ${response.status}`),
      response.status,
    );
  }

  return body as T;
};

export const apiClient = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) => request<T>(path, { method: "PATCH", body: JSON.stringify(data) }),
  delete: (path: string) => request<void>(path, { method: "DELETE" }),
};
