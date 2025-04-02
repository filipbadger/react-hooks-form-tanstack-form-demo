import { Button, Stack, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormController } from "./FormController";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export const Form = () => {
    const { 
        control, 
        handleSubmit, 
        onSubmit, 
        type,
        addAttribute,
        removeAttribute,
        updateAttribute,
        attributes
    } = useFormController();
    
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

            {type === "person" && (
                <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="subtitle1">Attributes</Typography>
                        <IconButton onClick={addAttribute} color="primary">
                            <AddIcon />
                        </IconButton>
                    </Stack>
                    
                    {attributes?.length > 0 && attributes.map((_, index) => (
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
                </Stack>
            )}

            <Button 
                type="submit" 
                variant="contained"
            >
                Submit
            </Button>
        </Stack>
    )
} 