import React, { useState } from "react";
import { 
  MdCampaign,
  MdTextFields,
  MdCode,
  MdDashboard,
  MdFeaturedPlayList,
  MdCloudUpload,
  MdClose
} from "react-icons/md";
import { useDropzone } from "react-dropzone";

const Campaigns = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [campaignType, setCampaignType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [step, setStep] = useState(1);
  const [emailContent, setEmailContent] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const templateOptions = [
    { id: 1, name: "Newsletter Basic", category: "Email" },
    { id: 2, name: "Product Launch", category: "Email" },
    { id: 3, name: "Promotional Offer", category: "AMP" },
    { id: 4, name: "Transactional", category: "AMP" },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'text/html': ['.html'],
      'text/amp-html': ['.amp.html']
    },
    onDrop: acceptedFiles => {
      setUploadedFiles(acceptedFiles);
    }
  });

  const campaignTypes = [
    {
      id: 1,
      name: "Plain Text",
      icon: <MdTextFields size={24} />,
      description: "Create a simple text-only campaign"
    },
    {
      id: 2,
      name: "Upload HTML",
      icon: <MdCode size={24} />,
      description: "Upload your custom HTML template"
    },
    {
      id: 3,
      name: "AMP Email",
      icon: <MdCode size={24} />,
      description: "Create interactive AMP email content"
    },
    {
      id: 4,
      name: "Drag & Drop Builder",
      icon: <MdDashboard size={24} />,
      description: "Visual builder with drag-and-drop components"
    },
    {
      id: 5,
      name: "Existing Templates",
      icon: <MdFeaturedPlayList size={24} />,
      description: "Choose from pre-designed templates"
    }
  ];

  const handleCreateCampaign = () => {
    let campaignData = {
      type: campaignType.name,
      created: new Date().toISOString()
    };

    switch(campaignType.id) {
      case 1:
        campaignData.content = emailContent;
        break;
      case 2:
      case 3:
        campaignData.files = uploadedFiles;
        break;
      case 4:
        campaignData.builderType = 'drag-drop';
        break;
      case 5:
        campaignData.template = selectedTemplate;
        break;
    }

    console.log('Creating campaign:', campaignData);
    setShowCreationModal(false);
    resetCreationState();
  };

  const resetCreationState = () => {
    setStep(1);
    setCampaignType(null);
    setSelectedTemplate(null);
    setEmailContent("");
    setUploadedFiles([]);
  };

  const renderStepContent = () => {
    switch(campaignType?.id) {
      case 1: // Plain Text
        return (
          <div className="mt-4">
            <textarea
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              className="w-full h-64 p-4 border rounded-lg"
              placeholder="Write your email content here..."
            />
          </div>
        );

      case 2: // Upload HTML
      case 3: // AMP Email
        return (
          <div {...getRootProps({className: 'dropzone'})} 
               className="p-8 border-2 border-dashed rounded-lg text-center cursor-pointer">
            <input {...getInputProps()} />
            <MdCloudUpload size={32} className="mx-auto text-gray-400" />
            <p className="mt-2">
              {uploadedFiles.length > 0 
                ? `Selected ${uploadedFiles.length} file(s)`
                : `Drag & drop ${campaignType.name === "AMP Email" ? "AMP HTML" : "HTML"} files here`}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supported formats: {campaignType.name === "AMP Email" ? ".amp.html" : ".html"}
            </p>
          </div>
        );

      case 4: // Drag & Drop Builder
        return (
          <div className="text-center py-8">
            <div className="bg-gray-100 p-6 rounded-lg">
              <MdDashboard className="text-4xl mx-auto text-gray-400 mb-4" />
              <h4 className="text-lg font-semibold">Drag & Drop Builder</h4>
              <p className="text-gray-600 mt-2">
                This feature is coming soon! In the meantime, please use our template library 
                or upload your own HTML.
              </p>
            </div>
          </div>
        );

      case 5: // Existing Templates
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templateOptions.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedTemplate?.id === template.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <h4 className="font-medium">{template.name}</h4>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-500">{template.category}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                    {template.category} Template
                  </span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaignTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => {
                  setCampaignType(type);
                  setStep(2);
                }}
                className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-blue-500">{type.icon}</span>
                  <h3 className="font-semibold">{type.name}</h3>
                </div>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MdCampaign size={28} className="text-blue-500" /> Campaigns
      </h1>
      <p className="mt-2 text-gray-700">
        Manage and track all your marketing campaigns here. Create, edit, and monitor campaign performance.
      </p>

      <div className="mt-6">
        <button 
          onClick={() => setShowCreationModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <MdCampaign /> + Create New Campaign
        </button>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Active Campaigns</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Email Marketing - 10,000 emails sent</li>
          <li>Social Media Ads - Running on Facebook & Instagram</li>
          <li>SEO Optimization - Improving website ranking</li>
        </ul>
      </div>

      {showCreationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {campaignType ? `Create ${campaignType.name} Campaign` : 'Choose Campaign Type'}
              </h3>
              <button 
                onClick={() => {
                  setShowCreationModal(false);
                  resetCreationState();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <MdClose size={24} />
              </button>
            </div>

            {renderStepContent()}

            <div className="mt-6 flex justify-between">
              {campaignType && (
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
              )}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => {
                    setShowCreationModal(false);
                    resetCreationState();
                  }}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50"
                >
                  Cancel
                </button>
                {campaignType && (
                  <button
                    onClick={handleCreateCampaign}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    disabled={
                      (campaignType.id === 5 && !selectedTemplate) ||
                      ([2, 3].includes(campaignType.id) && uploadedFiles.length === 0)
                    }
                  >
                    Create Campaign
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;