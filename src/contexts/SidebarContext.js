import React, {useState ,createContext} from 'react';
// crate context
import PropTypes from 'prop-types'; // Import PropTypes
export const SidebarContext = createContext();

const SidebarProvider = ({children}) => {
  // sidebar state
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  }
  return <SidebarContext.Provider value={{isOpen, setIsOpen, handleClose}}>
    {children}
    </SidebarContext.Provider>;
};
SidebarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SidebarProvider;
