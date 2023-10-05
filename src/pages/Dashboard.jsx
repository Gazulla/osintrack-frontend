import NarrativeCard from "../components/NarrativeCard";
import NarrativeAdd from "../components/NarrativeAdd";

export default function Dashboard() {
  const narratives = [
    { id: 0, title: "Pro Ucraine", description: "Ucranian narratives used in war", image: "/images/ucraine.png" },
    { id: 1, title: "Pro Russia", description: "Russian narratives used in war", image: "/images/russia.png" },
  ];
  return (
    <>
      <NarrativeAdd />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 m-3">
        {narratives.map((narrative) => {
          return <NarrativeCard key={narrative.id} narrative={narrative} />;
        })}
      </div>
    </>
  );
}
