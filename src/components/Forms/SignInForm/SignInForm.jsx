import { Form, Link, useNavigation } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/Button';
import { useFormFields } from '@/hooks/useFormFields';
import { Field } from '../FormComponents';

const initialValues = { email: 'kdjpr@example.com', password: '123456789' };

export const formFields = ['email', 'password'];

const fieldsSchema = z.object({
	email: z.string().email({ message: 'Correo electrónico inválido' }),
	password: z
		.string()
		.min(5, { message: 'La contraseña tiene mínimo 5 caracteres' })
		.max(16, { message: 'La contraseña tiene máximo 16 caracteres' }),
});

export function SignInForm() {
	const { state } = useNavigation();
	const isSubmitting = state === 'submitting';

	const { hasError, onFieldUpdate, toggleFieldError } = useFormFields({
		initialValues,
	});

	return (
		<Form
			className="flex flex-col space-y-6 w-full"
			action="/auth/sign-in"
			method="post"
		>
			<Field
				label="Correo electrónico"
				schema={fieldsSchema.shape.email}
				initialValue={initialValues.email}
				onUpdate={onFieldUpdate}
				onError={toggleFieldError}
				inputProps={{
					type: 'email',
					name: 'email',
					placeholder: 'usuario@dominio.com',
					required: true,
				}}
			/>

			<Field
				label="Contraseña"
				schema={fieldsSchema.shape.password}
				initialValue={initialValues.password}
				onUpdate={onFieldUpdate}
				onError={toggleFieldError}
				inputProps={{
					type: 'password',
					name: 'password',
					placeholder: '••••••••',
					required: true,
				}}
			/>

			<Button
				type="submit"
				disabled={hasError || isSubmitting}
				isLoading={isSubmitting}
			>
				Ingresar
			</Button>

			<p className="text-sm font-normal text-gray-500 ">
			🤔 ¿Sin tacuen Mani?  Nada de nervios, crea una aquí 😎 -> &nbsp;
				<Link
					to="/auth/sign-up"
					className="font-medium text-indigo-600 hover:underline "
				>
					¡Registrate!
				</Link>
			</p>
		</Form>
	);
}
