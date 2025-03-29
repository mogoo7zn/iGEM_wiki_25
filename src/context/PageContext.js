import React, { createContext, useState, useContext } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageTransition, setPageTransition] = useState({
    isTransitioning: false,
    from: null,
    to: null,
  });

  const navigateTo = (page) => {
    setPageTransition({
      isTransitioning: true,
      from: currentPage,
      to: page,
    });

    setTimeout(() => {
      setCurrentPage(page);
      setPageTransition((prev) => ({
        ...prev,
        isTransitioning: false,
      }));
    }, 300); // 300ms transition
  };

  return (
    <PageContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        pageTransition,
        navigateTo,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => useContext(PageContext);

export default PageContext;
