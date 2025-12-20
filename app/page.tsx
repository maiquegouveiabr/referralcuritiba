"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserResponse } from "@/pages/api/db/userLogged";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Missing credentials!");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("/api/db/userLogged", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const { refreshToken, churchId }: UserResponse = await response.json();

      router.push(`/interactions?refreshToken=${refreshToken}&churchId=${churchId}`);
    } catch (error) {
      console.error(`LOGIN_ERROR=${error}`);
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div id="form" className="grid gap-5">
        <div className="grid max-w-sm items-center gap-1.5">
          <Label className=" text-lg text-white font-semibold" htmlFor="username">
            Username
          </Label>
          <Input
            className="w-[300px] text-white !placeholder-white  focus-visible:ring-1 focus-visible:ring-[#95C168]"
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="grid max-w-sm items-center gap-1.5">
          <Label className=" text-lg text-white font-semibold" htmlFor="password">
            Password
          </Label>
          <div className="relative w-full">
            <Input
              className="w-[300px] text-white !placeholder-white  focus-visible:ring-1 focus-visible:ring-[#95C168]"
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!show && <Eye onClick={() => setShow((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#95C168] cursor-pointer" />}
            {show && <EyeClosed onClick={() => setShow((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#95C168] cursor-pointer" />}
          </div>
        </div>
        <Button
          className="w-[300px] cursor-pointer text-[var(--header)] bg-white hover:bg-white rounded-[3px]  font-semibold text-sm"
          disabled={isLoading}
          onClick={handleLogin}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
