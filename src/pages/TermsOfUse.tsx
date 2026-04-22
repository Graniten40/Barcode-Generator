import { Link } from "react-router-dom";

function TermsOfUse() {
  return (
    <main className="app-shell">
      <section className="app-card legal-page">
        <Link to="/" className="back-home-link">
          ← Home
        </Link>

        <h1>Terms of Use</h1>
        <p className="legal-updated">Last updated: April 22, 2026</p>

        <p>
          These Terms of Use govern your access to and use of this Barcode
          Generator website and its related features.
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing or using this website, you agree to these Terms of Use.
          If you do not agree, you should not use the website.
        </p>

        <h2>Use of the Service</h2>
        <p>
          This website provides a browser-based barcode generation tool for
          general personal, educational, and business use.
        </p>

        <h2>No Warranty</h2>
        <p>
          This website is provided on an &quot;as is&quot; and &quot;as
          available&quot; basis without warranties of any kind.
        </p>

        <h2>User Responsibility</h2>
        <p>
          You are responsible for verifying that any generated barcode is
          suitable for your intended use, including printing, scanning, retail,
          packaging, or inventory requirements.
        </p>

        <h2>Prohibited Use</h2>
        <p>
          You agree not to use this website in any unlawful, harmful,
          fraudulent, or abusive way.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, we are not liable for losses
          arising from the use of this website or its generated output.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          We may update these Terms of Use from time to time. Continued use of
          the website after changes are posted means you accept the updated
          terms.
        </p>
      </section>
    </main>
  );
}

export default TermsOfUse;