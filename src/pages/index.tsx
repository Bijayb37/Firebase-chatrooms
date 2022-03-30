import { Container } from "../components/Container"
import { DarkModeSwitch } from "../components/DarkModeSwitch"
import Sidebar from "../components/Sidebar"

const Home = () => {

  return (
    <Container alignItems="flex-start" height="100vh">
      <Sidebar />
    </Container>
  )
}

export default Home