import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./RouteVisual.css";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { decode } from "@googlemaps/polyline-codec";

const tollIcon = new Icon({
  iconUrl: "src/components/RouteVisual/toll-road.png",
  iconSize: [25, 25],
});

export default function App() {
  const [form, setForm] = useState({
    from: "",
    to: "",
  });
  const [route, setRoute] = useState([]);
  const [tollMarkers, setTollMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [center, setCenter] = useState([]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const callPolylineService = async (polyline) => {
    const res = await fetch(
      "/api/toll/v2/complete-polyline-from-mapping-service",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ polyline }),
      }
    );
    const jsonRes = await res.json();
    setTollMarkers(jsonRes.route.tolls);
    setLoading(false);
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const data = {
      from: {
        address: form.from,
      },
      to: {
        address: form.to,
      },
    };
    console.log("FORM: ", form);

    const res = await fetch(
      "/api/toll/v2/origin-destination-waypoints",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify(data),
      }
    );

    const jsonRes = await res.json();
    setCenter(
      findCenter(
        Object.values(jsonRes.summary.route[0].location),
        Object.values(jsonRes.summary.route[1].location)
      )
    );
    callPolylineService(jsonRes.routes[0].polyline);
    decodePolyline(jsonRes.routes[0].polyline);
  };

  const decodePolyline = (encodedPolyline) => {
    const decodedCoordinates = decode(encodedPolyline);
    setRoute(decodedCoordinates);
  };

  const findCenter = (coord1, coord2) => {
    const lat1 = coord1[0];
    const lon1 = coord1[1];
    const lat2 = coord2[0];
    const lon2 = coord2[1];

    const centerLat = (lat1 + lat2) / 2;
    const centerLon = (lon1 + lon2) / 2;

    return [centerLat, centerLon];
  };

  return (
    <div className="ms-5 me-5">
      <Card className="mb-2">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Control
                  onChange={handleChange}
                  name="from"
                  value={form.from}
                  placeholder="From"
                />
              </Col>
              <Col>
                <Form.Control
                  onChange={handleChange}
                  name="to"
                  value={form.to}
                  placeholder="to"
                />
              </Col>
              <Col>
                <Button className="bg-teal" type="submit" disabled={loading}>
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {
        <>
          {loading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
            </div>
          )}
        </>
      }
      {!loading && tollMarkers.length !== 0 && (
        <MapContainer center={center} zoom={9} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={route} color="#0275d8" />
          {tollMarkers.map((eachData) => (
            <>
              {eachData.end && eachData.start ? (
                <>
                  <Marker
                    key={eachData.end.id}
                    position={[eachData.end.lat, eachData.end.lng]}
                    icon={tollIcon}
                  >
                    <Popup>
                      <Card.Title>{eachData.end.road}</Card.Title>
                      <p>Name : {eachData.end.name}</p>
                      <p>Tag Cost : {eachData.end.tagCost}</p>
                      <p>Tag Cost Return : {eachData.end.tagCostReturn}</p>
                      <p>Cash Cost : {eachData.end.cashCost}</p>
                      <p>Cash Cost Return : {eachData.end.cashCostReturn}</p>
                      <p>Cash Cost Monthly : {eachData.end.cashCostMonthly}</p>
                    </Popup>
                  </Marker>

                  <Marker
                    key={eachData.start.id}
                    position={[eachData.start.lat, eachData.start.lng]}
                    icon={tollIcon}
                  >
                    <Popup>
                      <Card.Title>{eachData.start.road}</Card.Title>
                      <p>Name : {eachData.start.name}</p>
                      <p>Tag Cost : {eachData.tagCost}</p>
                      <p>Tag Cost Return : {eachData.tagCostReturn}</p>
                      <p>Cash Cost : {eachData.cashCost}</p>
                      <p>Cash Cost Return : {eachData.cashCostReturn}</p>
                      <p>Cash Cost Monthly : {eachData.cashCostMonthly}</p>
                    </Popup>
                  </Marker>
                </>
              ) : (
                <Marker
                  key={eachData.id}
                  position={[eachData.lat, eachData.lng]}
                  icon={tollIcon}
                >
                  <Popup>
                    <Card.Title>{eachData.road}</Card.Title>
                    <p>Name : {eachData.name}</p>
                    <p>Tag Cost : {eachData.tagCost}</p>
                    <p>Tag Cost Return : {eachData.tagCostReturn}</p>
                    <p>Cash Cost : {eachData.cashCost}</p>
                    <p>Cash Cost Return : {eachData.cashCostReturn}</p>
                    <p>Cash Cost Monthly : {eachData.cashCostMonthly}</p>
                  </Popup>
                </Marker>
              )}
            </>
          ))}
        </MapContainer>
      )}
      <br />
    </div>
  );
}
