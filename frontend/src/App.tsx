import { FrappeProvider } from "frappe-react-sdk";
import LoginPage from "./pages/LoginPage";

import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

function App() {
  return (
    <main className="h-screen">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </FrappeProvider>
    </main>
  );
}

export default App;
