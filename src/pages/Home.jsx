import { useNavigate } from "react-router-dom";
import Graph from "../components/Graph";
import Info from "../components/Info";
import CustomButton from "../components/CustomButton";

export default function Home() {
  const navigate = useNavigate();

  function handleRedirect() {
    navigate("/protected/spending");
  }

  return (
    <div className="flex flex-col md:flex-row gap-20 md:gap-8 px-4 md:px-12 items-center md:items-start max-w-[1200px] w-full">
      <div className="flex flex-col gap-8">
        <Info spending="1,200.23" />

        <CustomButton onClick={handleRedirect} label="SEE ALL SPENDING" />
      </div>
      <Graph />
    </div>
  );
}
