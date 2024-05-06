"use client"
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface HtmlProps extends React.HTMLAttributes<HTMLElement> {
  section?: boolean;
}

function Box({ children, className, section, ...props }: HtmlProps) {
  const defaultClasses = section
    ? 'w-full relative lg:overflow-x-visible overflow-x-hidden flex flex-col lg:flex-row items-center gap-5 py-16 px-4 md:px-16'
    : 'w-full lg:w-1/2 py-6 relative';

  const combinedClassName = `${defaultClasses} ${className}`;
  
  if (section) {
    return (
      <section className={combinedClassName} {...props}>
        {children}
      </section>
    );
  } else {
    return (
      <div className={combinedClassName} {...props}>
        {children}
      </div>
    );
  }
}

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box section={true}>
        <Box>
          <h1 className="text-6xl font-bold">Hello World</h1>
          <p className="text-lg mt-2 mb-4 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit, at. Culpa minus molestiae animi at recusandae impedit atque eius! Earum quasi voluptatum assumenda eum sequi illum fugit error eveniet ducimus.
          </p>
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </Box>
        <Box>
          <Image className='lg:mr-0 mr-auto ml-auto' src="/images/hero.png" alt="hero" width={500} height={500} />
        </Box>
      </Box>
    </>
  );
}