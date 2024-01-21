import { useContext  } from "react";
import { MenuContext } from "./MenuContext";

export const useMenuContext = () => {
  const menuContext = useContext(MenuContext);

  if (!menuContext) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }

  return menuContext;
};