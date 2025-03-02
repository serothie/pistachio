/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    Kakao: KakaoType;
  }

  const Kakao: KakaoType;
}

export interface KakaoType {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: {
    authorize: ({
      redirectUri,
      scope,
    }: {
      redirectUri: string;
      scope?: string;
    }) => void;
    logout: (callback?: () => void) => void;
    getAccessToken: () => string | null;
  };
  API: {
    request: (options: {
      url: string;
      success: (res: any) => void;
      fail?: (err: any) => void;
    }) => void;
  };
  Share: {
    sendDefault: (options: any) => void;
  };
}

export {};
