import { useEffect } from "react";
import "./App.css";
import Footer from "./components/FooterComponent/Footer";
import Header from "./components/HeaderComponent/Header";

function App() {
  useEffect(() => {
    let timeoutId;
    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        sessionStorage.removeItem("token");
      }, 1 * 60 * 1000);
    };

    resetTimeout();

    window.addEventListener("click", resetTimeout);
    window.addEventListener("keypress", resetTimeout);

    return () => {
      clearTimeout(timeoutId);
      window.addEventListener("keypress", resetTimeout);
      window.removeEventListener("click", resetTimeout);
    };
  }, []);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default App;
