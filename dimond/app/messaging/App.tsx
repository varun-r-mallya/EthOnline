import LoginView from "./views/LoginView";
import { useClient } from "./hooks/useClient";
import HomeView from "./views/HomeView";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { ElipseCentre, ElipseLeft, ElipseRight } from "@/components/svgs/Elipse";

TimeAgo.addDefaultLocale(en);

function App() {
  const client = useClient();

  return client ? <HomeView /> : <LoginView />;

}

export default App;
