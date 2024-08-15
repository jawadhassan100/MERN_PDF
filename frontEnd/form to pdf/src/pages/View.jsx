import { useState, useEffect } from "react";
import axios from 'axios';


const ShowAll = () => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mern-pdf.vercel.app/data");
        setFormData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`https://mern-pdf.vercel.app/data/${id}`);
      setFormData(formData.filter((item) => item.id !== id));

      const response = await axios.get("https://mern-pdf.vercel.app/data");
      setFormData(response.data.data);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleDownloadPDF = async (id) => {
      try {
    const response = await axios.get(`https://mern-pdf.vercel.app/data/pdf/${id}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Form.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Error downloading PDF:', error);
  }
};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex justify-center mt-5 ">
        Form Details
      </h1>
      {formData.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {formData.map((item, index) => (
            <li key={index}>
              <div className="p-4  w-96    ">
                <div className="border p-4 rounded shadow">
                  {" "}
                  <h2 className="text-xl font-semibold mb-2 text-center">
                    Form Information
                  </h2>{" "}
                  <p>
                    <strong>Name:</strong> {item.name}
                  </p>{" "}
                  <p>
                    <strong>Email:</strong> {item.email}
                  </p>{" "}
                  <p>
                    <strong>Occupation:</strong> {item.occupation}
                  </p>{" "}
                  <button
                    onClick={() => handleDeleteBook(item._id)}
                    className="mt-4 mr-2 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>{" "}
                  <button
                    onClick={() => handleDownloadPDF(item._id)}
                    className="mt-4 p-2 bg-green-500 text-white rounded"
                  >
                    Download as PDF
                  </button>{" "}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ShowAll;
