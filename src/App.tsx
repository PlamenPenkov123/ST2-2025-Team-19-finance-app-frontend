import {useAuthContext} from "./context/AuthContext";
import {useUserContext} from "./context/UserContext";
import {createEffect} from "solid-js";
import Header from "./presentation/components/general-components/Header";
import {RemoteRepositoryImpl} from "./repository/RemoteRepositoryImpl";
import Footer from "./presentation/components/general-components/Footer";

const repo = new RemoteRepositoryImpl();

function App(props: any) {
    const [token, setToken] = useAuthContext();
    const [user, setUser] = useUserContext();

    createEffect(() => {
        if(!user() || !token()){
            setUser(null);
            setToken(null);
        }
    })

    createEffect(() => {
        const currentToken = token();
        if (currentToken && !user()) {
            (async () => {
                try {
                    const fetchedUser = await repo.me(currentToken);
                    setUser(fetchedUser);
                    localStorage.setItem("flow_user", JSON.stringify(fetchedUser));
                } catch (error) {
                    console.error(error);
                    setUser(null);
                }
            })();
        }
    });

  return <div class="min-h-screen flex flex-col w-full">
          <Header/>
          <div class="flex-grow">
              {props.children}
          </div>
      <Footer/>
  </div>
}

export default App
