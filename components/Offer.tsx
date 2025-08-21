import styles from "@/components/styles/Offer.module.css";
import { Referral } from "@/interfaces";

export default function Offer({ referral }: { referral: Referral }) {
  return (
    <div className={styles.container}>
      <span className={styles.spanItem}>
        Offer Headline: {referral.personOffer?.pageTitle ? referral.personOffer?.pageTitle : referral.offerItem?.headline}
      </span>
      <br />
      <span className={styles.spanItem}>Ad Topic: {referral.offerItem?.adTopic}</span>
      <br />
      <span className={styles.spanItem}>Ad Text: {referral.offerItem?.adText}</span>
    </div>
  );
}
