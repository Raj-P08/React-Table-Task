import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "./Form.css";
import { addEntry } from "../redux/tableSlice";

const Form = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.table.data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const newEntry = {
      id: data.length + 1,
      ...formData,
      age: Number(formData.age),
    };
    dispatch(addEntry(newEntry));
    console.log("Form submitted:", newEntry);

    reset();
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2>Add User</h2>

        <input
          {...register("name", { required: "Name is required.." })}
          placeholder="Name"
        />

        {errors.name && <span className="error">{errors.name.message}</span>}
        <input
          {...register("age", {
            required: "Age is required..",
            min: 15,
            message: "Age must be at least 15",
          })}
          placeholder="Enter Age"
        />
        {errors.age && <span className="error">{errors.age.message}</span>}

        <input
          {...register("email", { required: "Email is required.." })}
          placeholder="Enter Email"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default Form;
