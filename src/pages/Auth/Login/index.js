import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  FormControl,
  InputRightElement,
} from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { FaUserAlt, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "./index.module.css";
import { NOTIFICATION_DURATION } from "../../../constants";
import { APP_PATH } from "../../../api/endpoints";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const validationSchema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const Login = () => {
  const toastId = useRef(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onLogin = (data) => {
    toastId.current = toast.loading("Loging in...");
    setTimeout(() => {
      if (
        data.email?.toLowerCase() !== "admin@moivon.com" ||
        data.password?.toLowerCase() !== "admin@123"
      ) {
        toast.remove(toastId.current);
        toastId.current = null;
        toast.error("Invalid credentials!", NOTIFICATION_DURATION);
        return;
      }
      toast.remove(toastId.current);
      reset();
      toast.success("Login success!", NOTIFICATION_DURATION);
      navigate(APP_PATH.home);
    }, 2000);
  };

  return (
    <Stack
      flexDir="column"
      mb="2"
      justifyContent="center"
      alignItems="center"
      py="2rem"
      borderRadius="10px"
      className={styles.loginBox}
    >
      <Box minW={{ base: "90%", md: "568px" }}>
        <Stack
          className="mb-3"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <img src="/img/moivon-black.png" className="mb-3" alt="moivon" />
          <Heading className="text-primary">Login</Heading>
        </Stack>

        <form className={styles.formDiv} onSubmit={handleSubmit(onLogin)}>
          <Stack spacing={4} p="2rem">
            <FormControl className="mb-3">
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  autoFocus
                  {...register("email")}
                />
              </InputGroup>
            </FormControl>
            <FormControl className="mb-3">
              <InputGroup className="mb-3">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <InputRightElement width="3.5rem">
                  <Button
                    height="2rem"
                    onClick={handleShowClick}
                    className={styles.buttonEye}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              borderRadius="0.375rem"
              type="submit"
              variant="solid"
              className={styles.loginButton}
              width="full"
              disabled={(!isDirty || !isValid) && isSubmitting}
            >
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
};

export default Login;
