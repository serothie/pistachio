import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import jwt from "jsonwebtoken";
import { ApiPath, AuthPath } from "@/app/constants/paths";

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
}

export interface KakaoUserResponse {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image: string;
    thumbnail_image: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url: string;
      profile_image_url: string;
      is_default_image: boolean;
      is_default_nickname: boolean;
    };
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Failed to get kakao authorization code" },
      { status: 400 }
    );
  }

  const tokenRes = await fetch("https://kauth.kakao.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri:
        process.env.NEXT_PUBLIC_PISTACHIO_WEB_URL + ApiPath.KakaoAuthRedirect,
      code,
    }),
  });

  const tokenData: KakaoTokenResponse = await tokenRes.json();
  if (!tokenData.access_token) {
    return NextResponse.json(
      {
        error: "Failed to get kakao token",
        reason: tokenData,
        redirectUri: process.env.NEXT_PUBLIC_PISTACHIO_WEB_URL,
      },
      { status: 400 }
    );
  }

  const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const userData: KakaoUserResponse = await userRes.json();
  // return NextResponse.json({ payload: userData }, { status: 200 });

  if (!userData.id) {
    return NextResponse.json(
      { error: "Failed to get user data", reason: userData },
      { status: 400 }
    );
  }

  const userId = userData.id.toString();
  const nickname = userData.properties.nickname;
  const profileImage = userData.properties.profile_image;

  // 3️⃣ Supabase에서 유저 정보 조회
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  // if (error) return NextResponse.json({ error: "Failed to get user data from server" }, { status: 400 });

  if (!existingUser) {
    const signupUrl = new URL(AuthPath.SignUp, req.url);
    signupUrl.searchParams.set("id", userId);
    signupUrl.searchParams.set("nickname", nickname);
    signupUrl.searchParams.set("profile_image", profileImage);

    return NextResponse.redirect(signupUrl);
  }

  const email = existingUser.email;

  // 5️⃣ 기존 유저 → JWT 발급 후 로그인 처리
  const jwtToken = jwt.sign(
    { id: userId, nickname, email },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  const response = NextResponse.redirect(new URL("/", req.url));
  response.cookies.set("token", jwtToken, { httpOnly: true, secure: true });

  return response;
}
