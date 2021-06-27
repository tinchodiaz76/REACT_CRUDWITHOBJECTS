import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { Col, Table, Modal, Form} from "react-bootstrap";
//import shortid from "shortid";

const defaultUserModif = {
  id: "",
  name: "",
  age: "",
};


// eslint-disable-next-line react/prop-types
const UsersList = ({ users, deleteUser, saveChangeUser}) => {

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  
  const [id, setId]=useState("");
  const [age, setAge]=useState("");
  const [name, setName]=useState("");
  
  const [user_modif, setUser] = useState(defaultUserModif);

  const [estado, setEstado] = useState(true);

  
  const showModal = (accion,item)=> {
    //setIsOpen(true);
    //window.alert(accion);

    if (accion==="E")
    {    
      setIsOpenEdit(true);
      setIsOpenDelete(false);
    }
    else
    {
      setIsOpenEdit(false);
      setIsOpenDelete(true);
    }
    
    setAge(item.age);
    setName(item.name);
    setId(item.id);
  };

  const hideModal = () => {
    setIsOpenEdit(false);
    setIsOpenDelete(false);  
  };
  
  const handleChange = (e) => {

    const prop= e.target.name;
    const value= e.target.value;

    if (value==="")
    {
      window.alert("El campo " +  prop + " no puede estar vacio");
      setEstado(false);
    }
    else
    {
      setUser({
        ...user_modif,
        [prop]: value,
      });
      setEstado(true);
    }
  };
  
  
  const onDelete = (id) => {
    deleteUser(id);

    setIsOpenDelete(false);

  };


  const onSaveChange =(user_modif, id) =>{
    if (estado=== true)
    {
      saveChangeUser(user_modif,id);

      hideModal();
    }
  };
  
  console.log(users);

  return (
    <>
      <Col md={6} className="table-data">
        <Table bordered hover>
          <thead>
            <tr>
              <th># </th>
              <th>Nombre</th>
              <th>Edad</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users?.length > 0 &&
              users.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>✏️<button onClick={() => showModal("E",item)}>Edit</button></td>
                  <td>❌<button onClick={() => showModal("D",item)}>Delete</button></td>
                </tr>
              ))}
          </tbody>
          
        </Table>
      </Col>

      <Modal show={isOpenEdit} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>
            Usuario:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name: </Form.Label>
            <Form.Control type="text" defaultValue= {name}  name="name" onChange={handleChange} placeholder="name input"/>
            <Form.Label>Age: </Form.Label>
            <Form.Control  type="text" defaultValue={age} name="age" onChange={handleChange} placeholder="age input"/>
            <Form.Label>ID: </Form.Label>
            <Form.Control  type="text" value={id} name="id" placeholder="id"/>  
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          <button onClick={() => onSaveChange(user_modif, id)}>Save</button>
        </Modal.Footer>
      </Modal>




      <Modal show={isOpenDelete} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>
            Eliminar Usuario:
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <p>Esta seguro que desea eliminar el usuario?</p>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button>
          <button onClick={() => onDelete(id)}>Yes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      age: PropTypes.number,
    }).isRequired
  ),
};

export default UsersList;