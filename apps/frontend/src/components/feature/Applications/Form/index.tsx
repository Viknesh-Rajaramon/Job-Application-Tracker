import { Box } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import PopUp, { Action } from "../../../common/PopUp";
import SimplePopUp from "../../../common/PopUp/Modal/SimplePopUp";
import Button from "../../../common/Button";
import Input from "../../../common/FormComponents/Input";
import Select from "../../../common/FormComponents/Select";
import errorMessage from "../../../../constants/errorMessage";
import { createApplication, updateApplicationById } from "../../../../api/application";
import { useAppSelector } from "../../../../redux/store";

import styles from "./styles";

export type ApplicationFormData = {
    company: string;
    role: string;
    req_id?: string;
    location: string;
    status: string;
    link: string;
};

export type FormType = "add" | "edit" | null;

type ApplicationFormProps = {
    title: string;
    submitBtnLabel: string;
    btnLabel: string;
    data?: ApplicationFormData;
    viewOnly?: boolean;
    onSubmitForm: (data: any) => void;
    form: FormType;
    refetchAllApplications: <TPageData extends readonly unknown[]>(
        options?: RefetchOptions & RefetchQueryFilters<TPageData>,
    ) => Promise<QueryObserverResult<AxiosResponse<any>, unknown>>;
    setForm: React.Dispatch<React.SetStateAction<FormType>>;
};

type ModalData = {
    heading: string;
    actionLeft: Action;
    actionRight: Action;
};

type InfoModal = ModalData & {
    props: {
        description: string;
    };
};

const ApplicationForm = ({
    title,
    btnLabel,
    data = {
        company: "",
        role: "",
        location: "",
        status: "Applied",
        link: "",
    },
    viewOnly = false,
    onSubmitForm,
    submitBtnLabel,
    form,
    refetchAllApplications,
    setForm,
}: ApplicationFormProps) => {
    const editApplicationModal: InfoModal = {
        heading: "Edit Application",
        props: {
            description: "Are you sure you want to edit this Application?",
        },
        actionLeft: {
            label: "Cancel",
        },
        actionRight: {
            label: "Yes",
            type: "submit",
        },
    };

    const createApplicationModal: InfoModal = {
        heading: "Create Application",
        props: {
            description: "Are you sure you want to create this Application?",
        },
        actionLeft: {
            label: "Cancel",
        },
        actionRight: {
            label: "Yes",
            type: "submit",
        },
    };

    const applicationStatuses = useAppSelector((state) => state.user.applicationStatusesColor);
    const statuses = Object.keys(applicationStatuses).map((status) => ({
        label: status,
        value: status,
    }));

    const {
        control,
        handleSubmit,
        formState,
        getValues,
    } = useForm<ApplicationFormData>({
        mode: "onChange",
        defaultValues: data,
    });

    const { errors, isValid, isDirty } = formState;
    const [modalData, setModalData] = useState(
        viewOnly ? editApplicationModal : createApplicationModal,
    );
    const [readOnly, setReadOnly] = useState<boolean>(viewOnly);
    const [openModal, setModal] = useState<boolean>(false);

    const {
        user: {
            applicationRowData: { id },
        },
    } = useAppSelector((state) => state);

    const { mutate: addNewApplicationData, isPending: addNewApplicationLoading } = useMutation({
        mutationKey: ["addNewApplications"],
        mutationFn: (application: ApplicationFormData) => createApplication(application),
        onSuccess: () => {
            setModal(false);
            refetchAllApplications();
            setForm(null);
        },
        onError: (err: AxiosError<{ errorCode?: number; error?: string }>) => {
            if (err.response?.data?.errorCode !== 401) {
                setModal(true);
            }
        },
    });

    const { mutate: getUpdatedApplication, isPending: updateApplicationLoading } = useMutation({
        mutationKey: ["updateApplicationById"],
        mutationFn: (updatedApplicationData: { applicationId: string; updatedData: any }) => updateApplicationById(updatedApplicationData),
        onSuccess: () => {
            setModal(false);
            refetchAllApplications();
            setForm(null);
        },
        onError: (err: AxiosError<{ errorCode?: number; error?: string }>) => {
            if (err.response?.data?.errorCode !== 401) {
                setModal(true);
            }
        },
        retry: 1,
    });

    const handleClose = () => {
        setModal(false);
        setModalData(viewOnly ? editApplicationModal : createApplicationModal);
    };

    const handleModal = () => {
        if (form === "add") {
            addNewApplicationData(getValues());
            setModal(false);
        } else {
            getUpdatedApplication({
                applicationId: id,
                updatedData: {
                    ...getValues(),
                }
            });
            setModal(false);
        }
    };

    return (
        <Box>
            {!!modalData && (
                <PopUp
                    open={!!openModal}
                    handleClose={handleClose}
                    heading={modalData.heading}
                    actionLeft={modalData.actionLeft}
                    actionRight={modalData.actionRight}
                    handleRightBtnClick={handleModal}
                    loading={addNewApplicationLoading || updateApplicationLoading}
                >
                    <SimplePopUp description={modalData.props.description} />
                </PopUp>
            )}

            <Box sx={styles.heading}>{title}</Box>

            <Box sx={styles.backWrapper}>
                <Box
                    sx={styles.backStyles}
                    onClick={() => setForm(null)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter")
                            setForm(null);
                    }}
                    tabIndex={0}
                >
                    <ArrowBackIosNewIcon sx={styles.backArrow} />
                    <Box>Back</Box>
                </Box>
            </Box>

            <form onSubmit={handleSubmit(onSubmitForm)}>
                <Box sx={styles.submitWrapper}>
                    {readOnly ? (
                        <Button
                            label={btnLabel}
                            sx={styles.submitBtn}
                            variant="contained"
                            onClick={() => setReadOnly(false)}
                        />
                    ) : (
                        <Button
                            label={submitBtnLabel}
                            sx={styles.submitBtn}
                            variant="contained"
                            disabled={!(isValid && isDirty)}
                            type="submit"
                            onClick={() => setModal(true)}
                        />
                    )}
                </Box>

                <Box sx={styles.formWrapper}>
                    <Input
                        sx={styles.input}
                        name="company"
                        label="Company"
                        control={control}
                        readOnly={readOnly}
                        errors={errors}
                        rules={{
                            required: errorMessage.required,
                        }}
                    />

                    <Input
                        sx={styles.input}
                        name="role"
                        label="Role"
                        control={control}
                        readOnly={readOnly}
                        errors={errors}
                        rules={{
                            required: errorMessage.required,
                        }}
                    />

                    <Input
                        sx={styles.input}
                        name="req_id"
                        label="Req ID"
                        control={control}
                        readOnly={readOnly}
                        errors={errors}
                    />

                    <Input
                        sx={styles.input}
                        name="location"
                        label="Location"
                        control={control}
                        readOnly={readOnly}
                        errors={errors}
                        rules={{
                            required: errorMessage.required,
                        }}
                    />

                    <Select
                        sx={styles.input}
                        name="status"
                        label="Status"
                        options={statuses}
                        control={control}
                        errors={errors}
                        rules={{
                            required: errorMessage.required,
                        }}
                    />

                    <Input
                        sx={styles.input}
                        name="link"
                        label="Link"
                        control={control}
                        readOnly={readOnly}
                        errors={errors}
                        rules={{
                            required: errorMessage.required,
                        }}
                    />
                </Box>
            </form>
        </Box>
    );
};

export default ApplicationForm;
