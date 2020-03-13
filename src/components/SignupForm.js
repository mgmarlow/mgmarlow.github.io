// Pulled from:
// https://github.com/kentcdodds/kentcdodds.com/blob/master/src/components/forms/subscribe.js
import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const SubscribeSchema = Yup.object().shape({
  email_address: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  first_name: Yup.string(),
})

// TODO:
//     title="Great, one last thing..."
//     body="I just sent you an email with the confirmation link.
//       **Please check your inbox!**"
function PostSubmissionMessage() {
  return <p>foo</p>
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
            first_name: '',
            tags,
          }}
          validationSchema={SubscribeSchema}
          onSubmit={setValues}
        >
          {() => (
            <Form>
              <label htmlFor="first_name">
                <div>
                  First Name
                  <ErrorMessage
                    name="first_name"
                    component="span"
                    className="field-error"
                  />
                </div>
              </label>
              <Field
                id="first_name"
                aria-required="false"
                name="first_name"
                placeholder="Jane"
                type="text"
              />
              <label htmlFor="email">
                <div>
                  Email
                  <ErrorMessage
                    name="email_address"
                    component="span"
                    className="field-error"
                  />
                </div>
              </label>
              <Field
                id="email"
                aria-required="true"
                name="email_address"
                placeholder="jane@acme.com"
                type="email"
              />
              <button data-element="submit" type="submit">
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
