import { useState } from "react";
import LogInForm from "../view/loginform";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateLogIn = ({ closeModal }) => {
  const [logIn, setLogIn] = useState({
    Username: "",
    Password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target; 
    setLogIn({
      ...logIn,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/create_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logIn),
      });

      if (response.ok) {
        closeModal()
        toast.success("Successfully created an account")
        console.log('Succesfully created an account')
        setLogIn({
            Username:"",
            Password:""
        })
        const savedLogIn = await response.json();
        console.log("Account created:", savedLogIn);
      } else {
        toast.error("Error creating new account:", response.statusText)
        console.error("Error creating new account:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating new account:", error);
    }
  };

  return (
    <div className="addProductsForm">
      <h1>Create New Account</h1>
     
        <LogInForm logIn={logIn} handleChange={handleChange} />
        <div>
          <button type="submit" onClick={handleSubmit}>
            Create Account
          </button>
        </div>
      
    </div>
  );
};

export default CreateLogIn;
