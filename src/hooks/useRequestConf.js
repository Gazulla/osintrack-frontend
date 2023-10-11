export default function useRequestConf({ getState, uploadFiles = false }) {
  const {
    login: { user },
  } = getState();

  const config = {
    headers: {
      "Content-type": uploadFiles ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${user?.token}`,
    },
  };

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  return { config, apiUrl };
}
