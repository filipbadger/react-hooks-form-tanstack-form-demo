import { useForm } from "@tanstack/react-form"

type PersonFormData = {
    type: "person";
    name: string;
    email: string;
}

type CompanyFormData = {
    type: "company";
    email: string;
}

type FormData = PersonFormData | CompanyFormData;

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export const useFormController = () => {
    const form = useForm({
        defaultValues: {
            type: "person" as const,
            name: "John Doe",
            email: "john.doe@example.com",
        } as FormData,

        validators: {
            onChange: ({ value }) => {
                const errors: Record<string, string | null> = {
                    email: !value.email ? "Email is required" : !emailRegex.test(value.email) ? "Invalid email address" : null,
                }

                if (value.type === "person") {
                    errors.name = !value.name ? "Name is required" : value.name.length < 3 ? "Name must be at least 3 characters" : null;
                }

                return {
                    fields: errors
                }
            },
        },

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
