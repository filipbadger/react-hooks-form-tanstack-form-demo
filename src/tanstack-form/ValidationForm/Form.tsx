import { Stack } from "@mui/system"
import { useFormController } from "./FormController"
import { Button, TextField } from "@mui/material"

export const Form = () => {
    const { form, handleSubmit } = useFormController()

    return (
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <form.Field name="name" children={
                (field) => {
                    const error = field.state.meta.errors[0]
                    return (
                        <TextField 
                            label="Name" 
                            value={field.state.value} 
                            onChange={(e) => field.handleChange(e.target.value)}
                            error={!!error}
                            helperText={error ? String(error) : undefined}
                            fullWidth
                        />
                    )
                }
            } />
            <form.Field name="email" children={(field) => {
                const error = field.state.meta.errors[0]
                return (
                    <TextField 
                        label="Email" 
                        value={field.state.value} 
                        onChange={(e) => field.handleChange(e.target.value)}
                        error={!!error}
                        helperText={error ? String(error) : undefined}
                        fullWidth
                    />
                )
            }} />
            {/* We can subscribe to the isValid state to disable the submit button */}
            <form.Subscribe
                selector={(state) => [state.isValid]}
            >
                {([isValid]) => (
                    <Button 
                        type="submit" 
                        variant="contained"
                        disabled={!isValid}
                    >
                        Submit
                    </Button>
                )}
            </form.Subscribe>
        </Stack>
    )
}