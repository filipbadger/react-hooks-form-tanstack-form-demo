import { useForm } from "@tanstack/react-form"

type FormData = {
    name: string;
    email: string;
}

export const useFormController = () => {

    const form = useForm({
        defaultValues: {
            name: "John Doe",
            email: "john.doe@example.com",
        } as FormData,

        onSubmit: async (data) => {
            alert(JSON.stringify(data.value));
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return { form, handleSubmit };
}