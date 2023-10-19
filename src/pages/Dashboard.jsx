/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import NarrativeCard from "../components/NarrativeCard";
import NarrativeCreate from "../components/NarrativeCreate";
import { narrativeList } from "../actions/narrativeActions";
import Loading from "../components/Loading";

export default function Dashboard() {
  const [loadingPage, setLoadingPage] = useState(true);
  const { loading: loadingData, list: narratives } = useSelector((state) => state.narrativeList);
  const dispatch = useDispatch();

  const sortedNarratives = [...narratives].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    dispatch(narrativeList());
    setLoadingPage(false);
  }, []);

  if (loadingPage || loadingData) {
    return (
      <div className="flex items-center w-full justify-center m-5">
        <Loading color="primary" labelColor="primary" />
      </div>
    );
  }

  return (
    <>
      <NarrativeCreate />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-3">
        {sortedNarratives.map((narrative) => {
          return <NarrativeCard key={narrative._id} narrative={narrative} />;
        })}
      </div>
    </>
  );
}
