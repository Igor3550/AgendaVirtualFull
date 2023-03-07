import { useState } from "react";
import { Outlet } from "react-router-dom";
import FloatConfigButton from "../../../components/FloatConfigButton";

import { NavigationBar } from "../../../components/NavigationBar";
import ConfigPage from "../ConfigPage/ConfigPage";
import { 
  DashboardArea,
  Container
} from "./styles";

const Dashboard = () => {
  const [ configView, setConfigView ] = useState(false);

  return (
    <DashboardArea>
      <Container>
        <Outlet />
        <ConfigPage view={configView} setView={setConfigView} />
      </Container>
      <NavigationBar />
      <FloatConfigButton onClick={ () => setConfigView(true) } />
    </DashboardArea>
  )
}

export default Dashboard;