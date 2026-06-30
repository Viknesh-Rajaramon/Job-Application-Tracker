import { Box } from "@mui/material";

interface Props {
    link: string;
    label?: string;
};

const Link = ({ link, label }: Props) => {
    return (
        <Box
            component="a"
            href={link}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            color="blue"
        >        
            {label || "-"}
        </Box>
    );
};

export default Link;
