const LogInForm = ({ handleChange }) => {
  return (
    <form>
      <div className="form-group">
        <label>Username:</label>
        <input type="text" name="Username" onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" name="Password" onChange={handleChange} />
      </div>
    </form>
  );
};

export default LogInForm;
