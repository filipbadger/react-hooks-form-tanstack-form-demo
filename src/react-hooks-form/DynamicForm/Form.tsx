import { Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormController } from "./FormController";

export const Form = () => {
    const { control, handleSubmit, onSubmit, isValid, type } = useFormController();
    
    return (
        <Stack spacing={2} component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="type"
                render={({ field }) => (
                    <FormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            {...field}
                            label="Type"
                        >
                            <MenuItem value="person">Person</MenuItem>
                            <MenuItem value="company">Company</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />
            
            {type === "person" && (
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <TextField 
                            label="Name" 
                            required
                            {...field} 
                        />
                    )}
                />
            )}
            
            <Controller
                control={control}
                name="email"
                render={({ field }) => (
                    <TextField 
                        label="Email" 
                        required
                        {...field}
                    />
                )}
            />
            
            <Button 
                type="submit" 
                variant="contained"
                disabled={!isValid}
            >
                Submit
            </Button>
        </Stack>
    )
}
