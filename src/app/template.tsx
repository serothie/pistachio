"use client";
import React, { PropsWithChildren, useEffect } from "react";

const RootTemplate: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  }, []);
  return <>{children}</>;
};

export default RootTemplate;
