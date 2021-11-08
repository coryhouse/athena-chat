type LayoutProps = {
  Header: React.ReactNode;
  Main: React.ReactNode;
  Footer: React.ReactNode;
};

export function Layout({ Header, Main, Footer }: LayoutProps) {
  return (
    <>
      <header>{Header}</header>
      <main>{Main}</main>
      <footer>{Footer}</footer>
    </>
  );
}
