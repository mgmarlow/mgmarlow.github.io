import styled from 'styled-components'

function EmailInput() {
  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="email"
          name="subscriber[email_address]"
          placeholder="Type your email…"
          required=""
        />
      </div>

      <div className="control">
        <button className="button is-info">Subscribe</button>
      </div>
    </div>
  )
}

const StyledEmailInput = styled(EmailInput)``

function Newsletter({ className }) {
  return (
    <form
      className={className}
      action="https://world.hey.com/mgmarlow/subscribers"
      acceptCharset="UTF-8"
      data-remote="true"
      method="post"
    >
      <label className="label" htmlFor="subscriber[email_address]">
        Subscribe below to get future posts from Graham Marlow
      </label>

      <div className="input-wrapper">
        <StyledEmailInput />
      </div>
    </form>
  )
}

export default styled(Newsletter)`
  padding: 2rem;
  border: 1px solid #eeeeee;
  border-radius: 3px;
  box-shadow: 5px 5px 7px #eeeeee;
  text-align: center;

  .input-wrapper {
    display: inline-block;
  }
`
