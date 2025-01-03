import DashboardLayout from "../../components/Dashboard/DashboardLayout";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { classes, locations, modes } from "../../constants/Dashboard";
import { BASE_URL } from "../../../src/Service/helper";
import "react-datepicker/dist/react-datepicker.css";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const AddStudent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [credentials, setCredentials] = useState({
    name: "",
    class: "",
    location: "",
    phone: "",
    school: "",
    aadhar: "",
    dob: "",
    inAnokhiPehel: "",
    address: "",
    discription: "",
    photo: "",
    mentorId: user._id,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(showLoading());
    const formData = new FormData();
    formData.append("name", credentials.name);
    formData.append("class", credentials.class);
    formData.append("phone", credentials.phone);
    formData.append("location", credentials.location);
    formData.append("aadhar", credentials.aadhar);
    formData.append("dob", credentials.dob);
    formData.append("address", credentials.address);
    formData.append("discription", credentials.discription);
    formData.append("inAnokhiPehel", credentials.inAnokhiPehel);
    formData.append("school", credentials.school);
    formData.append("photo", credentials.photo);
    formData.append("mentorId",user._id);
    axios
      .post(`${BASE_URL}/addStudentAdmission`, formData)
      .then((res) => {
        console.log(res);

        if (res.data === "Student Admission Added") {
          alert("Student submitted successfully!");
          setCredentials({
            name: "",
            class: "",
            phone: "",
            school: "",
            location: "",
            dob: "",
            inAnokhiPehel:"",
            address: "",
            discription: "",
            photo: "",
          });
        } else if (
          res.data === "Student with this Aadhar number already exists"
        ) {
          alert("Student with this Aadhar number already exists");
        } else {
          alert("Student Not Added!");
        }
      })
      .catch((err) => {
        alert("ALL INPUT IS NOT FILLED");
        console.log("error", err);
        dispatch(hideLoading())
      })
      .finally(() => {
        dispatch(hideLoading());
      });
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onPhotoChange = (e) => {
    setCredentials({ ...credentials, photo: e.target.files[0] });
  };

  return (
    <DashboardLayout>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
              <h2 className="text-base font-bold leading-7 text-gray-900">
                Add Student Details
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        value={credentials.name}
                        onChange={onChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Class
                  </label>
                  <div className="mt-2">
                    <select
                      name="class"
                      id="class"
                      value={credentials.class}
                      onChange={onChange}
                      placeholder="Class"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a class</option>
                      {classes.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                     
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Location
                  </label>
                  <div className="mt-2">
                    <select
                      name="location"
                      id="location"
                      value={credentials.location}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Location</option>
                      {locations.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.location}
                        </option>
                      ))}
                      
                    </select>
                    {credentials.location === "other" && (
                      <div className="mt-3">
                        <label htmlFor="otherLocation" className="form-label">
                          Other Location
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="otherLocation"
                          placeholder="Other Location"
                          value={credentials.otherLocation}
                          onChange={onChange}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"> */}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    School
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="school"
                      id="school"
                      value={credentials.school}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={credentials.phone}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="aadhar"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Aadhar Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="aadhar"
                      name="aadhar"
                      type="aadhar"
                      value={credentials.aadhar}
                      onChange={onChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Date of Birth
                  </label>
                  <div className="mt-2">
                    <input
                      type="Date"
                      className="form-control"
                      name="dob"
                      placeholder="Date of Birth"
                      value={credentials.dob}
                      onChange={onChange}
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="class"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    In Anokhi Pehel
                  </label>
                  <div className="mt-2">
                    <select
                      name="inAnokhiPehel"
                      id="inAnokhiPehel"
                      value={credentials.inAnokhiPehel}
                      onChange={onChange}
                      placeholder="in Anokhi Pehe?"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">In Anokhi Pehel</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                      
                    </select>
                  </div>
                </div>








               


                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Complete Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="address"
                      name="address"
                      value={credentials.address}
                      onChange={onChange}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Mention all possible details.
                  </p>
                </div>
                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Add Discription
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="discription"
                      name="discription"
                      value={credentials.discription}
                      onChange={onChange}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Mention the reason to dropout from school, background and the help Anokhi Pehel provided.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Photo
                  </label>
                  <input
                    type="file"
                    name="photo"
                    accept=".png, .jpg, .jpeg,capture=camera"
                    // Specify 'camera' to use the device's camera
                    onChange={onPhotoChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddStudent;
