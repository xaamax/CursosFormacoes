import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useUserService from "@/services/userService";
import { PasswordInput } from "@/components/input-password";
const formSchema = z.object({
  username: z.string().min(1, { message: "(*) Campo obrigatório" }),
  password: z
    .string()
    .min(1, {
      message: "(*) Campo obrigatório",
    })
    .min(4, {
      message: "A senha deve ter pelo menos 4 caracteres",
    }),
});

export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { signIn } = useUserService();


  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    return await signIn(data.username, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <input
          id="username"
          type="text"
          placeholder="Usuário"
          {...register("username")}
          className={errors.username ? "error" : ""}
        />
        {errors.username && (
          <div className="error-message">{errors.username.message}</div>
        )}
      </div>

      <div className="form-group">
        <PasswordInput 
        {...register("password")}
        className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Acessando..." : "Acessar"}
      </button>
    </form>
  );
}
