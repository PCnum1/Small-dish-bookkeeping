import recordStore from "./recordStore";
import tagStore from "@/store/tagStore.ts";

const store = {
  ...recordStore,
  ...tagStore
}
  
export default store;