import PocketBase from "pocketbase";
import { TypedPocketBase } from "./types/pocketbase"

const pb = new PocketBase(import.meta.env.VITE_API_URL) as TypedPocketBase

export default pb;