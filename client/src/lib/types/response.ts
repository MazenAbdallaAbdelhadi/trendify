// Define the structure of your response body
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T | null;
}

export type { ApiResponse };
