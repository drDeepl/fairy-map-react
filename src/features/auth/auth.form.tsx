import React, { useState } from "react";
import SignInModel, { SignInFormLabel } from "./model/sign-in.model";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

type AuthFormModel = SignInModel;

interface AuthFormProps {
  title: string;
  dataModel: AuthFormModel;
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

// TODO: Auth Models
const AuthForm: React.FC<AuthFormProps> = ({
  title,
  dataModel,
  visible,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<typeof dataModel>({ ...dataModel });

  console.log({ ...dataModel });

  const handleSubmit = () => {
    // const { error, value } = dataModel.validate(formData);
    // console.log(error);
    // console.log(value);
    onSubmit();
  };

  return (
    <Dialog
      header={title}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onCancel}
    >
      {dataForm.labels.map((field: string, index: number) => (
        <div key={index} className="ma-2">
          <InputText
            id={field}
            placeholder={dataModel.label[field]}
            defaultValue=""
            onChange={(e) => {
              const updatedValue = {};
              updatedValue[field] = e.target.value;
              setFormData((formData) => ({
                ...formData,
                ...updatedValue,
              }));
            }}
          />
        </div>
      ))}
      <Button label="Отправить" onClick={handleSubmit} />
    </Dialog>
  );
};

export default AuthForm;
