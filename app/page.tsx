"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [refreshToken, setRefreshToken] = useState("");
  const [churchId, setChurchId] = useState("");
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (refreshToken.length < 10 || churchId.length < 10) {
      setDisabled(true);
    } else setDisabled(false);
  }, [refreshToken, churchId]);

  const handleRedirect = () => {
    setDisabled(true);
    router.replace(`/interactions?refreshToken=${refreshToken}&churchId=${churchId}`);
  };

  return (
    <div className={styles.container}>
      <div id="form" className="grid gap-5">
        <div className="grid max-w-sm items-center gap-1.5">
          <Label className=" text-lg text-white font-semibold" htmlFor="refreshToken">
            REFRESH TOKEN
          </Label>
          <Input
            className="w-[300px] text-white !placeholder-white  focus-visible:ring-1 focus-visible:ring-[#95C168]"
            type="text"
            placeholder="Cole refresh token aqui..."
            value={refreshToken}
            onChange={(e) => setRefreshToken(e.target.value)}
          />
        </div>
        <div className="grid max-w-sm items-center gap-1.5">
          <Label className=" text-lg text-white font-semibold" htmlFor="churchId">
            CHURCH ID
          </Label>
          <div className="relative w-full">
            <Input
              className="w-[300px] text-white !placeholder-white  focus-visible:ring-1 focus-visible:ring-[#95C168]"
              placeholder="Cole chuch id token aqui..."
              value={churchId}
              onChange={(e) => setChurchId(e.target.value)}
            />
          </div>
        </div>
        <Button
          className="w-[300px] cursor-pointer text-[var(--header)] bg-white hover:bg-white rounded-[3px]  font-semibold text-sm"
          disabled={disabled}
          onClick={handleRedirect}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
