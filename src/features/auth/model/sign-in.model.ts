import { SignInRequestDto } from "../../../api/dto/SignInRequestDto";

export type SignInFormLabel = Record<keyof SignInRequestDto, string>;

class SignInModel {
  readonly labels: SignInFormLabel = {
    email: "электронная почта",
    password: "пароль",
  };
}

export default SignInModel;
