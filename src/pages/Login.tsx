import React, {
  Dispatch,
  FC,
  FormEvent,
  HtmlHTMLAttributes,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const user = {
  name: "abdullo",
  password: "123",
};

const token = "aqwqeqweoijsdferf34bjf3jfsdf";

interface Props {
  setToken: Dispatch<SetStateAction<string | null>>;
}

const Login: FC<Props> = ({ setToken }) => {
  const [errLogin, setErrLogin] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [logBtn, setLogBtn] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const refPass = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && password && name === user.name && password === user.password) {
      localStorage.setItem("token", token);
      navigate("/");
      setToken(token);
      if (refPass.current) {
        refPass.current.blur();
      }
    } else {
      if (refPass.current) {
        refPass.current.blur();
      }
      setErrLogin(true);
      setErrText("User not found!");
      setTimeout(() => {
        setErrText("");
      }, 1300);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div className="signin_box">
      <div className={errText ? "err_signin active" : "err_signin"}>
        <h3>{errText}</h3>
      </div>
      <div className="log_pass">
        <p>
          username: <i>abdullo</i>{" "}
        </p>
        <p>
          password: <i>123</i>{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="signin_form">
        <h3>Sign-in</h3>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            ref={ref}
            type="text"
            className="form-control form_input"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="User name"
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value !== "" && password) {
                setLogBtn(true);
              } else {
                setLogBtn(false);
              }
            }}
          />
          {/* <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            ref={refPass}
            type="password"
            className="form-control form_input"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (name && e.target.value !== "") {
                setLogBtn(true);
              } else {
                setLogBtn(false);
              }
            }}
            id="exampleInputPassword1"
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          size="medium"
          className="sign-in_btn"
          disabled={!logBtn}
        >
          Sign-in
        </Button>
      </form>
    </div>
  );
};

export default Login;
