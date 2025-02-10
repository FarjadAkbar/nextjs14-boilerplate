import Image from 'next/image';
import styles from './AuthLayout.module.scss';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles["auth-layout"]}>
      <div className={styles["content-wrapper"]}>{children}</div>
      <div className={styles["image-section"]}>
        <div className={styles["inner-content"]}>
          <Image
            src="/images/banner.jpg"
            alt="Image"
            width="290"
            height="75"
            className={styles["banner-image"]}
          />
          <p className={styles["welcome-text"]}>Hello World</p>
        </div>
      </div>
    </div>
  );
}
