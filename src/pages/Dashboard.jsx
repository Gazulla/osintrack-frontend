/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import NarrativeCard from "../components/NarrativeCard";
import NarrativeCreate from "../components/NarrativeCreate";
import { narrativeList } from "../actions/narrativeActions";
import LoadingWrapper from "../components/LoadingWrapper";

export default function Dashboard() {
  const { loading: loadingData, list: narratives } = useSelector((state) => state.narrativeList);

  const sortedNarratives = [...narratives].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <LoadingWrapper loadingData={loadingData} dispatchFunction={narrativeList}>
      <NarrativeCreate />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-3">
        {sortedNarratives.map((narrative) => {
          return <NarrativeCard key={narrative._id} narrative={narrative} />;
        })}
      </div>
    </LoadingWrapper>
  );
}
