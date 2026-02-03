import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { defaultPortfolioData, type PortfolioData } from "@/lib/portfolioConfig";

const STORAGE_KEY = "portfolioData";

type PortfolioContextValue = {
  data: PortfolioData;
  setData: Dispatch<SetStateAction<PortfolioData>>;
  resetData: () => void;
};

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

const cloneDefaultData = () => JSON.parse(JSON.stringify(defaultPortfolioData)) as PortfolioData;

const loadStoredData = () => {
  if (typeof window === "undefined") return cloneDefaultData();

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return cloneDefaultData();

  try {
    const parsed = JSON.parse(stored) as PortfolioData;
    return { ...cloneDefaultData(), ...parsed };
  } catch {
    return cloneDefaultData();
  }
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(loadStoredData);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const resetData = () => {
    const fresh = cloneDefaultData();
    setData(fresh);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  };

  const value = useMemo(() => ({ data, setData, resetData }), [data]);

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
};
