// ==========================================
// JK DIGITAL CONTACT SYSTEM
// EmailJS + WhatsApp fallback
// ==========================================

"use strict";

const JK_EMAILJS_PUBLIC_KEY = "Om4cQYuB4mx7EOqXo";
const JK_EMAILJS_SERVICE_ID = "service_pu195q6";
const JK_EMAILJS_TEMPLATE_ID = "template_wjh5cuq";

const JK_CONTACT_EMAIL = "jkdigital4516@gmail.com";
const JK_WHATSAPP_NUMBER = "256707558378";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("ContactForm");
    const notice = document.getElementById("formNotice");
    const submitButton = document.getElementById("contactSubmit");

    if (!form || !notice) {
        console.error(
            "JK Digital: ContactForm or formNotice is missing."
        );
        return;
    }

    if (!window.emailjs) {
        showMessage(
            "The email service could not load. Please use WhatsApp to contact us.",
            "error"
        );
        console.error("JK Digital: EmailJS SDK failed to load.");
        return;
    }

    emailjs.init({
        publicKey: JK_EMAILJS_PUBLIC_KEY
    });

    let isSending = false;

    function showMessage(message, type = "info") {
        notice.replaceChildren();

        const paragraph = document.createElement("p");
        paragraph.textContent = message;

        const colors = {
            success: "#218838",
            error: "#c62828",
            info: "#b8860b"
        };

        notice.style.color = colors[type] || colors.info;
        notice.style.marginTop = "15px";
        notice.appendChild(paragraph);
    }

    function getEnquiry() {
        const data = new FormData(form);

        return {
            full_name: String(data.get("fullName") || "").trim(),
            business_name:
                String(data.get("businessName") || "").trim() ||
                "Not provided",
            customer_email:
                String(data.get("email") || "").trim(),
            phone:
                String(data.get("phone") || "").trim() ||
                "Not provided",
            service: String(data.get("service") || "").trim(),
            budget:
                String(data.get("budget") || "").trim() ||
                "Not specified",
            timeline:
                String(data.get("timeline") || "").trim() ||
                "Not specified",
            project_details:
                String(data.get("projectDetails") || "").trim()
        };
    }

    function createWhatsAppURL(enquiry) {
        const message = [
            "Hello JK Digital!",
            "",
            "I would like to make a project enquiry.",
            "",
            `Name: ${enquiry.full_name}`,
            `Business: ${enquiry.business_name}`,
            `Email: ${enquiry.customer_email}`,
            `Phone: ${enquiry.phone}`,
            `Service: ${enquiry.service}`,
            `Budget: ${enquiry.budget}`,
            `Timeline: ${enquiry.timeline}`,
            "",
            "Project details:",
            enquiry.project_details
        ].join("\n");

        return (
            `https://wa.me/${JK_WHATSAPP_NUMBER}` +
            `?text=${encodeURIComponent(message)}`
        );
    }

    function addWhatsAppOption(enquiry) {
        const wrapper = document.createElement("div");
        wrapper.style.marginTop = "12px";

        const link = document.createElement("a");
        link.href = createWhatsAppURL(enquiry);
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Continue on WhatsApp";
        link.style.display = "inline-block";
        link.style.padding = "12px 18px";
        link.style.backgroundColor = "#b8860b";
        link.style.color = "#ffffff";
        link.style.textDecoration = "none";
        link.style.borderRadius = "6px";
        link.style.fontWeight = "700";

        wrapper.appendChild(link);
        notice.appendChild(wrapper);
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (isSending || !form.reportValidity()) {
            return;
        }

        isSending = true;

        const enquiry = getEnquiry();

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending enquiry...";
        }

        showMessage("Sending your enquiry by email...", "info");

        try {
            await emailjs.send(
                JK_EMAILJS_SERVICE_ID,
                JK_EMAILJS_TEMPLATE_ID,
                enquiry
            );

            showMessage(
                "Your enquiry has been accepted by our email service. Thank you for contacting JK Digital!",
                "success"
            );

            form.reset();

        } catch (error) {
            console.error(
                "JK Digital EmailJS submission failed:",
                error
            );

            showMessage(
                "We couldn't send your enquiry by email. Please use WhatsApp below to contact JK Digital.",
                "error"
            );

            addWhatsAppOption(enquiry);

        } finally {
            isSending = false;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Inquiry";
            }
        }
    });

    console.log("JK Digital contact form initialized.");
});