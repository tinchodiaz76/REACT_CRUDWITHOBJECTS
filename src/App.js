import "./App.css";
import { Container, Row } from "react-bootstrap";

import UsersList from "./components/UsersList";
import UserForm from "./components/UserForm";
import Header from "./components/Header";
import { useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  
  const addUser = (user) => {
    console.log("addUser, user=" + user);
    setUsers([user, ...users]);
  };
  
  const deleteUser = (id) => {
    console.log("deleteUser, id=" + id);

    const DeleteUser= users.filter((it) => it.id !== id);
    setUsers(DeleteUser);
  };


  const saveChangeUser=(user_modif,id) => {
    
    const ReplaceUser= users.map((it) => {
      if (it.id===id)
      {
        if (user_modif.name==="")
        {
          if (user_modif.age==="")
          {
            return {...it, 
              name: it.name,
              age : it.age,
            };
          }
          else
          {
            return {...it, 
              name: it.name,
              age :user_modif.age,
            };
          }
        }
        else
        {
          if (user_modif.age===""){
            return {...it, 
              name: user_modif.name,
              age :it.age,
            };
          }
          else
          {
            return {...it, 
              name: user_modif.name,
              age :user_modif.age,
            };
          }
        }
      }
    });
    
    setUsers(ReplaceUser);
  };

  return (
    <Container className="base-elements">
      <Header />
      <Row>
        <UserForm addUser={addUser} />
        <UsersList users={users}  deleteUser={deleteUser} saveChangeUser={saveChangeUser} />
      </Row>
    </Container>
  );
};

export default App;
