import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUser, login } from "../Services/DataService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { toast } from "react-toastify";


// Define a Zod schema for form validation
const schema = z.object({
  username: z.string().min(2, "Username is required"),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});

type FormData = z.infer<typeof schema>;


const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    let token = await login(data);
    console.log(token.token, "This should log the token");
    if (token.token != null) {
      localStorage.setItem("Token", token.token);
      await GetLoggedInUser(data.username);
      toast.success(`Welcome back, ${data.username}!`);
      navigate('/Dashboard');
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="form-container d-flex justify-content-center">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-center">Login</p>
              <Form.Group className="mb-3" controlId="Username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-danger">{errors.username.message}</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter Password"
                    {...register("password")}
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y pe-2"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    style={{ cursor: "pointer" }}
                  >
                    {passwordVisible ? (
                      <LiaEyeSlashSolid size={22} />
                    ) : (
                      <LiaEyeSolid size={22} />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </Form.Group>

              <Button variant="outline-primary" type="submit">
                Login
              </Button>

              <p className="pt-4 fw-light">Don't have an account?</p>
              <Button variant="outline-success" onClick={() => navigate('/CreateAccount')}>
                Create Account
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

