import { useEffect, useState } from "react";

declare global {
  interface Window {
    __LAST_API_RESPONSE?: {
      error?: {
        userMessage?: string;
      };
    };
  }
}

export default function ErrorComponent() {
  const [countdown, setCountdown] = useState(0);
  const [reloadAttempted, setReloadAttempted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    // Set animation completed after a short delay
    const animTimeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 600);

    // Try to extract error message from the response
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const billId = searchParams.get("i") || searchParams.get("t");

      if (window.__LAST_API_RESPONSE?.error?.userMessage) {
        setErrorMessage(window.__LAST_API_RESPONSE.error.userMessage);
      } else {
        setErrorMessage(
          billId
            ? `No ${searchParams.get("i") ? "invoice" : "item"} found for ID: ${billId}`
            : "We couldn't find what you were looking for"
        );
      }
    } catch (e) {
      console.error("Error extracting message:", e);
    }

    // Check if this is a reload attempt
    const hasReloaded = sessionStorage.getItem("reloadAttempted") === "true";
    if (hasReloaded) {
      setReloadAttempted(true);
      setCountdown(10);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
        clearTimeout(animTimeout);
      };
    }

    return () => clearTimeout(animTimeout);
  }, []);

  const handleReload = () => {
    if (reloadAttempted && countdown > 0) {
      return; // Prevent reload during countdown
    }

    setIsRetrying(true);

    setTimeout(() => {
      sessionStorage.setItem("reloadAttempted", "true");
      window.location.reload();
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4 overflow-hidden relative">
      {/* Background animated circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 -left-20 w-40 h-40 rounded-full bg-blue-200 opacity-20 
          ${animationComplete ? "animate-pulse" : ""}`}
        />
        <div
          className={`absolute bottom-1/4 -right-10 w-32 h-32 rounded-full bg-blue-300 opacity-20 
          ${animationComplete ? "animate-pulse" : ""}`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute top-3/4 left-10 w-24 h-24 rounded-full bg-blue-400 opacity-10 
          ${animationComplete ? "animate-pulse" : ""}`}
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div
        className={`w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 
          ${animationComplete ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <div className="bg-gradient-to-r from-blue-500 to-[#2e6acf] h-2 w-full" />
        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            {/* Animated error icon */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-6">
              <div
                className={`absolute inset-0 bg-blue-100 rounded-full transform transition-all duration-700 
                ${animationComplete ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
              />
              <svg
                className={`w-10 h-10 text-[#2e6acf] relative z-10 transform transition-all duration-700 delay-300
                  ${animationComplete ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h2
              className={`text-xl font-bold text-gray-800 mb-3 transform transition-all duration-500 delay-100 
              ${animationComplete ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              Oops! Not Found
            </h2>

            <p
              className={`text-gray-600 mb-8 transform transition-all duration-500 delay-200 
              ${animationComplete ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {errorMessage}
            </p>

            <button
              onClick={handleReload}
              disabled={(reloadAttempted && countdown > 0) || isRetrying}
              className={`w-full px-5 py-3 rounded-xl font-medium transition-all duration-300
                ${
                  (reloadAttempted && countdown > 0) || isRetrying
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#2e6acf] hover:bg-blue-600 text-white shadow-md hover:shadow-lg"
                } 
                ${animationComplete ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                transform transition-all duration-500 delay-300`}
            >
              {isRetrying ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Retrying...
                </div>
              ) : reloadAttempted && countdown > 0 ? (
                `Try Again in ${countdown}s`
              ) : (
                "Try Again"
              )}
            </button>

            {reloadAttempted && countdown > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-1 mt-4 overflow-hidden">
                <div
                  className="bg-[#2e6acf] h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 10) * 100}%` }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`text-center text-xs text-gray-500 mt-6 transform transition-opacity duration-500 delay-500 
        ${animationComplete ? "opacity-70" : "opacity-0"}`}
      >
        Error code: 400
      </div>
    </div>
  );
}
