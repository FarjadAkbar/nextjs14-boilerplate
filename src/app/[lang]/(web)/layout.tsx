import { Locale } from "@/i18n.config";


export default async function WebLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <main>
          {children}
        </main>
      </>
    )
  }