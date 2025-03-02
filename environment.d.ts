declare namespace NodeJS {
  export interface ProcessEnv {
    // ✅ Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    // ✅ Kakao
    NEXT_PUBLIC_KAKAO_NATIVE_APP_KEY: string;
    NEXT_PUBLIC_KAKAO_REST_API_KEY: string;
    NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY: string;
    NEXT_PUBLIC_KAKAO_REDIRECT_URI: string;
  }
}
