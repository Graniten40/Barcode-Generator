import { useEffect, useMemo, useRef, useState } from "react";
import JsBarcode from "jsbarcode";

type BarcodeFormat =
  | "CODE128"
  | "CODE39"
  | "EAN13"
  | "EAN8"
  | "UPC";

const barcodeFormats: BarcodeFormat[] = [
  "CODE128",
  "CODE39",
  "EAN13",
  "EAN8",
  "UPC",
];

function getDefaultValue(format: BarcodeFormat) {
  switch (format) {
    case "EAN13":
      return "5901234123457";
    case "EAN8":
      return "55123457";
    case "UPC":
      return "123456789999";
    case "CODE39":
      return "HELLO39";
    case "CODE128":
    default:
      return "HELLO123";
  }
}

function getPlaceholder(format: BarcodeFormat) {
  switch (format) {
    case "EAN13":
      return "Enter 12 or 13 digits";
    case "EAN8":
      return "Enter 7 or 8 digits";
    case "UPC":
      return "Enter 11 or 12 digits";
    case "CODE39":
      return "Letters, numbers, spaces and -.$/+%";
    case "CODE128":
    default:
      return "Enter text or numbers";
  }
}

function validateValue(format: BarcodeFormat, value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "Value is required.";
  }

  switch (format) {
    case "EAN13":
      if (!/^\d{12,13}$/.test(trimmed)) {
        return "EAN-13 must contain 12 or 13 digits.";
      }
      return "";

    case "EAN8":
      if (!/^\d{7,8}$/.test(trimmed)) {
        return "EAN-8 must contain 7 or 8 digits.";
      }
      return "";

    case "UPC":
      if (!/^\d{11,12}$/.test(trimmed)) {
        return "UPC must contain 11 or 12 digits.";
      }
      return "";

    case "CODE39":
      if (!/^[0-9A-Z\-\.\ \$\/\+%]*$/.test(trimmed.toUpperCase())) {
        return "CODE39 supports uppercase letters, numbers, spaces and - . $ / + %.";
      }
      return "";

    case "CODE128":
    default:
      return "";
  }
}

