import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../Services/DataService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { toast } from "react-toastify";

const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message:
        "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

const CreateAccount = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      await createAccount({ username: data.username, password: data.password });
      toast.success("Account created successfully. Please log in.");
      navigate('/Login');
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <Container>
      <Row>
        <Col className="form-container d-flex justify-content-center">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-center">Create Account</p>
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

            <Form.Group className="mb-3" controlId="Password">
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

            <Form.Group className="mb-3" controlId="ConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y pe-2"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                  style={{ cursor: "pointer" }}
                >
                  {confirmPasswordVisible ? (
                    <LiaEyeSlashSolid size={22} />
                  ) : (
                    <LiaEyeSolid size={22} />
                  )}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword.message}</p>
              )}
            </Form.Group>
            
            <Button variant="outline-primary" type="submit">
              Create Account
            </Button>
            
            <p className="pt-4 fw-light">Already have an account?</p>
            <Button variant="outline-success" onClick={() => navigate('/Login')}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateAccount;
