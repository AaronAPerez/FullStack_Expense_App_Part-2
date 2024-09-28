import { useState } from "react";
import { Container, Row, Col, Button, Form, Card, CardText } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/UselocalStorage";
import { getLoggedInUser, login } from "../Services/DataService";
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
  const { setItem: setUserLocalStorage } = useLocalStorage("user");
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
      const userInfo = await getLoggedInUser(data.username);
      setUserLocalStorage(userInfo);
      onLogin(userInfo);
      toast.success(`Welcome back, ${data.username}!`);
      navigate('/Dashboard');
    } else {
      toast.error("Login failed. Please check your credentials.");
    }
  };


  return (
    <>
      <Container className="form-container">
        <Card className="LoginCard">
          <Card.Header className="text-center h5">Login</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                <CardText>
                {errors.password && (
                  <div className="text-danger">{errors.password.message}</div>
                )}
                </CardText>
              </Form.Group>
              <Form.Group as={Row} className="my-3" controlId="ConfirmPassword">
                <Col sm={{ span: 10 }}>
                  <Button variant="outline-success" type="submit">
                    Login
                  </Button>
                </Col>
              </Form.Group>
              <p className="fw-light">Don't have an account?</p>
              <Form.Group as={Row} className="my-3">
                <Col sm={{ span: 10 }}>
                  <Button variant="outline-primary" onClick={() => navigate('/CreateAccount')}>
                    Create Account
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;

