import { Button, TextField } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const styles = {
  app: {
    alignItems: 'center',
    backgroundColor: '#ededed',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%'
  },
  form: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px #ccc',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    width: '80%'
  },
  field: {
    margin: '0 0 8px 0',
    transition: 'border-color 400ms',
    willChange: 'border-color'
  },
  button: {
    margin: '8px 0 32px 0',
    minHeight: '48px'
  },
  title: {
    fontSize: '24px',
    color: '#323232',
    textAlign: 'center',
    margin: '0 0 24px 0',
  },
  footer: {
    alignItems: 'center',
    color: '#323232',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  githubLink: {
    color: '#337ab7',
    textDecoration: 'none',
    padding: '0 0 0 4px'
  },
  payloadWrapper: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px #ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '16px 0 0 0',
    maxWidth: '400px',
    padding: '24px 32px',
    width: '80%'
  },
  payloadTitle: {
    color: '#323232',
    fontSize: '16px',
    margin: '0 0 16px 0'
  },
  payload: {
    display: 'block',
    fontFamily: 'monospace',
    lineHeight: '24px',
    fontSize: '16px',
    width: '100%'
  }
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string()
    .matches(/\d{2}\s\d{4,5}-\d{4}/g, 'invalid phone')
    .required()
})

function App() {
  const [phone, setPhone] = useState('')
  const [_formData, setFormData] = useState({ email: '', name: '', phone: '' })
  const { register, handleSubmit, setValue, setError, formState } = useForm({
    resolver: yupResolver(schema)
  })

  function onSubmit(formData) {
    const { errors } = formState
    if (Object.keys(errors).length) return
    setFormData(formData)
  }

  function onPhoneInput({ target }) {
    setError('phone', '')

    const { value } = target

    if (!value) return setPhone(target)
    if (value === phone) return

    const _val = value
        .replace(/\D/g, '')
        .replace(/(\d{11})(\d)/, '$1')
        .replace(/(\d{2})(\d)/, '$1 $2')
        .replace(/(\d{4,5})(\d)/, '$1-$2')
    setPhone(_val)
  }

  useEffect(() => {
      register('phone')
  }, [register])

  useEffect(() => {
    setValue('phone', phone)
  }, [phone, setValue])

  return (
    <div className="App" style={styles.app}>
      <form
        autoComplete="off"
        style={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 style={styles.title}>My Form</h1>
        <TextField
          error={Boolean(formState.errors.name?.message)}
          helperText={formState.errors.name?.message}
          label="Name"
          style={styles.field}
          variant="outlined"
          {...register('name')}
        />
        <TextField
          error={Boolean(formState.errors.email?.message)}
          helperText={formState.errors.email?.message}
          label="E-mail"
          style={styles.field}
          type="email"
          variant="outlined"
          {...register('email')}
        />
        <TextField
          error={Boolean(formState.errors.phone?.message)}
          helperText={formState.errors.phone?.message}
          label="Phone"
          style={styles.field}
          type="tel"
          value={phone}
          onInput={onPhoneInput}
          variant="outlined"
        />
        <Button
          color="primary"
          style={styles.button}
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
        <p style={styles.footer}>
          Made with ❤ by
          <a
            className="github"
            href="https://github.com/gabriel-barreto"
            style={styles.githubLink}
          >
            Gabriel Barreto
          </a>
        </p>
      </form>
      <div style={styles.payloadWrapper}>
        <h2 style={styles.payloadTitle}>Payload</h2>
        <pre style={styles.payload}>{JSON.stringify(_formData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
