import Image from 'next/image';

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex items-center justify-center py-12">
        {children}
      </div>
      <div className="hidden lg:flex grow items-center justify-center bg-cover bg-center bg-[url('/images/auth-bg.png')]">
        <div className='flex flex-col items-center py-7 lg:py-15 px-5 md:px-15 w-100'>
          <Image
            src="/images/banner.jpg"
            alt="Image"
            width="290"
            height="75"
            className="block mx-auto"
          />
        <p className="text-white text-4xl font-bold pt-2">Hello World</p>
        </div>
      </div>
    </div>
  )
}