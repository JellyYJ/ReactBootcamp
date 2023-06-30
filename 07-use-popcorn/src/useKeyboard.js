import { useEffect } from "react";

export function useKeyBoard(key, action) {
  // Listening to keypress
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
          console.log("Closing");
        }
      }

      document.addEventListener("keydown", callback);

      // We can see the eventlisteners are accumulating
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
