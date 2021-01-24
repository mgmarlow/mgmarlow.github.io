import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components'

const GlobalStyle = createGlobalStyle`
html,
body {
  background-color: ${(props) =>
    props.theme.style === 'light' ? '#ffffff' : '#131217'};
  font-feature-settings: 'kern' 1;
  font-kerning: normal;
}

body,
html,
p,
a,
button,
input,
time {
  color: ${(props) => (props.theme.style === 'light' ? '#333' : '#cbcbcc')};
  font-family: 'IBM Plex Serif', Georgia, 'Times New Roman', Times, serif;
  font-weight: 400;
  font-style: normal;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'IBM Plex Serif', Georgia, 'Times New Roman', Times, serif;
  font-weight: 600;
  font-style: normal;
}

pre,
code {
  font-family: 'Source Code Pro', 'Courier New', Courier, monospace;
  font-weight: 400;
  font-style: normal;
}

html {
  font-size: 16px;
}

h1 {
  font-size: 2.5rem;
  line-height: 1.2;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.75rem;
}

h4 {
  font-size: 1.5rem;
}

h5 {
  font-size: 1.25rem;
}

h6 {
  font-size: 1rem;
}

pre,
code,
code.language-text {
  font-size: 1rem;
}

p,
li {
  color: ${(props) => (props.theme.style === 'light' ? '#333333' : '#cbcbcc')};
  line-height: 1.5;
  font-size: 1.25rem;
}

a {
  text-decoration-skip-ink: none;
  text-decoration: underline;
  color: ${(props) => (props.theme.style === 'light' ? '#326891' : '#b17acc')};
}

a:hover {
  text-decoration: none;
}

blockquote {
  margin: 1rem;
  padding-left: 1rem;
  border-left: 5px solid #828282;
}

blockquote > p {
  color: #828282;
}

@media (max-width: 600px) {
  p,
  li {
    font-size: 1.1rem;
  }

  pre,
  code,
  code.language-text {
    font-size: 0.85rem;
  }
}
`

export default function ThemeProvider({ theme, children }) {
  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}

ThemeProvider.defaultProps = {
  theme: { style: 'light' },
}
