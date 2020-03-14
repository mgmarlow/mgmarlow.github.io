// Pulled from:
// https://github.com/kentcdodds/kentcdodds.com/blob/master/src/components/forms/subscribe.js
import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import styles from './signup-form.module.css'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
})

function PostSubmissionMessage() {
  return (
    <div>
      <h4>Great, one last thing...</h4>
      <p>I just sent you an email with the confirmation link.</p>
    </div>
  )
}

function fetchReducer(state, { type, response, error }) {
  switch (type) {
    case 'fetching': {
      return { error: null, response: null, pending: true }
    }
    case 'success': {
      return { error: null, response, pending: false }
    }
    case 'error': {
      return { error, response: null, pending: false }
    }
    default:
      throw new Error(`Unsupported type: ${type}`)
  }
}

function useFetch({ url, body }) {
  const [state, dispatch] = React.useReducer(fetchReducer, {
    error: null,
    response: null,
    pending: false,
  })
  const bodyString = JSON.stringify(body)

  React.useEffect(() => {
    if (url && bodyString) {
      dispatch({ type: 'fetching' })
      fetch(url, {
        method: 'post',
        body: bodyString,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(r => r.json())
        .then(
          response => dispatch({ type: 'success', response }),
          error => dispatch({ type: 'error', error }),
        )
    }
  }, [url, bodyString])

  return state
}

function Subscribe({ tags = [], header = 'Join the Newsletter' }) {
  const [values, setValues] = React.useState()
  const { pending, response, error } = useFetch({
    url: 'https://app.convertkit.com/forms/1257289/subscriptions',
    body: values,
  })

  const errorMessage = error ? 'Something went wrong!' : null
  const submitted = Boolean(response)

  const successful = response && response.status === 'success'

  return (
    <div>
      {!successful && <h3>{header}</h3>}

      {!successful && (
        <Formik
          initialValues={{
            email_address: '',
            tags,
          }}
          validationSchema={SubscribeSchema}
          onSubmit={setValues}
        >
          {() => (
            <Form className={styles.form}>
              <Field
                id="email"
                className={styles.input}
                aria-required="true"
                name="email_address"
                placeholder="Your email address"
                type="email"
              />
              <button
                className={styles.subscribe}
                data-element="submit"
                type="submit"
              >
                {!pending && 'Subscribe'}
                {pending && 'Submitting...'}
              </button>
            </Form>
          )}
        </Formik>
      )}
      {submitted && !pending && <PostSubmissionMessage response={response} />}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

export default Subscribe
