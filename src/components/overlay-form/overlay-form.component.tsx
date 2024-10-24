import React, { useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from 'primereact/dialog';

interface FormFieldProps {
  label: string;
  value: string;
}

interface OverlayFormProps {
  title: string;
  fields: FormFieldProps[];
  visible: boolean;
  onSubmit: (fields: FormFieldProps[]) => void;
  onCancel: () => void
}

const OverlayForm: React.FC<OverlayFormProps> = ({
  title,
  fields,
  visible,
  onSubmit,
  onCancel
  
}) => {
  const inputRef = useRef<FormFieldProps[]>([...fields]);

  const handleChange = (index: number, value: string) => {
    inputRef.current[index].value = value; // Изменяем значение в ref
  };

  const handleSubmit = () => {
    onSubmit([...inputRef.current]); // Передаем копию данных формы
  };

  return (
    // <div className="flex flex-column justify-content-center align-items-center">
      <Dialog header={title} visible={visible}  style={{ width: '50vw' }} onHide={onCancel}>
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
      </Dialog>
    {/* </div> */}
  );
};

export default OverlayForm;
