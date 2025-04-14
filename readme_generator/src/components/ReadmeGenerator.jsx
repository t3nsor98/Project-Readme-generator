import { useState } from "react";

export default function ReadmeGenerator() {
  const [formData, setFormData] = useState({
    projectTitle: "",
    description: "",
    installation: "",
    usage: "",
    features: "",
    contribution: "",
    license: "MIT",
    contact: "",
    username: "",
    includeHeader: true,
    includeInstallation: true,
    includeUsage: true,
    includeFeatures: true,
    includeContribution: true,
    includeLicense: true,
    includeContact: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFeatureChange = (e) => {
    setFormData({
      ...formData,
      features: e.target.value,
    });
  };

  const generateReadme = () => {
    let markdown = "";

    // Header with title and description
    if (formData.includeHeader) {
      markdown += `# ${formData.projectTitle}\n\n`;

      if (formData.description) {
        markdown += `${formData.description}\n\n`;
      }
    }

    // Installation
    if (formData.includeInstallation && formData.installation) {
      markdown += `## Installation\n\n${formData.installation}\n\n`;
    }

    // Usage
    if (formData.includeUsage && formData.usage) {
      markdown += `## Usage\n\n${formData.usage}\n\n`;
    }

    // Features
    if (formData.includeFeatures && formData.features) {
      markdown += `## Features\n\n`;

      // Split features by new line and create bullet points
      const featuresList = formData.features
        .split("\n")
        .filter((f) => f.trim() !== "");
      featuresList.forEach((feature) => {
        markdown += `- ${feature}\n`;
      });
      markdown += "\n";
    }

    // Contribution
    if (formData.includeContribution && formData.contribution) {
      markdown += `## Contributing\n\n${formData.contribution}\n\n`;
    }

    // License
    if (formData.includeLicense) {
      markdown += `## License\n\n`;
      if (formData.license === "MIT") {
        markdown += `This project is licensed under the MIT License - see the LICENSE file for details.\n\n`;
      } else if (formData.license === "Apache") {
        markdown += `This project is licensed under the Apache License 2.0 - see the LICENSE file for details.\n\n`;
      } else if (formData.license === "GPL") {
        markdown += `This project is licensed under the GPL License - see the LICENSE file for details.\n\n`;
      } else {
        markdown += `This project is licensed under the ${formData.license} License.\n\n`;
      }
    }

    // Contact
    if (formData.includeContact && (formData.contact || formData.username)) {
      markdown += `## Contact\n\n`;
      if (formData.username) {
        markdown += `GitHub: [@${formData.username}](https://github.com/${formData.username})\n\n`;
      }
      if (formData.contact) {
        markdown += `${formData.contact}\n\n`;
      }
    }

    return markdown;
  };

  const copyToClipboard = () => {
    const readmeText = generateReadme();
    navigator.clipboard
      .writeText(readmeText)
      .then(() => {
        alert("README copied to clipboard!");
      })
      .catch((err) => {
        alert(
          "Failed to copy README. Please try selecting and copying the text manually."
        );
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">
        GitHub README Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">README Content</h2>

          <div className="space-y-4">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Title*
                <input
                  type="text"
                  name="projectTitle"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  required
                />
              </label>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  rows={3}
                />
              </label>
            </div>

            {/* Installation */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="includeInstallation"
                checked={formData.includeInstallation}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label className="block text-sm font-medium w-full">
                Installation Instructions
                <textarea
                  name="installation"
                  value={formData.installation}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  rows={3}
                  placeholder="npm install my-project"
                  disabled={!formData.includeInstallation}
                />
              </label>
            </div>

            {/* Usage */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="includeUsage"
                checked={formData.includeUsage}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label className="block text-sm font-medium w-full">
                Usage
                <textarea
                  name="usage"
                  value={formData.usage}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  rows={3}
                  placeholder="How to use your project"
                  disabled={!formData.includeUsage}
                />
              </label>
            </div>

            {/* Features */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="includeFeatures"
                checked={formData.includeFeatures}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label className="block text-sm font-medium w-full">
                Features (one per line)
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleFeatureChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  rows={3}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  disabled={!formData.includeFeatures}
                />
              </label>
            </div>

            {/* Contribution */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="includeContribution"
                checked={formData.includeContribution}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label className="block text-sm font-medium w-full">
                Contribution Guidelines
                <textarea
                  name="contribution"
                  value={formData.contribution}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  rows={3}
                  placeholder="How others can contribute to your project"
                  disabled={!formData.includeContribution}
                />
              </label>
            </div>

            {/* License */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="includeLicense"
                checked={formData.includeLicense}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <label className="block text-sm font-medium w-full">
                License
                <select
                  name="license"
                  value={formData.license}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                  disabled={!formData.includeLicense}
                >
                  <option value="MIT">MIT</option>
                  <option value="Apache">Apache 2.0</option>
                  <option value="GPL">GPL</option>
                  <option value="BSD">BSD</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            {/* Contact */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="includeContact"
                checked={formData.includeContact}
                onChange={handleChange}
                className="mt-1 mr-2"
              />
              <div className="w-full">
                <label className="block text-sm font-medium">
                  GitHub Username
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                    placeholder="yourusername"
                    disabled={!formData.includeContact}
                  />
                </label>
                <label className="block text-sm font-medium mt-2">
                  Additional Contact Info
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm p-2 border"
                    placeholder="Email, Twitter, etc."
                    disabled={!formData.includeContact}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Column */}
        <div className="flex flex-col">
          <div className="bg-white p-6 rounded shadow-md mb-4 flex-grow overflow-auto">
            <h2 className="text-xl font-semibold mb-4">README Preview</h2>
            <div className="bg-gray-100 p-4 rounded font-mono text-sm whitespace-pre-wrap h-full overflow-y-auto">
              {generateReadme() || "Your README preview will appear here..."}
            </div>
          </div>

          <button
            onClick={copyToClipboard}
            className="bg-blue-600 text-white py-3 px-6 rounded font-medium cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Copy README to Clipboard
          </button>
        </div>
      </div>
    </div>
  );
}
