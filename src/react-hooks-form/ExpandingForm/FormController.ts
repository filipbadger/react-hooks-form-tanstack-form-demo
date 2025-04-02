import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const personSchema = z.object({
    type: z.literal("person"),
    name: z.string().min(1, "Name is required").min(3, "Name must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    attributes: z.array(z.string()).default([])
});

const companySchema = z.object({
    type: z.literal("company"),
    email: z.string().min(1, "Email is required").email("Invalid email address")
});

const validationSchema = z.discriminatedUnion("type", [personSchema, companySchema]);

type PersonFormData = {
    type: "person";
    name: string;
    email: string;
    attributes: string[];
}

type CompanyFormData = {
    type: "company";
    email: string;
}

export type FormData = PersonFormData | CompanyFormData;

export const useFormController = () => {
    const defaultValues: FormData = {
        type: "person",
        name: "John Doe",
        email: "john.doe@example.com",
        attributes: []
    }

    const { control, handleSubmit, watch, setValue } = useForm<FormData>({
        defaultValues,
        resolver: zodResolver(validationSchema),
        mode: 'all'
    });

    const type = watch("type");
    const attributes = watch("attributes") as string[];

    const addAttribute = () => {
        if (type === "person") {
            setValue("attributes", [...(attributes || []), ""]);
        }
    };

    const removeAttribute = (index: number) => {
        if (type === "person") {
            const newAttributes = attributes.filter((_, i) => i !== index);
            setValue("attributes", newAttributes);
        }
    };

    const updateAttribute = (index: number, value: string) => {
        if (type === "person") {
            const newAttributes = [...attributes];
            newAttributes[index] = value;
            setValue("attributes", newAttributes);
        }
    };

    const onSubmit = (data: FormData) => {
        alert(JSON.stringify(data));
    }

    return { 
        control, 
        handleSubmit, 
        onSubmit, 
        type,
        addAttribute,
        removeAttribute,
        updateAttribute,
        attributes
    };
} 