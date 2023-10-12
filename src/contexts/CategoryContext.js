import React , {createContext, useState, useEffect} from 'react';
// create context
import PropTypes from 'prop-types'; // Import PropTypes
 export const CategoryContext = createContext();


const CategoryProvider = ({children}) => {
  const [categorys, setCategorys] = useState([]);
  // fecth category
  useEffect(() => {
    const fecthCategorys = async ()=> {
      const reponse = await fetch('https://asges6-default-rtdb.firebaseio.com/categorys.json');
      const data = await reponse.json();
      const categorys = Object.values(data);
      setCategorys(categorys);
    };
    fecthCategorys();
  }, [])

  
  return <CategoryContext.Provider value={{categorys}}>{children}</CategoryContext.Provider>;
};
CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CategoryProvider;
