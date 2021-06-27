import { useState } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";

import { Form, Col, InputGroup, FormControl, Button } from "react-bootstrap";

const defaultUser = {
  id: "",
  name: "",
  age: "",
};

// debounce

const UserForm = ({ addUser }) => {
  const [user, setUser] = useState(defaultUser);

  const handleInput = (e) => {
    const prop = e.target.name;
    const value = e.target.value;

    setUser({
      ...user,
      [prop]: value,
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    // validaciones
    addUser({ ...user, id: shortid.generate() });
  };

  return (
    <Col md={6}>
      <h3>Creación de usuarios</h3>
      <Form onSubmit={createUser}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Nombre"
            name="name"
            onChange={handleInput}
            aria-label="Nombre"
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Edad"
            name="age"
            onChange={handleInput}
            aria-label="Edad"
          />
        </InputGroup>
        <Button type="submit" className="w-100">
          Agregar
        </Button>
      </Form>
    </Col>
  );
};

UserForm.propTypes = {
  addUser: PropTypes.func.isRequired,
};

export default UserForm;
