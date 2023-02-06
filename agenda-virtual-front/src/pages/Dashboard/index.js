import { Outlet } from "react-router-dom";

import { NavigationBar } from "../../components/NavigationBar";
import { 
  DashboardArea,
  Container
} from "./styles";

const Dashboard = () => {

  return (
    <DashboardArea>
      <Container>
        <Outlet />
      </Container>
      <NavigationBar />
    </DashboardArea>
  )
}

export default Dashboard;