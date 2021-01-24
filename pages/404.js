import Layout from '../components/Layout'
import SEO from '../components/SEO'

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Layout>
      <div className="content is-medium mt-4">
        <h1>NOT FOUND</h1>

        <p>
          This route doesn't exist. Well, it does, but it goes to this page. And
          you don't want to be on this page.
        </p>
        <p>Unless you do, that's totally fine too.</p>
      </div>
    </Layout>
  </>
)

export default NotFoundPage
