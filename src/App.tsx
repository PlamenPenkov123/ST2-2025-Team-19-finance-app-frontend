import {useAuthContext} from "./context/AuthContext.tsx";
import {useUserContext} from "./context/UserContext.tsx";
import {createEffect} from "solid-js";

// const repo = new RemoteRepositoryImpl();

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
        // const currentToken = token();
        //
        // if (currentToken && !user()) {
        //     (async () => {
        //         try {
        //             const fetchedUser = await repo.me(currentToken);
        //             const adminStatus = await repo.isAdmin(currentToken);
        //             const userWithRole = { ...fetchedUser, isAdmin: adminStatus.isAdmin };
        //
        //             setUser(userWithRole);
        //             localStorage.setItem("combat_user", JSON.stringify(userWithRole));
        //         } catch (error) {
        //             console.error(error);
        //             setUser(null);
        //         }
        //     })();
        // }
    });

  return <div class="min-h-screen flex flex-col w-full">
      <div class="flex-grow">
          {props.children}
      </div>
  </div>
}

export default App
