import { useForm } from "react-hook-form";

export type FormData = {
    name: string;
    email: string;
}

export const useFormController = () => {

    const defaultValues: FormData = {
        name: "John Doe",
        email: "john.doe@example.com",
    }

    const { control, handleSubmit } = useForm<FormData>({
        defaultValues
    });

    const onSubmit = (data: FormData) => {
        const { name, email } = data;
        alert(JSON.stringify({ name, email }));
    }

    return { control, handleSubmit, onSubmit };
}