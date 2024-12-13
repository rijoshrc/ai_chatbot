import { FrappeProvider } from "frappe-react-sdk";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <main className="h-screen">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <LoginPage />
      </FrappeProvider>
    </main>
  );
}

export default App;
