declare module 'netlify-identity-widget' {
  export interface User {
    id: string;
    email: string;
    user_metadata: {
      full_name?: string;
    };
    app_metadata: {
      provider?: string;
      roles?: string[];
    };
  }

  export function init(opts?: {
    container?: string;
    APIUrl?: string;
  }): void;

  export function open(): void;
  export function close(): void;
  export function logout(): void;
  export function refresh(): void;

  export function currentUser(): User | null;

  export function on(event: string, callback: (...args: any[]) => void): void;
  export function off(event: string): void;

  export const store: {
    user: User | null;
    modal: {
      page: string;
      isOpen: boolean;
    };
  };
}