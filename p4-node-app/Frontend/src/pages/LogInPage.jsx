import React, { useState, useContext, useEffect } from "react";
import Modal from "../components/Modal";
import LogInForm from "../view/loginform";
import CreateLogIn from "../controller/addlogin";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import userModel from "../model/usermodel";
import { AuthContext } from "../model/providers/authprovider";

const LoginPage = () => {
  const [state, dispatch] = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logIn, setLogIn] = useState({
    Username: "",
    Password: "",
  });

  useEffect(() => {
    checkTokenExpiration();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogIn({
      ...logIn,
      [name]: value,
    });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const token = await userModel.login(logIn.Username, logIn.Password);
      dispatch({ type: "SAVE_TOKEN", payload: token });
      if (token) {
        closeModal();
        toast.success("Log In Success");
        console.log("Log In Success");

        setLogIn({
          Username: "",
          Password: "",
        });

        navigate("/sellerhub");
      } else {
        localStorage.removeItem("token");
        toast.error("Login Fail:", "Invalid credentials");
        console.error("Login Fail: Invalid credentials");
      }
    } catch (error) {
      console.error("Login Fail:", error);
      localStorage.removeItem("token");
      setLogIn({
        Username: "",
        Password: "",
      });
    }
  };

  const checkTokenExpiration = () => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");
    if (tokenExpiration && Date.now() > parseInt(tokenExpiration)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");

      navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <LogInForm logIn={logIn} handleChange={handleChange} />
      <button type="submit" onClick={handleLogIn}>
        Login
      </button>
      <button type="submit" onClick={openModal}>
        Create New Account
      </button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div>
          <CreateLogIn closeModal={closeModal} />
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;
