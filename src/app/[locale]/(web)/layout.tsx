import Header from "./_components/Header";


export default async function WebLayout({
    children
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <main>
          <Header />
          {children}
        </main>
      </>
    )
  }