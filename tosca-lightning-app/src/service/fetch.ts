export class HeadersBuilder {

  public headers: HeadersInit = {};

  public asJSON() {
    this.headers = {
      ...this.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return this;
  }
}

export async function fetchOrThrow(request: RequestInfo, init?: RequestInit): Promise<Response> {
  const defaultHeaders = new HeadersBuilder()
    .asJSON()
    .headers;
  const headers = {
    ...defaultHeaders,
    ...(init?.headers || {}),
  };
  const response = await fetch(request, { ...init, headers });
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
