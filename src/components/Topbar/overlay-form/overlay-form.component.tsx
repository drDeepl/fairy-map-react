import React, { useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface FormFieldProps {
  label: string;
  value: string;
}

interface OverlayFormProps {
  fields: FormFieldProps[];
  onSubmit: (fields: FormFieldProps[]) => void;
}

const OverlayForm: React.FC<OverlayFormProps> = ({ fields, onSubmit }) => {
  const inputRef = useRef<FormFieldProps[]>([...fields]);

  const handleChange = (index: number, value: string) => {
    inputRef.current[index].value = value; // Изменяем значение в ref
  };

  const handleSubmit = () => {
    onSubmit([...inputRef.current]); // Передаем копию данных формы
  };

  return (
    <div className="flex flex-column justify-content-center align-items-center">
      {fields.map((field, index) => (
        <div key={index} className="ma-2">
          <InputText
            id={field.label}
            placeholder={field.label}
            defaultValue={field.value} // Используем defaultValue для первоначального значения
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
      <Button label="Отправить" onClick={handleSubmit} />
    </div>
  );
};

export default OverlayForm;
