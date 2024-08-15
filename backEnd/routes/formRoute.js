import express, { request, response } from "express";
import { Form } from "../models/formModels.js";
import PDFDocument from "pdfkit";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const Router = express.Router();

// route to post data
Router.post("/", async (request, response) => {
  try {
    if (!request.body.name || !request.body.email || !request.body.occupation) {
      return response.status(400).send({
        message: " All fields are required",
      });
    }
    const newForm = {
      name: request.body.name,
      email: request.body.email,
      occupation: request.body.occupation,
    };
    const form = await Form.create(newForm);
    return response.status(201).send(form);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route to get data
Router.get("/", async (request, response) => {
  try {
    const formFields = await Form.find({});
    return response.status(200).json({
      data: formFields,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route to delete data
Router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send({ message: "Invalid ID" });
  }
  try {
    const Delete = await Form.findByIdAndDelete(id);
    if (!Delete) {
      return response.status(404).json({ message: "Book not deleted" });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Utility to get directory path from import.meta.url
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// route for text to pdf
Router.get("/pdf/:id", async (req, res) => {
  try {
    const name = await Form.findById(req.params.id);
    if (!name) return res.status(404).send("Name not found");

    const doc = new PDFDocument();

    // Stream the PDF to a file and to the response
    const writeStream = fs.createWriteStream(`${name.id}.pdf`);
    writeStream.on("error", (error) => {
      console.error("Error writing PDF to file:", error);
      res.status(500).send("Error saving PDF");
    });

    doc.pipe(writeStream);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${name.id}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");
    doc.pipe(res);

    // Add content to the PDF
    doc.fontSize(25).text(`Name: ${name.name}`);
    doc.fontSize(18).text(`Email: ${name.email}`);
    doc.fontSize(18).text(`Occupation: ${name.occupation}`);

    doc.end();
    writeStream.on("finish", () => {
      console.log(`PDF saved `);
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

export default Router;
