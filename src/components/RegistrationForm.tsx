import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface RegistrationFormProps {
  onStartChallenge: () => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onStartChallenge, onInputChange }) => {
  const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório'),
    phone: yup
      .string()
      .matches(/^\d+$/, 'Telefone deve conter apenas números') 
      .min(10, 'Telefone deve ter pelo menos 10 dígitos') 
      .max(15, 'Telefone deve ter no máximo 15 dígitos') 
      .required('Telefone é obrigatório'),
    email: yup.string().email('Email inválido').required('Email é obrigatório'),
  });

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form className="flex w-auto flex-col" onSubmit={handleSubmit(onStartChallenge)}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome:
        </label>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="name"
              className={`mt-1 p-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
        field.onChange(e);
        onInputChange(e);
      }}
            />
          )}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Telefone:
        </label>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="phone"
              className={`mt-1 p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
        field.onChange(e);
        onInputChange(e); 
      }}
            />
          )}
        />
        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email:
        </label>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="email"
              id="email"
              className={`mt-1 p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              onChange={(e) => {
        field.onChange(e);
        onInputChange(e); 
      }}
            />
          )}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        Iniciar Desafio
      </button>
    </form>
  );
};

export default RegistrationForm;
