import { Button, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormController } from "./FormController";

export const Form = () => {
    const { control, handleSubmit, onSubmit } = useFormController();
    return (
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                render={({ field }) => <TextField label="Name" {...field} />}
            />
            <Controller
                control={control}
                name="email"
                render={({ field }) => <TextField label="Email" {...field} />}
            />
            <Button type="submit">Submit</Button>
        </Stack>
    )
}