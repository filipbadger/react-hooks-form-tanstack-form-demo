import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const validationSchema = z.object({
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address")
});

export type FormData = {
    name: string;
    email: string;
}

export const useFormController = () => {

    const defaultValues: FormData = {
        name: "John Doe",
        email: "john.doe@example.com",
    }

    const { control, handleSubmit, formState: { isValid } } = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(validationSchema),
        mode: 'all'
    });

    const onSubmit = (data: FormData) => {
        const { name, email } = data;
        alert(JSON.stringify({ name, email }));
    }

    return { control, handleSubmit, onSubmit, isValid };
}