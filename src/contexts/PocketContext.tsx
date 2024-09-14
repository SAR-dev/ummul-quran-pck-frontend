import {
    createContext,
    useContext,
    useCallback,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from "react";
import PocketBase from "pocketbase";
import { useInterval } from "usehooks-ts";
import { jwtDecode } from "jwt-decode";
import ms from "ms";
import { TypedPocketBase } from "../types/pocketbase";

const fiveMinutesInMs = ms("5 minutes");
const twoMinutesInMs = ms("2 minutes");

const PocketContext = createContext({});

export const PocketProvider = ({ children }: { children: ReactNode }) => {
    const pb = useMemo(() => new PocketBase(import.meta.env.VITE_API_URL) as TypedPocketBase, []);

    const [token, setToken] = useState(pb.authStore.token);
    const [user, setUser] = useState(pb.authStore.model);

    useEffect(() => {
        return pb.authStore.onChange((token, model) => {
            setToken(token);
            setUser(model);
        });
    }, []);

    const register = useCallback(async ({ email, password }: { email: string, password: string }) => {
        return await pb
            .collection("users")
            .create({ email, password, passwordConfirm: password });
    }, []);

    const login = useCallback(async ({ email, password }: { email: string, password: string }) => {
        return await pb.collection("users").authWithPassword(email, password);
    }, []);

    const logout = useCallback(() => {
        pb.authStore.clear();
    }, []);

    const refreshSession = useCallback(async () => {
        if (!pb.authStore.isValid) return;
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp ?? 0;
        const expirationWithBuffer = (tokenExpiration + fiveMinutesInMs) / 1000;
        if (tokenExpiration < expirationWithBuffer) {
            await pb.collection("users").authRefresh();
        }
    }, [token]);

    useInterval(refreshSession, token ? twoMinutesInMs : null);

    return (
        <PocketContext.Provider
            value={{ 
                register, 
                login, 
                logout, 
                user, 
                token, 
                pb 
            }}
        >
            {children}
        </PocketContext.Provider>
    );
};

export const usePocket = () => useContext(PocketContext);
