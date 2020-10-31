import React, { useState } from "react";
import { Links } from "../components/links";
import { postLogin } from "../services/rest_service";

export type LoginInputs = {
  email: string
  password: string
}

function Page() {
  const initialValues: LoginInputs = { email: "", password: "", };

  const [inputs, setInputs] = useState(initialValues);
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await postLogin(inputs);
    if (res) setError(res);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return <>
    <Links/>

    {error ? <p>Error: {error}</p> : null}

    <form className="container mx-auto max-w-sm" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleInputChange} value={inputs.email} placeholder="rickety_cricket@example.com"/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" onChange={handleInputChange} value={inputs.password} placeholder="********"/>
      </div>
      <div>
        <small><strong>user:</strong> rickety_cricket@example.com</small>
        <small><strong>password:</strong> shhh!</small>
      </div>
      <button type="submit">Login</button>
    </form>
  </>;
}

export default Page;
