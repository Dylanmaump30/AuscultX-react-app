# Custom Form with React Hook Form and Zod

This project demonstrates how to create a customizable form using React Hook Form, Zod for schema validation, and modular components for reusability. The form includes input fields for name, email, password, and confirm password, with error handling and validation.

## Features

- **React Hook Form**: Lightweight and performant form handling.
- **Zod**: Schema-based validation for form inputs.
- **Reusable Components**: Modular input components for scalability.
- **Validation Feedback**: Displays error messages for invalid inputs.

## Project Structure

```
project-directory/
├── components/
│   └── CustomInput.tsx  # Reusable input field component
├── models/
│   └── index.ts         # Schema and form value types
├── App.tsx              # Main application entry point
├── CustomForm.tsx       # Form implementation
├── CustomInput.css      # Styles for input fields
└── ...                  # Other project files
```

## Prerequisites

- Node.js (>=14.x)
- npm or Yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/custom-form.git
   cd custom-form
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```
2. Open your browser and navigate to `http://localhost:3000` to view the form.

## Code Overview

### `CustomForm.tsx`

This component implements the form using `useForm` from React Hook Form and `zodResolver` for validation.

```tsx
const {
  control,
  handleSubmit,
  formState: { errors },
} = useForm<FormValues>({
  resolver: zodResolver(schema),
});
```

The form fields are rendered using the `InputForm` component, which handles individual input rendering and error feedback.

### `CustomInput.tsx`

A reusable component for input fields. It uses the `Controller` from React Hook Form to connect each input with the form state.

```tsx
<Controller
  name={name}
  control={control}
  render={({ field }) => (
    <input
      id={name}
      type={type}
      {...field}
      className={`form-control ${error ? "is-invalid" : ""}`}
    />
  )}
/>
```

### `models/index.ts`

Defines the schema and types for the form using Zod:

```ts
import * as z from "zod";

export const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .refine(
      (value, context) => value === context.parent.password,
      "Passwords must match"
    ),
});

export type FormValues = z.infer<typeof schema>;
```

## Styles

The `CustomInput.css` file provides basic styling for the form inputs, including error highlighting.

```css
.form-group {
  margin-bottom: 1rem;
}

.form-control.is-invalid {
  border-color: red;
}

.error {
  color: red;
  font-size: 0.8rem;
}
```

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the [MIT License](LICENSE).
