import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './Home.module.scss';

interface HtmlProps extends React.HTMLAttributes<HTMLElement> {
  section?: boolean;
}

function Box({ children, className, section, ...props }: HtmlProps) {
  const combinedClassName = `${section ? styles["hero-section"] : styles["box"]} ${className || ''}`;
  return section ? (
    <section className={combinedClassName} {...props}>
      {children}
    </section>
  ) : (
    <div className={`${styles.box}`} {...props}>
      {children}
    </div>
  );
}

export default function Home() {
  const t = useTranslations('Index');
  return (
    <>
      <Box section={true}>
        <Box className={styles["text-content"]}>
          <h1>{t('title')}</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, at. Culpa minus molestiae animi at recusandae impedit atque eius! Earum quasi voluptatum assumenda eum sequi illum fugit error eveniet ducimus.
          </p>
          <Link href="/signin">Sign in</Link> <br></br>
          <Link href="/shop">Shop</Link>
        </Box>
        <Box>
          <Image className={styles["hero-image"]} src="/images/banner.jpg" alt="hero" width={500} height={500} />
        </Box>
      </Box>
    </>
  );
}
