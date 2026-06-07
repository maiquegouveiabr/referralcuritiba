"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [refreshToken, setRefreshToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setDisabled(refreshToken.length < 10);
  }, [refreshToken]);

  const handleRedirect = async () => {
    setIsLoading(true);
    setDisabled(true);
    router.replace(`/interactions?refreshToken=${refreshToken}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Referral Manager</h1>
            <p className={styles.subtitle}>Insira seu token de autenticação para continuar</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRedirect();
            }}
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <Label htmlFor="refreshToken" className={styles.label}>
                Token de Autenticação
              </Label>
              <Input
                id="refreshToken"
                type="password"
                placeholder="Cole seu refresh token aqui..."
                value={refreshToken}
                onChange={(e) => setRefreshToken(e.target.value)}
                className={styles.input}
                disabled={isLoading}
              />
            </div>

            <Button type="submit" disabled={disabled || isLoading} className={styles.button}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
