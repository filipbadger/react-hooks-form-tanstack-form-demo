import { Stack } from "@mui/system"
import { useFormController } from "./FormController"
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export const Form = () => {
    const { form, handleSubmit } = useFormController()

    return (
        <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <form.Field name="type" children={(field) => (
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value as "person" | "company")}
                        label="Type"
                    >
                        <MenuItem value="person">Person</MenuItem>
                        <MenuItem value="company">Company</MenuItem>
                    </Select>
                </FormControl>
            )} />

            <form.Subscribe
                selector={(state) => [state.values.type]
                }
            >
                {([type]) => type === "person" && (
                    <form.Field name="name" children={(field) => {
                        const error = field.state.meta.errors[0]
                        return (
                            <TextField 
                                label="Name" 
                                value={field.state.value} 
                                onChange={(e) => field.handleChange(e.target.value)}
                                error={!!error}
                                helperText={error ? String(error) : undefined}
                                fullWidth
                                required
                            />
                        )
                    }} />
                )}
            </form.Subscribe>

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
                        required
                    />
                )
            }} />

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
