import KakaoLoginButton from "@/app/components/buttons/KakaoLoginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-600">
        Share your Pistachio!
      </h1>
      <p className="mt-4 text-lg">훈련 기록을 공유하고, 함께 성장하세요.</p>

      <KakaoLoginButton />
      {process.env.NEXT_PUBLIC_TEST}
    </main>
  );
}
