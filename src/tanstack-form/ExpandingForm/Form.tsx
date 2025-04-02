import { Stack } from "@mui/system"
import { useFormController } from "./FormController"
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const Form = () => {
    const { form, handleSubmit, addAttribute, removeAttribute, updateAttribute } = useFormController()

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
                selector={(state) => [state.values.type]
                }
            >
                {([type]) => type === "person" && (
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="subtitle1">Attributes</Typography>
                            <IconButton onClick={addAttribute} color="primary">
                                <AddIcon />
                            </IconButton>
                        </Stack>

                        <form.Field name="attributes" children={(field) => {
                            const attributes = field.state.value as string[];
                            return (
                                <>
                                    {attributes.length > 0 && attributes.map((_, index) => (
                                        <Stack key={index} direction="row" spacing={1} alignItems="center">
                                            <TextField
                                                fullWidth
                                                label={`Attribute ${index + 1}`}
                                                value={attributes[index]}
                                                onChange={(e) => updateAttribute(index, e.target.value)}
                                            />
                                            <IconButton 
                                                onClick={() => removeAttribute(index)}
                                                color="error"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    ))}
                                </>
                            )
                        }} />
                    </Stack>
                )}
            </form.Subscribe>

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