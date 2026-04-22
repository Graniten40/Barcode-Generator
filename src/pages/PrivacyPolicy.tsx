import { Link } from "react-router-dom";

function PrivacyPolicy() {
  return (
    <main className="app-shell">
      <section className="app-card legal-page">
        <Link to="/" className="back-home-link">
          ← Home
        </Link>

        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: April 22, 2026</p>

        <p>
          This Privacy Policy explains how this website handles information when
          you use the Barcode Generator.
        </p>

        <h2>Information We Collect</h2>
        <p>
          This barcode generator runs entirely in your browser. We do not
          require account creation, and we do not intentionally collect personal
          information through the tool itself.
        </p>

        <h2>Barcode Data</h2>
        <p>
          Any barcode values you enter are processed locally in your browser to
          generate previews and downloadable files. We do not store that barcode
          content on our own servers.
        </p>

        <h2>Analytics and Log Data</h2>
        <p>
          Like most websites, limited technical information may be collected by
          hosting or analytics providers, such as browser type, device type,
          pages visited, and general usage data.
        </p>

        <h2>Cookies</h2>
        <p>
          This website may use essential cookies or similar technologies for
          performance, security, and functionality.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          This site may rely on third-party hosting, analytics, or content
          delivery services that may process limited technical data as part of
          delivering the website.
        </p>

        <h2>Data Sharing</h2>
        <p>
          We do not sell your personal information. We do not share barcode
          values entered into the tool except where required by law or where
          necessary to operate the website.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable steps to maintain the security of the website, but
          no online service can guarantee absolute security.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any updates will
          be posted on this page with a revised date.
        </p>
      </section>
    </main>
  );
}

export default PrivacyPolicy;