function generateRandomValue(format: BarcodeFormat) {
  const randomDigits = (length: number) =>
    Array.from({ length }, () => Math.floor(Math.random() * 10)).join("");

  const randomCode39 = (length: number) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  const randomCode128 = (length: number) => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  };

  switch (format) {
    case "EAN13":
      return randomDigits(12);
    case "EAN8":
      return randomDigits(7);
    case "UPC":
      return randomDigits(11);
    case "CODE39":
      return randomCode39(10);
    case "CODE128":
    default:
      return randomCode128(12);
  }
}

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [format, setFormat] = useState<BarcodeFormat>("CODE128");
  const [value, setValue] = useState("HELLO123");
  const [error, setError] = useState("");
  const [isGenerated, setIsGenerated] = useState(true);

  const normalizedValue = useMemo(() => {
    return format === "CODE39" ? value.toUpperCase() : value;
  }, [format, value]);

  useEffect(() => {
    document.title =
      "Free Barcode Generator Online | CODE128, CODE39, EAN13, EAN8, UPC";
  }, []);

  useEffect(() => {
    const validationError = validateValue(format, normalizedValue);

    if (validationError) {
      setError(validationError);
      setIsGenerated(false);

      if (svgRef.current) {
        svgRef.current.innerHTML = "";
      }

      return;
    }

    if (!svgRef.current) return;

    try {
      JsBarcode(svgRef.current, normalizedValue, {
        format,
        lineColor: "#111827",
        background: "#ffffff",
        width: 2,
        height: 110,
        margin: 12,
        displayValue: true,
        fontSize: 18,
      });

      setError("");
      setIsGenerated(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate barcode."
      );
      setIsGenerated(false);
    }
  }, [format, normalizedValue]);

  function handleFormatChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextFormat = event.target.value as BarcodeFormat;
    setFormat(nextFormat);
    setValue(getDefaultValue(nextFormat));
    setError("");
  }

  function handleGenerateRandom() {
    setValue(generateRandomValue(format));
    setError("");
  }

  function handleDownload() {
    if (!svgRef.current || !isGenerated) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barcode-${format.toLowerCase()}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      <section className="app-card">
        <div className="hero-block">
          <h1>Free Barcode Generator Online</h1>
          <p className="hero-text">
            Create CODE128, CODE39, EAN13, EAN8, and UPC barcodes instantly in
            your browser. Enter your value, preview the barcode live, and
            download it as SVG for free.
          </p>
        </div>

        <div className="content-grid">
          <div className="control-panel">
            <div className="field-group">
              <label htmlFor="format">Barcode format</label>
              <select id="format" value={format} onChange={handleFormatChange}>
                {barcodeFormats.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="value">Barcode value</label>
              <input
                id="value"
                type="text"
                value={value}
                placeholder={getPlaceholder(format)}
                onChange={(event) => setValue(event.target.value)}
              />
            </div>

            <div className="help-box">
              <strong>Validation rules</strong>
              <ul>
                <li>CODE128: text and numbers</li>
                <li>CODE39: uppercase letters, numbers and limited symbols</li>
                <li>EAN13: 12 or 13 digits</li>
                <li>EAN8: 7 or 8 digits</li>
                <li>UPC: 11 or 12 digits</li>
              </ul>
            </div>

            <button
              className="secondary-button"
              onClick={handleGenerateRandom}
            >
              Generate Random Code
            </button>

            <button
              className="download-button"
              onClick={handleDownload}
              disabled={!isGenerated}
            >
              Download SVG
            </button>
          </div>

          <div className="preview-panel">
            <h2>Live preview</h2>

            <div className="preview-box">
              <svg ref={svgRef}></svg>
            </div>

            {error ? (
              <p className="message error-message">{error}</p>
            ) : (
              <p className="message success-message">
                Barcode generated successfully.
              </p>
            )}
          </div>
        </div>

        <section className="seo-section">
          <h2>What is this barcode generator?</h2>
          <p>
            This free online barcode generator lets you create several common
            barcode types directly in your browser. You can generate barcodes
            for product labels, inventory, packaging, retail use, and internal
            business workflows without installing any software.
          </p>

          <h2>Supported barcode formats</h2>
          <p>
            This tool supports CODE128, CODE39, EAN13, EAN8, and UPC. These
            barcode types are widely used across retail, logistics, warehousing,
            labeling, and inventory systems.
          </p>

          <h3>CODE128 barcode generator</h3>
          <p>
            CODE128 is one of the most flexible barcode formats. It supports
            letters, numbers, and special characters, which makes it a strong
            choice for shipping labels, warehouse systems, and business
            operations.
          </p>

          <h3>CODE39 barcode generator</h3>
          <p>
            CODE39 is a simple and well-known barcode format that supports
            uppercase letters, numbers, spaces, and a limited range of symbols.
            It is often used for asset tracking and industrial labeling.
          </p>

          <h3>EAN13 barcode generator</h3>
          <p>
            EAN13 is a standard retail barcode format used internationally for
            consumer products. It is commonly found on product packaging and is
            designed for store scanning and retail systems.
          </p>

          <h3>EAN8 barcode generator</h3>
          <p>
            EAN8 is a smaller retail barcode that is useful for compact product
            packaging where there is not enough space for a full EAN13 barcode.
          </p>

          <h3>UPC barcode generator</h3>
          <p>
            UPC is a common barcode format used mainly in North America for
            retail products. It is widely recognized and used in point-of-sale
            systems and product labeling.
          </p>

          <h2>How to use the barcode generator</h2>
          <ol>
            <li>Select the barcode format you want to use.</li>
            <li>Enter the barcode value in the input field.</li>
            <li>Review the live preview.</li>
            <li>Download the barcode as an SVG file.</li>
          </ol>

          <h2>Why use an online barcode generator?</h2>
          <p>
            An online barcode generator is fast, simple, and accessible from any
            modern device. Because this tool runs entirely in the browser, you
            can create barcodes instantly without creating an account or sending
            your data to a backend server.
          </p>
        </section>

        <section className="seo-section">
          <h2>Frequently Asked Questions</h2>

          <h3>Is this barcode generator free?</h3>
          <p>
            Yes, this online barcode generator is free to use.
          </p>

          <h3>Do I need to install anything?</h3>
          <p>
            No, the entire tool runs directly in your browser.
          </p>

          <h3>Can I download the barcode?</h3>
          <p>
            Yes, you can download the generated barcode as an SVG file.
          </p>

          <h3>Which barcode format should I use?</h3>
          <p>
            That depends on your use case. CODE128 is a strong general-purpose
            option, while EAN13 and UPC are better suited for retail product
            labeling.
          </p>
        </section>
      </section>
    </main>
  );
}

export default App;