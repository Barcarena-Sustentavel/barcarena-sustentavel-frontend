export const setToken = (token: string) => {
  localStorage.setItem("temitope", token); // make up your own token
};

export const fetchToken = () => {
  return localStorage.getItem("temitope");
};
