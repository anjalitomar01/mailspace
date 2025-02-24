import React, { useState } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { AiFillEye, AiFillEyeInvisible, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const APIIntegration = () => {
  const [tokens, setTokens] = useState([
    { id: 1, name: "API Token", value: generateToken(), tags: ["Email", "SMTP"], type: "api" },
    { id: 2, name: "SMTP Token", value: generateToken(), tags: ["Transactional", "Bulk"], type: "smtp" },
  ]);

  const [webhookUrl, setWebhookUrl] = useState(""); // Store webhook URL separately
  const [hiddenTokens, setHiddenTokens] = useState(tokens.reduce((acc, token) => {
    acc[token.id] = true;
    return acc;
  }, {}));

  // Function to generate a random token
  function generateToken() {
    return `sk-${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 10)}`;
  }

  // Toggle token visibility
  const toggleVisibility = (id) => {
    setHiddenTokens((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle tag addition
  const addTag = (tokenId, tag) => {
    if (!tag.trim()) return;
    setTokens((prevTokens) =>
      prevTokens.map((token) =>
        token.id === tokenId ? { ...token, tags: [...token.tags, tag] } : token
      )
    );
  };

  // Handle tag removal
  const removeTag = (tokenId, tagIndex) => {
    setTokens((prevTokens) =>
      prevTokens.map((token) =>
        token.id === tokenId
          ? { ...token, tags: token.tags.filter((_, i) => i !== tagIndex) }
          : token
      )
    );
  };

  // Create a new token
  const createToken = (type) => {
    const newToken = {
      id: Date.now(),
      name: `${type === "api" ? "API" : "SMTP"} Token`,
      value: generateToken(),
      tags: [],
      type,
    };
    setTokens([...tokens, newToken]);
    setHiddenTokens({ ...hiddenTokens, [newToken.id]: true });
  };

  // Delete a token
  const deleteToken = (id) => {
    setTokens(tokens.filter((token) => token.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <BsCodeSlash size={28} className="text-blue-500" /> API Integration
      </h1>
      <p className="mt-2 text-gray-700">
        Connect with third-party APIs and streamline data exchange across platforms.
      </p>

      {/* API & SMTP Token Sections */}
      {["api", "smtp"].map((type) => (
        <div key={type} className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3 flex justify-between items-center">
            {type === "api" ? "REST API Tokens" : "SMTP Credentials"}
            <button
              onClick={() => createToken(type)}
              className="text-blue-500 flex items-center gap-1 text-sm border border-blue-500 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
            >
              <AiOutlinePlus /> Create Credentials
            </button>
          </h2>
          <ul className="list-disc pl-5 text-gray-600">
            {tokens
              .filter((token) => token.type === type)
              .map((token) => (
                <li key={token.id} className="mb-3">
                  <div className="font-semibold mb-1 flex justify-between items-center">
                    {token.name}
                    <button
                      onClick={() => deleteToken(token.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>

                  {/* Token Preview */}
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded text-sm w-fit">
                    <span>
                      {hiddenTokens[token.id] ? "••••••••••••" : token.value}
                    </span>
                    <button onClick={() => toggleVisibility(token.id)} className="text-blue-500">
                      {hiddenTokens[token.id] ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                  </div>

                  {/* Tags Section */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {token.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 px-2 py-1 rounded text-sm cursor-pointer"
                        onClick={() => removeTag(token.id, index)}
                      >
                        {tag} ❌
                      </span>
                    ))}
                    <input
                      type="text"
                      className="border rounded px-2 py-1 text-sm"
                      placeholder="Add tag..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addTag(token.id, e.target.value);
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}

      {/* Webhook Section (Without Token) */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-3">Webhooks & Callbacks</h2>
        <p className="text-sm text-gray-600 mb-2">
          Provide a URL to receive real-time event notifications.
        </p>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded text-sm"
          placeholder="Enter webhook URL..."
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
        />

        {/* Static Webhook Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {["Delivery", "Events"].map((tag, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default APIIntegration;
