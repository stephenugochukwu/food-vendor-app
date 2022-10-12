const validation = (formData) => {
  let errors = {};
  if (formData.fullName === "") {
    errors.fullName = "Full Name is required";
  }
  if (formData.phoneNumber === "") {
    errors.phoneNumber = "Phone Number is required";
  }
  if (formData.email === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is invalid";
  }

  if (formData.password === "") {
    errors.password = "Password is required";
  }
  if (formData.confirm_password !== formData.password) {
    errors.confirm_password = "Passwords do not match";
  }
  return errors;
};

export default validation;
