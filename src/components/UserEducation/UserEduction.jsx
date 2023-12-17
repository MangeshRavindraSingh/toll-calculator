import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';
import "./UserEducation.css"

const UserEducation = () => {
  return (
    <Row>
      <Col className="p-5">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
        <Accordion.Header><Card.Title>Toll Calculation Guide</Card.Title></Accordion.Header>
        <Accordion.Body className="bg-light">
            <Card.Subtitle className="mb-2 text-muted">
              To calculate the toll for your specific journey, you need to know
              the vehicle type and the entry and exit points on the expressway.
            </Card.Subtitle>
            <Card.Text>
              <ol>
                <li>
                  Use the formula: Toll Amount = Distance Travelled (km) * Toll
                  Rate per km (based on vehicle type){" "}
                </li>
                <li>
                  For example, if you travel from Mumbai (Entry Point) to Wardha
                  (Exit Point) in a car (Light Motor Vehicle): Distance
                  Travelled = 320 km (approximate distance between entry and
                  exit points) Toll Rate per km = Rs. 1.73 Toll Amount = 320 km
                  * Rs. 1.73 = Rs. 550.40
                </li>
              </ol>
            </Card.Text>

            <Card.Subtitle className="mb-2 text-muted">
              *The toll rates are categorized based on vehicle type:
            </Card.Subtitle>
            <Card.Text>
              <ul>
                <li>Light Motor Vehicle (Car, Jeep): Rs. 1.73 per km</li>
                <li>Light Motor Commercial Vehicle (LMCV): Rs. 2.79 per km</li>
                <li>Heavy Vehicle (two axle bus, truck): Rs. 5.85 per km</li>
                <li>
                  Heavy commercial vehicles (three axle vehicles): Rs. 6.38 per
                  km
                </li>
              </ul>
            </Card.Text>
        </Accordion.Body>
        
        </Accordion.Item>
      </Accordion>
      </Col>
    </Row>
  );
};
export default UserEducation;
