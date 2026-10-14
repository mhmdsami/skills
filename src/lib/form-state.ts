export type FormState = { success?: boolean; error?: string; message?: string; token?: string; redirectTo?: string };
export type FormAction = (formData: FormData) => Promise<FormState>;
