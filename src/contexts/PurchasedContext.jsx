import { createContext, useContext, useEffect, useState } from "react";

const PurchasedContext = createContext();

export function PurchasedProvider({ children }) {
  const [purchased, setPurchased] = useState(() => {
    return JSON.parse(localStorage.getItem("purchased") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("purchased", JSON.stringify(purchased));
  }, [purchased]);

  const addPurchasedCourses = (courses) => {
    const merged = [
      ...purchased,
      ...courses.filter(c => !purchased.find(p => p.id === c.id))
    ];
    setPurchased(merged);
  };

  return (
    <PurchasedContext.Provider value={{ purchased, addPurchasedCourses }}>
      {children}
    </PurchasedContext.Provider>
  );
}

export function usePurchased() {
  return useContext(PurchasedContext);
}
