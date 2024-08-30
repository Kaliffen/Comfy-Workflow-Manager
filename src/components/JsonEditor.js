import React, { useState } from 'react';

function JsonEditor({ jsonData, onSave }) {
    const [editedJson, setEditedJson] = useState(jsonData);

    const handleSave = () => {
        onSave(editedJson);
    };

    return (
        <div>
      <textarea
          className="form-control mt-2"
          rows={5}
          value={editedJson}
          onChange={(e) => setEditedJson(e.target.value)}
      />
            <button className="btn btn-success mt-2" onClick={handleSave}>Save JSON</button>
        </div>
    );
}

export default JsonEditor;