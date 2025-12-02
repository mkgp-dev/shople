import localforage from "localforage";

localforage.config({
  name: "shople-db",
  storeName: "shople-store",
  description: "Web Storage API powered by localForage",
});

export default localforage;