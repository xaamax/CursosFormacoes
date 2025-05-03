import * as React from 'react'

interface PasswordInputProps {
  className?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className='input-password'>
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Senha"
          className={className}
          ref={ref}
          {...props}
        />
          <button type='button' className='toggle-password' onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? 'Ocultar' : 'Exibir'}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
