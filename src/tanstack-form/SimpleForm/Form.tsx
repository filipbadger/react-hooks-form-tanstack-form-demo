import { Stack } from "@mui/system"
import { useFormController } from "./FormController"
import { Button, TextField } from "@mui/material"

export const Form = () => {
    const { form, handleSubmit } = useFormController()

    return (
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <form.Field name="name" children={
                (field) => {
                    return <TextField label="Name" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
                }
            } />
            <form.Field name="email" children={(field) => {
                return <TextField label="Email" value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            }} />
            <Button type="submit" disabled={!form.state.isValid}>Submit</Button>
        </Stack>
    )
}