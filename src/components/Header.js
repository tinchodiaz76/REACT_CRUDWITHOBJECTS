import { memo } from "react";
import { Col, Row } from "react-bootstrap";

const Header = () => {
  return (
    <Row>
      <Col md={12}>
        <header>
          <h1 className="text-center">Header de Fran 🚀</h1>
        </header>
      </Col>
    </Row>
  );
};
// el componente queda memorizado cuando no cambian ni el estado del componente ni las props que llegan al componente
export default memo(Header);
