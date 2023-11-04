import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { PrimeReactProvider } from 'primereact/api';
import Ways from "./routes";
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../public/digital.css';
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {

  const [userInfo, setUserInfo] = useState({
    name: 'Chico',
    isLogged: false,
    level: 'admin'
  });

  const queryClient = new QueryClient();
  
  return(
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{userInfo, setUserInfo}}>
          <PrimeReactProvider>
            <Ways />
          </PrimeReactProvider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;