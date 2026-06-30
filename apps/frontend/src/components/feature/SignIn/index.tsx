import { Box } from "@mui/material";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Button from "../../common/Button";
import Input from "../../common/FormComponents/Input";
import Password from "../../common/FormComponents/Password";

import { useAppDispatch } from "../../../redux/store";
import { signinUser } from "../../../redux/slices/user";
import { signIn } from "../../../api/user";
import errorMessage from "../../../constants/errorMessage";
import { route } from "../../../constants/routes";
import regex from "../../../utils/regex";
import { getTrimmedData } from "../../../utils/helper";

import { styles } from "./styles";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const { control, formState, handleSubmit, setError } = useForm<SignInFormData>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });

    const { isValid } = formState;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const signin = useMutation({
        mutationKey: ["signIn"],
        mutationFn: signIn,
        onSuccess: (response) => {
            dispatch(signinUser(response.data.application_statuses_color));
            navigate(route.dashboard.path, { replace: true })
        },
        onError: (err: AxiosError<{ errorCode?: string; message?: string }>) => {
            setError("password", {
                type: "server",
                message: err.response?.data?.message ?? errorMessage.inValidCredentials,
            });
        },
    });

    const onSubmit = (data: SignInFormData) => {
        signin.mutate(getTrimmedData(data));
    };

    return (
        <Box sx={styles.container}>
            <Box
                component="form"
                sx={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box sx={styles.heading}>Sign In</Box>

                <Input
                    name="email"
                    label="Email"
                    control={control}
                    errors={formState.errors}
                    customStyles={styles.input}
                    rules={{
                        required: errorMessage.required,
                        pattern: {
                            value: regex.email,
                            message: errorMessage.invalidEmail,
                        },
                    }}
                />

                <Password
                    name="password"
                    label="Password"
                    control={control}
                    errors={formState.errors}
                    customStyles={styles.input}
                    rules={{
                        required: errorMessage.required,
                    }}
                />

                <Button
                    type="submit"
                    label={signin.isPending ? "Signing In..." : "Sign In"}
                    disabled={!isValid || signin.isPending}
                    customStyles={styles.button}
                />
            </Box>
        </Box>
    );
};

export default SignIn;
