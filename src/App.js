import "./App.css";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const columns = [
  { field: "serviceName", headerName: "NAME", width: 300 },
  { field: "createdBy", headerName: "CREATED BY", width: 200 },
  { field: "created", headerName: "CREATED", width: 200 },
  {
    field: "modified",
    headerName: "modified",
    width: 200,
  },
];

function App() {
  const [state, setState] = useState([]);
  const [form, setForm] = useState({
    name: "",
    user: "",
  });

  useEffect(() => {
    fetch("http://localhost:9000/data")
      .then((response) => response.json())
      .then((data) =>
        data === undefined || data === null ? setState([]) : setState(data)
      );
  }, []);

  const addHandler = async () => {
    const record = {
      serviceName: form.name,
      createdBy: form.user,
    };

    const response = await fetch("http://localhost:9000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(record), // body data type must match "Content-Type" header
    });
    console.log(response);
    const newRecord = await response.json(); // parses JSON response into native JavaScript objects
    setState((prevState) => [...prevState, newRecord]);
  };

  return (
    <div className="App">
      <table>
        <tr>
          <th>NAME</th>
          <th>CREATED</th>
          <th>MODIFIED</th>
          <th>CREATED BY</th>
        </tr>
        {state.map((value, index) => (
          <tr id={index}>
            <td>{value.serviceName}</td>
            <td>{value.created}</td>
            <td>{value.modified}</td>
            <td>{value.createdBy}</td>
          </tr>
        ))}
      </table>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Name"
            value={form.name}
            onChange={(event) =>
              setForm((prevState) => {
                return { ...prevState, name: event.target.value };
              })
            }
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-Created"
            label="Created By"
            value={form.user}
            onChange={(event) =>
              setForm((prevState) => {
                return { ...prevState, user: event.target.value };
              })
            }
          />
        </div>
        <div>
          <Button variant="contained" onClick={addHandler}>
            Add
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default App;
