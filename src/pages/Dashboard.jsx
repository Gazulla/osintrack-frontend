/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NarrativeCard from "../components/NarrativeCard";
import NarrativeCreate from "../components/NarrativeCreate";
import { narrativeList } from "../actions/narrativeActions";

export default function Dashboard() {
  const narratives = useSelector((state) => state.narrativeList.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(narrativeList());
  }, []);

  return (
    <>
      <NarrativeCreate />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-3">
        {narratives.map((narrative) => {
          return <NarrativeCard key={narrative._id} narrative={narrative} />;
        })}
      </div>
    </>
  );
}
