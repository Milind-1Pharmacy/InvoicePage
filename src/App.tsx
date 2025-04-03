import { ThemeProvider } from "@/services/contextProvider/theme-provider";
import Header from "./components/Header";
import UserInvoiceInfo from "./components/UserInvoiceInfo";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-col min-h-screen">
        <Header storeName="Model Medicals Demo " showIcons={true} />
        <main className="flex-grow">
          <UserInvoiceInfo />
        </main>
        <FooterComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
