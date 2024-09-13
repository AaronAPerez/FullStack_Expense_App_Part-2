import { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUser, login } from "../Services/DataService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";

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
      navigate('/Dashboard');
    }
  };

  return (
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
                    <LiaEyeSolid size={22} color="green" />
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
  );
};

export default Login;

// import { useState } from "react";
// import { Container, Row, Col,Button,Form } from "react-bootstrap";
// import { createAccount } from "../Services/DataService";
// import { useNavigate } from "react-router-dom";
// import { GetLoggedInUser, login } from "../Services/DataService";

// import { zodResolver } from "@hookform/resolvers/zod"; // zodResolver from @hookform/resolvers/zod for integrating Zod with react-hook-form
// import { useState } from "react"; // useState hook from React for state management
// import { FieldValues, useForm } from "react-hook-form"; // useForm hook and FieldValues type from react-hook-form for form handling
// import { z } from "zod"; // Zod library for schema validation

// import { LiaEyeSlashSolid } from "react-icons/lia"; // Icon componentS for showing/hiding the password
// import { LiaEyeSolid } from "react-icons/lia"; // 


// // Define a Zod schema for form validation
// const schema = z.object({
//   email: z
//     .string()
//     .email() // Ensure the input is a valid email
//     .trim() // Remove leading and trailing whitespace
//     .toLowerCase(), // Convert email to lowercase
//   password: z
//     .string()
//     // Password requirements
//     .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
//       message:
//         "Password must be at least 8 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character",
//     }), 
// });

// // Infer the type of the form data from the Zod schema
// type FormData = z.infer<typeof schema>;

// const LoginZodValidation = () => {
  


// const Login = ({ onLogin }) => {

//   // Use the useForm hook from react-hook-form with the Zod resolver
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ resolver: zodResolver(schema) });

//   // Log the form errors
//   console.log(errors);

//   // Handle form submission
//   const onSubmit = (data: FieldValues) => {
//     console.log(data);
//   };

//   // State to control password visibility
//   const [passwordVisible, setPasswordVisible] = useState(false);

//  let navigate = useNavigate();

//     //usestates to hold our username and passwords
//     const [Username, setUsername] = useState('');
//     const [Password, setPassword] = useState('');


//     //Function or method to handle our user
//     const handleUser = (e) => {
//         setUsername(e.target.value);

//     }

//     //Function or method to handle our password
//     const handlePassword = (e) => {
//         setPassword(e.target.value)

//     }

//     //Function or method to hanlde our submit
//     const handleSubmit =  async () => {
      
//         let userData = {
//             username: Username,
//             password: Password
//           }
//           console.log(userData);
          
//           let token = await login(userData)
//           console.log(token.token, "This should log the token");
//           if(token.token != null)
//             {
//               localStorage.setItem("Token",token.token);
//               // localStorage.setItem("UserData",JSON.stringify(userData));
//              GetLoggedInUser(Username);
//               navigate('/Dashboard')
//        }
//         // return userData
//     }


//   return (
//     <>
//       <Container>
//         <Row>
//           <Col className="form-container d-flex justify-content-center">
           
//             <Form>
//             <p className="text-center">Login</p>
//               <Form.Group className="mb-3" controlId="Username">
//                 <Form.Label>Username</Form.Label>
//                 <Form.Control type="text" placeholder="Enter Username" onChange={handleUser} />
//             </Form.Group>

//               <Form.Group className="mb-3" controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Enter Password" onChange={handlePassword} />
//               </Form.Group>
              
//               <Button variant="outline-primary" onClick={handleSubmit}>
//                 Login
//               </Button>
//               {/* checking github */}
//               <p className="pt-4 fw-light">Don't have an account?</p>
//               <Button variant="outline-success" onClick={() => navigate('/CreateAccount')}>
//                 Create Account
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default Login;