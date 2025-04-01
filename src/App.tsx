import { ThemeProvider } from "@/services/contextProvider/theme-provider";
import Header from "./components/Header";
import UserInvoiceInfo from "./components/UserInvoiceInfo";
import FooterComponent from "./components/FooterComponent";
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Header storeName="Model Medicals Demo " showIcons={true} />
      <UserInvoiceInfo />
      <FooterComponent />
    </ThemeProvider>
  );
}

export default App;
