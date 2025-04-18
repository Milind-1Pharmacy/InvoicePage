import FooterComponent from "./FooterComponent";
import Header from "./Header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header storeName="Urmedz Retail Pvt Ltd." showIcons={true} />
      <main className="flex-1">{children}</main>
      <FooterComponent />
    </div>
  );
}
