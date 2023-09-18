class UserModel {
    constructor() {}
  
    async login(Username, Password) {
      try {
        const response = await fetch("http://localhost:8080/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            
          },
          body: JSON.stringify({ Username, Password }), 
        });
  
        if (response.ok) {
          const data = await response.json();
          return data.token; 
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        throw error; 
      }
    }
  }
  
 const userModel = new UserModel()
  export default userModel;
  