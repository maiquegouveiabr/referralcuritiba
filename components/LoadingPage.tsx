import React from "react";
import styles from "./styles/LoadingPage.module.css"; // Import the CSS module

const LoadingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* Spinner */}
        <div className={styles.spinner}></div>

        {/* Loading Text */}
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
