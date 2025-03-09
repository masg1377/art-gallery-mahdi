import { useEffect, useState } from "react";

// Helper function to get current window dimensions
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width, // Current window width
    height, // Current window height
  };
}

// Custom hook to track and return window dimensions
export default function useWindowDimensions() {
  // State to store the current window dimensions
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions() // Initialize state with current window size
  );

  useEffect(() => {
    // Function to update the state whenever the window is resized
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    // Add resize event listener to update state on window resize
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup the event listener when the component is unmounted or the effect is re-run
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to ensure this effect runs only once

  // Return the current window dimensions (width and height)
  return windowDimensions;
}
