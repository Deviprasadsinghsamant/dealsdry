import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    mobile_no: "",
    course: [],
    category_id: "",
    image: "",
    gender: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setEmployee((prevState) => {
      const courses = prevState.course.includes(value)
        ? prevState.course.filter((course) => course !== value)
        : [...prevState.course, value];
      return { ...prevState, course: courses };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append("mobile_no", employee.mobile_no);
    formData.append("course", JSON.stringify(employee.course)); // Send as JSON string
    formData.append("image", employee.image);
    formData.append("category_id", employee.category_id);
    formData.append("gender", employee.gender);

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputMobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputMobile"
              placeholder="Enter Mobile Number"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, mobile_no: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label className="form-label">Course</label>
            <div>
              <label className="form-check-label">
                <input
                  type="checkbox"
                  value="React"
                  className="form-check-input me-1"
                  onChange={handleCheckboxChange}
                />
                React
              </label>
              <label className="form-check-label ms-3">
                <input
                  type="checkbox"
                  value="Node.js"
                  className="form-check-input me-1"
                  onChange={handleCheckboxChange}
                />
                Node.js
              </label>
              <label className="form-check-label ms-3">
                <input
                  type="checkbox"
                  value="Python"
                  className="form-check-input me-1"
                  onChange={handleCheckboxChange}
                />
                Python
              </label>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">Gender</label>
            <div>
              <label className="form-check-label">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="form-check-input me-1"
                  onChange={(e) =>
                    setEmployee({ ...employee, gender: e.target.value })
                  }
                />
                Male
              </label>
              <label className="form-check-label ms-3">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="form-check-input me-1"
                  onChange={(e) =>
                    setEmployee({ ...employee, gender: e.target.value })
                  }
                />
                Female
              </label>
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Designation
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
