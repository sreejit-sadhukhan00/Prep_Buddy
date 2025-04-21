import React, { createContext, useState } from 'react'



export const userDataContext=createContext();
function Usercontext({children}) {
   const [userData, setUserData] = useState(null);
  return (
    <div>
        <userDataContext.Provider value={{userData,setUserData}}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default Usercontext;