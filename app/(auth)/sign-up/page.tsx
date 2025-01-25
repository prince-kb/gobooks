"use client";


import AuthForm from "@/components/ui/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{ email: "", password: "",fullName : "",universityId: "",universityCard : ""}}
    onSubmit={()=>{}}
  />
);

export default page;
