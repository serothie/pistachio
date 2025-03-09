"use client";
import { Button, Input } from "antd";
import React from "react";

const SignUpPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-100 flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Input></Input>
          <Input></Input>
        </div>
        <Button>Sign Up</Button>
      </div>
    </main>
  );
};

export default SignUpPage;
