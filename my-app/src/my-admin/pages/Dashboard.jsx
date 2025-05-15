import React from "react";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// GeoJSON URL for world map
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const Dashboard = () => {
  return (
    <Container fluid className="bg-light p-4 min-vh-100">
      {/* Breadcrumb */}
      <div className="text-muted mb-4" style={{ textAlign: 'start' }}>
        <h3 style={{ fontFamily: 'sans-serif',fontSize:'25px' }}>Dashboard</h3>
      </div>

      {/* Top Cards */}
      <Row className="mb-4">
        {[
          { title: "Total Orders", value: 3, icon: "🛒" },
          { title: "Total Sales", value: 515, icon: "💳" },
          { title: "Total Customers", value: 2, icon: "👤" },
          { title: "People Online", value: 0, icon: "👥" },
        ].map((card, idx) => (
          <Col md={3} sm={6} xs={12} key={idx} className="mb-3">
            <Card style={{ backgroundColor: '#3498db', border: 'none', color: '#fff' }}>
              <Card.Header
                style={{
                  backgroundColor: '#2980b9',
                  borderBottom: '1px solid #3498db',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#e0f0ff',
                }}
              >
                {card.title}
                <span style={{ float: 'right', fontSize: '0.75rem' }}>0%</span>
              </Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={{ fontSize: '3rem', opacity: 1 }}>{card.icon}</div>
                </div>
                <h1 className="m-0">{card.value}</h1>
              </Card.Body>
              <Card.Footer
                style={{
                  backgroundColor: '#2980b9',
                  color: '#fff',
                  fontSize: '0.8rem',
                  textDecoration: 'underline',
                }}
              >
                View more...
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Map and Sales Analytics */}
      <Row className="mb-4">
        {/* World Map */}
        <Col lg={6} className="mb-3">
          <Card style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
            <Card.Header
              style={{
                backgroundColor: '#f9f9f9',
                fontWeight: 'bold',
                fontSize: '14px',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              🌍 World Map
            </Card.Header>
            <Card.Body
              style={{
                backgroundColor: '#eaf4fb',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <ComposableMap projectionConfig={{ scale: 100 }} width={500} height={300}>
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill: "#D6D6DA",
                            outline: "none",
                          },
                          hover: {
                            fill: "#3498db",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#2c3e50",
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
              </ComposableMap>
            </Card.Body>
          </Card>
        </Col>

        {/* Sales Analytics */}
        <Col lg={6} className="mb-3">
          <Card style={{ border: '1px solid #ddd', borderRadius: '4px' }}>
            <Card.Header
              style={{
                backgroundColor: '#f9f9f9',
                fontWeight: 'bold',
                fontSize: '14px',
                borderBottom: '1px solid #ddd',
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              📊 Sales Analytics
            </Card.Header>
            <Card.Body
              style={{
                backgroundColor: '#eaf4fb',
                height: '300px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
              }}
            >
              <span style={{ color: '#666' }}>Chart Placeholder</span>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity & Latest Orders */}
      <Row>
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              <p className="text-muted mb-0">No recent order yet.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-3">
          <Card className="shadow-sm">
            <Card.Header>Latest Orders</Card.Header>
            <Card.Body className="p-0">
              <Table striped bordered hover responsive className="mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      No orders found!
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Footer */}
      <footer className="text-center text-muted mt-5">
        CourseOrder Admin © {new Date().getFullYear()} All Rights Reserved.<br />
        Version 1.0.0
      </footer>
    </Container>
  );
};

export default Dashboard;
