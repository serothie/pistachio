"use client";

import { ApiPath } from "@/app/constants/paths";
import Image from "next/image";

export default function KakaoLoginButton() {
  const handleClickButton = () => {
    Kakao.Auth.authorize({
      redirectUri: window.location.origin + ApiPath.KakaoAuthRedirect,
      prompt: "none",
    });
  };
  return (
    <button className="relative w-[183px] h-[45px]" onClick={handleClickButton}>
      <Image
        src="/images/common/kakao_login_medium_narrow.png"
        fill
        alt="kakao login button image"
      />
    </button>
  );
}
