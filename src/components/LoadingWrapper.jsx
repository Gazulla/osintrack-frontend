/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loading from "./Loading";

export default function LoadingWrapper({ loadingData, dispatchFunction, dispatchParams, children }) {
  const [loadingPage, setLoadingPage] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dispatchFunction(dispatchParams));
    setLoadingPage(false);
  }, []);
  if (loadingPage || loadingData) {
    return (
      <div className="flex items-center w-full justify-center m-5">
        <Loading color="primary" labelColor="primary" />
      </div>
    );
  }

  return children;
}
