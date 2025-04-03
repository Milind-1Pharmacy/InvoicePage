import { ThemeProvider } from "@/services/contextProvider/theme-provider";
// import Header from "./components/Header";
// import UserInvoiceInfo from "./components/InvoiceComponents";
// import FooterComponent from "./components/FooterComponent";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <div className="flex flex-col min-h-screen">
          <Header storeName="Model Medicals Demo " showIcons={true} />
          <main className="flex-grow">
            <UserInvoiceInfo />
          </main>
          <FooterComponent />
        </div> */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
