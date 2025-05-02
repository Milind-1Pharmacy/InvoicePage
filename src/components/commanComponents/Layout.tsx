import Header from "./Header";

export function Layout({
  children,
  storeInfo,
}: {
  children: React.ReactNode;
  storeInfo?: any;
}) {
  console.log("storeInfo", storeInfo);

  return (
    <div className="min-h-screen flex flex-col">
      <Header storeInfo={storeInfo} />
      <main className="flex-1">{children}</main>
      {/* <FooterComponent /> */}
    </div>
  );
}
