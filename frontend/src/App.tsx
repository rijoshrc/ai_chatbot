import { FrappeProvider } from "frappe-react-sdk";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <FrappeProvider
        socketPort={import.meta.env.VITE_SOCKET_PORT}
        siteName={import.meta.env.VITE_SITE_NAME}
      >
        <Home />
      </FrappeProvider>
    </div>
  );
}

export default App;
