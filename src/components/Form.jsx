import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faSave,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [site, setSite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showFormPassword, setshowFormPassword] = useState(false);
  const [passwords, setPasswords] = useState(() => {
    const response = localStorage.getItem("passwords");
    const data = JSON.parse(response);
    return data ? data : [];
  });

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    if (errors.website || errors.username || errors.password) {
      toast.error("Please fill out all required fields!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [errors]);

  const onSubmit = (data) => {
    if (editIndex === null) {
      setPasswords([
        ...passwords,
        {
          site: data.website,
          username: data.username,
          password: data.password,
          showPassword: false, // Add this line
        },
      ]);
      toast.success("Password save successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const updatedPasswords = passwords.map((item, index) =>
        index === editIndex
          ? {
              site: data.website,
              username: data.username,
              password: data.password,
              showPassword: item.showPassword,
            }
          : item
      );
      setPasswords(updatedPasswords);
      toast.success("Password edited successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setEditIndex(null);
    setPassword("");
    setSite("");
    setUsername("");
    reset();
  };

  const handleTogglePassword = (index) => {
    const updatedPasswords = passwords.map((item, i) =>
      i === index ? { ...item, showPassword: !item.showPassword } : item
    );
    setPasswords(updatedPasswords);
  };

  const handleToggleFormPassword = () => {
    setshowFormPassword(!showFormPassword);
  };

  const changeEditIndex = (index) => {
    setEditIndex(index);
    setSite(passwords[index].site);
    setUsername(passwords[index].username);
    setPassword(passwords[index].password);
  };

  const deletePassword = (index) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this password?"
    );
    if (confirmed) {
      setPasswords(passwords.filter((_, i) => i !== index));
      toast.success("Password deleted successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-center mt-8 text-xl flex flex-col gap-3 items-center w-10/12 mx-auto"
      >
        <div className="w-full flex max-sm:flex-wrap justify-center items-center">
          <label htmlFor="website-name" className="w-2/12 max-sm:w-full">
            {" "}
            Website:{" "}
          </label>
          <input
            className={`h-12 p-3 border-2 rounded-full w-10/12 outline-none max-sm:w-full ${
              errors.website ? "border-red-500" : "border-black "
            } `}
            placeholder="Enter website"
            {...register("website", { required: true })}
            id="website-name"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            autoFocus
          />
        </div>
        <div className="w-full flex flex-wrap items-center justify-center max-sm:flex-col">
          <label htmlFor="username" className="w-2/12 max-sm:w-full">
            {" "}
            Username:{" "}
          </label>
          <input
            className={`h-12 rounded-full p-2 border-black border-2 w-5/12 max-sm:w-full max-md:w-10/12 outline-none max-md:my-3 ${
              errors.username ? "border-red-500" : "border-black "
            }`}
            placeholder="Enter username"
            {...register("username", { required: true })}
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="w-2/12 max-sm:w-full">
            {" "}
            Password:{" "}
          </label>
          <div className="relative w-3/12 max-sm:w-full max-md:w-10/12 max-md:my-3">
            <input
              className={`h-12 rounded-full p-2 border-black border-2 w-full pr-10 outline-none ${
                errors.website ? "border-red-700" : "border-black "
              }`}
              type={showFormPassword ? "text" : "password"}
              placeholder="Enter password"
              {...register("password", { required: true })}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute inset-y-0 right-0 px-3 text-gray-600"
              onClick={handleToggleFormPassword}
              type="button"
            >
              <FontAwesomeIcon icon={showFormPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="bg-green-500 p-1 py-2 w-3/5 mt-4 rounded-full cursor-pointer text-white"
        >
          {editIndex !== null ? (
            <>
              <FontAwesomeIcon icon={faSave} className="mr-4" />
              Save Password{" "}
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSave} className="mr-4" />
              Add Password{" "}
            </>
          )}
        </button>
      </form>

      <div className="mt-4 w-[80%] mx-auto">
        {passwords.length > 0 ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Stored Passwords</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="text-white">
                    <th className="p-3 bg-green-500 rounded-tl-2xl">Site</th>
                    <th className="p-3 bg-green-500">Username</th>
                    <th className="p-3 bg-green-500">Password</th>
                    <th className="p-3 bg-green-500 rounded-tr-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {passwords.map((item, index) => (
                    <tr
                      key={index}
                      className="even:bg-green-100 hover:bg-gray-100"
                    >
                      <td className="p-3 text-center">{item.site}</td>
                      <td className="p-3 text-center">{item.username}</td>
                      <td className="p-3 text-center">
                        {item.showPassword ? item.password : "••••••••"}
                        <button
                          className="ml-2 text-blue-500 hover:text-blue-700"
                          onClick={() => handleTogglePassword(index)}
                        >
                          <FontAwesomeIcon
                            icon={item.showPassword ? faEyeSlash : faEye}
                            className="ml-2"
                          />
                        </button>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          className="m-2"
                          onClick={() => changeEditIndex(index)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button
                          className="m-2"
                          onClick={() => deletePassword(index)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div>No passwords stored.</div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Form;
