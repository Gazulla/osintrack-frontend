import NarrativeCard from "../components/NarrativeCard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-3">
      <NarrativeCard />
    </div>
  );
}
