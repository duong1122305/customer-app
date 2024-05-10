import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const GoToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });

    return () => window.removeEventListener("scroll", handleScrollToTop);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="go-to-top-button"
      style={{ display: showButton ? "block" : "none", float:"right" }}
    >
      <Button variant="primary" onClick={handleScrollToTop}>
        Lên đầu trang
      </Button>
    </div>
  );
};

export default GoToTop;
