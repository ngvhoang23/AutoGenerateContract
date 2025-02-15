import { createContext, useState } from "react";

const CurrentPageContext = createContext();

function CurrentPageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState();

  const value = {
    currentPage,
    setCurrentPage,
  };

  return <CurrentPageContext.Provider value={value}>{children}</CurrentPageContext.Provider>;
}

export { CurrentPageContext, CurrentPageProvider };
