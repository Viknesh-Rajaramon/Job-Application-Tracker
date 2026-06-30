import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { useAppSelector } from "../../../redux/store";
import { createApplication } from "../../../api/application";
import Input from "../../common/FormComponents/Input";
import Select from "../../common/FormComponents/Select";
import Button from "../../common/Button";
import errorMessage from "../../../constants/errorMessage";

import { styles } from "./styles";

export type ApplicationProps = {
    company: string;
    role: string;
    req_id?: string;
    location: string;
    status: string;
    link: string;
};

const defaultValues: ApplicationProps = {
    "company": "",
    "role": "",
    "req_id": "",
    "location": "",
    "status": "Applied",
    "link": "",
};

const AddApplication = () => {
    const applicationStatuses = useAppSelector((state) => state.user.applicationStatusesColor);
    const statuses = Object.keys(applicationStatuses).map((status) => ({
        label: status,
        value: status,
    }));

    const { control, formState, getValues, resetField, handleSubmit } = useForm<ApplicationProps>({
        mode: "onChange",
        defaultValues,
    });

    const { errors, isValid } = formState;

    const { mutate: addApplication, isPending } = useMutation({
        mutationKey: ["addApplication"],
        mutationFn: createApplication,
        onSuccess: () => {
            resetField("company");
            resetField("role");
            resetField("req_id");
            resetField("location");
            resetField("link");
            resetField("status", { defaultValue: defaultValues.status });
        },
        onError: () => {},
    });

    const onSubmit = () => {
        addApplication(getValues());
    };

    return (
        <Box>
            <Box sx={styles.heading}>Add Application</Box>

            <Box
                component="form"
                sx={styles.form}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    sx={styles.input}
                    label="Company"
                    name="company"
                    placeholder="Company"
                    control={control}
                    errors={errors}
                    rules={{
                        required: errorMessage.required,
                    }}
                    autoFocus
                />

                <Input
                    sx={styles.input}
                    label="Role"
                    name="role"
                    placeholder="Role"
                    control={control}
                    errors={errors}
                    rules={{
                        required: errorMessage.required,
                    }}
                />

                <Input
                    sx={styles.input}
                    label="Req ID"
                    name="req_id"
                    placeholder="Req ID"
                    control={control}
                    errors={errors}
                />

                <Input
                    sx={styles.input}
                    label="Location"
                    name="location"
                    placeholder="Location"
                    control={control}
                    errors={errors}
                    rules={{
                        required: errorMessage.required,
                    }}
                />

                <Select
                    sx={styles.input}
                    label="Status"
                    name="status"
                    options={statuses}
                    defaultValue={defaultValues.status}
                    control={control}
                    errors={errors}
                    rules={{
                        required: errorMessage.required,
                    }}
                />

                <Input
                    sx={styles.input}
                    label="Link"
                    name="link"
                    placeholder="Link"
                    control={control}
                    errors={errors}
                    rules={{
                        required: errorMessage.required,
                    }}
                />

                <Button
                    sx={styles.submitButton}
                    type="submit"
                    variant="contained"
                    label={isPending ? "Adding..." : "Add Application"}
                    disabled={!isValid || isPending}
                />
            </Box>
        </Box>
    );
};

export default AddApplication;
