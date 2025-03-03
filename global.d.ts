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
      prompt,
    }: {
      redirectUri?: string;
      state?: string;
      scope?: string;
      prompt?: string;
      loginHint?: string;
      nonce?: string;
      throughTalk?: boolean;
    }) => void;
    logout: (callback?: () => void) => void;
    getAccessToken: () => string | null;
    setAccessToken: (accessToken: string) => void;
  };

  API: {
    request: (options: {
      url: string;
      data?: object;
      files?: FileList | Array<File> | Array<Blob>;
    }) => Promise;
  };
  Share: {
    sendDefault: (options: any) => void;
  };
}

export {};
