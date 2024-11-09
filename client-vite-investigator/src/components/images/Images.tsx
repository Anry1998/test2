import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function Images() {
  return (
    <Container>
      <Row>
        {/* <img width={200} height={200}  src='https://upload.wikimedia.org/wikipedia/commons/b/b8/Leopard_in_the_Colchester_Zoo.jpg'></img> */}
        {/* <Col xs={10} md={4}>
          <Image width={180} height={171} src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Leopard_in_the_Colchester_Zoo.jpg" rounded />
        </Col> */}
        <Col xs={15} md={4}>
          <Image width={180} height={171} src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Leopard_in_the_Colchester_Zoo.jpg" roundedCircle />
        </Col>
        {/* <Col xs={10} md={4}>
          <Image width={180} height={171} src="https://upload.wikimedia.org/wikipedia/commons/b/b8/Leopard_in_the_Colchester_Zoo.jpg" thumbnail />
        </Col> */}
      </Row>
    </Container>
  );
}

export default Images;