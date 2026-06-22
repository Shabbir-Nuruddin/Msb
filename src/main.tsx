import { Component, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Last-resort error boundary so a runtime error renders a message instead of a
// blank white screen. (The most common cause of a blank deploy is missing
// VITE_SUPABASE_* env vars — see src/integrations/supabase/client.ts.)
class RootErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error("[MSB] App crashed:", error);
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "system-ui, sans-serif", background: "#0b1020", color: "#e8eefc", textAlign: "center" }}>
          <div style={{ maxWidth: 520 }}>
            <h1 style={{ fontSize: 22, margin: "0 0 8px", color: "#5b8def" }}>MSB Smart Revision</h1>
            <p style={{ margin: "0 0 12px", color: "#aab6d6" }}>Something went wrong while loading the app.</p>
            <p style={{ fontSize: 13, color: "#7e8bb0" }}>
              If you just deployed this, make sure <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_PUBLISHABLE_KEY</code> are set in your hosting
              environment variables, then redeploy.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <RootErrorBoundary>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </RootErrorBoundary>,
);
