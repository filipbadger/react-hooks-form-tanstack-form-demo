import { useForm } from "@tanstack/react-form"

type FormData = {
    name: string;
    email: string;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i


export const useFormController = () => {
    const form = useForm({
        defaultValues: {
            name: "John Doe",
            email: "john.doe@example.com",
        } as FormData,

        validators: {
            onChange: ({ value }) => {
                return {
                    fields: {
                        name: !value.name ? "Name is required" : null,
                        email: !value.email ? "Email is required" : !emailRegex.test(value.email) ? "Invalid email address" : null,
                    }
                }
            },
        },

        onSubmit: async (data) => {
            alert(JSON.stringify(data.value));
        }
    })

    // tanstack is framework-agnostic, so we need to handle prevent default and stop propagation
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
    }

    return { form, handleSubmit };
}