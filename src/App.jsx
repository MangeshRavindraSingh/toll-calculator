import "./App.css";
import Headers from "./components/Header/Header";
import Container from "react-bootstrap/Container";
import UserEducation from "./components/UserEducation/UserEduction";
import RouteVisual from "./components/RouteVisual/RouteVisual";

function App() {

  return (
    <>
      <Headers />
      <Container fluid>
        <UserEducation />
        <RouteVisual />
      </Container>
    </>
  );
}

export default App;
