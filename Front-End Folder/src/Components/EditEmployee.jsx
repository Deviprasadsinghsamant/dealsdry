import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile_no: "",
    course: [],
    category_id: "",
    gender: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
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

    // Fetch employee details
    axios
      .get("http://localhost:3000/auth/employee/" + id)
      .then((result) => {
        const data = result.data.Result[0];
        setEmployee({
          name: data.name,
          email: data.email,
          mobile_no: data.mobile_no,
          course: JSON.parse(data.course), // Parse course if stored as JSON
          category_id: data.category_id,
          gender: data.gender,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

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
    axios
      .put("http://localhost:3000/auth/edit_employee/" + id, {
        ...employee,
        course: JSON.stringify(employee.course), // Convert to JSON string for backend
      })
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
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
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
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
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
              value={employee.mobile_no}
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
                  checked={employee.course.includes("React")}
                  onChange={handleCheckboxChange}
                />
                React
              </label>
              <label className="form-check-label ms-3">
                <input
                  type="checkbox"
                  value="Node.js"
                  className="form-check-input me-1"
                  checked={employee.course.includes("Node.js")}
                  onChange={handleCheckboxChange}
                />
                Node.js
              </label>
              <label className="form-check-label ms-3">
                <input
                  type="checkbox"
                  value="Python"
                  className="form-check-input me-1"
                  checked={employee.course.includes("Python")}
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
                  checked={employee.gender === "Male"}
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
                  checked={employee.gender === "Female"}
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
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
